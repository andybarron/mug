var Expr = require('./expr');

function ExprWhile(scope, predicate, block) {
  Expr.call(this, 
    function retWhile(scope) {
      var output = null;
      var localScope = scope.createChild();
      while (true) {
        var keepGoing = predicate.eval(localScope);
        if (!keepGoing) break;
        block.forEach(function(expr) {
          output = expr.eval(localScope);
        });
      }
      return output;
    },
    block,
    [predicate]
  );
}

module.exports = Expr.extend(ExprWhile);