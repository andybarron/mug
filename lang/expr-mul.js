var Expr = require('./expr');

function ExprMul(scope, a, b) {
  Expr.call(this, 
    function retMul(scope) {
      return a.eval(scope) * b.eval(scope);
    },
    [a, b]
  );
}

module.exports = Expr.extend(ExprMul);