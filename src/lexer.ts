import { Token } from './token'

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export class Lexer {
  private currentPosition = 0

  constructor(private input: string) {}

  hasNextToken(): boolean {
    return true
  }

  nextToken(): Token {
    let token: Token
    const char = this.currentChar()
    switch (char) {
      case '+':
        token = new Token('PLUS', char)
        break
      default:
        token = new Token('INTEGER', this.readInteger())
    }
    this.next()
    return token
  }

  private currentChar(): string {
    return this.input[this.currentPosition]
  }

  private next() {
    this.currentPosition++
  }

  private readInteger(): string {
    const startPosition = this.currentPosition

    let nextChar = this.input[this.currentPosition + 1]
    while (digits.includes(nextChar)) {
      this.next()
      nextChar = this.input[this.currentPosition + 1]
    }

    const endPosition = this.currentPosition
    return this.input.slice(startPosition, endPosition + 1)
  }
}
