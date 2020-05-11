const body = require('body-parser');
const express = require('express');

const app1 = express();
const app2 = express();
const app3 = express();

const apps = [app1, app2, app3];

apps.forEach(app => {
  app.set("view engine", "ejs");
  app.use( express.static( "public" ) );
  app.use(body.json());
});


const handler = serverNum => (req, res) => {
  console.log(`server ${serverNum}`, req.method, req.url, req.body);
  res.render("index", {serverNum});
};

apps.forEach((app, i) => {
  app.get('*', handler(i+1)).post('*', handler(i+1));
  app.listen(3000+i);
});