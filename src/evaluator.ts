import {
  Expression,
  InfixExpression,
  IntegerLiteral,
  PrefixExpression
} from '../src/ast'

export function evalExpression(expression: Expression): number {
  if (expression instanceof PrefixExpression) {
    throw new Error(`Not implemented.`)
  } else if (expression instanceof InfixExpression) {
    throw new Error(`Not implemented.`)
  } else if (expression instanceof IntegerLiteral) {
    const integerLiteral = expression as IntegerLiteral
    return integerLiteral.value
  } else {
    throw new Error(`Invalid expression. expression = ${expression}`)
  }
}
