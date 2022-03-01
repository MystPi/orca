function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if (match = /^"((?:[^"\\]|\\.)*)"/.exec(program)) {
    expr = {
      type: 'value',
      value: match[1]
    };
  } else if (match = /^\d+(\.\d+)?\b/.exec(program)) {
    expr = {
      type: 'value',
      value: Number(match[0])
    };
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = {
      type: 'word',
      name: match[0]
    };
  } else {
    throw new SyntaxError('Unexpected syntax: ' + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}


function skipSpace(string) {
  const match = string.match(/^(\s*|#.*)*/);
  return string.slice(match[0].length);
}


function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] !== '(') {
    return {
      expr: expr,
      rest: program
    };
  }

  program = skipSpace(program.slice(1));
  expr = {
    type: 'apply',
    operator: expr,
    args: []
  };
  while (program[0] !== ')') {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] === ',') {
      program = skipSpace(program.slice(1));
    } else if (program [0] !== ')') {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }

  return parseApply(expr, program.slice(1));
}


function parse(program) {
  let {expr, rest} = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError('Unexpected text after program');
  }
  return expr;
}


exports.parse = parse;