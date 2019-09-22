var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

// -----------------------------------------------------------------------------------------

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// -----------------------------------------------------------------------------------------

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 4129);

// -----------------------------------------------------------------------------------------

app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = qParams;
  res.render('get-loopback', context);
});

// -----------------------------------------------------------------------------------------

app.post('/', function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};

  var qParams1 = [];
  for (var p1 in req.body){
    qParams1.push({'name':p1,'value':req.body[p1]})
  }

  context.dataList = qParams;
  context.dataList1 = qParams1;

  res.render('post-loopback', context);
});

// -----------------------------------------------------------------------------------------

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

// -----------------------------------------------------------------------------------------

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});