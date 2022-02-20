import { Token } from './token'

const spaces = [' ', '\t']
const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

export class Lexer {
  private currentPosition = 0

  constructor(private input: string) {}

  hasNextToken(): boolean {
    return this.currentPosition < this.input.length
  }

  nextToken(): Token {
    let token: Token

    this.skipSpaces()

    const char = this.currentChar()
    switch (char) {
      case '+':
        token = new Token('PLUS', char)
        break
      case '-':
        token = new Token('MINUS', char)
        break
      case '*':
        token = new Token('ASTERISK', char)
        break
      case '/':
        token = new Token('SLASH', char)
        break
      case '(':
        token = new Token('PARAN_L', char)
        break
      case ')':
        token = new Token('PARAN_R', char)
        break
      default:
        if (this.isDigit(char)) {
          token = new Token('INTEGER', this.readInteger())
        } else {
          throw new Error(`Invalid char '${char}'.`)
        }
    }
    this.next()

    // input の末尾にスペースがある場合に対応するため、
    // nextToken の処理の最後でもスペースをスキップする
    this.skipSpaces()

    return token
  }

  private skipSpaces(): void {
    while (spaces.includes(this.currentChar())) {
      this.next()
    }
  }

  private currentChar(): string {
    return this.input[this.currentPosition]
  }

  private next() {
    this.currentPosition++
  }

  private isDigit(char: string): boolean {
    return digits.includes(char)
  }

  private readInteger(): string {
    const startPosition = this.currentPosition

    let nextChar = this.input[this.currentPosition + 1]
    while (this.isDigit(nextChar)) {
      this.next()
      nextChar = this.input[this.currentPosition + 1]
    }

    const endPosition = this.currentPosition
    return this.input.slice(startPosition, endPosition + 1)
  }
}
