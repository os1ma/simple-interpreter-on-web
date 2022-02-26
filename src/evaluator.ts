import {
  BooleanLiteral,
  Expression,
  Identifier,
  InfixExpression,
  IntegerLiteral,
  LetStatement,
  PrefixExpression,
  Statement
} from '../src/ast'

type Environment = { [key: string]: number }

export function evalStatement(
  statement: Statement,
  env: Environment
): number | undefined {
  if (statement instanceof LetStatement) {
    const value = evalExpression(statement.value, env)
    env[statement.identifier.literal] = value
    return undefined
  } else {
    const expression = statement as Expression
    return evalExpression(expression, env)
  }
}

export function evalExpression(expression: Expression, env: Environment): any {
  if (expression instanceof PrefixExpression) {
    return evalPrefixExpression(expression, env)
  } else if (expression instanceof InfixExpression) {
    return evalInfixExpression(expression, env)
  } else if (expression instanceof Identifier) {
    const literal = expression.token.literal
    const value = env[literal]
    if (!value) {
      throw new Error(`undefined identifier '${literal}'`)
    }
    return value
  } else if (expression instanceof IntegerLiteral) {
    const integerLiteral = expression as IntegerLiteral
    return integerLiteral.value
  } else if (expression instanceof BooleanLiteral) {
    const booleanLiteral = expression as BooleanLiteral
    return booleanLiteral.value
  } else {
    throw new Error(`Invalid expression. expression = ${expression}`)
  }
}

function evalPrefixExpression(
  expression: PrefixExpression,
  env: Environment
): number {
  const rightValue = evalExpression(expression.right, env)

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

function evalInfixExpression(
  expression: InfixExpression,
  env: Environment
): number {
  const leftValue = evalExpression(expression.left, env)
  const rightValue = evalExpression(expression.right, env)

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
