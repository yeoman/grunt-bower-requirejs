/* global describe:true, it:true */

'use strict';
var fs = require('fs');
var should = require('should');
var durableJsonLint = require('durable-json-lint');

// extract the config object as a string from the actual and expected files.
// then turn the string into json so we can deeply compare the objects.
// we do this because bower does not always create the paths object's keys
// in the same order. so a pure string to string comparison will break.
var jsonify = function (str) {
  var dirtyJson = str.slice(str.indexOf('{'), str.lastIndexOf('}') + 1);
  var cleanJson = durableJsonLint(dirtyJson).json;

  return JSON.parse(cleanJson);
};

describe('index', function () {

  describe('config', function () {
    it('should return the expected result', function () {
      var actual = jsonify(fs.readFileSync('tmp/config.js', 'utf-8'));
      var expected = jsonify(fs.readFileSync('test/fixtures/config-expected.js', 'utf-8'));
      actual.should.eql(expected);
    });
  });

  describe('global-config', function () {
    it('should return the expected result', function () {
      var actual = jsonify(fs.readFileSync('tmp/global-config.js', 'utf-8'));
      var expected = jsonify(fs.readFileSync('test/fixtures/global-config-expected.js', 'utf-8'));
      actual.should.eql(expected);
    });
  });

  describe('baseurl-config', function () {
    it('should return the expected result', function () {
      var actual = jsonify(fs.readFileSync('tmp/baseurl-config.js', 'utf-8'));
      var expected = jsonify(fs.readFileSync('test/fixtures/baseurl-expected.js', 'utf-8'));
      actual.should.eql(expected);
    });
  });

  describe('pathless-config', function () {
    it('should return the expected result', function () {
      var actual = jsonify(fs.readFileSync('tmp/pathless-config.js', 'utf-8'));
      var expected = jsonify(fs.readFileSync('test/fixtures/pathless-config-expected.js', 'utf-8'));
      actual.should.eql(expected);
    });
  });

  describe('generated-config', function () {
    it('should return the expected result', function () {
      var actual = jsonify(fs.readFileSync('tmp/generated-config.js', 'utf-8'));
      var expected = jsonify(fs.readFileSync('test/fixtures/generated-config-expected.js', 'utf-8'));
      actual.should.eql(expected);
    });
  });

  describe('transitive-config', function () {
    it('should return the expected result', function () {
      var actual = jsonify(fs.readFileSync('tmp/transitive-config.js', 'utf-8'));
      var expected = jsonify(fs.readFileSync('test/fixtures/transitive-expected.js', 'utf-8'));
      actual.should.eql(expected);
    });
  });
  describe('exclude-dev-config', function () {
    it('should return the expected result', function () {
      var actual = jsonify(fs.readFileSync('tmp/exclude-dev-config.js', 'utf-8'));
      var expected = jsonify(fs.readFileSync('test/fixtures/exclude-dev-excpected.js', 'utf-8'));
      actual.should.eql(expected);
    });
  });
});
