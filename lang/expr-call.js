var Expr = require('./expr');
var Fn = require('./fn');
var ExprId = require('./expr-id');

function ExprCall(scope, lexpr, argExprs) {
  Expr.call(this, 
    function callFn(scope) {
      var func = lexpr.eval(scope);
      var args = argExprs.map(function(expr) {
        return expr.eval(scope);
      });
      if (func instanceof Fn) {
        return func.invoke(args);
      } else {
        throw new Error("Not callable");
      }
    },
    argExprs,
    [lexpr]
  );
}

module.exports = Expr.extend(ExprCall);