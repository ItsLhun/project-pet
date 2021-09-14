const path = require('path');

module.exports = {
  src: path.join('styles'),
  dest: path.join(__dirname, '../public/styles'),
  prefix: '/styles',
  outputStyle:
    process.env.NODE_ENV === 'development' ? 'expanded' : 'compressed',
  force: process.env.NODE_ENV === 'development',
  sourceMap: process.env.NODE_ENV === 'development'
};
