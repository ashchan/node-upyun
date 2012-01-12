var crypto = require('crypto')
  , http = require('http')
  , url = require('url');

var UpyunCore = (function() {
  var md5 = function(s) {
    return crypto.createHash("md5")
      .update(s, "utf8")
      .digest("hex");
  };

  // RFC1123
  var _formatDate = function(d) {
    return d.toUTCString();
  };

  var _encodeUrl = function(u) {
    return u;
    // no encode needed!
    // return encodeURI(u);
  };

  var _sign = function(method, path, date, contentLength, username, password) {
    var signature = [
      method,
      _encodeUrl(path),
      _formatDate(date),
      contentLength.toString(),
      md5(password)
    ].join("&");
    return "UpYun " + username + ":" + md5(signature);
  };

  var _request = function(method, uri, data, username, password, callback, headerOptions) {
    if (typeof(data) == "string") {
      data = new Buffer(data, "binary");
    }

    var uri = url.parse(uri)
      , ts = new Date()
      , contentLength = data ? data.length : 0
      , options = {
        host: uri.hostname,
        path: uri.path,
        headers: {
          'Date': _formatDate(ts),
          'Authorization': _sign(method, uri.path, ts, contentLength, username, password),
          'Content-Length': contentLength,
          'Expect': ''
        },
        method: method
        //auth: basic auth
      };

    if (headerOptions) {
      for (var i in headerOptions) {
        options.headers[i] = headerOptions[i];
      }
    }

    var req = http.request(options, function(res) {
      var buffer = "";
      res.setEncoding('binary');
      res.on('data', function(chunk) {
        buffer += chunk;
      });
      res.on('end', function() {
        callback(null, res.statusCode, buffer);
      });
    });

    req.on('error', function(e) {
      callback(e);
    });

    if (data) {
      req.write(data);
    }
    req.end();
  };

  return {
    sign: function(method, path, date, contentLength, username, password) {
      return _sign(method, path, date, contentLength, username, password);
    },
    request: function(method, uri, data, username, password, callback, headerOptions) {
      return _request(method, uri, data, username, password, callback, headerOptions);
    }
  };
})();

exports.sign = UpyunCore.sign;
exports.request = UpyunCore.request;
