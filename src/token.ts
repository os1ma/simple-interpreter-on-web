export class Token {
  constructor(private _type: TokenType, private _literal: string) {}

  get type() {
    return this._type
  }

  get literal() {
    return this._literal
  }

  toString(): string {
    return this.literal
  }
}

const tokenTypes = [
  'INTEGER',
  'PLUS',
  'MINUS',
  'ASTERISK',
  'SLASH',
  'PAREN_L',
  'PAREN_R'
] as const

export type TokenType = typeof tokenTypes[number]
