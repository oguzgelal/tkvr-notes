class TextCompiler {
  constructor() {

    this.enclosers = {
      expr: {
        opener: '>expr--',
        closer: '--<'
      },

    }
  }

  compile(expr) {
    this._lex(expr);
  }

  _lex(expr) {
    var m = this._matchRecursive(expr);
    console.log('matches', m);
  }

  _matchRecursive(str, t) {
    var type = t || 'expr';

    if (!this.enclosers[type]) {
      throw new Exception('Unidentified expression type: ', type);
    }

    var iterator = new RegExp(this.enclosers[type].opener + '|' + this.enclosers[type].closer, 'g');
    var results = [], openTokens, matchStartIndex, match;

    do {
      openTokens = 0;
      while (match = iterator.exec(str)) {
        if (match[0] == this.enclosers[type].opener) {
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
