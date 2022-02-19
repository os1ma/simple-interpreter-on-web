export class Token {
  constructor(private _type: TokenType, private _literal: string) {}

  get type() {
    return this._type
  }

  get literal() {
    return this._literal
  }
}

const tokenTypes = ['INTEGER', 'PLUS'] as const

export type TokenType = typeof tokenTypes[number]
