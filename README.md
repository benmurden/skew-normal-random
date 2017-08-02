# Skew-normal Random
Generate a set of random numbers over a skew-normal distribution.

[![Build Status](https://travis-ci.org/benmurden/skew-normal-random.svg?branch=master)](https://travis-ci.org/benmurden/skew-normal-random)

## Usage

`rSkewNorm(alpha, location, scale, [min], [max])`

Generate a single random number, optionally limited by a minimum and maximum. If `alpha` is zero, it would be the same as a regular normal distribution.

`rvSkewNorm(size, alpha, location, scale, [min], [max])`

Generate an array of `size` with random numbers generated according to the specification provided.

## Examples

```javascript
var skewnorm = require('skewnorm');

skewnorm.rSkewNorm(0, 0, 1); // Will generate a single random number with no skew.
skewnorm.rSkewNorm(6, 5, 2); // Will generate a single random number skewed such that the mean is 7, rather than 5.
skewnorm.rvSkewNorm(10000, 6, 5, 2); // Will generate an array of 10,000 values with the above properties.
skewnorm.rvSkewNorm(10000, 6, 5, 2, 0, 10); // Will generate an array similar to the above, but with a minimum value of 0 and maximum of 10.
```

## Acknowledgements
Uses random normal distribution and vectorization functions from [randgen](https://github.com/robbrit/randgen).