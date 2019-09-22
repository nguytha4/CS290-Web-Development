var express = require('express');
var mysql = require('./dbcon.js');
var request = require('request');
var cors = require('cors');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8743);

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// --------------------------------------------------------------------------------------------------------------------------------------

// CORS

app.use(cors({origin: 'http://web.engr.oregonstate.edu'}));
//app.use(cors({origin: 'null'}));

/*

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");   
  //res.header("Content-Type", "application/json;charset=utf-8");  
  //res.status(204);//important
  //res.end()
  next();
});

*/

// --------------------------------------------------------------------------------------------------------------------------------------

///http://localhost:3000/insert?a=Bicep+Curls&b=10&c=15&d=2017-1-1&e=true
app.post('/insert',function(req,res,next){
  
  var context = {};

  console.log(req.body.a);
  console.log(req.body.b);
  console.log(req.body.c);
  console.log(req.body.d);
  console.log(req.body.e);
  
  mysql.pool.query("INSERT INTO workouts (`name`, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)", [req.body.a, req.body.b, req.body.c, req.body.d, req.body.e], 
    function(err, result){
    if(err){
      next(err);
      return;
    }

   newID = result.insertId;

  mysql.pool.query('SELECT *, DATE_FORMAT(date,"%m-%d-%Y") AS newdate FROM workouts WHERE id=?', [newID], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context = rows;
    console.log(context);
    res.json(context);

  });

    //context.results = "Inserted id " + result.insertId;
  });
});

// --------------------------------------------------------------------------------------------------------------------------------------

// Create table by using SELECT

app.get('/',function(req,res,next){

  var context = {};

  mysql.pool.query('SELECT *, DATE_FORMAT(date,"%m-%d-%Y") AS newdate FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context = rows;
    console.log(context);
	  res.json(context);

  });
});


// --------------------------------------------------------------------------------------------------------------------------------------


///http://localhost:3000/insert?a=Bicep+Curls&b=10&c=15&d=2017-1-1&e=true
app.get('/insert',function(req,res,next){
  
  var context = {};
  
  mysql.pool.query("INSERT INTO workouts (`name`, reps, weight, date, lbs) VALUES (?, ?, ?, ?, ?)", [req.query.a, req.query.b, req.query.c, req.query.d, req.query.e], 
    function(err, result){
    if(err){
      next(err);
      return;
    }
    
    context.results = "Inserted id " + result.insertId;
    res.render('home',context);
  });
});


// --------------------------------------------------------------------------------------------------------------------------------------

app.post('/delete',function(req,res,next){
  var context = {};

  console.log(req.body);
  console.log(req.body.id);

  mysql.pool.query("DELETE FROM workouts WHERE id=?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = "Deleted " + result.changedRows + " rows.";
    console.log("Delete success!!!!");
    res.send(context.results);
  });
});

// --------------------------------------------------------------------------------------------------------------------------------------

///safe-update?id=1&name=The+Task&done=false
app.post('/safe-update',function(req,res,next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.body.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.body.name || curVals.name, req.body.reps || curVals.reps, req.body.weight || curVals.weight, req.body.date || curVals.date, req.body.lbs || curVals.lbs, req.body.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        console.log("Update success!!!!");
        //res.render('home',context);
      });
    }

  mysql.pool.query('SELECT *, DATE_FORMAT(date,"%m-%d-%Y") AS newdate FROM workouts WHERE id=?', [req.body.id], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context = rows;
    console.log("Post-update success!!!!!")
    res.json(context);

  });



  });

});

// --------------------------------------------------------------------------------------------------------------------------------------

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      //res.render('home',context);
    })
  });
});

// --------------------------------------------------------------------------------------------------------------------------------------

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// --------------------------------------------------------------------------------------------------------------------------------------

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
