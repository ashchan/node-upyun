var tap = require("tap")
  , test = tap.test;

test("load upyun", function(t) {
  var upyun = require("../");
  t.ok(upyun, "upyun module loaded");
  t.end();
});

test("init", function(t) {
  var upyun = require("../");
  var client = upyun("demobucket", "demouser", "demopass");
  t.equal(client.info(), "bucket: demobucket, user: demouser", "get info after init");
  t.end();
});

var upyun = require("../");
var client = upyun(process.env.BUCKET, process.env.USER, process.env.PASSWORD);
upyun.endpoint.setEndpoint(upyun.endpoint.ENDPOINT_V2);
var ts = new Date();

test("upload a file", function(t) {
  t.plan(1);
  client.uploadFile("test.txt", "test uploading " + ts, function(err, status, data) {
    t.equal(status, 200, "file should be uploaded");
  });
});

test("upload a file with buffer", function(t) {
  t.plan(1);
  var buffer = new Buffer("test uploading " + ts, "binary");
  client.uploadFile("test.txt", buffer, function(err, status, data) {
    t.equal(status, 200, "file (with buffer) should be uploaded");
  });
});

test("download a file", function(t) {
  t.plan(2);
  client.downloadFile("test.txt", function(err, status, data) {
    t.equal(status, 200, "download shuld be successful");
    t.equal(data, "test uploading " + ts, "downloaded data should be present");
  });
});

test("delete a file", function(t) {
  t.plan(1);
  client.deleteFile("test.txt", function(err, status, data) {
    t.equal(status, 200, "file should be deleted");
  });
});

test("chinese character", function(t) {
  t.plan(2);
  client.uploadFile("你好.txt", "test 中文", function(err, status, data) {
    t.equal(status, 200, "file with chinese name should be uploaded");
    client.deleteFile("你好.txt", function(err, status, data) {
      t.equal(status, 200, "file with chinese name should be deleted");
    });
  });
});

test("create a folder", function(t) {
  t.plan(1);
  client.createFolder("folder", function(err, status, data) {
    t.equal(status, 200, "folder should be created");
  });
});

test("delete a folder", function(t) {
  t.plan(1);
  client.deleteFolder("folder", function(err, status, data) {
    t.equal(status, 200, "folder shoud be deleted");
  });
});

test("cannot delete non-empty folder", function(t) {
  t.plan(2);
  client.uploadFile("folder/file.txt", "oops", function(err, status, data) {
    t.equal(status, 200, "deep level file should be uploaded");
    client.deleteFolder("folder", function(err, status, data) {
      t.equal(status, 503, "non-empty folder should not be deleted");
    });
  });
});

test("list folder", function(t) {
  t.plan(2);

  client.listFiles(null, function(err, status, data) {
    t.equal(data.substring(0, 8), "folder\tF", "should have list entries");
  });

  client.listFiles("folder", function(err, status, data) {
    t.equal(data.substring(0, 10), "file.txt\tN", "sub folder should also have list entries");
  });
});

test("get usage", function(t) {
  t.plan(1);

  client.getUsage(function(err, status, data) {
    t.ok(parseInt(data) >= 0, "should return bucket usage");
  });
});

test("clean non-empty folder", function(t) {
  t.plan(1);
  client.deleteFile("folder/file.txt", function(err, status, data) {
    client.deleteFolder("folder", function(err, status, data) {
      t.equal(status, 200, "now folder should be deleted since the file is removed");
    });
  });
});
