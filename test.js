var skewnorm = require('./lib/skewnorm.js'),
  assert = require('assert');

function sum(lhs, rhs) {
  return lhs + rhs;
}

function mean(arr) {
  var s = arr.reduce(sum, 0);
  return s / arr.length;
}

function testSkewNorm() {
  var arr = skewnorm.rvSkewNorm(10000, 0, 5, 1),
    xBar = mean(arr);

  assert.equal(Math.round(xBar), 5);

  arr = skewnorm.rvSkewNorm(10000, 6, 5, 2);
  xBar = mean(arr);

  assert.equal(Math.round(xBar), 7);
}

testSkewNorm();
