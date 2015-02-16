var Expr = require('./expr');

function ExprAssign(scope, id, props, rhs) {
  return new Expr(
    scope,
    function retAssign(scope) {
      if (props.length == 0) {
        var out = rhs.eval();
        scope.assignId(id, out);
        return out;
      } else {
        throw new Error("UNIMPLEMENTED: Property set");
      }
    }
  );
}

module.exports = ExprAssign;