var Expr = require('./expr');

function ExprMul(scope, a, b) {
  return new Expr(scope, function retMul(scope) { return a.eval(scope) * b.eval(scope); });
}

module.exports = ExprMul;