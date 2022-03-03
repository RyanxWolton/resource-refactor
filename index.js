const assert = require("assert")

const OperatorNode = (operator, left, right) => {
  const result = function() {
    switch (this.operator) {
      case "+":
        return left.result() + right.result();
      case "-":
        return left.result() - right.result();
      case "x":
        return left.result() * right.result();
      case "÷":
        return left.result() / right.result();
    }
  };

  const toString = function() {
    return `(${left.toString()} ${operator} ${right.toString()})`;
  };

  return {
    operator,
    result,
    toString
  }
};

const ValueNode = (value) => {
  const result = () => {
    return value;
  };

  const toString = () => {
    return value.toString();
  };

  return {
    result,
    toString
  }
};

const Value2 = ValueNode(2)
const Value3 = ValueNode(3)
const Value7 = ValueNode(7)
const Value6 = ValueNode(6)
const Value5 = ValueNode(5)
const SubtractNode = OperatorNode("-", Value3, Value2)
const MultiplyNode = OperatorNode("x", SubtractNode, Value5)
const AddNode = OperatorNode("+", Value7, MultiplyNode)
const tree = OperatorNode("÷", AddNode, Value6)

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());