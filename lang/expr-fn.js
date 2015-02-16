var Expr = require('./expr');
var Fn = require('./fn');

function ExprFn(scope, params, exprs) {
  // TODO evaluate param names for duplicates
  return new Expr(
    scope,
    function retFn(scope) {
      return new Fn(
        scope,
        params,
        exprs
      );
    }
  );
}

module.exports = ExprFn;