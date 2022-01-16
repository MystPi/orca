#!/usr/bin/env node

const {run} = require('./index');
const fs = require('fs');


function main() {
  let filename = process.argv[2];
  if (!filename) {
    console.log('Usage: orca <filename>');
    process.exit(1);
  }

  fs.readFile(filename, 'utf8', (err, program) => {
    if (err) {
      console.log('Error reading file: ' + err.message);
      process.exit(1);
    }
    run(program);
  });
}


main();