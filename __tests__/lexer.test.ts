import { Lexer } from '../src/lexer'
import { Token } from '../src/token'

describe('nextToken', () => {
  test('return INTEGER', () => {
    const lexer = new Lexer('123')
    expect(lexer.nextToken()).toEqual(new Token('INTEGER', '123'))
  })
})
