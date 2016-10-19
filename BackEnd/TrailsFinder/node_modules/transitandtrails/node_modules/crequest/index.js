"use strict";

var zlib = require("zlib");

var copy = require("request/lib/copy"),
    _request = require("request");

var request = function(uri, options, callback) {

  //
  // Boilerplate from request
  //

  if (typeof uri === "undefined") {
    throw new Error("undefined is not a valid uri or options object.");
  }

  if ((typeof options === "function") && !callback) {
    callback = options;
  }

  if (options && typeof options === "object") {
    options.uri = uri;
  } else if (typeof uri === "string") {
    options = { uri: uri };
  } else {
    options = uri;
  }

  options = copy(options);

  // end boilerplate

  if (typeof options.callback === "function") {
    callback = options.callback;
    delete options.callback;
  }

  // provide a default callback
  callback = callback || function() {};

  options.headers = options.headers || {};

  // trigger compression
  options.headers["accept-encoding"] = "gzip,deflate";

  var request = new _request.Request(options)
    .on("response", function(res) {
      if (["gzip", "deflate"].some(function(enc) {
        return res.headers["content-encoding"] === enc;
      })) {
        // response was compressed
        this.source = res.pipe(zlib.createUnzip());
      } else {
        this.source = res;
      }

      this.dests.forEach(function(dest) {
        this.source.pipe(dest);
      }.bind(this));

      var chunks = [];

      // wire up event handlers
      this.source
        .on("data", function(chunk) {
          chunks.push(chunk);
        })
        .on("error", function(err) {
          console.warn(err.stack);
        })
        .on("end", function() {
          res.body = Buffer.concat(chunks);

          if (options.encoding === undefined ||
              Buffer.isEncoding(options.encoding)) {
            res.body = res.body.toString(options.encoding);
          }

          var body = res.body;

          // parse JSON if appropriate; res.body will contain the raw response,
          // body the parsed version
          if (res.headers['content-type'] &&
              res.headers["content-type"].indexOf("application/json") >= 0) {
            try {
              body = JSON.parse(body);
            } catch (e) {
              return callback(e);
            }
          }

          return callback(null, res, body);
        });
    });

  request.source = null;
  request.dests = [];

  request.pipe = function(dest) {
    if (this.source) {
      this.source.pipe(dest);
    } else {
      this.dests.push(dest);
    }
  };

  return request;
};

request.Request = _request.Request;

request.get = request;

["POST", "PUT", "PATCH"].forEach(function(method) {
  request[method.toLowerCase()] = function(uri, options, callback) {
    var params = _request.initParams(uri, options, callback);

    params.options.method = method;

    return request(params.uri || null, params.options, params.callback);
  };
});

// TODO head, del, defaults, forever, debug (property)

request.initParams = _request.initParams;
request.jar = _request.jar;
request.cookie = _request.cookie;

module.exports = request;
