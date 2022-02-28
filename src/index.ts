import * as _ from 'lodash'
import { evalStatement } from './evaluator'
import { Lexer } from './lexer'
import { Parser } from './parser'

const DEBUG = false

const environment = {}

console.log(_.join(['Hello', 'webpack'], ' '))

const interpreter = document.getElementById('interpreter') as HTMLDListElement
const history = document.getElementById('history') as HTMLDivElement
const prompt = document.getElementById('prompt') as HTMLInputElement

interpreter.addEventListener('click', () => {
  prompt.focus()
})

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
      const statement = parser.parseStatement()
      printHistoryAsDebug(`AST: ${statement}`)

      const result = evalStatement(statement, environment)
      printHistory(result !== undefined ? result.toString() : 'undefined')
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
