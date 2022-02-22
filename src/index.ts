import * as _ from 'lodash'
import { evalExpression } from './evaluator'
import { Lexer } from './lexer'
import { LOWEST_PRECEDENCE, Parser } from './parser'

const DEBUG = false

console.log(_.join(['Hello', 'webpack'], ' '))

const history = document.getElementById('history') as HTMLDivElement
const prompt = document.getElementById('prompt') as HTMLInputElement

function printHistory(message: string): void {
  const p = document.createElement('p')
  p.textContent = message
  history?.appendChild(p)
}

function printHistoryAsDebug(message: string): void {
  if (DEBUG) {
    printHistory(`[DEBUG] ${message}`)
  }
}

prompt?.addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    const input = prompt.value
    printHistory(`> ${input}`)

    const lexer = new Lexer(input)
    try {
      while (lexer.hasNextToken()) {
        const token = lexer.nextToken()
        printHistoryAsDebug(JSON.stringify(token))
      }
    } catch (e) {
      if (e instanceof Error) {
        printHistory(`Lexer error. ${e.message}`)
      } else {
        throw e
      }
    }

    const parser = new Parser(new Lexer(input))
    try {
      const expression = parser.parseExpression(LOWEST_PRECEDENCE)
      printHistoryAsDebug(`AST: ${expression.toString()}`)

      const result = evalExpression(expression)
      printHistory(result.toString())
    } catch (e) {
      if (e instanceof Error) {
        printHistory(`Error: ${e.message}`)
      } else {
        throw e
      }
    }

    prompt.value = ''
  }
})
