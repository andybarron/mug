function Fn(parentScope, params, expr, _custom) {
  if (!_custom) {
    this.parentScope = parentScope;
    this.params = params;
    this.expr = expr;
  } else {
    this._custom = _custom;
  }
}

Fn.prototype = {
  invoke: function invoke(args) {
    if (this._custom) return this._custom(args);
    if (args.length != this.params.length) {
      throw new Error("Function expected " + this.params.length +
        " arguments, received " + args.length);
    }
    var scope = this.parentScope.createChild();
    for (var i = 0; i < args.length; i++) {
      scope.registerId(this.params[i], args[i]);
    }
    return this.expr.eval(scope, true);
  },
  _print: function() {
    return "<" + this.params.length + "-arg fn>";
  },
};

module.exports = Fn;