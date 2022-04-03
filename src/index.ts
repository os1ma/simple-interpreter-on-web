import { Interpreter } from './interpreter'

const interpreterElement = document.getElementById(
  'interpreter'
) as HTMLDListElement
const historyElement = document.getElementById('history') as HTMLDivElement
const promptElement = document.getElementById('prompt') as HTMLInputElement
const enableDebugLogCheckBoxElement = document.getElementById(
  'enable-debug-log-checkbox'
) as HTMLInputElement

interpreterElement.addEventListener('click', () => {
  promptElement.focus()
})

enableDebugLogCheckBoxElement.addEventListener('change', () => {
  interpreter.enableDebugLog = enableDebugLogCheckBoxElement.checked
  console.log(
    `log level changed. interpreter.enableDebugLog = ${interpreter.enableDebugLog}`
  )
})

function printHistory(message: string): void {
  const p = document.createElement('p')
  p.textContent = message
  historyElement?.appendChild(p)
}

const interpreter = new Interpreter((message) => printHistory(message))

promptElement?.addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    const input = promptElement.value

    interpreter.handle(input)

    promptElement.value = ''
  }
})
