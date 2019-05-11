const mongoose = require('mongoose');
const db = mongoose.connection;
const express = require('express');
const app = express();
const bodyParser=  require('body-Parser')
const fs = require('fs');

mongoose.connect('mongodb://localhost/fetcher');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected!');
});

let repoSchema = mongoose.Schema({
  userName: String,
  repos_URL: String,
  repo_name: String,
  repo_id: Number,
  repo_desc: String,
  stargazers_count: Number
});

// This function saves a response from the GitHub API to a MongoDB:
var save = (record) => {
  var Repo = mongoose.model('Repo', repoSchema);
  var nextRepo = new Repo(record);

  nextRepo.save( function(error) {
    if (error) {
      console.error('Error', error);
    }
  })
  console.log('Successful insertion inside \'save\'!');
}

module.exports.save = save;