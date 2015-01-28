// after each test, re-evaluate whether the whole thing passed or failed
module.exports.afterEach = function (done) {
  this.allPassed = this.allPassed && (this.currentTest.state === 'passed');
  done();
};

// after all the tests, quit and update Sauce (if necessary)
module.exports.after = function (done) {
  if (process.env.SAUCE) {
    this.driver
      .quit()
      .sauceJobStatus(this.allPassed)
      .nodeify(done);
  } else {
    this.driver
      .quit()
      .nodeify(done);
  }
};
