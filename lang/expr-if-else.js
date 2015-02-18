var Expr = require('./expr');

function ExprIfElse(scope, predicates, blocks) {
  var valid =
    (predicates.length == blocks.length) ||
    (predicates.length == blocks.length-1);
  var children = [];
  blocks.forEach(function(block) {
    block.forEach(function(expr) {
      children.push(expr);
    });
  });
  if (!valid) throw new Error("Invalid if-else");
  Expr.call(this, 
    function retIfElse(scope) {
      var output = null;
      for (var i = 0; i < blocks.length; i++) {
        var localScope = scope.createChild();
        var doThis = (i == predicates.length) ||
            (predicates[i].eval(localScope));
        if (doThis) {
          var block = blocks[i];
          block.forEach(function(expr) {
            output = expr.eval(localScope);
          })
          break;
        }
      }
      return output;
    },
    children,
    predicates
  );
}

module.exports = Expr.extend(ExprIfElse);