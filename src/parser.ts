import { Expression, IntegerLiteral } from './ast'
import { Lexer } from './lexer'
import { Token } from './token'

interface ParseFunctions {
  [key: string]: () => Expression
}

export class Parser {
  private currentToken: Token

  private prefixParseFunctions: ParseFunctions = {}
  // private infixParseFunctions: ParseFunctions = {}

  constructor(private lexer: Lexer) {
    this.prefixParseFunctions['INTEGER'] = this.parseIntegerLiteral.bind(this)

    this.currentToken = this.lexer.nextToken()
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
    return leftExpression
  }

  // prefixParseFunctions

  private parseIntegerLiteral(): IntegerLiteral {
    const token = this.currentToken
    return new IntegerLiteral(token, Number(token.literal))
  }

  // infixParseFunctions
}
