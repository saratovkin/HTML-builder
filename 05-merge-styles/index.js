const fs = require('fs');
const path = require('path');
const cssFiles = [];

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', function (err) {
  if (err) {
    return console.log(err);
  }
});

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, function (err, files) {
  if (err) {
    return console.log(err);
  }
  files.forEach(item => {
    if (path.extname(item.name) == '.css') {
      cssFiles.push(item);
    }
  });
  cssFiles.forEach(item => {
    let readableStream = fs.createReadStream(path.join(__dirname, 'styles', item.name));
    readableStream.on('data', function (chunk) {
      fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), chunk + '\n\n', function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
});


