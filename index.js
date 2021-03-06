/*!
 * Percent v2.1.0 (http://git.io/percentjs)
 * Licensed under the MIT license.
 */

/*
 * Percent calculation
 */

exports.calc = (value, total, decimal, sign = false) => {
  const badNumbers = [NaN, Infinity, -Infinity];

  // Avoid argument type problems
  if (typeof value !== 'number'
      || typeof total !== 'number'
      || typeof decimal !== 'number') {
    return null;
  }

  // Don't divide by zero
  if (total === 0) {
    return 0;
  }

  // Avoid wrong numbers
  badNumbers.forEach((number) => {
    if ([value, total, decimal].indexOf(number) > -1) {
      return number;
    }
  });

  // Calculate the value
  value = parseFloat(((value / total) * 100).toFixed(decimal));

  // Add the sign
  if (sign === true) {
    value += '%';
  }

  if (typeof sign === 'string') {
    value += sign;
  }

  return value;
};

/*
 * Percent validation
 */

// Supreme percent regexp
exports.re = /^\s?[-+]?(\d*[.|,])*?\d+\s?%?\s?$/;

exports.valid = (value) => {
  if (typeof value === 'number'
      || (typeof value === 'string' && value.match(exports.re))) {
    return true;
  }

  return false;
};

/*
 * Add percent sign
 */

exports.sign = (value) => {
  if (typeof value === 'number'
      || (typeof value === 'string' && !value.match(/%/g))) {
    return `${value}%`;
  }

  return value;
};

/*
 * Clean the percent
 */

exports.unsign = (value) => {
  if (typeof value === 'string') {
    return value.replace(/%/g, '');
  }

  return value;
};

exports.clean = (value) => {
  value = exports.unsign(value);

  if (typeof value === 'string') {
    return value.replace(/\s/g, '');
  }

  return value;
};

exports.convert = (value, negative) => {
  value = exports.clean(value);

  if (exports.valid(value)) {
    value = Number(value);
    return negative ? -value : value;
  }

  return value;
};

/*
 * Percent comparision
 */

exports.lt = (l, t) => {
  if (exports.valid(l) && exports.valid(t)
      && exports.convert(l) < exports.convert(t)) {
    return true;
  }

  return false;
};

exports.gt = (g, t) => {
  if (exports.valid(g) && exports.valid(t)
      && exports.convert(g) > exports.convert(t)) {
    return true;
  }

  return false;
};

exports.eq = (e, q) => {
  if (exports.valid(e) && exports.valid(q)
      && exports.convert(e) === exports.convert(q)) {
    return true;
  }

  return false;
};

exports.neq = (ne, q) => {
  if (exports.valid(ne) && exports.valid(q)
      && exports.convert(ne) !== exports.convert(q)) {
    return true;
  }

  return false;
};

exports.satisfies = (value, min, max) => {
  // Sort min and max by size
  if (min > max) {
    [max] = [min, min = max];
  }

  if (exports.valid(value)
      && exports.valid(min) && exports.valid(max)
      && exports.convert(value) >= exports.convert(min)
      && exports.convert(value) <= exports.convert(max)) {
    return true;
  }

  return false;
};
