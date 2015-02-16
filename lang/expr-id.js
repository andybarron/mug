var Expr = require('./expr');

function ExprId(scope, id, props) {
  return new Expr(
    scope,
    function retId(scope) {
      if (props.length == 0)
        return scope.resolveId(id);
      else
        throw new Error("UNIMPLEMENTED: Property get");
    }
  );
}

module.exports = ExprId;