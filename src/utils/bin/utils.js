const fs = require('fs');
const path = require('path');
const glob = require('glob');
const format = require('prettier-eslint');

const eslintrc = path.resolve(process.cwd(), '.eslintrc.js');

const classPath = path.join(__dirname, '../src/class');

const getClassFiles = glob.sync(`${classPath}/*.js`, {
  ignore: [`${classPath}/index.js`]
});

const isUpperCase = file => {
  return (
    getClassFiles.findIndex(item => {
      const itemName = item.split('/')[item.split('/').length - 1];
      const fileName = file.split('/')[file.split('/').length - 1];
      return itemName === fileName;
    }) !== -1
  );
};

const generateIndex = (importPath, isEsm = true) => {
  let text = '';
  glob(`${importPath}/*.js`, { ignore: [`${importPath}/index.js`] }, function(
    err,
    files
  ) {
    if (err) {
      throw err;
    }
    const nameList = [];
    for (const file of files) {
      const filePath = path.basename(file);
      const name = camelize(path.parse(file).name, isUpperCase(file));
      nameList.push(name);
      if (isEsm) {
        text += `import ${name} from './${filePath}';`;
      } else {
        text += `const ${name} = require('./${filePath}');`;
      }
    }
    if (isEsm) {
      text += `export {${nameList.join()}}`;
    } else {
      text += `module.exports = {${nameList.join()}}`;
    }
    fs.writeFileSync(
      path.resolve(importPath, './index.js'),
      format({
        text: text,
        filePath: eslintrc
      })
    );
  });
  fs.readdir(importPath, (err, files) => {
    if (err) {
      throw err;
    }
    for (const file of files) {
      const filePath = path.join(importPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory() && fs.readdirSync(importPath).length > 0) {
        generateIndex(path.join(importPath, file), isEsm);
      }
    }
  });
};

const generateMainIndex = (importPath, isEsm = true) => {
  let text = '';
  glob(
    `${importPath}/**/*.js`,
    { ignore: [`${importPath}/**/index.js`] },
    function(err, files) {
      if (err) {
        throw err;
      }
      const nameList = [];
      for (const file of files) {
        const filePath = path.basename(file);
        const name = camelize(path.parse(file).name, isUpperCase(file));
        const typeName = path.relative(importPath, path.parse(file).dir);
        nameList.push(name);
        if (isEsm) {
          text += `import ${name} from './${typeName}/${filePath}';`;
        } else {
          text += `const ${name} = require('./${typeName}${filePath}');`;
        }
      }
      if (isEsm) {
        text += `export {${nameList.join()}}`;
      } else {
        text += `module.exports = {${nameList.join()}}`;
      }
      fs.writeFileSync(
        path.resolve(importPath, './index.js'),
        format({
          text: text,
          filePath: eslintrc
        })
      );
    }
  );
};

const camelize = (string, upperCase = false) => {
  const hyphenateReg = /-([a-z])/g;
  let val = string.replace(hyphenateReg, (_, chr) => chr.toUpperCase());
  let firstCase = val.substring(0, 1);
  if (upperCase) {
    firstCase = firstCase.toUpperCase();
  } else {
    firstCase = firstCase.toLowerCase();
  }
  val = firstCase + val.substring(1);
  return val;
};

module.exports = {
  camelize,
  generateIndex,
  generateMainIndex
};
