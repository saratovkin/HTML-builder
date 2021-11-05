const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('----------Hello! Ready for input.----------');

const exitInput = function () {
  console.log('----------Your file is saved. Goodbye!----------');
  process.exit(0);
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

fs.writeFile(path.join(__dirname, 'text.txt'), '', function (err) {
  if (err) {
    return console.log(err);
  }
});

rl.addListener('line', function (data) {
  if (data == 'exit') {
    exitInput();
  }
  fs.appendFile(path.join(__dirname, 'text.txt'), data + '\n', function (err) {
    if (err) {
      console.log(err);
    }
  });
});

rl.addListener('SIGINT', function () {
  exitInput();
})