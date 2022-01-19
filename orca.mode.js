CodeMirror.defineSimpleMode('orca', {
  start: [
    {regex: /"([^"]*)("|$)/, token: 'string'},
    {regex: /\d+\b/, token: 'number'},
    {regex: /\b(do|if|while|define|fun)\b/, token: 'keyword'},
    {regex: /\b(true|false|null|print|input|array|element|length|append|remove)\b/, token: 'atom'},
    {regex: /[+\-*/<>]|==|<=|>=/, token: 'operator'},
    {regex: /#.*/, token: 'comment'},
    {regex: /[a-z$][\w$]*/, token: 'variable'},
    {regex: /\(/, indent: true},
    {regex: /\)/, dedent: true}
  ],
  meta: {
    electricChars: ')'
  }
});