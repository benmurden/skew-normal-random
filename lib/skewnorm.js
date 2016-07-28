// Vectorize a random generator
// From randgen
function vectorize(generator) {
  return function () {
    var n, result, i, args;
    args = [].slice.call(arguments)
    n = args.shift();
    result = [];
    for (i = 0; i < n; i++) {
      result.push(generator.apply(this, args));
    }
    return result;
  };
}

// from randgen
function randn(mean, stdev) {
  var u1, u2, v1, v2, s;
  if (mean === undefined) {
    mean = 0.0;
  }
  if (stdev === undefined) {
    stdev = 1.0;
  }
  if (randn.v2 === null) {
    do {
      u1 = Math.random();
      u2 = Math.random();

      v1 = 2 * u1 - 1;
      v2 = 2 * u2 - 1;
      s = v1 * v1 + v2 * v2;
    } while (s === 0 || s >= 1);

    randn.v2 = v2 * Math.sqrt(-2 * Math.log(s) / s);
    return stdev * v1 * Math.sqrt(-2 * Math.log(s) / s) + mean;
  }

  v2 = randn.v2;
  randn.v2 = null;
  return stdev * v2 + mean;
}

randn.v2 = null;

function rSkewNorm(alpha, loc, scale, min, max) {
  var sigma, u0, v, u1, ret;

  if (alpha === undefined) {
    alpha = 0;
  }
  if (loc === undefined) {
    loc = 0;
  }
  if (scale === undefined) {
    scale = 1;
  }
  if (min === undefined) {
    min = -Math.infinity;
  }
  if (max === undefined) {
    max = Math.infinity;
  }

  sigma = alpha / Math.sqrt(1 + Math.pow(alpha, 2));

  var generate = function() {
    u0 = randn();
    v = randn();
    u1 = (sigma * u0 + Math.sqrt(1 - Math.pow(sigma, 2)) * v) * scale;

    if (u0 >= 0) {
      return u1 * scale + loc;
    }
    return (-u1) * scale + loc;
  }

  do {
    ret = generate();
  } while (ret < min || ret > max)

  return ret;
}

exports.rSkewNorm = rSkewNorm;

exports.rvSkewNorm = vectorize(rSkewNorm);
