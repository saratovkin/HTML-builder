const fs = require('fs');
const path = require('path');


const copyDir = function () {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, function (err) {
    if (err) {
      return console.log(err);
    }
  });

  fs.readdir(path.join(__dirname, 'files-copy'), function (err, files) {
    if (Array.isArray(files)) {
      files.forEach(item => {
        fs.unlink(path.join(__dirname, 'files-copy', item), function (err) {
          if (err) {
            return console.log(err);
          }
        })
      });
    }
  });

  fs.readdir(path.join(__dirname, 'files'), function (err, files) {
    if (err) {
      return console.log(err);
    }
    files.forEach(item => {
      fs.copyFile(path.resolve(__dirname, 'files', item), path.resolve(__dirname, 'files-copy', item), function (err) {
        if (err) {
          return console.log(err);
        }
      });
    });
  });
};

copyDir();