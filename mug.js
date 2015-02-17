var util = require('util');
var fs = require('fs');
var path = require('path');
var jison = require('jison');

var args = process.argv.slice(2);

var grammar = fs.readFileSync('mug.jison', 'utf-8');
var parser = new jison.Parser(grammar);

function lang(str) {
  return require('./lang/' + str);
}

var yy = parser.yy = {
  Scope: lang('scope'),
  Program: lang('program'),
  ExprDeclare: lang('expr-declare'),
  ExprAssign: lang('expr-assign'),
  ExprId: lang('expr-id'),
  ExprFn: lang('expr-fn'),
  ExprCall: lang('expr-call'),
  ExprAdd: lang('expr-add'),
  ExprSub: lang('expr-sub'),
  ExprMul: lang('expr-mul'),
  ExprDiv: lang('expr-div'),
  ExprNum: lang('expr-num'),
  ExprStr: lang('expr-str'),
  ExprBool: lang('expr-bool'),
  ExprBlock: lang('expr-block'),
  ExprIfElse: lang('expr-if-else'),
  ExprCmp: lang('expr-cmp'),
  ExprRecurse: lang('expr-recurse'),
};

var langScope = new yy.Scope();
langScope.registerId('print', lang('builtin-print'));
langScope.registerId('exit', lang('builtin-exit'));
var topScope = yy.scope = new yy.Scope(langScope);


if (args.length == 0) {
  var readline = require('readline');
  var rl = readline.createInterface(process.stdin, process.stdout);

  rl.setPrompt("mug> ");
  rl.prompt();

  rl.on('line', function(line) {
    try {
      var prog = parser.parse(line);
      var result = prog.run(topScope);
      util.print("=> ");
      langScope.ids.print.invoke([result]);
    } catch (e) {
      util.print(e, "\n");
    } finally {
      rl.prompt();
    }
  });

  rl.on('close', function() {
    util.print("\n");
    process.exit(0);
  })
} else {
  var mugFile = path.join(process.cwd(), args[0]);
  var mugFileContents = fs.readFileSync(mugFile, 'utf-8') + "\n";

  try {
    var program = parser.parse(mugFileContents)
    program.run(topScope);
  } catch (e) {
    console.error(e);
  }
}