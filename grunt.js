config.init({

  test: {
    files: ['test/tests/*.js']
  },

  lint: {
    files: ['lib/base.js', 'lib/object.js']
  }
  
});

// Default task.
task.registerTask('default', 'lint test');

