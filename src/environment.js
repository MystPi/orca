const {parse} = require('./parser');
const {evaluate} = require('./evaluator');
const readlineSync = require('readline-sync');

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;
topScope.input = prompt => readlineSync.question(prompt);
topScope.array = (...args) => args;
topScope.element = (arr, index) => arr[index];
topScope.length = arr => arr.length;

topScope.print = value => {
  console.log(value);
  return value;
};

for (let op of ['+', '-', '*', '/', '==', '<', '>', '<=', '>=']) {
  topScope[op] = Function('a, b', `return a ${op} b;`);
}


function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}


exports.run = run;