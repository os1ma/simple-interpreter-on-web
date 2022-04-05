import { Interpreter } from '../src/interpreter'

describe('handle', () => {
  // test helper
  const runInterpreter = (input: string, enableDebugLog = false) => {
    const outputs: string[] = []
    const interpreter = new Interpreter((message) => {
      outputs.push(message)
    })
    interpreter.enableDebugLog = enableDebugLog
    interpreter.handle(input)
    return outputs
  }

  test('valid input', () => {
    const input = 'let a = if (true) { 1 } else { 2 }'
    expect(runInterpreter(input)).toEqual([`> ${input}`, 'undefined'])
  })

  test('Lexer Error', () => {
    const input = '$'
    expect(runInterpreter(input)).toEqual([
      `> ${input}`,
      "Error: Invalid character '$'."
    ])
  })

  test('Parser error', () => {
    const input = 'let 1'
    expect(runInterpreter(input)).toEqual([
      `> ${input}`,
      'Error: let statement must need identifier but got 1'
    ])
  })

  test('debug log', () => {
    const input = '1'
    expect(runInterpreter(input, true)).toEqual([
      `> ${input}`,
      '[DEBUG] AST = {"_token":{"_type":"INTEGER","_literal":"1"},"_value":1}',
      '1'
    ])
  })
})
