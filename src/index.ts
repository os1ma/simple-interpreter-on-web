import { Interpreter } from './interpreter'

// prompt setting

const interpreterElement = document.getElementById(
  'interpreter'
) as HTMLDListElement

const promptElement = document.getElementById('prompt') as HTMLInputElement

interpreterElement.addEventListener('click', () => {
  promptElement.focus()
})

// enable-debug-log-checkbox setting

const enableDebugLogCheckBoxElement = document.getElementById(
  'enable-debug-log-checkbox'
) as HTMLInputElement

enableDebugLogCheckBoxElement.addEventListener('change', () => {
  interpreter.enableDebugLog = enableDebugLogCheckBoxElement.checked
  console.log(
    `log level changed. interpreter.enableDebugLog = ${interpreter.enableDebugLog}`
  )
})

// interpreter & history settings

const historyElement = document.getElementById('history') as HTMLDivElement

function printHistory(message: string): void {
  const p = document.createElement('p')
  p.textContent = message
  historyElement?.appendChild(p)
}

const interpreter = new Interpreter(printHistory)

promptElement?.addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    const input = promptElement.value

    interpreter.handle(input)

    promptElement.value = ''
  }
})
