const fs = require('fs');
const path = require('path');

const root = path.join(__dirname);
const result = {};

function readDirSync(p) {
  const dir = fs.readdirSync(p);
  dir.forEach((file) => {
    const info = fs.statSync(`${p}/${file}`);
    if (info.isDirectory() && file.indexOf('.') !== 0 && file.indexOf('_') !== 0) {
      result[`${p.replace(root, '')}/${file}/_sidebar.md`] = '/_sidebar.md';
      readDirSync(`${p}/${file}`);
    }
  });
}

readDirSync(root);
console.log(result);
