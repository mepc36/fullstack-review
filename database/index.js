const mongoose = require('mongoose');
const db = mongoose.connection;
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/fetcher');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // console.log('Database connected!');
});


let repoSchema = mongoose.Schema({
  userName: String,
  repos_URL: String,
  repo_name: String,
  repo_id: {type: String, unique: true},
  repo_desc: String,
  stargazers_count: Number
});

var save = (record) => {
  var Repo = mongoose.model('Repo', repoSchema);
  var nextRepo = new Repo(record);

  // findOneAndUpdate, with options' upsert?

  // or do .find() and in a callback, either insert() OR .update();
  nextRepo.save( function(error) {
    if (error) {
      console.error('Error', error);
    }
  })
}

var retrieve = (callback) => {
  var Repo = mongoose.model('Repo', repoSchema);
  
  // user .sort() to find the highest stargazer count
  Repo.find({userName: "mepc36"}).sort({stargazers_count: -1}).exec((error, result) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, result)
    }
  });
}

module.exports.save = save;
module.exports.retrieve = retrieve;