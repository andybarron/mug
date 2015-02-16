/* Mug programming language */

/* lexical grammar */
%lex

%%
\#(.*)                     /* blah */
(\r?\n)+                   return 'ENDL';
\s+                        /* skip whitespace */
"fn"                       return 'FN';
[0-9]+("."[0-9]+)?\b       return 'NUM';
[A-Za-z][A-Za-z0-9_]*\b    return 'ID';
\"([^\n\\]|\\.)*?\"        return 'STRING';
"."                        return '.';
":="                       return ':=';
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

%right ':=' '='
%nonassoc '<'
%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS
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

expr
    : id_prop ':=' expr
        -> new yy.ExprDeclare(yy.scope, $id_prop.id, $id_prop.props, $expr)
    | id_prop '=' expr
        -> new yy.ExprAssign(yy.scope, $id_prop.id, $id_prop.props, $expr)
    | expr '(' ENDL? expr_list ')'
        -> new yy.ExprCall(yy.scope, $expr, $expr_list)
    | FN '(' ENDL* id_list ')' ENDL* '{' ENDL* expr_seq '}'
        -> new yy.ExprFn(yy.scope, $id_list, $expr_seq);
    | expr '+' expr -> new yy.ExprAdd(yy.scope, $expr1, $expr2)
    | expr '-' expr -> new yy.ExprSub(yy.scope, $expr1, $expr2)
    | expr '*' expr -> new yy.ExprMul(yy.scope, $expr1, $expr2)
    | expr '/' expr -> new yy.ExprDiv(yy.scope, $expr1, $expr2)
    | '(' expr ')' -> $expr
    | id_prop -> new yy.ExprId(yy.scope, $id_prop.id, $id_prop.props)
    | NUM -> new yy.ExprNum(yy.scope, yytext)
    | STRING -> new yy.ExprStr(yy.scope, yytext.substr(1, yytext.length-2))
    ;