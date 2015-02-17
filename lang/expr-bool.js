var Expr = require('./expr');

function ExprBool(boolValue) {
  Expr.call(this, 
    function retBool(scope) {
      return boolValue;
    }
  );
}

module.exports = Expr.extend(ExprBool);