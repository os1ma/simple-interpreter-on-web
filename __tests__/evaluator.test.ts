import { evalExpression } from '../src/evaluator'
import { Lexer } from '../src/lexer'
import { LOWEST_PRECEDENCE, Parser } from '../src/parser'

describe('evalExpression', () => {
  type TestCase = { input: string; expected: number }

  const testCases: TestCase[] = [
    {
      input: '1',
      expected: 1
    },
    {
      input: '+1',
      expected: 1
    },
    {
      input: '-1',
      expected: -1
    },
    {
      input: '1 + 2',
      expected: 3
    },
    {
      input: '1 - 2',
      expected: -1
    },
    {
      input: '2 * 3',
      expected: 6
    },
    {
      input: '4 / 2',
      expected: 2
    },
    {
      input: '2 + 3 * 4',
      expected: 14
    },
    {
      input: '2 * 3 + 4',
      expected: 10
    },
    {
      input: '3 * (4 + 5)',
      expected: 27
    }
  ]

  testCases.forEach((testCase) => {
    test(testCase.input, () => {
      const lexer = new Lexer(testCase.input)
      const parser = new Parser(lexer)
      const expression = parser.parseExpression(LOWEST_PRECEDENCE)
      const actual = evalExpression(expression)

      expect(actual).toEqual(testCase.expected)
    })
  })
})
