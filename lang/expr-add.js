var Expr = require('./expr');

function ExprAdd(scope, a, b) {
  Expr.call(this, 
    function retAdd(scope) {
      return a.eval(scope) + b.eval(scope);
    },
    [a, b]
  );
}

module.exports = Expr.extend(ExprAdd);