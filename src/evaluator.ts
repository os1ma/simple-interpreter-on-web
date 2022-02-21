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
    return evalInfixExpression(expression)
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

function evalInfixExpression(expression: InfixExpression): number {
  const leftValue = evalExpression(expression.left)
  const rightValue = evalExpression(expression.right)

  const operatorType = expression.operator.type
  switch (operatorType) {
    case 'PLUS':
      return leftValue + rightValue
    case 'MINUS':
      return leftValue - rightValue
    case 'ASTERISK':
      return leftValue * rightValue
    case 'SLASH':
      return leftValue / rightValue
    default:
      throw new Error(
        `Unsupported operator type. operatorType = ${operatorType}`
      )
  }
}
