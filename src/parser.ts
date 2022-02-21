import { Expression, IntegerLiteral } from './ast'
import { Lexer } from './lexer'

export class Parser {
  constructor(private lexer: Lexer) {}

  parseExpression(): Expression {
    const token = this.lexer.nextToken()
    return new IntegerLiteral(token, Number(token.literal))
  }
}
