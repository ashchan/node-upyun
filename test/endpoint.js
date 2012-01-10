var tap = require("tap")
  , test = tap.test
  , endpoint = require("../lib/endpoint");

test("available endpoints", function(t) {
  t.equal("http://v0.api.upyun.com", endpoint.ENDPOINT_V0);
  t.equal("http://v1.api.upyun.com", endpoint.ENDPOINT_V1);
  t.equal("http://v2.api.upyun.com", endpoint.ENDPOINT_V2);
  t.equal("http://v3.api.upyun.com", endpoint.ENDPOINT_V3);
  t.end();
});

test("default endpoint", function(t) {
  t.equal("http://v0.api.upyun.com", endpoint.getEndpoint());
  t.end();
});

test("set endpoint", function(t) {
  endpoint.setEndpoint(endpoint.ENDPOINT_V2);
  t.equal("http://v2.api.upyun.com", endpoint.getEndpoint());
  t.end();
});
