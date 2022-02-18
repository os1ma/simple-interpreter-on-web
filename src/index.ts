import * as _ from 'lodash'
import { Lexer } from './lexer'

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

    while (lexer.hasNextToken()) {
      const token = lexer.nextToken()

      const pOutput = document.createElement('p')
      pOutput.textContent = JSON.stringify(token)
      history?.appendChild(pOutput)
    }

    prompt.value = ''
  }
})
