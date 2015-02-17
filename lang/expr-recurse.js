var Expr = require('./expr');
var ExprFn = require('./expr-fn');

function ExprRecurse(scope, argExprs) {
  this.parentExprFn = null;
  Expr.call(
    this,
    function recurse(scope) {
      var args = argExprs.map(function(expr) {
        return expr.eval(scope);
      });
      return this.parentExprFn.eval(scope).invoke(args);
    },
    argExprs,
    null,
    function validateRecurse(parents) {
      for (var i = parents.length-1; i >= 0; i--) {
        var parent = parents[i];
        if (parent instanceof ExprFn) {
          this.parentExprFn = parent;
          return;
        }
      }
      throw new Error("Recurse expression outside of function");
    }
  );
}

module.exports = Expr.extend(ExprRecurse);