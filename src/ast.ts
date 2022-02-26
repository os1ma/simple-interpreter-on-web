import { Token } from './token'

export type Statement = LetStatement | Expression

export class LetStatement {
  constructor(
    _token: Token,
    private _identifier: Token,
    private _value: Expression
  ) {}

  get identifier(): Token {
    return this._identifier
  }

  get value(): Expression {
    return this._value
  }
}

export type Expression =
  | PrefixExpression
  | InfixExpression
  | Identifier
  | IntegerLiteral
  | BooleanLiteral

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

export class Identifier {
  constructor(private _token: Token) {}

  get token(): Token {
    return this._token
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

export class BooleanLiteral {
  constructor(private token: Token, private _value: boolean) {}

  get value(): boolean {
    return this._value
  }

  toString() {
    return this.token.literal
  }
}
