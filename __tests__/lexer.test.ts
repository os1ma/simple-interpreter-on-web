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
      input: 'true',
      expected: [
        {
          tokenType: 'TRUE',
          literal: 'true'
        }
      ]
    },
    {
      input: 'false',
      expected: [
        {
          tokenType: 'FALSE',
          literal: 'false'
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
    },
    {
      input: '+-*/()',
      expected: [
        {
          tokenType: 'PLUS',
          literal: '+'
        },
        {
          tokenType: 'MINUS',
          literal: '-'
        },
        {
          tokenType: 'ASTERISK',
          literal: '*'
        },
        {
          tokenType: 'SLASH',
          literal: '/'
        },
        {
          tokenType: 'PAREN_L',
          literal: '('
        },
        {
          tokenType: 'PAREN_R',
          literal: ')'
        }
      ]
    },
    {
      input: 'abc(',
      expected: [
        {
          tokenType: 'IDENTIFIER',
          literal: 'abc'
        },
        {
          tokenType: 'PAREN_L',
          literal: '('
        }
      ]
    },
    {
      input: '!true',
      expected: [
        {
          tokenType: 'NOT',
          literal: '!'
        },
        {
          tokenType: 'TRUE',
          literal: 'true'
        }
      ]
    },
    {
      input: 'true == false',
      expected: [
        {
          tokenType: 'TRUE',
          literal: 'true'
        },
        {
          tokenType: 'EQ',
          literal: '=='
        },
        {
          tokenType: 'FALSE',
          literal: 'false'
        }
      ]
    },
    {
      input: 'true != false',
      expected: [
        {
          tokenType: 'TRUE',
          literal: 'true'
        },
        {
          tokenType: 'NEQ',
          literal: '!='
        },
        {
          tokenType: 'FALSE',
          literal: 'false'
        }
      ]
    },
    {
      input: '1 < 2 > 3 <= 4 >= 5',
      expected: [
        {
          tokenType: 'INTEGER',
          literal: '1'
        },
        {
          tokenType: 'LT',
          literal: '<'
        },
        {
          tokenType: 'INTEGER',
          literal: '2'
        },
        {
          tokenType: 'GT',
          literal: '>'
        },
        {
          tokenType: 'INTEGER',
          literal: '3'
        },
        {
          tokenType: 'LEQ',
          literal: '<='
        },
        {
          tokenType: 'INTEGER',
          literal: '4'
        },
        {
          tokenType: 'GEQ',
          literal: '>='
        },
        {
          tokenType: 'INTEGER',
          literal: '5'
        }
      ]
    },
    {
      input: 'let a = 123',
      expected: [
        {
          tokenType: 'LET',
          literal: 'let'
        },
        {
          tokenType: 'IDENTIFIER',
          literal: 'a'
        },
        {
          tokenType: 'ASSIGN',
          literal: '='
        },
        {
          tokenType: 'INTEGER',
          literal: '123'
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
