const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const github = require('./github');
const database  = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/repos', function (req, res) {

  var searchTerm = req.body.term;

  github.getReposByUsername(searchTerm, (error, result) => {
    if (error) {
      console.log('Error: ' + error);
      var errorStringified = JSON.stringify(error);
      res.status(500);
      res.end(errorStringified);
    } else {
      var resultStringified = JSON.stringify(result);
      for (var i = 0; i < result.length; i++) {
        // make database.save return a promise
        // push those promises into an array
        // After that array is done, pass that array into Promise.all();
        // Then call res.status(200)
        database.save(result[i]);
      }
    }

    res.status(200);
    res.end(resultStringified);
  });
});

app.get('/repos', function (req, res) {
  
  github.getAllRepos((error, result) => {
    if (error) {

      var errorStringified = JSON.stringify(error);
      res.status(500);
      res.end(errorStringified);
    } else {
      var resultStringified = JSON.stringify(result);
      res.status(200);
      res.end(resultStringified);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`Listening on port ${port}!`);
});

