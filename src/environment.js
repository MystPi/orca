const {parse} = require('./parser');
const {evaluate} = require('./evaluator');
const readlineSync = require('readline-sync');

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;
topScope.null = null;
topScope.input = prompt => readlineSync.question(prompt);
// Array functions are "pure", meaning they don't change
// the state of the program; in this case, the array
topScope.array = (...args) => args;
topScope.element = (arr, index) => arr[index];
topScope.append = (arr, value) => [...arr, value];
topScope.remove = (arr, index) => [...arr.slice(0, index), ...arr.slice(index + 1)];
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