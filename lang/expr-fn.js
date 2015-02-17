var Expr = require('./expr');
var Fn = require('./fn');

function ExprFn(scope, params, exprs) {
  // TODO evaluate param names for duplicates
  this.fn = null;
  Expr.call(this, 
    function retFn(scope) {
      if (!this.fn) {
        this.fn = new Fn(scope, params, exprs);
      }
      return this.fn;
    },
    exprs
  );
}

module.exports = Expr.extend(ExprFn);