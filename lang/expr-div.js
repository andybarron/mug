var Expr = require('./expr');

function ExprDiv(scope, a, b) {
  Expr.call(this, 
    function retDiv(scope) {
      return a.eval(scope) / b.eval(scope);
    },
    [a, b]
  );
}

module.exports = Expr.extend(ExprDiv);