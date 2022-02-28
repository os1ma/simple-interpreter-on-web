import {
  BooleanLiteral,
  Expression,
  Identifier,
  IfExpression,
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
  } else if (expression instanceof IfExpression) {
    const ifExpression = expression as IfExpression
    const cond = evalExpression(ifExpression.condition, env)
    if (cond) {
      return evalStatement(ifExpression.consequence, env)
    } else {
      return evalStatement(ifExpression.alternative!, env)
    }
  } else if (expression === undefined) {
    return undefined
  } else {
    throw new Error(`Invalid expression. expression = ${expression}`)
  }
}

function evalPrefixExpression(
  expression: PrefixExpression,
  env: Environment
): any {
  const rightValue = evalExpression(expression.right, env)

  const operatorType = expression.operator.type
  switch (operatorType) {
    case 'PLUS':
      return rightValue
    case 'MINUS':
      return -rightValue
    case 'NOT':
      return !rightValue
    default:
      throw new Error(
        `Unsupported operator type. operatorType = ${operatorType}`
      )
  }
}

function evalInfixExpression(
  expression: InfixExpression,
  env: Environment
): any {
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
    case 'EQ':
      return leftValue === rightValue
    case 'NEQ':
      return leftValue !== rightValue
    case 'LT':
      return leftValue < rightValue
    case 'GT':
      return leftValue > rightValue
    case 'LEQ':
      return leftValue <= rightValue
    case 'GEQ':
      return leftValue >= rightValue
    default:
      throw new Error(
        `Unsupported operator type. operatorType = ${operatorType}`
      )
  }
}
