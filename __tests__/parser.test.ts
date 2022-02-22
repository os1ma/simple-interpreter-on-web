import {
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
      input: 'a + 2',
      expected: new InfixExpression(
        new Identifier(new Token('IDENTIFIER', 'a')),
        new Token('PLUS', '+'),
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
