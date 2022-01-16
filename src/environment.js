const {parse} = require('./parser');
const {evaluate} = require('./evaluator');
const readlineSync = require('readline-sync');

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

topScope.print = value => {
  console.log(value);
  return value;
}

topScope.input = (prompt) => {
  return readlineSync.question(prompt);
}

topScope.array = (...args) => {
  return args;
};

topScope.element = (arr, index) => {
  return arr[index];
};

topScope.length = (arr) => {
  return arr.length;
}

for (let op of ['+', '-', '*', '/', '==', '<', '>', '<=', '>=']) {
  topScope[op] = Function('a, b', `return a ${op} b;`);
}


function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}


exports.run = run;