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
router.get('/', function(req, res){
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log("Error connecting to DB");
      res.send(500);
    } else {
      console.log("connected");
      client.query('SELECT * From "calculator";', function(queryError, result){
        done();
        if(queryError){
          console.log("Error making query.");
          res.sendStatus(500);
        } else {
          console.log("calculator sent");
          res.send(result.rows);
        }
      });
    }
  });
}); // end function

//post function to add list item to database
router.post('/newItem', function(req, res){
  console.log(req.body);
  var description = req.body.description;
  var completed = req.body.completed;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log("Error connecting to DB");
      res.send(500);
    } else {
      console.log("connected");
      client.query("INSERT INTO list (description, completed) VALUES ($1, $2);", [description, completed], function(queryError, result){
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
});// end post function

//DELETE function to delete from search database
router.delete('/delete/:listId', function(req, res){
  console.log("in the delete function: ", req.params);
  var id = req.params.listId;
pool.connect(function(errorConnectingToDatabase, client, done){
  if(errorConnectingToDatabase) {
    console.log("Error connecting to DB");
    res.send(500);
  } else {
    console.log("connected");
    client.query('DELETE FROM list WHERE "id" = $1', [id], function(queryError, result){
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

//put function to update completed on list from false to true
router.put('/completed', function(req, res){
  console.log(req.body);
  var completed = req.body.completed;
  var id = req.body.id;
  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      console.log("Error connecting to DB");
      res.send(500);
    } else {
      console.log("connected");
      client.query('UPDATE "list" SET "completed" = $2 WHERE "id" = $1', [id, completed], function(queryError, result){
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
}); //end PUT function
