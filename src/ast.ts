import { Token } from './token'

export interface Expression {}

export class PrefixExpression implements Expression {
  constructor(private _operator: Token, private _right: Expression) {}

  get operator(): Token {
    return this._operator
  }

  get right(): Expression {
    return this._right
  }

  toString() {
    return `(${this._operator.literal}${this._right})`
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
