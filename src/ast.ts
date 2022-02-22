import { Token } from './token'

export type Expression = PrefixExpression | InfixExpression | IntegerLiteral

export class PrefixExpression {
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

export class InfixExpression {
  constructor(
    private _left: Expression,
    private _operator: Token,
    private _right: Expression
  ) {}

  get left(): Expression {
    return this._left
  }

  get operator(): Token {
    return this._operator
  }

  get right(): Expression {
    return this._right
  }

  toString() {
    return `(${this._left} ${this._operator.literal} ${this._right})`
  }
}

export class IntegerLiteral {
  constructor(private token: Token, private _value: number) {}

  get value(): number {
    return this._value
  }

  toString() {
    return this.token.literal
  }
}
