const express = require('express');
const bodyParser = require('body-parser');
let app = express();
const { getReposByUsername } = require('./github')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  var searchTerm = req.body.term

  getReposByUsername(searchTerm, (error, result) => {
    if (error) {
      console.log(Error);
    } else {
      var resultStringified = JSON.stringify(result);
      console.log('Server\'s POST Result: ' + resultStringified)
    }
  });
  res.send('\'Response sent!\' - Server');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos


});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

