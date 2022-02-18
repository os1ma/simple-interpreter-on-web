import { Lexer } from '../src/lexer'
import { Token } from '../src/token'

describe('nextToken', () => {
  test('123', () => {
    const lexer = new Lexer('123')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('INTEGER', '123'))
    expect(lexer.hasNextToken()).toEqual(false)
  })

  test('++', () => {
    const lexer = new Lexer('++')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('PLUS', '+'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('PLUS', '+'))
    expect(lexer.hasNextToken()).toEqual(false)
  })

  test('10+2', () => {
    const lexer = new Lexer('10+2')
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('INTEGER', '10'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('PLUS', '+'))
    expect(lexer.hasNextToken()).toEqual(true)
    expect(lexer.nextToken()).toEqual(new Token('INTEGER', '2'))
    expect(lexer.hasNextToken()).toEqual(false)
  })
})
