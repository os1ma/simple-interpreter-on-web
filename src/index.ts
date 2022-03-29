import { evalStatement } from './evaluator'
import { Lexer } from './lexer'
import { Parser } from './parser'

var ENABLE_DEBUG_LOG = false

const environment = {}

const interpreter = document.getElementById('interpreter') as HTMLDListElement
const history = document.getElementById('history') as HTMLDivElement
const prompt = document.getElementById('prompt') as HTMLInputElement
const enableDebugLogCheckBox = document.getElementById(
  'enable-debug-log-checkbox'
) as HTMLInputElement

interpreter.addEventListener('click', () => {
  prompt.focus()
})

enableDebugLogCheckBox.addEventListener('change', () => {
  ENABLE_DEBUG_LOG = enableDebugLogCheckBox.checked
  console.log(`log level changed. ENABLE_DEBUG_LOG = ${ENABLE_DEBUG_LOG}`)
})

function printHistory(message: string): void {
  const p = document.createElement('p')
  p.textContent = message
  history?.appendChild(p)
}

function printHistoryAsDebug(message: string): void {
  if (ENABLE_DEBUG_LOG) {
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
