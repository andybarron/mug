var Expr = require('./expr');

function ExprSub(scope, a, b) {
  Expr.call(
    this,
    function retSub(scope) {
      return a.eval(scope) - b.eval(scope);
    },
    [a, b]
  );
}

module.exports = Expr.extend(ExprSub);