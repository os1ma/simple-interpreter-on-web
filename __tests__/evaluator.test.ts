import { evalExpression, evalStatement } from '../src/evaluator'
import { Lexer } from '../src/lexer'
import { LOWEST_PRECEDENCE, Parser } from '../src/parser'

describe('evalStatement', () => {
  type TestCase = {
    inputs: string[]
    expected: any[]
  }

  const testCases: TestCase[] = [
    {
      inputs: ['let a = 5', 'a * 2'],
      expected: [undefined, 10]
    }
  ]

  testCases.forEach((testCase) => {
    const testName = testCase.inputs.reduce((l, r) => `${l}; ${r}`)
    test(testName, () => {
      const env = {}

      testCase.inputs.forEach((input, index) => {
        const lexer = new Lexer(input)
        const parser = new Parser(lexer)
        const statement = parser.parseStatement()

        const actual = evalStatement(statement, env)
        const expected = testCase.expected[index]
        expect(actual).toEqual(expected)
      })
    })
  })
})

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
      const actual = evalExpression(expression, {})

      expect(actual).toEqual(testCase.expected)
    })
  })
})
