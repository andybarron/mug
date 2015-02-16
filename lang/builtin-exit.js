var Fn = require('./fn');

module.exports = new Fn(null, null, null, function builtinExit() {
  process.exit();
  return null;
});