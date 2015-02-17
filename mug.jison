/* Mug programming language */

/* lexical grammar */
%lex

%%
\#(.*)                     /* blah */
(\r?\n)+                   return 'ENDL';
\s+                        /* skip whitespace */
"fn"                       return 'FN';
"if"                       return 'IF';
"else"                     return 'ELSE';
"true"                     return 'TRUE';
"false"                    return 'FALSE';
[0-9]+("."[0-9]+)?\b       return 'NUM';
[A-Za-z][A-Za-z0-9_']*\b    return 'ID';
\"([^\n\\]|\\.)*?\"        return 'STRING';
"."                        return '.';
":="                       return ':=';
"<-"                       return '<-';
";"                        return ';'
"{"                        return '{';
"}"                        return '}';
"("                        return '(';
")"                        return ')';
","                        return ',';
"="                        return '=';
"+"                        return '+';
"*"                        return '*';
"/"                        return '/';
"-"                        return '-';
<<EOF>>                    return 'EOF';

/lex

/* operator associations and precedence */

%nonassoc IF THEN ELSE
%left '<' '>' '<=' '>=' '!=' '='
%right ':=' '<-'
%left '+' '-'
%left '*' '/'
%left '.'
%left '(' ')'


%ebnf
%start expressions

%% /* language grammar */

expressions
    : ENDL* expr_seq EOF
    {
        if (yy.freeRet) {
            throw new Error(
                "Parse error: 'return' outside function body"
            );
        }
        var out = null;
        $expr_seq.forEach(function(e) {
            out = e.eval();
        });
        return out;
    }
    ;

expr_seq
    :
        -> []
    | expr
        -> [$expr]
    | expr expr_sep expr_seq
        -> [$expr].concat($expr_seq)
    ;

expr_sep
    : ';' ENDL*
    | ENDL+
    ;

id_prop
    : ID (prop_access)* -> { id: $ID, props: $2 }
    ;

prop_access
    : '.' ID -> $ID
    ;

id_list
    :
        -> []
    | ID ENDL?
        -> [$ID]
    | ID ',' ENDL? id_list
        -> [$ID].concat($id_list)
    ;

expr_list
    :
        -> []
    | expr ENDL?
        -> [$expr]
    | expr ',' ENDL? expr_list
        -> [$expr].concat($expr_list)
    ;

block
    : '{' ENDL* expr_seq '}'
        -> new yy.ExprBlock(yy.scope, $expr_seq)
    ;

else_if_block
    : ELSE IF expr block
        -> { predicate: $expr, expr: $block }
    ;

else_block
    : ELSE block
        -> $block
    ;

expr
    : id_prop ':=' expr
        -> new yy.ExprDeclare(yy.scope, $id_prop.id, $id_prop.props, $expr)
    | id_prop '<-' expr
        -> new yy.ExprAssign(yy.scope, $id_prop.id, $id_prop.props, $expr)
    | expr '(' ENDL? expr_list ')'
        -> new yy.ExprCall(yy.scope, $expr, $expr_list)
    | FN '(' ENDL* id_list ')' block
        -> new yy.ExprFn(yy.scope, $id_list, $block);
    | expr '+' expr -> new yy.ExprAdd(yy.scope, $expr1, $expr2)
    | expr '-' expr -> new yy.ExprSub(yy.scope, $expr1, $expr2)
    | expr '*' expr -> new yy.ExprMul(yy.scope, $expr1, $expr2)
    | expr '/' expr -> new yy.ExprDiv(yy.scope, $expr1, $expr2)
    | '(' expr ')' -> $expr
    | id_prop -> new yy.ExprId(yy.scope, $id_prop.id, $id_prop.props)
    | NUM -> new yy.ExprNum(yy.scope, yytext)
    | STRING -> new yy.ExprStr(yy.scope, yytext.substr(1, yytext.length-2))
    | TRUE -> new yy.ExprBool(yy.scope, true)
    | FALSE -> new yy.ExprBool(yy.scope, false)
    | block
    | IF expr block else_if_block* else_block?
        {
            var predicates = [$expr1]
            var exprs = [$block]
            $4.forEach(function(elif) {
                predicates.push(elif.predicate)
                exprs.push(elif.expr)
            })
            if ($5) {
                exprs.push($5)
            }
            $$ = new yy.ExprIfElse(yy.scope, predicates, exprs)
        }
    ;