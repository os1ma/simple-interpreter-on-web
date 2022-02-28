import {
  BooleanLiteral,
  Expression,
  Identifier,
  IfExpression,
  InfixExpression,
  IntegerLiteral,
  LetStatement,
  PrefixExpression,
  Statement
} from './ast'
import { Lexer } from './lexer'
import { Token, TokenType } from './token'

export const LOWEST_PRECEDENCE = 0
const EQUALS_PRECEDENCE = 1
const LESS_GREATER_PRECEDENCE = 2
const SUM_PRECEDENCE = 3
const PRODUCT_PRECEDENCE = 4
const PREFIX_PRECEDENCE = 5
const GROUP_PRECEDENCE = 6

const precedences: { [key: string]: number } = {
  PLUS: SUM_PRECEDENCE,
  MINUS: SUM_PRECEDENCE,
  ASTERISK: PRODUCT_PRECEDENCE,
  SLASH: PRODUCT_PRECEDENCE,
  PAREN_L: GROUP_PRECEDENCE,
  EQ: EQUALS_PRECEDENCE,
  NEQ: EQUALS_PRECEDENCE,
  LT: LESS_GREATER_PRECEDENCE,
  GT: LESS_GREATER_PRECEDENCE,
  LEQ: LESS_GREATER_PRECEDENCE,
  GEQ: LESS_GREATER_PRECEDENCE
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
    this.prefixParseFunctions['PLUS'] = this.parsePrefixExpression.bind(this)
    this.prefixParseFunctions['MINUS'] = this.parsePrefixExpression.bind(this)
    this.prefixParseFunctions['IDENTIFIER'] = this.parseIdentifier.bind(this)
    this.prefixParseFunctions['INTEGER'] = this.parseIntegerLiteral.bind(this)
    this.prefixParseFunctions['TRUE'] = this.parseBooleanLiteral.bind(this)
    this.prefixParseFunctions['FALSE'] = this.parseBooleanLiteral.bind(this)
    this.prefixParseFunctions['PAREN_L'] = this.parseGroupExpression.bind(this)
    this.prefixParseFunctions['NOT'] = this.parsePrefixExpression.bind(this)
    this.prefixParseFunctions['IF'] = this.parseIfExpression.bind(this)

    this.infixParseFunctions['PLUS'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['MINUS'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['ASTERISK'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['SLASH'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['EQ'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['NEQ'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['LT'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['GT'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['LEQ'] = this.parseInfixExpression.bind(this)
    this.infixParseFunctions['GEQ'] = this.parseInfixExpression.bind(this)

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

  private currentTokenType(): TokenType {
    return this.currentToken.type
  }

  parseStatement(): Statement {
    switch (this.currentToken.type) {
      case 'LET':
        return this.parseLetStatement()
      default:
        return this.parseExpression(LOWEST_PRECEDENCE)
    }
  }

  parseLetStatement(): LetStatement {
    const letToken = this.currentToken

    this.nextToken()

    if (this.currentTokenType() !== 'IDENTIFIER') {
      throw new Error(
        `let statement must need identifier but got ${this.currentToken}`
      )
    }

    const identifier = this.currentToken

    this.nextToken()

    if (this.currentTokenType() !== 'ASSIGN') {
      throw new Error(
        `let statement must need assign but got ${this.currentToken}`
      )
    }

    this.nextToken()

    const expression = this.parseExpression(LOWEST_PRECEDENCE)

    return new LetStatement(letToken, identifier, expression)
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

    while (this.hasNextToken() && precedence < this.currentPreceedence()) {
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

  private currentPreceedence(): number {
    return precedences[this.currentToken.type] || LOWEST_PRECEDENCE
  }

  // prefixParseFunctions

  private parsePrefixExpression(): PrefixExpression {
    const operator = this.currentToken
    this.nextToken()
    const right = this.parseExpression(PREFIX_PRECEDENCE)
    return new PrefixExpression(operator, right)
  }

  private parseIdentifier(): Identifier {
    const token = this.currentToken
    if (this.hasNextToken()) {
      this.nextToken()
    }
    return new Identifier(token)
  }

  private parseIntegerLiteral(): IntegerLiteral {
    const token = this.currentToken
    if (this.hasNextToken()) {
      this.nextToken()
    }
    return new IntegerLiteral(token, Number(token.literal))
  }

  private parseBooleanLiteral(): BooleanLiteral {
    const token = this.currentToken
    if (this.hasNextToken()) {
      this.nextToken()
    }
    const value = token.type === 'TRUE'
    return new BooleanLiteral(token, value)
  }

  private parseGroupExpression(): Expression {
    this.nextToken()

    const expression = this.parseExpression(LOWEST_PRECEDENCE)

    if (this.currentToken.type !== 'PAREN_R') {
      throw new Error(`Invalid token. this.currentToken = ${this.currentToken}`)
    }

    if (this.hasNextToken()) {
      this.nextToken()
    }

    return expression
  }

  parseIfExpression(): IfExpression {
    const token = this.currentToken

    this.nextToken()

    if (this.currentTokenType() !== 'PAREN_L') {
      throw new Error(
        `Invalid if statement. this.currentToken = ${this.currentToken}`
      )
    }

    this.nextToken()

    const condition = this.parseExpression(LOWEST_PRECEDENCE)

    if (this.currentTokenType() !== 'PAREN_R') {
      throw new Error(
        `Invalid if statement. this.currentToken = ${this.currentToken}`
      )
    }

    this.nextToken()

    if (this.currentTokenType() !== 'BRACE_L') {
      throw new Error(
        `Invalid if statement. this.currentToken = ${this.currentToken}`
      )
    }

    this.nextToken()

    const consequence = this.parseStatement()

    if (this.currentTokenType() !== 'BRACE_R') {
      throw new Error(
        `Invalid if statement. this.currentToken = ${this.currentToken}`
      )
    }

    if (this.hasNextToken()) {
      this.nextToken()
    }

    let alternative: Statement | undefined = undefined
    if (this.currentTokenType() === 'ELSE') {
      this.nextToken()

      if (this.currentTokenType() !== 'BRACE_L') {
        throw new Error(
          `Invalid if statement. this.currentToken = ${this.currentToken}`
        )
      }

      this.nextToken()

      alternative = this.parseStatement()

      if (this.currentTokenType() !== 'BRACE_R') {
        throw new Error(
          `Invalid if statement. this.currentToken = ${this.currentToken}`
        )
      }

      if (this.hasNextToken()) {
        this.nextToken()
      }
    }

    return new IfExpression(token, condition, consequence, alternative)
  }

  // infixParseFunctions

  private parseInfixExpression(left: Expression): InfixExpression {
    const operator = this.currentToken
    this.nextToken()
    const right = this.parseExpression(precedences[operator.type])

    return new InfixExpression(left, operator, right)
  }
}
