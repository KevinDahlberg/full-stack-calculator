var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: "kevindahlberg", //DB name
  host: 'localhost', //host for the DB
  port: 5432, // port for the database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config); //allows us to have more than one connection at a time

//scaffolding for GET statement.  Still needs to be set up to deal with mRecal
router.get('/mrecal', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log("Error connecting to DB");
      res.send(500);
    } else {
      console.log("connected");
      client.query('SELECT * FROM functions LIMIT 1;', function(queryError, result){
        done();
        if(queryError){
          console.log("Error making query.");
          res.sendStatus(500);
        } else {
          console.log("function sent");
          res.send(result.rows);
        }
      });
    }
  });
}); // end function

//post function to add list item to database
router.post('/madd', function(req, res){
  console.log('in post path, ', req.body);
  var name = req.body.name;
  var value = req.body.value;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log("Error connecting to DB");
      res.send(500);
    } else {
      console.log("connected");
      client.query("INSERT INTO functions (name, value) VALUES ($1, $2);", [name, value], function(queryError, result){
        done();
        if(queryError){
          console.log("Error making query.");
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});// end post function

//DELETE function to delete from search database
router.delete('/mdelete/:mID', function(req, res){
  console.log("in the delete function: ", req.params);
  var id = req.params.mID;
pool.connect(function(errorConnectingToDatabase, client, done){
  if(errorConnectingToDatabase) {
    console.log("Error connecting to DB");
    res.send(500);
  } else {
    console.log("connected");
    client.query('DELETE FROM functions WHERE "id" = $1', [id], function(queryError, result){
      done();
      if(queryError){
        console.log("Error making query.");
        res.send(500);
      } else {
        res.sendStatus(201);
      }
    });
  }
});
});// end delete function

//put function to update saved memory value in database
router.put('/mplus', function(req, res){
  console.log(req.body);
  var value = req.body.value;
  var name = req.body.name;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log("Error connecting to DB");
      res.send(500);
    } else {
      console.log("connected");
      client.query('UPDATE "functions" SET "value" = $2 WHERE "name" = $1;', [name, value], function(queryError, result){
        done();
        if(queryError){
          console.log("Error making query.");
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
}); //end PUT function

module.exports = router;
