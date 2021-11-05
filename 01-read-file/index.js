const fs = require('fs');
const path = require('path');


let readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

readableStream.on('data', function (chunk) {
  const buffer = Buffer.from(chunk);
  process.stdout.write(buffer);
});

