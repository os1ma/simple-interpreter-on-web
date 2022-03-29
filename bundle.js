(()=>{"use strict";var e=function(){function e(e,t,n){this._token=e,this._identifier=t,this._value=n}return Object.defineProperty(e.prototype,"token",{get:function(){return this._token},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"identifier",{get:function(){return this._identifier},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),e}(),t=function(){function e(e,t){this._operator=e,this._right=t}return Object.defineProperty(e.prototype,"operator",{get:function(){return this._operator},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"right",{get:function(){return this._right},enumerable:!1,configurable:!0}),e}(),n=function(){function e(e,t,n){this._left=e,this._operator=t,this._right=n}return Object.defineProperty(e.prototype,"left",{get:function(){return this._left},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"operator",{get:function(){return this._operator},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"right",{get:function(){return this._right},enumerable:!1,configurable:!0}),e}(),r=function(){function e(e){this._token=e}return Object.defineProperty(e.prototype,"token",{get:function(){return this._token},enumerable:!1,configurable:!0}),e}(),i=function(){function e(e,t){this._token=e,this._value=t}return Object.defineProperty(e.prototype,"token",{get:function(){return this._token},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),e}(),o=function(){function e(e,t){this._token=e,this._value=t}return Object.defineProperty(e.prototype,"token",{get:function(){return this._token},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),e}(),s=function(){function e(e,t,n,r){this._token=e,this._condition=t,this._consequence=n,this._alternative=r}return Object.defineProperty(e.prototype,"token",{get:function(){return this._token},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"condition",{get:function(){return this._condition},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"consequence",{get:function(){return this._consequence},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"alternative",{get:function(){return this._alternative},enumerable:!1,configurable:!0}),e}();function a(t,n){if(!(t instanceof e))return c(t,n);var r=c(t.value,n);n[t.identifier.literal]=r}function c(e,u){if(e instanceof t)return function(e,t){var n=c(e.right,t),r=e.operator.type;switch(r){case"PLUS":return n;case"MINUS":return-n;case"NOT":return!n;default:throw new Error("Unsupported operator type. operatorType = ".concat(r))}}(e,u);if(e instanceof n)return function(e,t){var n=c(e.left,t),r=c(e.right,t),i=e.operator.type;switch(i){case"PLUS":return n+r;case"MINUS":return n-r;case"ASTERISK":return n*r;case"SLASH":return n/r;case"EQ":return n===r;case"NEQ":return n!==r;case"LT":return n<r;case"GT":return n>r;case"LEQ":return n<=r;case"GEQ":return n>=r;default:throw new Error("Unsupported operator type. operatorType = ".concat(i))}}(e,u);if(e instanceof r){var h=e.token.literal,p=u[h];if(!p)throw new Error("undefined identifier '".concat(h,"'"));return p}if(e instanceof i)return e.value;if(e instanceof o)return e.value;if(e instanceof s){var f=e;return a(c(f.condition,u)?f.consequence:f.alternative,u)}if(void 0!==e)throw new Error("Invalid expression. expression = ".concat(e))}var u=function(){function e(e,t){this._type=e,this._literal=t}return Object.defineProperty(e.prototype,"type",{get:function(){return this._type},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"literal",{get:function(){return this._literal},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return this.literal},e}(),h={true:"TRUE",false:"FALSE",let:"LET",if:"IF",else:"ELSE"},p=[" ","\t"],f=["0","1","2","3","4","5","6","7","8","9"],k=function(){function e(e){this.input=e,this.currentPosition=0}return e.prototype.hasNextToken=function(){return this.currentPosition<this.input.length},e.prototype.nextToken=function(){var e;this.skipSpaces();var t=this.currentChar(),n=this.peekChar();switch(t){case"+":e=new u("PLUS",t);break;case"-":e=new u("MINUS",t);break;case"*":e=new u("ASTERISK",t);break;case"/":e=new u("SLASH",t);break;case"(":e=new u("PAREN_L",t);break;case")":e=new u("PAREN_R",t);break;case"{":e=new u("BRACE_L",t);break;case"}":e=new u("BRACE_R",t);break;case"=":"="===n?(e=new u("EQ",t+n),this.next()):e=new u("ASSIGN",t);break;case"!":"="===n?(e=new u("NEQ",t+n),this.next()):e=new u("NOT",t);break;case"<":"="===n?(e=new u("LEQ",t+n),this.next()):e=new u("LT",t);break;case">":"="===n?(e=new u("GEQ",t+n),this.next()):e=new u("GT",t);break;default:if(this.isLetter(t)){var r=this.readWord();e=new u(h[r]||"IDENTIFIER",r)}else{if(!this.isDigit(t))throw new Error("Invalid character '".concat(t,"'."));e=new u("INTEGER",this.readInteger())}}return this.next(),this.skipSpaces(),e},e.prototype.skipSpaces=function(){for(;p.includes(this.currentChar());)this.next()},e.prototype.currentChar=function(){return this.input[this.currentPosition]},e.prototype.peekChar=function(){return this.input[this.currentPosition+1]},e.prototype.next=function(){this.currentPosition++},e.prototype.isLetter=function(e){return"a"<=e&&e<="z"||"A"<=e&&e<="Z"},e.prototype.readWord=function(){return this.readChars(this.isLetter)},e.prototype.isDigit=function(e){return f.includes(e)},e.prototype.readInteger=function(){return this.readChars(this.isDigit)},e.prototype.readChars=function(e){for(var t=this.currentPosition,n=this.input[this.currentPosition+1];e(n);)this.next(),n=this.input[this.currentPosition+1];var r=this.currentPosition;return this.input.slice(t,r+1)},e}(),T={PLUS:3,MINUS:3,ASTERISK:4,SLASH:4,PAREN_L:6,EQ:1,NEQ:1,LT:2,GT:2,LEQ:2,GEQ:2},l=function(){function a(e){if(this.lexer=e,this.prefixParseFunctions={},this.infixParseFunctions={},this.prefixParseFunctions.PLUS=this.parsePrefixExpression.bind(this),this.prefixParseFunctions.MINUS=this.parsePrefixExpression.bind(this),this.prefixParseFunctions.IDENTIFIER=this.parseIdentifier.bind(this),this.prefixParseFunctions.INTEGER=this.parseIntegerLiteral.bind(this),this.prefixParseFunctions.TRUE=this.parseBooleanLiteral.bind(this),this.prefixParseFunctions.FALSE=this.parseBooleanLiteral.bind(this),this.prefixParseFunctions.PAREN_L=this.parseGroupExpression.bind(this),this.prefixParseFunctions.NOT=this.parsePrefixExpression.bind(this),this.prefixParseFunctions.IF=this.parseIfExpression.bind(this),this.infixParseFunctions.PLUS=this.parseInfixExpression.bind(this),this.infixParseFunctions.MINUS=this.parseInfixExpression.bind(this),this.infixParseFunctions.ASTERISK=this.parseInfixExpression.bind(this),this.infixParseFunctions.SLASH=this.parseInfixExpression.bind(this),this.infixParseFunctions.EQ=this.parseInfixExpression.bind(this),this.infixParseFunctions.NEQ=this.parseInfixExpression.bind(this),this.infixParseFunctions.LT=this.parseInfixExpression.bind(this),this.infixParseFunctions.GT=this.parseInfixExpression.bind(this),this.infixParseFunctions.LEQ=this.parseInfixExpression.bind(this),this.infixParseFunctions.GEQ=this.parseInfixExpression.bind(this),!e.hasNextToken())throw new Error("Lexer is empty.");this.currentToken=this.lexer.nextToken(),e.hasNextToken()&&(this.peekToken=this.lexer.nextToken())}return a.prototype.nextToken=function(){if(!this.peekToken)throw new Error("next token not exist. this.currentToken = ".concat(this.currentToken));this.currentToken=this.peekToken,this.lexer.hasNextToken()?this.peekToken=this.lexer.nextToken():this.peekToken=void 0},a.prototype.hasNextToken=function(){return void 0!==this.peekToken},a.prototype.currentTokenType=function(){return this.currentToken.type},a.prototype.parseStatement=function(){return"LET"===this.currentToken.type?this.parseLetStatement():this.parseExpression(0)},a.prototype.parseLetStatement=function(){var t=this.currentToken;if(this.nextToken(),"IDENTIFIER"!==this.currentTokenType())throw new Error("let statement must need identifier but got ".concat(this.currentToken));var n=this.currentToken;if(this.nextToken(),"ASSIGN"!==this.currentTokenType())throw new Error("let statement must need assign but got ".concat(this.currentToken));this.nextToken();var r=this.parseExpression(0);return new e(t,n,r)},a.prototype.parseExpression=function(e){var t=this.prefixParseFunctions[this.currentToken.type];if(!t)throw new Error("prefixParseFunction not exists. this.currentToken.type = ".concat(this.currentToken.type));for(var n=t();this.hasNextToken()&&e<this.currentPreceedence();){var r=this.infixParseFunctions[this.currentToken.type];if(!r)throw new Error("infixParseFunction not exists. this.currentToken.type = ".concat(this.currentToken.type));n=r(n)}return n},a.prototype.currentPreceedence=function(){return T[this.currentToken.type]||0},a.prototype.parsePrefixExpression=function(){var e=this.currentToken;this.nextToken();var n=this.parseExpression(5);return new t(e,n)},a.prototype.parseIdentifier=function(){var e=this.currentToken;return this.hasNextToken()&&this.nextToken(),new r(e)},a.prototype.parseIntegerLiteral=function(){var e=this.currentToken;return this.hasNextToken()&&this.nextToken(),new i(e,Number(e.literal))},a.prototype.parseBooleanLiteral=function(){var e=this.currentToken;this.hasNextToken()&&this.nextToken();var t="TRUE"===e.type;return new o(e,t)},a.prototype.parseGroupExpression=function(){this.nextToken();var e=this.parseExpression(0);if("PAREN_R"!==this.currentToken.type)throw new Error("Invalid token. this.currentToken = ".concat(this.currentToken));return this.hasNextToken()&&this.nextToken(),e},a.prototype.parseIfExpression=function(){var e=this.currentToken;if(this.nextToken(),"PAREN_L"!==this.currentTokenType())throw new Error("Invalid if statement. this.currentToken = ".concat(this.currentToken));this.nextToken();var t=this.parseExpression(0);if("PAREN_R"!==this.currentTokenType())throw new Error("Invalid if statement. this.currentToken = ".concat(this.currentToken));if(this.nextToken(),"BRACE_L"!==this.currentTokenType())throw new Error("Invalid if statement. this.currentToken = ".concat(this.currentToken));this.nextToken();var n=this.parseStatement();if("BRACE_R"!==this.currentTokenType())throw new Error("Invalid if statement. this.currentToken = ".concat(this.currentToken));this.hasNextToken()&&this.nextToken();var r=void 0;if("ELSE"===this.currentTokenType()){if(this.nextToken(),"BRACE_L"!==this.currentTokenType())throw new Error("Invalid if statement. this.currentToken = ".concat(this.currentToken));if(this.nextToken(),r=this.parseStatement(),"BRACE_R"!==this.currentTokenType())throw new Error("Invalid if statement. this.currentToken = ".concat(this.currentToken));this.hasNextToken()&&this.nextToken()}return new s(e,t,n,r)},a.prototype.parseInfixExpression=function(e){var t=this.currentToken;this.nextToken();var r=this.parseExpression(T[t.type]);return new n(e,t,r)},a}(),x=!1,E={},d=document.getElementById("interpreter"),y=document.getElementById("history"),b=document.getElementById("prompt"),v=document.getElementById("enable-debug-log-checkbox");function g(e){var t=document.createElement("p");t.textContent=e,null==y||y.appendChild(t)}function P(e){x&&g("[DEBUG] ".concat(e))}d.addEventListener("click",(function(){b.focus()})),v.addEventListener("change",(function(){x=v.checked,console.log("log level changed. ENABLE_DEBUG_LOG = ".concat(x))})),null==b||b.addEventListener("keypress",(function(e){if("Enter"==e.key){var t=b.value;g("> ".concat(t));var n=new k(t);try{for(;n.hasNextToken();){var r=n.nextToken();P(JSON.stringify(r))}}catch(e){if(!(e instanceof Error))throw e;g("Lexer error. ".concat(e.message))}var i=new l(new k(t));try{var o=i.parseStatement();P("AST = ".concat(JSON.stringify(o)));var s=a(o,E);g(void 0!==s?s.toString():"undefined")}catch(e){if(!(e instanceof Error))throw e;g("Error: ".concat(e.message))}b.value=""}}))})();