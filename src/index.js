const {run} = require('./environment');
const {parse} = require('./parser');
const {evaluate} = require('./evaluator');

exports.run = run;
exports.parse = parse;
exports.evaluate = evaluate;