var Expr = require('./expr');
var Fn = require('./fn');
var ExprId = require('./expr-id');

function ExprCall(scope, lexpr, argExprs) {
  Expr.call(this, 
    function callFn(scope) {
      var func = lexpr.eval(scope);
      var isFn = func instanceof Fn;
      if (!isFn) { throw new Error("Not callable"); }
      
      var args = argExprs.map(function(expr) {
        return expr.eval(scope);
      });
      return func.invoke(args);
    },
    argExprs,
    [lexpr]
  );
}

module.exports = Expr.extend(ExprCall);