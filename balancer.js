const express = require('express');
const request = require('request');

const servers = ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002' ];
let cur = 0;





const profilerMiddleware = (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      console.log('Completed', req.method, req.url, Date.now() - start);
    });
    next();
};


const handler = (req, res) => {
    // Add an error handler for the proxied request
    const _req = request({ url: servers[cur] + req.url }).on('error', error => {
        res.status(500).send("Server chalu karo ye error aaya hai" + error.message);
    });
    req.pipe(_req).pipe(res);
    cur = (cur + 1) % servers.length;
};


const server = express().use(profilerMiddleware).get('*', handler).post('*', handler);

server.listen(8080);