const mongoose = require('mongoose');
const db = mongoose.connection;
const express = require('express');
const app = express();
const bodyParser=  require('body-Parser')
const fs = require('fs');

mongoose.connect('mongodb://localhost/fetcher'); // 1128?

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected!');
});

// Columns and their corresponding data types are defined in MongoDB like so:
let repoSchema = mongoose.Schema({
  userName: String,
  repos_URL: String,
  repo_name: String,
  repo_id: Number,
  repo_desc: String,
});

var Repo = mongoose.model('Repo', repoSchema);

// A model is a class with which we construct documents—for us, each document will be a repo with the properties that are declared in our schema:
var testRepo = new Repo({
  userName: 'octocat',
  repos_URL: 'https://api.github.com/users/octocat/repos',
  repo_name: "git-consortium",
  repo_id: 18221276,
  repo_desc: "This repo is for demonstration purposes only.",
  stargazers_count: 7
})

testRepo.save( function(error) {
  if (error) {
    console.error('Error', error);
  }
  console.log('Successful insertion!');
})

// This function saves a response from the GitHub API to a MongoDB:
var save = (error, result) => {
  if (error) {
    return console.error(error);
  } else {

    var Repo = mongoose.model('Repo', repoSchema);

    var nextRepo = new Repo({
      userName: result[0].owner.login,
      repos_URL: result[0].owner.repos_URL,
      repo_name: result[0].name,
      repo_id: result[0].id,
      repo_desc: result[0].description,
      stargazers_count: result[0].stargazers_count
    })

    nextRepo.save( function(error) {
      if (error) {
        console.error('Error', error);
      }
    })
    console.log('Successful insertion inside \'save\'!');
  }

}

module.exports.save = save;