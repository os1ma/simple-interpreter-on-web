import { evalStatement } from './evaluator'
import { Lexer } from './lexer'
import { Parser } from './parser'

export class Interpreter {
  enableDebugLog = false
  private environment = {}

  constructor(private onOutput: (message: string) => void) {}

  handle(input: string): void {
    this.onOutput(`> ${input}`)

    const lexer = new Lexer(input)
    try {
      while (lexer.hasNextToken()) {
        const token = lexer.nextToken()
        this.debugPrint(JSON.stringify(token))
      }
    } catch (e) {
      if (e instanceof Error) {
        this.onOutput(`Lexer error. ${e.message}`)
      } else {
        throw e
      }
    }

    const parser = new Parser(new Lexer(input))
    try {
      const statement = parser.parseStatement()
      this.debugPrint(`AST = ${JSON.stringify(statement)}`)

      const result = evalStatement(statement, this.environment)
      this.onOutput(result !== undefined ? result.toString() : 'undefined')
    } catch (e) {
      if (e instanceof Error) {
        this.onOutput(`Error: ${e.message}`)
      } else {
        throw e
      }
    }
  }

  private debugPrint(message: string) {
    if (this.enableDebugLog) {
      this.onOutput(`[DEBUG] ${message}`)
    }
  }
}
