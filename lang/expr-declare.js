var Expr = require('./expr');

function ExprDeclare(scope, id, rhs) {
  Expr.call(this, 
    function retDeclare(scope) {
      var out = rhs.eval(scope);
      scope.registerId(id, out);
      return out;
    },
    [rhs]
  );
}

module.exports = Expr.extend(ExprDeclare);