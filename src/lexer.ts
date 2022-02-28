import { keywordTokenTypes, Token } from './token'

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
    const peeked = this.peekChar()
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
        token = new Token('PAREN_L', char)
        break
      case ')':
        token = new Token('PAREN_R', char)
        break
      case '=':
        if (peeked === '=') {
          token = new Token('EQ', char + peeked)
          this.next()
        } else {
          token = new Token('ASSIGN', char)
        }
        break
      case '!':
        if (peeked === '=') {
          token = new Token('NEQ', char + peeked)
          this.next()
        } else {
          token = new Token('NOT', char)
        }
        break
      case '<':
        if (peeked === '=') {
          token = new Token('LEQ', char + peeked)
          this.next()
        } else {
          token = new Token('LT', char)
        }
        break
      case '>':
        if (peeked === '=') {
          token = new Token('GEQ', char + peeked)
          this.next()
        } else {
          token = new Token('GT', char)
        }
        break
      default:
        if (this.isLetter(char)) {
          const word = this.readWord()
          const tokenType = keywordTokenTypes[word] || 'IDENTIFIER'
          token = new Token(tokenType, word)
        } else if (this.isDigit(char)) {
          token = new Token('INTEGER', this.readInteger())
        } else {
          throw new Error(`Invalid character '${char}'.`)
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

  private peekChar(): string | undefined {
    return this.input[this.currentPosition + 1]
  }

  private next() {
    this.currentPosition++
  }

  private isLetter(char: string): boolean {
    return ('a' <= char && char <= 'z') || ('A' <= char && char <= 'Z')
  }

  private readWord(): string {
    return this.readChars(this.isLetter)
  }

  private isDigit(char: string): boolean {
    return digits.includes(char)
  }

  private readInteger(): string {
    return this.readChars(this.isDigit)
  }

  private readChars(conditionFunction: (char: string) => boolean) {
    const startPosition = this.currentPosition

    let nextChar = this.input[this.currentPosition + 1]
    while (conditionFunction(nextChar)) {
      this.next()
      nextChar = this.input[this.currentPosition + 1]
    }

    const endPosition = this.currentPosition
    return this.input.slice(startPosition, endPosition + 1)
  }
}
