var Expr = require('./expr');

function ExprCmp(scope, op, lhs, rhs) {
  return new Expr(
    scope,
    function retCmp(scope) {
      var a = lhs.eval(scope);
      var b = rhs.eval(scope);
      return {
        '=': a === b,
        '!=': a !== b,
        '<': a < b,
        '>': a > b,
        '<=': a <= b,
        '>=': a >= b,
      }[op]
    }
  );
}

module.exports = ExprCmp;