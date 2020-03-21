const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  const param = url.parse(req.url, true).path;
  
  let page;

  if (param === '/') {
    page = './index.html'
  } else if (param === '/about') {
    page = './about.html'
  } else if (param === '/contact') {
    page = './contact-me.html'
  } else {
    page = './404.html'
  }

  if(req.url.includes('js')) {
    let jsFile = req.url.replace('/', '');
    fs.readFile(jsFile, function(err,data){
      if (err) throw err;
      res.writeHead(200,{"Content-Type": 'text/javascript'});
      res.write(data);
      res.end();
    });
  } else if(req.url.includes('jpg')) {
    let imgFile = req.url.replace('/', '');
    fs.readFile(imgFile, function(err,data){
      if (err) throw err;
      res.writeHead(200,{"Content-Type": "image/jpg"});
      res.write(data);
      res.end();
    });
  } else if(req.url.includes('css')) {
    let cssFile = req.url.replace('/', '');
    fs.readFile(cssFile ,function(err,data){
      if (err) throw err;
      res.writeHead(200,{"Content-Type": "text/css"});
      res.write(data);
      res.end();
    });
  } else if(req.url) {
    fs.readFile(page, (err, data) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
}).listen(8080)