import { Token } from './token'

export interface Expression {}

export class IntegerLiteral implements Expression {
  constructor(private token: Token, _value: number) {}

  toString() {
    return this.token.literal
  }
}
