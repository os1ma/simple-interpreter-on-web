import { IntegerLiteral } from '../src/ast'
import { Lexer } from '../src/lexer'
import { Parser } from '../src/parser'
import { Token } from '../src/token'

describe('parseExpression', () => {
  test('1', () => {
    const lexer = new Lexer('1')
    const parser = new Parser(lexer)

    const expected = new IntegerLiteral(new Token('INTEGER', '1'), 1)
    expect(parser.parseExpression()).toEqual(expected)
  })
})
