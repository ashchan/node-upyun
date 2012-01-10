var tap = require("tap")
  , test = tap.test;

test("load upyun", function(t) {
  var upyun = require("../");
  t.ok(upyun, "upyun module loaded");
  t.end();
});
