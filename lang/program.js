var expr = require('./expr');

function Program(exprs) {
  this.exprs = exprs;
}

Program.prototype = {
  validate: function() {
    var self = this;
    this.exprs.forEach(function(expr) {
      expr.validate([self]);
    });
  },
  run: function(scope) {
    var out = null;
    this.exprs.forEach(function(expr) {
      out = expr.eval(scope);
    });
    return out;
  }
}

module.exports = Program;