const fs = require('fs');
const path = require('path');
const cssFiles = [];

fs.readFile(path.join(__dirname, 'template.html'), function (err, data) {
  if (err) {
    return console.log(err);
  }

  const createDist = function () {
    fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, function (err) {
      if (err) {
        return console.log(err);
      }
    });
    // fs.copyFile(path.resolve(__dirname, 'template.html'), path.resolve(__dirname, 'project-dist', 'index.html'), function (err) {
    //   if (err) {
    //     return console.log(err);
    //   }
    // });
  }

  const mergeStyles = function () {
    fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', function (err) {
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
          fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), chunk + '\n\n', function (err) {
            if (err) {
              return console.log(err);
            }
          });
        });
      });
    });
  };

  const copyFolder = function (dir) {
    fs.mkdir(path.join(__dirname, 'project-dist', dir), { recursive: true }, function (err) {
      if (err) {
        return console.log(err);
      }
    });
    fs.readdir(path.join(__dirname, dir), { withFileTypes: true }, function (err, files) {
      if (err) {
        return console.log(err);
      }
      files.forEach(item => {
        if (item.isFile()) {
          copyFile(dir, item.name);
        } else {
          copyFolder(dir + '/' + item.name);
        }
      })
    });
  };

  const copyFile = function (dir, item) {
    fs.copyFile(path.resolve(__dirname, dir, item), path.resolve(__dirname, 'project-dist', dir, item), function (err) {
      if (err) {
        return console.log(err);
      }
    });
  };

  const getTemplates = function () {
    fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true }, function (err, files) {
      if (err) {
        return console.log(err);
      }
      files.forEach(item => {
        if (item.isFile()) {
          if (path.extname(item.name) == '.html') {
            getTemplateHTML(item.name.split('.').slice(0, -1).join('.'));
          }
        }
      });
    });
  };

  const getTemplateHTML = function (template) {
    let templateHTML;
    const readableStream = fs.createReadStream(path.join(__dirname, 'components', `${template}.html`));
    readableStream.on('data', function (chunk) {
      templateHTML = chunk.toString();
      changeTemplate(template, templateHTML);
    });
  };

  const changeTemplate = function (template, templateHTML) {
    data = data.toString().replace(`{{${template}}}`, templateHTML);
    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  }

  createDist();
  mergeStyles();
  copyFolder('assets');
  getTemplates();
});







