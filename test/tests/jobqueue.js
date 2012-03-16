var jobqueue = require('../../lib/jobqueue');

exports.testJobQueue = function(test) {
  test.expect(4);

  var jq = jobqueue.jobQueue();
  jq.add(function(next) {
    test.ok(true);
    next();
  });
  jq.add(function(next) {
    test.ok(true);

    setTimeout(function() {
      test.ok(true);
      jq.add(function(next) {
        test.ok(true);
        next();
        test.done();
      });
    }, 100);

    next();
  });
  jq.start();
};
