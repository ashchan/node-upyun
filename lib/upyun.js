exports = module.exports = createUpyun;

var endpoint = require("./endpoint")
  , core = require("./upyun-core");

var Consumer = function() {
  var self = this
    , bucket
    , username
    , password;

  var generateUrl = function(filename) {
    var uri = endpoint.getEndpoint() + "/" + bucket + "/";
    return filename ? uri + filename : uri;
  };
  var isFunction = function(func) {
    Object.prototype.toString.call(func) === '[object Function]';
  };

  return {
    init: function(b, u, p) {
      bucket = b;
      username = u;
      password = p;
    },
    info: function() {
      return "bucket: " + bucket + ", user: " + username;
    },
    getFile: function(path, cb) {
      core.request("HEAD", generateUrl(path), null, username, password, cb);
    },
    uploadFile: function(path, data, encoding, cb) {
      if (typeof cb === 'undefined' && isFunction(encoding)) {
        cb = encoding;
        encoding = undefined;
      }
      core.request("PUT", generateUrl(path), data, username, password, cb, {
        mkdir: true,
        encoding: encoding
      });
    },
    downloadFile: function(path, cb) {
      core.request("GET", generateUrl(path), null, username, password, cb);
    },
    deleteFile: function(path, cb) {
      core.request("DELETE", generateUrl(path), null, username, password, cb);
    },
    createFolder: function(path, cb) {
      core.request("POST", generateUrl(path), null, username, password, cb, {folder: true});
    },
    deleteFolder: function(path, cb) {
      core.request("DELETE", generateUrl(path), null, username, password, cb);
    },
    // TODO: parse result instead of returning the raw data
    listFiles: function(path, cb) {
      var listed = function(err, status, data) {
        if (err || status != 200) return cb(err);
        var buffer = new Buffer(data, "binary");
        cb(err, status, buffer.toString('utf8'));
      };
      // need to add '/' after folder name, despite of the api doc
      core.request("GET", generateUrl(path ? path + "/" : null), null, username, password, listed);
    },
    getUsage: function(cb) {
      core.request("GET", generateUrl(null) + "?usage", null, username, password, cb);
    }
  }
};

function createUpyun(bucket, username, password) {
  var client = Consumer();
  client.init(bucket, username, password);

  return client;
}

exports.endpoint = endpoint;

