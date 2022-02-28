import {
  BooleanLiteral,
  Expression,
  Identifier,
  InfixExpression,
  IntegerLiteral,
  LetStatement,
  PrefixExpression
} from '../src/ast'
import { Lexer } from '../src/lexer'
import { LOWEST_PRECEDENCE, Parser } from '../src/parser'
import { Token } from '../src/token'

describe('parseLetStatement', () => {
  test('let a = 123', () => {
    const input = 'let a = 123'
    const lexer = new Lexer(input)
    const parser = new Parser(lexer)

    const actual = parser.parseLetStatement()
    const expected = new LetStatement(
      new Token('LET', 'let'),
      new Token('IDENTIFIER', 'a'),
      new IntegerLiteral(new Token('INTEGER', '123'), 123)
    )

    expect(actual).toEqual(expected)
    expect(lexer.hasNextToken()).toEqual(false)
  })
})

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
      input: '2 - 3',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '2'), 2),
        new Token('MINUS', '-'),
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
      input: '2 / 3',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '2'), 2),
        new Token('SLASH', '/'),
        new IntegerLiteral(new Token('INTEGER', '3'), 3)
      )
    },
    {
      input: '+1',
      expected: new PrefixExpression(
        new Token('PLUS', '+'),
        new IntegerLiteral(new Token('INTEGER', '1'), 1)
      )
    },
    {
      input: '-1',
      expected: new PrefixExpression(
        new Token('MINUS', '-'),
        new IntegerLiteral(new Token('INTEGER', '1'), 1)
      )
    },
    {
      input: '(3 + 4)',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '3'), 3),
        new Token('PLUS', '+'),
        new IntegerLiteral(new Token('INTEGER', '4'), 4)
      )
    },
    {
      input: '1 + 2 * 3',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '1'), 1),
        new Token('PLUS', '+'),
        new InfixExpression(
          new IntegerLiteral(new Token('INTEGER', '2'), 2),
          new Token('ASTERISK', '*'),
          new IntegerLiteral(new Token('INTEGER', '3'), 3)
        )
      )
    },
    {
      input: '1 * 2 + 3',
      expected: new InfixExpression(
        new InfixExpression(
          new IntegerLiteral(new Token('INTEGER', '1'), 1),
          new Token('ASTERISK', '*'),
          new IntegerLiteral(new Token('INTEGER', '2'), 2)
        ),
        new Token('PLUS', '+'),
        new IntegerLiteral(new Token('INTEGER', '3'), 3)
      )
    },
    {
      input: '1 * (2 + 3)',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '1'), 1),
        new Token('ASTERISK', '*'),
        new InfixExpression(
          new IntegerLiteral(new Token('INTEGER', '2'), 2),
          new Token('PLUS', '+'),
          new IntegerLiteral(new Token('INTEGER', '3'), 3)
        )
      )
    },
    {
      input: '1 * (2 + 3) + 4',
      expected: new InfixExpression(
        new InfixExpression(
          new IntegerLiteral(new Token('INTEGER', '1'), 1),
          new Token('ASTERISK', '*'),
          new InfixExpression(
            new IntegerLiteral(new Token('INTEGER', '2'), 2),
            new Token('PLUS', '+'),
            new IntegerLiteral(new Token('INTEGER', '3'), 3)
          )
        ),
        new Token('PLUS', '+'),
        new IntegerLiteral(new Token('INTEGER', '4'), 4)
      )
    },
    {
      input: 'a',
      expected: new Identifier(new Token('IDENTIFIER', 'a'))
    },
    {
      input: 'a + 2',
      expected: new InfixExpression(
        new Identifier(new Token('IDENTIFIER', 'a')),
        new Token('PLUS', '+'),
        new IntegerLiteral(new Token('INTEGER', '2'), 2)
      )
    },
    {
      input: 'true',
      expected: new BooleanLiteral(new Token('TRUE', 'true'), true)
    },
    {
      input: 'false',
      expected: new BooleanLiteral(new Token('FALSE', 'false'), false)
    },
    {
      input: '!true',
      expected: new PrefixExpression(
        new Token('NOT', '!'),
        new BooleanLiteral(new Token('TRUE', 'true'), true)
      )
    },
    {
      input: 'true == true',
      expected: new InfixExpression(
        new BooleanLiteral(new Token('TRUE', 'true'), true),
        new Token('EQ', '=='),
        new BooleanLiteral(new Token('TRUE', 'true'), true)
      )
    },
    {
      input: 'true != true',
      expected: new InfixExpression(
        new BooleanLiteral(new Token('TRUE', 'true'), true),
        new Token('NEQ', '!='),
        new BooleanLiteral(new Token('TRUE', 'true'), true)
      )
    },
    {
      input: '1 < 2',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '1'), 1),
        new Token('LT', '<'),
        new IntegerLiteral(new Token('INTEGER', '2'), 2)
      )
    },
    {
      input: '1 > 2',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '1'), 1),
        new Token('GT', '>'),
        new IntegerLiteral(new Token('INTEGER', '2'), 2)
      )
    },
    {
      input: '1 <= 2',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '1'), 1),
        new Token('LEQ', '<='),
        new IntegerLiteral(new Token('INTEGER', '2'), 2)
      )
    },
    {
      input: '1 >= 2',
      expected: new InfixExpression(
        new IntegerLiteral(new Token('INTEGER', '1'), 1),
        new Token('GEQ', '>='),
        new IntegerLiteral(new Token('INTEGER', '2'), 2)
      )
    }
  ]

  testCases.forEach((testCase) => {
    test(testCase.input, () => {
      const lexer = new Lexer(testCase.input)
      const parser = new Parser(lexer)

      const actual = parser.parseExpression(LOWEST_PRECEDENCE)
      expect(actual).toEqual(testCase.expected)
      expect(lexer.hasNextToken()).toEqual(false)
    })
  })
})
