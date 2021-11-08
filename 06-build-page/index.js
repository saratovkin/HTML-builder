const fs = require('fs/promises');
const path = require('path');
const cssFiles = [];

const createDist = async function () {
  await fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
};

const mergeStyles = async function () {
  await fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '');
  const files = await fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  for (const item of files) {
    if (path.extname(item.name) == '.css') {
      cssFiles.push(item);
    }
  }
  for (const item of cssFiles) {
    const css = await fs.readFile(path.join(__dirname, 'styles', item.name));
    await fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'), css + '\n\n');
  }
};

const copyFolder = async function (dir) {
  await fs.mkdir(path.join(__dirname, 'project-dist', dir), { recursive: true });
  const files = await fs.readdir(path.join(__dirname, dir), { withFileTypes: true });
  for (const item of files) {
    if (item.isFile()) {
      await copyFile(dir, item.name);
    } else {
      await copyFolder(dir + '/' + item.name);
    }
  }
};

const copyFile = async function (dir, item) {
  await fs.copyFile(path.resolve(__dirname, dir, item), path.resolve(__dirname, 'project-dist', dir, item));
};

const changeTemplate = async function () {
  let data = await fs.readFile(path.join(__dirname, 'template.html'));
  const templates = await fs.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
  for (const item of templates) {
    if (item.isFile()) {
      if (path.extname(item.name) == '.html') {
        const tempName = item.name.split('.').slice(0, -1).join('.');
        const templateHTML = await fs.readFile(path.join(__dirname, 'components', `${tempName}.html`));
        data = data.toString().replace(`{{${tempName}}}`, templateHTML);
        await fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), data);
      }
    }
  }
}

async function buildPage() {
  try {
    await createDist();
    await mergeStyles();
    await copyFolder('assets');
    await changeTemplate();

  } catch (e) {
    console.error(e);
  }
}


buildPage();