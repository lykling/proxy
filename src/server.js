/**
 * Copyright (C) 2015 All rights reserved.
 *
 * @file server.js
 * @author Pride Leong<lykling.lyk@gmail.com>
 */
/* eslint-env node */

var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
var program = require('commander');
var package = require('../package.json');
program.version(package.version)
    .option('-i', '--ip', 'Listen address')
    .option('-p', '--port', 'Listen port')
    .parse(process.argv);
proxy.on('proxyReq', function (proxyReq, req, res, options) {
    proxyReq.setHeader('X-Special-Proxy-Header', 'asteria');
});
proxy.on('error', function (err, req, res) {
    console.log(err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Something went wrong. And we are reporting a custom error msg');
});
proxy.on('proxyRes', function (proxyRes, req, res, options) {
    console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});
proxy.on('open', function (proxySocket) {
});
