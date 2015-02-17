function Fn(parentScope, params, block, _custom) {
  if (!_custom) {
    this.parentScope = parentScope;
    this.params = params;
    this.exprs = block;
  } else {
    this._custom = _custom;
  }
}

Fn.prototype = {
  invoke: function invoke(args, scope) {
    if (this._custom) return this._custom(args);
    if (args.length != this.params.length) {
      throw new Error("Function expected " + this.params.length +
        " arguments, received " + args.length);
    }
    var scope = this.parentScope.createChild();
    for (var i = 0; i < args.length; i++) {
      scope.registerId(this.params[i], args[i]);
    }
    var output = null;
    this.exprs.forEach(function(expr) {
      output = expr.eval(scope)
    })
    return output;
  },
  _print: function() {
    return "<" + this.params.length + "-arg fn>";
  },
};

module.exports = Fn;