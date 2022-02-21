import {
  Expression,
  InfixExpression,
  IntegerLiteral,
  PrefixExpression
} from './ast'
import { Lexer } from './lexer'
import { Token } from './token'

export const LOWEST_PRECEDENCE = 0
const SUM_PRECEDENCE = 1
const PRODUCT_PRECEDENCE = 2
const PREFIX_PRECEDENCE = 3
const GROUP_PRECEDENCE = 4

const precedences: { [key: string]: number } = {
  PLUS: SUM_PRECEDENCE,
  MINUS: SUM_PRECEDENCE,
  ASTERISK: PRODUCT_PRECEDENCE,
  SLASH: PRODUCT_PRECEDENCE,
  PARAN_L: GROUP_PRECEDENCE
}

interface PrefixParseFunctions {
  [key: string]: () => Expression
}

interface InfixParseFunctions {
  [key: string]: (left: Expression) => Expression
}

export class Parser {
  private currentToken: Token
  private peekToken?: Token

  private prefixParseFunctions: PrefixParseFunctions = {}
  private infixParseFunctions: InfixParseFunctions = {}

  constructor(private lexer: Lexer) {
    this.prefixParseFunctions['MINUS'] = this.parsePrefixExpression.bind(this)
    this.prefixParseFunctions['INTEGER'] = this.parseIntegerLiteral.bind(this)
    this.prefixParseFunctions['PARAN_L'] = this.parseGroupExpression.bind(this)

    this.infixParseFunctions['PLUS'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['ASTERISK'] = this.parseInfixExpression.bind(this)

    if (!lexer.hasNextToken()) {
      throw new Error('Lexer is empty.')
    }
    this.currentToken = this.lexer.nextToken()

    if (lexer.hasNextToken()) {
      this.peekToken = this.lexer.nextToken()
    }
  }

  private nextToken() {
    if (!this.peekToken) {
      throw new Error(
        `next token not exist. this.currentToken = ${this.currentToken}`
      )
    }

    this.currentToken = this.peekToken
    if (this.lexer.hasNextToken()) {
      this.peekToken = this.lexer.nextToken()
    } else {
      this.peekToken = undefined
    }
  }

  private hasNextToken(): boolean {
    return this.peekToken !== undefined
  }

  parseExpression(precedence: number): Expression {
    const prefixParseFunction =
      this.prefixParseFunctions[this.currentToken.type]
    if (!prefixParseFunction) {
      throw new Error(
        `prefixParseFunction not exists. this.currentToken.type = ${this.currentToken.type}`
      )
    }
    let leftExpression = prefixParseFunction()

    const currentPrecedence = precedences[this.currentToken.type]
    while (this.hasNextToken() && precedence < currentPrecedence) {
      const infixParseFunction =
        this.infixParseFunctions[this.currentToken.type]
      if (!infixParseFunction) {
        throw new Error(
          `infixParseFunction not exists. this.currentToken.type = ${this.currentToken.type}`
        )
      }

      leftExpression = infixParseFunction(leftExpression)
    }

    return leftExpression
  }

  // prefixParseFunctions

  private parsePrefixExpression(): PrefixExpression {
    const operator = this.currentToken
    this.nextToken()
    const right = this.parseExpression(PREFIX_PRECEDENCE)
    return new PrefixExpression(operator, right)
  }

  private parseIntegerLiteral(): IntegerLiteral {
    const token = this.currentToken
    if (this.hasNextToken()) {
      this.nextToken()
    }
    return new IntegerLiteral(token, Number(token.literal))
  }

  private parseGroupExpression(): Expression {
    this.nextToken()

    const expression = this.parseExpression(LOWEST_PRECEDENCE)

    if (this.currentToken.type != 'PARAN_R') {
      throw new Error(`Invalid token. this.currentToken = ${this.currentToken}`)
    }

    return expression
  }

  // infixParseFunctions

  private parseInfixExpression(left: Expression): InfixExpression {
    const operator = this.currentToken
    this.nextToken()
    const right = this.parseExpression(precedences[operator.type])

    return new InfixExpression(left, operator, right)
  }
}
