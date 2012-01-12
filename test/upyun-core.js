var tap = require("tap")
  , test = tap.test
  , core = require("../lib/upyun-core");

test("sign request", function(t) {
  var date = new Date("Wed, 24 Aug 2011 07:33:47 GMT");
  t.equal(
    core.sign("GET", "/demobucket/", date, 0, "demouser", "demopass"),
    "UpYun demouser:4d62a6f7a22f43744943fe5959f34a1b",
    "sign should be ok"
  );
  t.end();
});

test("sign request with chinese path", function(t) {
  var date = new Date("Wed, 24 Aug 2011 07:33:47 GMT");
  t.equal(
    core.sign("PUT", "/demobucket/测试.txt", date, 5, "demouser", "demopass"),
    "UpYun demouser:a125fe14bd73130c1415aca059543913",
    "sign with chinese path should be ok"
  );
  t.end();
});

test("make request", function(t) {
  t.plan(2);
  core.request("GET", "http://v0.api.upyun.com/" + process.env.BUCKET, null, process.env.USER, process.env.PASSWORD, function(err, status, data) {
    t.notOk(err, "should not have error");
    t.equal(status, 200);
  });
});
