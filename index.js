const assert = require("assert")

const Math = {
  OperatorNode: (operator, left, right) => ({
    result() {
      const leftResult = left.result()
      const rightResult = right.result()
      switch (operator) {
        case "+":
          return leftResult + rightResult;
        case "-":
          return leftResult - rightResult;
        case "x":
          return leftResult * rightResult;
        case "÷":
          return leftResult / rightResult;
      }
    },
    toString() { 
      return `(${left.toString()} ${operator} ${right.toString()})` 
    }
  }),
  ValueNode: (value) => ({
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