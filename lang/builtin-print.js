var Fn = require('./fn');

module.exports = new Fn(null, null, null, function builtinPrint(args) {
  args.forEach(function(arg) {
    console.log( (arg && arg._print) ? arg._print() : arg);
  });
  return null;
});