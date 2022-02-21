import {
  Expression,
  InfixExpression,
  IntegerLiteral,
  PrefixExpression
} from '../src/ast'

export function evalExpression(expression: Expression): number {
  if (expression instanceof PrefixExpression) {
    return evalPrefixExpression(expression)
  } else if (expression instanceof InfixExpression) {
    throw new Error(`Not implemented.`)
  } else if (expression instanceof IntegerLiteral) {
    const integerLiteral = expression as IntegerLiteral
    return integerLiteral.value
  } else {
    throw new Error(`Invalid expression. expression = ${expression}`)
  }
}

function evalPrefixExpression(expression: PrefixExpression): number {
  const rightValue = evalExpression(expression.right)

  const operatorType = expression.operator.type
  switch (operatorType) {
    case 'PLUS':
      return rightValue
    case 'MINUS':
      return -rightValue
    default:
      throw new Error(
        `Unsupported operator type. operatorType = ${operatorType}`
      )
  }
}
