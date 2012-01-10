var domain = "api.upyun.com"
  , ENDPOINT_V0 = "http://v0." + domain
  , ENDPOINT_V1 = "http://v1." + domain
  , ENDPOINT_V2 = "http://v2." + domain
  , ENDPOINT_V3 = "http://v3." + domain;

exports.ENDPOINT_V0 = ENDPOINT_V0;
exports.ENDPOINT_V1 = ENDPOINT_V1;
exports.ENDPOINT_V2 = ENDPOINT_V2;
exports.ENDPOINT_V3 = ENDPOINT_V3;

var current;

exports.setEndpoint = function(e) {
  current = e;
};

exports.getEndpoint = function() {
  return current || ENDPOINT_V0;
}
