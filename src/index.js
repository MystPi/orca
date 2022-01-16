const {topScope} = require('./environment');
const {parse} = require('./parser');
const {evaluate} = require('./evaluator');


function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}


module.exports = {run, parse, evaluate}