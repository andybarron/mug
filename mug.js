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
};

var langScope = new yy.Scope();
langScope.registerId('print', lang('builtin-print'));
langScope.registerId('exit', lang('builtin-exit'));
yy.scope = new yy.Scope(langScope);


if (args.length == 0) {
  function output() {
    util.print.apply(util, arguments);
  }
  var prompt = "mug> ";
  var buffer = "";
  var init = false;
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function() {
    if (!init) {
      init = true;
      output(prompt);
    }
    var chunk;
    while (null !== (chunk = this.read())) {
      buffer += chunk;
      var idx = buffer.indexOf('\n');
      if (idx == -1) continue;
      var input = buffer.substring(0, idx);
      buffer = buffer.substring(idx+1, buffer.length);
      try {
        output("=> ", parser.parse(input), '\n');
      } catch (e) {
        output(e, '\n');
      } finally {
        output(prompt);
        return;
      }
    }
  });
  process.stdin.on('end', function() {
    output("\nBye!\n");
    process.exit();
  });
} else {
  var mugFile = path.join(process.cwd(), args[0]);
  var mugFileContents = fs.readFileSync(mugFile, 'utf-8') + "\n";

  try {
    parser.parse(mugFileContents);
  } catch (e) {
    console.error(e);
  }
}