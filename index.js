'use strict';

// Percent calculation
exports.calc = function (number, base, decimal, sign) {
  if (base === 0) {
    return null;
  }
  return (number / base * 100).toFixed(decimal) + (sign ? '%' : '');
};

// Percent validation
exports.valid = function (thing) {
  if (typeof thing === 'number') {
    return true;
  }
  if (typeof thing === 'string') {
    if (thing.match(/^\s?\d+\s?$/) || thing.match(/^\s?\d+\s?%\s?$/)) {
      return true;
    }
  }
  return false;
};

// Add percent sign
exports.sign = function (thing) {
  if (typeof thing === 'number' || (typeof thing === 'string' &&
  !thing.match(/%/g))) {
    return thing + '%';
  }
  return thing;
};

// Remove percent sign(s)
exports.unsign = function (thing) {
  if (typeof thing === 'string' && thing.match(/%/g)) {
    return thing.replace(/%/g, '');
  }
  return thing;
};

// Percent comparision
exports.lt = function (l, t) {
  if (exports.valid(l) && exports.valid(t)) {
    if (exports.unsign(l) < exports.unsign(t)) {
      return true;
    }
  }
  return false;
};

exports.gt = function (g, t) {
  if (exports.valid(g) && exports.valid(t)) {
    if (exports.unsign(g) > exports.unsign(t)) {
      return true;
    }
  }
  return false;
};

exports.eq = function (e, q) {
  if (exports.valid(e) && exports.valid(q)) {
    if (exports.unsign(e) == exports.unsign(q)) {
      return true;
    }
  }
  return false;
};

exports.neq = function (ne, q) {
  if (exports.valid(ne) && exports.valid(q)) {
    if (exports.unsign(ne) != exports.unsign(q)) {
      return true;
    }
  }
  return false;
};