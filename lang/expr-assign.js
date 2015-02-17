var Expr = require('./expr');

function ExprAssign(scope, id, props, rhs) {
  Expr.call(this, 
    function retAssign(scope) {
      if (props.length == 0) {
        var out = rhs.eval(scope);
        scope.assignId(id, out);
        return out;
      } else {
        throw new Error("UNIMPLEMENTED: Property set");
      }
    },
    [rhs]
  );
}

module.exports = Expr.extend(ExprAssign);