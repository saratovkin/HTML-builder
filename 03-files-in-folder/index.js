const fs = require('fs');
const path = require('path');

const getInfo = function (file) {
  const desc = []
  if (file.isFile()) {
    fs.stat(path.resolve(__dirname, 'secret-folder', file.name), function (err, stats) {
      if (err) {
        return console.log(err);
      }
      desc.push(file.name.split('.').slice(0, -1).join('.'));
      desc.push(path.extname(file.name).slice(1));
      desc.push((stats.size / 1024) + 'kb');
      console.log(desc.join(' - '));
    });
  }
}

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, function (err, files) {
  if (err) {
    return console.log(err);
  }
  files.forEach(item => {
    getInfo(item);
  })
});