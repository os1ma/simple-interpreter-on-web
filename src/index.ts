import * as _ from 'lodash'

console.log(_.join(['Hello', 'webpack'], ' '))

const history = document.getElementById('history') as HTMLDivElement
const prompt = document.getElementById('prompt') as HTMLInputElement

prompt?.addEventListener('keypress', (event) => {
  if (event.key == 'Enter') {
    const p = document.createElement('p')
    p.textContent = prompt.value

    history?.appendChild(p)

    prompt.value = ''
  }
})
