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
