var Expr = require('./expr');

function ExprDiv(scope, a, b) {
  return new Expr(scope, function retDiv(scope) { return a.eval(scope) / b.eval(scope); });
}

module.exports = ExprDiv;