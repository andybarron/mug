function Expr(eval, children, subexprs, validate) {
  this._eval = eval;
  this._children = children || null;
  this._subexprs = subexprs || null;
  this._customValid = validate || null;
}

Expr.prototype = {
  eval: function eval(scope) {
    if (!scope) throw new Error("Interpreter bug: Scope required");
    return this._eval(scope);
  },
  validate: function(parents) {
    if (this._customValid) {
      this._customValid(parents);
    }
    if (this._children) {
      var childParents = parents.concat(this);
      this._children.forEach(function(child) {
        child.validate(childParents);
      });
    }
    if (this._subexprs) {
      this._subexprs.forEach(function(subexpr) {
        subexpr.validate(parents);
      });
    }
  },
};

Expr.extend = function(fn) {
  fn.prototype = new Expr();
  return fn;
}

module.exports = Expr;