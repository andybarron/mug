var Expr = require('./expr');

function ExprNum(scope, num) {
  return new Expr(scope, function retNum(scope) { return parseFloat(num); });
}

module.exports = ExprNum;