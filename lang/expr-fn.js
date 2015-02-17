var Expr = require('./expr');
var Fn = require('./fn');

function ExprFn(scope, params, exprs) {
  // TODO evaluate param names for duplicates
  Expr.call(this, 
    function retFn(scope) {
      return new Fn(
        scope,
        params,
        exprs
      );
    },
    exprs
  );
}

module.exports = Expr.extend(ExprFn);