import { Lexer } from '../src/lexer'
import { Token } from '../src/token'

describe('nextToken', () => {
  test('123', () => {
    const lexer = new Lexer('123')
    expect(lexer.nextToken()).toEqual(new Token('INTEGER', '123'))
  })

  test('++', () => {
    const lexer = new Lexer('++')
    expect(lexer.nextToken()).toEqual(new Token('PLUS', '+'))
    expect(lexer.nextToken()).toEqual(new Token('PLUS', '+'))
  })

  test('10+2', () => {
    const lexer = new Lexer('10+2')
    expect(lexer.nextToken()).toEqual(new Token('INTEGER', '10'))
    expect(lexer.nextToken()).toEqual(new Token('PLUS', '+'))
    expect(lexer.nextToken()).toEqual(new Token('INTEGER', '2'))
  })
})
