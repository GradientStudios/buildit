var jobqueue = require('../../lib/jobqueue');

exports.testJobQueue = function(test) {
  test.expect(3);

  var jq = jobqueue.jobQueue();
  jq.add(function(next) {
    test.ok(true);
    next();
  });
  jq.add(function(next) {
    test.ok(true);
    next();
  });
  jq.add(function(next) {
    test.ok(true);
    next();
    test.done();
  })
  jq.start();
};
