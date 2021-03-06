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
  'IDENTIFIER',
  'INTEGER',
  'TRUE',
  'FALSE',
  'PLUS',
  'MINUS',
  'ASTERISK',
  'SLASH',
  'PAREN_L',
  'PAREN_R',
  'BRACE_L',
  'BRACE_R',
  'NOT',
  'EQ',
  'NEQ',
  'LT',
  'GT',
  'LEQ',
  'GEQ',
  'LET',
  'ASSIGN',
  'IF',
  'ELSE'
] as const

export type TokenType = typeof tokenTypes[number]

export const keywordTokenTypes: { [key: string]: TokenType } = {
  true: 'TRUE',
  false: 'FALSE',
  let: 'LET',
  if: 'IF',
  else: 'ELSE'
}
