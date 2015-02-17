var Expr = require('./expr');

function ExprBlock(scope, exprs) {
  Expr.call(this, 
    function retBlock(scope) {
      var exprScope = scope.createChild();
      var out = null;
      exprs.forEach(function(expr) {
        out = expr.eval(exprScope);
      });
      return out;
    },
    exprs
  );
}

module.exports = Expr.extend(ExprBlock);