var Expr = require('./expr');

function ExprAdd(scope, a, b) {
  return new Expr(scope, function retAdd(scope) { return a.eval(scope) + b.eval(scope); });
}

module.exports = ExprAdd;