class TextCompiler {
  constructor() { }

  compile(expr) {
    var x = this._lex(expr, '');
    console.log('end result', x);
  }



  _lex(expr) {
    var self = this;
    var arr = self._matchRecursive(expr);
    var x = '';

    if (arr.length === 0) {
      x += expr.trim();
    }

    else {
      arr.map(function (e) {
        var s = e.split('-');
        var head = (s.length > 1) ? s.splice(0, 1).join('') : '';
        var rest = s.join('-');

        if (head === 'expr') {
          x += '<span>' + self._lex(rest) + '</span>';
        }
        else if (head === 'p') {
          x += '<p>' + self._lex(rest) + '</p>';
        }
        else if (head === 'h1') {
          x += '<h1>' + rest.trim() + '</h1>';
        }
        else {
          x += rest.trim();
        }
      });
    }

    return x;

  }

  _matchRecursive(str) {
    var iterator = new RegExp('>\-|\-\-<', 'g');
    var results = [], openTokens, matchStartIndex, match;

    do {
      openTokens = 0;
      while (match = iterator.exec(str)) {
        if (match[0] == '>-') {
          if (!openTokens) { matchStartIndex = iterator.lastIndex; }
          openTokens++;
        }
        else if (openTokens) {
          openTokens--;
          if (!openTokens) {
            results.push(str.slice(matchStartIndex, match.index));
          }
        }
      }
    }
    while (openTokens && (iterator.lastIndex = matchStartIndex));

    return results;
  }
}

export default new TextCompiler();
