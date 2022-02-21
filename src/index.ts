import * as _ from 'lodash'
import { evalExpression } from './evaluator'
import { Lexer } from './lexer'
import { LOWEST_PRECEDENCE, Parser } from './parser'

console.log(_.join(['Hello', 'webpack'], ' '))

const history = document.getElementById('history') as HTMLDivElement
const prompt = document.getElementById('prompt') as HTMLInputElement

prompt?.addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    const input = prompt.value

    const pInput = document.createElement('p')
    pInput.textContent = `> ${input}`
    history?.appendChild(pInput)

    const lexer = new Lexer(input)
    try {
      while (lexer.hasNextToken()) {
        const token = lexer.nextToken()

        const pOutput = document.createElement('p')
        pOutput.textContent = JSON.stringify(token)
        history?.appendChild(pOutput)
      }
    } catch (e) {
      if (e instanceof Error) {
        const pError = document.createElement('p')
        pError.textContent = e.message
        history?.appendChild(pError)
      } else {
        throw e
      }
    }

    const parser = new Parser(new Lexer(input))
    try {
      const expression = parser.parseExpression(LOWEST_PRECEDENCE)

      const pOutput = document.createElement('p')
      pOutput.textContent = expression.toString()
      history?.appendChild(pOutput)

      const result = evalExpression(expression)
      const pResult = document.createElement('p')
      pResult.textContent = result.toString()
      history?.appendChild(pResult)
    } catch (e) {
      if (e instanceof Error) {
        const pError = document.createElement('p')
        pError.textContent = e.message
        history?.appendChild(pError)
      } else {
        throw e
      }
    }

    prompt.value = ''
  }
})
