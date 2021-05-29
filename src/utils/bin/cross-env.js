const path = require('path');
const fs = require('fs');
const pkg = require('../package.json');
const format = require('prettier-eslint');

module.exports = function(env) {
  pkg.main = env === 'dev' ? 'src/index.js' : 'es/index.js';

  fs.writeFileSync(
    path.resolve('./package.json'),
    format({
      text: JSON.stringify(pkg),
      filePath: path.resolve('../../../.eslintrc.js'),
      prettierOptions: {
        parser: 'json'
      }
    })
  );
};
