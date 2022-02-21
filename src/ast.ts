import { Token } from './token'

export interface Expression {}

export class PrefixExpression implements Expression {
  constructor(private operator: Token, private right: Expression) {}

  toString() {
    return `(${this.operator.literal}${this.right})`
  }
}

export class InfixExpression implements Expression {
  constructor(
    private left: Expression,
    private operator: Token,
    private right: Expression
  ) {}

  toString() {
    return `(${this.left} ${this.operator.literal} ${this.right})`
  }
}

export class IntegerLiteral implements Expression {
  constructor(private token: Token, private _value: number) {}

  get value(): number {
    return this._value
  }

  toString() {
    return this.token.literal
  }
}
