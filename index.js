const assert = require("assert")

const Math = {
  OperatorNode: (operator, left, right) => Object.create({
    operations: {
      "+": (left, right) => left + right,
      "-": (left, right) => left - right,
      "x": (left, right) => left * right,
      "÷": (left, right) => left / right
     },
    result() {
      return this.operations[operator](left.result(), right.result())
    },
    toString() { 
      return `(${left.toString()} ${operator} ${right.toString()})` 
    }
  }),
  ValueNode: (value) => Object.create({
    result() { return value },
    toString() { return value.toString() }
  })
}

const Two = Math.ValueNode(2)
const Three = Math.ValueNode(3)
const Five = Math.ValueNode(5)
const Six = Math.ValueNode(6)
const Seven = Math.ValueNode(7)
const SubtractNode = Math.OperatorNode("-", Three, Two)
const MultiplyNode = Math.OperatorNode("x", SubtractNode, Five)
const SumNode = Math.OperatorNode("+", Seven, MultiplyNode)
const tree = Math.OperatorNode("÷", SumNode, Six)

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());