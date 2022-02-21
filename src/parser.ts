import {
  Expression,
  InfixExpression,
  IntegerLiteral,
  PrefixExpression
} from './ast'
import { Lexer } from './lexer'
import { Token } from './token'

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
    this.prefixParseFunctions['INTEGER'] = this.parseIntegerLiteral.bind(this)
    this.prefixParseFunctions['MINUS'] = this.parsePrefixExpression.bind(this)

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

  parseExpression(): Expression {
    const prefixParseFunction =
      this.prefixParseFunctions[this.currentToken.type]
    if (!prefixParseFunction) {
      throw new Error(
        `prefixParseFunction not exists. this.currentToken.type = ${this.currentToken.type}`
      )
    }
    const leftExpression = prefixParseFunction()

    if (!this.hasNextToken()) {
      return leftExpression
    }

    const infixParseFunction = this.infixParseFunctions[this.currentToken.type]
    return infixParseFunction(leftExpression)
  }

  // prefixParseFunctions

  private parsePrefixExpression(): PrefixExpression {
    const operator = this.currentToken
    this.nextToken()
    const right = this.parseExpression()
    return new PrefixExpression(operator, right)
  }

  private parseIntegerLiteral(): IntegerLiteral {
    const token = this.currentToken
    if (this.hasNextToken()) {
      this.nextToken()
    }
    return new IntegerLiteral(token, Number(token.literal))
  }

  // infixParseFunctions

  private parseInfixExpression(left: Expression): InfixExpression {
    const operator = this.currentToken
    this.nextToken()
    const right = this.parseExpression()

    return new InfixExpression(left, operator, right)
  }
}
