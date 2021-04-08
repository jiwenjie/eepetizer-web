const path = require('path');
const { generateIndex, generateMainIndex } = require('./utils.js');
const srcPath = path.join(__dirname, '../src');

generateIndex(srcPath, true);
generateMainIndex(srcPath, true);
