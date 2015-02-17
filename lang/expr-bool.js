var Expr = require('./expr');

function ExprBool(scope, boolValue) {
  return new Expr(
    scope,
    function retBool(scope) {
      return boolValue;
    }
  );
}

module.exports = ExprBool;