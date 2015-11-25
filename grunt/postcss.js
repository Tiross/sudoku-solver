module.exports = function (grunt, options) {
  var autoprefixer = require('autoprefixer');

  return {
    options: {
      processors: [
        autoprefixer({browsers: ['last 3 versions']}),
      ],
    },
    style: {
      files: {
        'demo/app.css': 'demo/app.css',
      },
    },
  };
};
