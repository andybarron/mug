var Expr = require('./expr');

function ExprSub(scope, a, b) {
  return new Expr(scope, function retSub(scope) { return a.eval(scope) - b.eval(scope); });
}

module.exports = ExprSub;