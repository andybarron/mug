var Expr = require('./expr');

function ExprDeclare(scope, id, props, rhs) {
  return new Expr(
    scope,
    function retDeclare(scope) {
      if (props.length == 0) {
        var out = rhs.eval(scope);
        scope.registerId(id, out);
        return out;
      } else {
        throw new Error("UNIMPLEMENTED: Property set");
      }
    }
  );
}

module.exports = ExprDeclare;