import { Token } from './token'

export class Lexer {
  constructor(private input: string) {}

  nextToken(): Token {
    return new Token('INTEGER', this.input)
  }
}
