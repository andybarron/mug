var Expr = require('./expr');

function ExprCmp(scope, op, lhs, rhs) {
  Expr.call(this, 
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
    },
    [lhs, rhs]
  );
}

module.exports = Expr.extend(ExprCmp);