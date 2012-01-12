Node.js module for upyun.com ([又拍云存储](https://www.upyun.com/)) REST APIs.

## APIs Coverage

All the following APIs are fully supported:

    * upload file
    * download file
    * delete file
    * create folder
    * delete folder
    * list files
    * get bucket stats (usages)

## Install

    npm install upyun

## Usage

### Load upyun module

    var upyun = require("upyun")
      , client = upyun("bucketname", "username", "password");

### API endpoint

By default upyun talks to http://v0.api.upyun.com, but can be set to use other endpoints if necessary:

    upyun.endpoint.getEndpoint();
    upyun.endpoint.setEndpoint(upyun.endpoint.ENDPOINT_V1);

All the available endpoints are:

    upyun.endpoint.ENDPOINT_V0;
    upyun.endpoint.ENDPOINT_V1;
    upyun.endpoint.ENDPOINT_V2;
    upyun.endpoint.ENDPOINT_V3;

### Create folder &amp; upload file

    client.createFolder("tmp", function(err, status, data) {
      // successful opertation should return staus 200
      // then upload a file (with content)
      client.uploadFile("tmp/readme.txt", "gently down the stream", function(err, status, data) {
      });
    });

or simply upload the file, with the folder created automatically:

    client.uploadFile("docs/readme.txt", "gently down the stream", function(err, status, data){});

It's certainly possible to upload from a buffer:

    var buffer = new Buffer("fill me", "binary");
    client.uploadFile("test.txt", buffer, function(err, status, data) {});

### Download a file (get file content)

    client.downloadFile("docs/readme.txt", function(err, status, data) {
      // data fetched as file content, to save to a local file:
      var buffer = new Buffer(data, "binary");
      fs.writeFile("/path/to/readme.txt", buffer, "binary", function(err) {});
    });

### Delete a file

    client.deleteFile("file.pdf", function(err, status, data) {});

### Delete a folder

    client.deleteFolder("tmp", function(err, status, data) {});

If the folder is not empty, the deletion will fail; in this case status will be 503.

### List files under a folder

    client.listFiles("docs", function(err, status, data) {
      console.log(data);
    });

Raw data from api is returned. In the future this will be parsed and returned as object (JSON?) for easier use.

To list files under root (bucket), pass null in as the first parameter:

    client.listFiles(null, function(err, status, data) {});

### Get bucket usage

`getUsage` reports bucket's space usage:

    client.getUsage(function(err, status, data) {
      console.log("bucket space used: " + data);
    });

## Run Tests

    BUCKET=yourtestbucket USER=yourusername PASSWORD=yourpassword npm test

NOTE: yourtestbucket should exist and be empty. It's better to create a test only bucket for this.

## Known Issues

    * returned data is raw (binary)

## Todo

upyun.com provides two auth methods: HTTP Basic Auth and Sign Auth. For the time being, node-upyun supports Sign Auth only.

    * support HTTP Basic Auth

<a name="license"/>

##LICENSE

(The MIT License)

Copyright (c) 2012 James Chen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
