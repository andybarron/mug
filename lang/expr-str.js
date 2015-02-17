var Expr = require('./expr');

function ExprStr(str) {
  var out = str.replace(/(\\r)?\\n/, '\n');
  Expr.call(this, function retStr(scope) { return out; });
}

module.exports = Expr.extend(ExprStr);