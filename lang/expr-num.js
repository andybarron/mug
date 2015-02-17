var Expr = require('./expr');

function ExprNum(num) {
  Expr.call(this, function retNum(scope) { return parseFloat(num); });
}

module.exports = Expr.extend(ExprNum);