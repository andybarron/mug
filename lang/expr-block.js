var Expr = require('./expr');

function ExprBlock(scope, exprs) {
  // TODO evaluate param names for duplicates
  return new Expr(
    scope,
    function retBlock(scope, isFn) {
      var exprScope = isFn ? scope : scope.createChild();
      var out = null;
      exprs.forEach(function(expr) {
        out = expr.eval(exprScope);
      });
      return out;
    }
  );
}

module.exports = ExprBlock;