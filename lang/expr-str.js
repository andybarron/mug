var Expr = require('./expr');

function ExprStr(scope, str) {
  var out = str.replace(/(\\r)?\\n/, '\n');
  return new Expr(scope, function retStr(scope) { return out; });
}

module.exports = ExprStr;