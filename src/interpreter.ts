import { evalStatement } from './evaluator'
import { Lexer } from './lexer'
import { Parser } from './parser'

export class Interpreter {
  enableDebugLog = false
  private environment = {}

  constructor(private onOutput: (message: string) => void) {}

  handle(input: string): void {
    this.onOutput(`> ${input}`)

    try {
      const parser = new Parser(new Lexer(input))
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
