const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const { getReposByUsername } = require('./github')
const database  = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/repos', function (req, res) {

  var searchTerm = req.body.term;

  getReposByUsername(searchTerm, (error, result) => {
    if (error) {
      console.log('Error: ' + error);
    } else {
      var resultStringified = JSON.stringify(result);
      console.log('Server\'s POST Result: \n' + resultStringified);
      for (var i = 0; i < result.length; i++) {
        database.save(result[i]);
      }
    }
    res.end(resultStringified);
  });
});

app.get('/repos', function (req, res) {
  // TODO - Write a function that sends back the top 25 repos


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

