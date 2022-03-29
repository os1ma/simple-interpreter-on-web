import { Token } from './token'

export type Statement = LetStatement | Expression

export class LetStatement {
  constructor(
    private _token: Token,
    private _identifier: Token,
    private _value: Expression
  ) {}

  get token(): Token {
    return this._token
  }

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
  | IfExpression

export class PrefixExpression {
  constructor(private _operator: Token, private _right: Expression) {}

  get operator(): Token {
    return this._operator
  }

  get right(): Expression {
    return this._right
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
}

export class Identifier {
  constructor(private _token: Token) {}

  get token(): Token {
    return this._token
  }
}

export class IntegerLiteral {
  constructor(private _token: Token, private _value: number) {}

  get token(): Token {
    return this._token
  }

  get value(): number {
    return this._value
  }
}

export class BooleanLiteral {
  constructor(private _token: Token, private _value: boolean) {}

  get token(): Token {
    return this._token
  }

  get value(): boolean {
    return this._value
  }
}

export class IfExpression {
  constructor(
    private _token: Token,
    private _condition: Expression,
    private _consequence: Statement,
    private _alternative: Statement | undefined
  ) {}

  get token(): Token {
    return this._token
  }

  get condition(): Expression {
    return this._condition
  }

  get consequence(): Statement {
    return this._consequence
  }

  get alternative(): Statement | undefined {
    return this._alternative
  }
}
