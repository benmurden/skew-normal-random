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

function rSkewNorm(alpha, loc, scale) {
  var sigma, u0, v, u1;

  if (alpha === undefined) {
    alpha = 0;
  }

  if (loc === undefined) {
    loc = 0;
  }

  if (scale === undefined) {
    scale = 1;
  }

  sigma = alpha / Math.sqrt(1 + Math.pow(alpha, 2));
  u0 = Math.random();
  v = Math.random();
  u1 = (sigma * u0 + Math.sqrt(1 - Math.pow(sigma, 2)) * v) * scale;

  if (u0 >= 0) {
    return u1 * scale + loc;
  }
  return (-u1) * scale + loc;
}

exports.rSkewNorm = rSkewNorm;

exports.rvSkewNorm = vectorize(rSkewNorm);
