function Scope(parent, ids) {
  this.parent = parent;
  this.ids = ids || {};
};

Scope.prototype = {
  registerId: function(id, val) {
    if (id in this.ids) {
      throw new Error("Can't redefine identifier: " + id);
    } else {
      this.ids[id] = val;
    }
  },
  assignId: function(id, val) {
    if (id in this.ids) {
      this.ids[id] = val;
    } else if (this.parent) {
      return this.parent.assignId(id, val);
    } else {
      throw new Error("Can't reassign undeclared identifier: " + id);
    }
  },
  resolveId: function(id) {
    if (id in this.ids) {
      return this.ids[id];
    } else if (this.parent) {
      return this.parent.resolveId(id);
    } else {
      throw new Error("Use of undeclared identifier: " + id);
    }
  },
  clone: function() {
    var cloneIds = {};
    for (var prop in this.ids) {
      cloneIds[prop] = this.ids[prop];
    }
    return new Scope(this.parent, cloneIds);
  },
  createChild: function() {
    return new Scope(this.clone());
  },
};

module.exports = Scope;