var tap = require("tap")
  , test = tap.test
  , endpoint = require("../lib/endpoint");

test("available endpoints", function(t) {
  t.equal(endpoint.ENDPOINT_V0, "http://v0.api.upyun.com");
  t.equal(endpoint.ENDPOINT_V1, "http://v1.api.upyun.com");
  t.equal(endpoint.ENDPOINT_V2, "http://v2.api.upyun.com");
  t.equal(endpoint.ENDPOINT_V3, "http://v3.api.upyun.com");
  t.end();
});

test("default endpoint", function(t) {
  t.equal(endpoint.getEndpoint(), "http://v0.api.upyun.com");
  t.end();
});

test("set endpoint", function(t) {
  endpoint.setEndpoint(endpoint.ENDPOINT_V2);
  t.equal(endpoint.getEndpoint(), "http://v2.api.upyun.com");
  t.end();
});
