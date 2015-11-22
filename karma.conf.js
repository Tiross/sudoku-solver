module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-safari-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
    ],
    files: [
      'src/*.js',
      'spec/*.js',
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      'PhantomJS',
      'Safari',
      'Firefox',
    ],
    singleRun: true,
    concurrency: Infinity,
  });
};
