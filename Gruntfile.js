module.exports = function(grunt) {
  var path = require('path');
  var user = process.env.USER || process.env.USERNAME;

  require('time-grunt')(grunt);

  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt'),
    overridePath: path.join(process.cwd(), 'grunt', user),
  });
};
