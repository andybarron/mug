var Expr = require('./expr');

function ExprIfElse(scope, predicates, exprs) {
  var valid =
    (predicates.length == exprs.length) ||
    (predicates.length == exprs.length-1);
  if (!valid) throw new Error("Invalid if-else");
  Expr.call(this, 
    function retIfElse(scope) {
      var output = null;
      // TODO create local scope for these?
      for (var i = 0; i < exprs.length; i++) {
        var doThis = (i == predicates.length) ||
            (predicates[i].eval(scope));
        if (doThis) {
          output = exprs[i].eval(scope);
          break;
        }
      }
      return output;
    },
    exprs,
    predicates
  );
}

module.exports = Expr.extend(ExprIfElse);