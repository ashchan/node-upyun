Node.js module for upyun.com REST APIs.

## Install

    npm install upyun

## APIs Coverage

All the following APIs are to be fully provided:

    * upload file
    * download file
    * delete file
    * create folder
    * delete folder
    * list files
    * get bucket stats (usages)

## Usage

    Todo

  upyun.com provides two auth methods: HTTP Basic Auth and Sign Auth. For the time being, node-upyun supports Sign Auth only.

## Run Tests

    BUCKET=yourtestbucket USER=yourusername PASSWORD=yourpassword npm test

yourtestbucket should exist. It's better to create a test only bucket for this.

## Todo

    * support HTTP Basic Auth

## LICENSE

(The MIT License)

Copyright (c) 2012 James Chen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
