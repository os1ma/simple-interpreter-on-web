import {
  Expression,
  InfixExpression,
  IntegerLiteral,
  PrefixExpression
} from '../src/ast'
import { Lexer } from '../src/lexer'
import { Parser } from '../src/parser'
import { Token } from '../src/token'

describe('parseExpression', () => {
  type TestCase = {
    input: string
    expected: Expression
  }

  const testCases: TestCase[] = [
    {
      input: '1',
      expected: new IntegerLiteral(new Token('INTEGER', '1'), 1)
    },
    {
      input: '2 + 3',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '2'), 2),
        new Token('PLUS', '+'),
        new IntegerLiteral(new Token('INTEGER', '3'), 3)
      )
    },
    {
      input: '2 * 3',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '2'), 2),
        new Token('ASTERISK', '*'),
        new IntegerLiteral(new Token('INTEGER', '3'), 3)
      )
    },
    {
      input: '-1',
      expected: new PrefixExpression(
        new Token('MINUS', '-'),
        new IntegerLiteral(new Token('INTEGER', '1'), 1)
      )
    }
  ]

  testCases.forEach((testCase) => {
    test(testCase.input, () => {
      const lexer = new Lexer(testCase.input)
      const parser = new Parser(lexer)
      expect(parser.parseExpression()).toEqual(testCase.expected)
    })
  })
})
