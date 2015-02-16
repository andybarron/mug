function Expr(scope, eval) {
  this.scope = scope;
  this._eval = eval;
}

Expr.prototype = {
  eval: function eval(scope) {
    return this._eval(scope || this.scope);
  },
};

module.exports = Expr;