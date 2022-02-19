import { Lexer } from '../src/lexer'
import { Token, TokenType } from '../src/token'

describe('nextToken', () => {
  type TestCase = {
    input: string
    expected: {
      tokenType: TokenType
      literal: string
    }[]
  }

  const testCases: TestCase[] = [
    {
      input: '123',
      expected: [
        {
          tokenType: 'INTEGER',
          literal: '123'
        }
      ]
    },
    {
      input: '++',
      expected: [
        {
          tokenType: 'PLUS',
          literal: '+'
        },
        {
          tokenType: 'PLUS',
          literal: '+'
        }
      ]
    },
    {
      input: '10+2',
      expected: [
        {
          tokenType: 'INTEGER',
          literal: '10'
        },
        {
          tokenType: 'PLUS',
          literal: '+'
        },
        {
          tokenType: 'INTEGER',
          literal: '2'
        }
      ]
    },
    {
      input: ' 1\t + 2  ',
      expected: [
        {
          tokenType: 'INTEGER',
          literal: '1'
        },
        {
          tokenType: 'PLUS',
          literal: '+'
        },
        {
          tokenType: 'INTEGER',
          literal: '2'
        }
      ]
    }
  ]

  testCases.forEach((testCase) => {
    test(testCase.input, () => {
      const lexer = new Lexer(testCase.input)

      testCase.expected.forEach((expectedElemennt) => {
        expect(lexer.hasNextToken()).toEqual(true)
        const expectedToken = new Token(
          expectedElemennt.tokenType,
          expectedElemennt.literal
        )
        expect(lexer.nextToken()).toEqual(expectedToken)
      })

      expect(lexer.hasNextToken()).toEqual(false)
    })
  })
})
