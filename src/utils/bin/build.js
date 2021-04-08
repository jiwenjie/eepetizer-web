const glob = require('glob');
const babel = require('@babel/core');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const list = require('../list.js');
const { generateIndex } = require('./utils.js');

const esPath = path.join(__dirname, '../es');
const libPath = path.join(__dirname, '../lib');

// 清空文件夹
if (fse.ensureDirSync(libPath)) {
  fse.emptyDirSync(path.resolve('./lib'));
}
if (fse.ensureDirSync(esPath)) {
  fse.emptyDirSync(path.resolve('./es'));
}

const plugins = [];

const replaceAll = (str, searchvalue, newvalue) => {
  if (str != null) {
    str = str.replace(new RegExp(searchvalue, 'g'), newvalue);
    return str;
  }
};

for (const item of list) {
  plugins.push([
    require.resolve('babel-plugin-module-resolver'),
    {
      alias: {
        [`@hui-pro/utils/src/${item}`]: './__utils'
      }
    },
    item
  ]);
}

const esBabelConf = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false
      }
    ]
  ],
  plugins: plugins
};

const libBabelConf = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposals: true
        },
        modules: 'commonjs'
      }
    ]
  ],
  plugins: plugins
};

glob('src/**/*.js', { ignore: ['src/**/index.js'] }, function(err, files) {
  if (err) {
    throw err;
  }
  for (const item of files) {
    const fileName = item.substring(item.lastIndexOf('/') + 1);
    // lib
    babel.transformFile(item, libBabelConf, (err, result) => {
      if (err) {
        throw err;
      }
      const code = replaceAll(result.code, '../../__utils', '.');
      fs.writeFileSync(`./lib/${fileName}`, code);
    });
    // es
    babel.transformFile(item, esBabelConf, (err, result) => {
      if (err) {
        throw err;
      }
      const code = replaceAll(result.code, '../../__utils', '.');
      fs.writeFileSync(`./es/${fileName}`, code);
    });
  }
});

// es index
generateIndex(esPath, true);
// lib index
generateIndex(libPath, false);
