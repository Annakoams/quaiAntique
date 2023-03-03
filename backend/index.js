var express = require('express');
var app = express();
var db = require('./db');
var path = require('path');
const cors = require('cors');
app.use(cors({
   origin: '*'
}));
app.use('/images/',express.static(path.join(__dirname,'/images/')))


app.get('/api', function (req, res) {
   res.send('Hello World,');
});

app.get('/api/articles', async function (req, res) {
   const result = await db.getTable('articles');
   res.json(result);
});

app.get('/api/illustrations', async function (req, res) {
   const result = await db.getTable('illustrations');
   res.json(result);
});

app.get('/api/menus', async function (req, res) {
   const result = await db.getTable('menus');
   console.log('menus')
   res.json(result);
});

app.get('/api/plats', async function (req, res) {
   const result = await db.getTable('plats');
   console.log('plats')
   res.json(result);
});
app.get('/api/categories', async function (req, res) {
   const result = await db.getTable('categories');
   console.log('categories')
   res.json(result);
});

app.get('/api/article/:value', async function (req, res) {
   const result = await db.getRow('articles', 'target', req.params.value );
   res.json(result);
});

app.use('/', express.static('../frontend/build/'));

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});