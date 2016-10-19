"use strict";

var assert = require("assert");
var express = require("express"),
    request = require("..");

describe("request", function() {
  describe("with a compressed response", function() {
    var server,
        expectedBody = "ok";

    before(function(callback) {
      var app = express();
      app.use(express.compress({
        // default threshold is 1024, so small responses won't compress
        threshold: 0
      }));

      app.get("/", function(req, res) {
        assert.ok(req.headers["accept-encoding"]);

        return res.send(expectedBody);
      });

      server = app.listen(8080, callback);
    });

    after(function(callback) {
      server.close(callback);
    });

    it("should return the uncompressed response as the body", function(done) {
      request("http://localhost:8080/", function(err, res, body) {
        assert.ok(res.headers["content-encoding"].indexOf("gzip") >= 0);
        assert.equal(expectedBody, body);

        done();
      });
    });
  });

  describe("with an uncompressed response", function() {
    var server,
        expectedBody = "ok";

    before(function(callback) {
      var app = express();

      app.get("/", function(req, res) {
        return res.send(expectedBody);
      });

      server = app.listen(8080, callback);
    });

    after(function(callback) {
      server.close(callback);
    });

    it("should return the body", function(done) {
      request("http://localhost:8080/", function(err, res, body) {
        assert.ok(res.headers["content-encoding"] === undefined);
        assert.equal(expectedBody, body);

        done();
      });
    });
  });

  describe("with a JSON response", function() {
    var server,
      json = {
        json: true
      };

    before(function(callback) {
      var app = express();

      app.get("/", function(req, res) {
        return res.json(json);
      });

      server = app.listen(8080, callback);
    });

    after(function(callback) {
      server.close(callback);
    });

    it("should parse the response into the body argument", function(done) {
      request("http://localhost:8080/", function(err, res, body) {
        assert.deepEqual(json, body);

        done();
      });
    });

    it("should leave the response body in whatever encoding was requested", function(done) {
      request("http://localhost:8080/", function(err, res, body) {
        assert.equal(JSON.stringify(json, null, 2), res.body);

        done();
      });
    });
  });
});
