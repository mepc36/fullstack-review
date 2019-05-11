const request = require('request');
const config = require('../config.js');
const database  = require('../database/index.js');

let getReposByUsername = (name, callback) => {

  let options = {
    url: `https://api.github.com/users/${name}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    var recordInfo = {};
    if (error) {
      callback(error, null);
    } else {
      var responseJSON = JSON.parse(response.body);
      var recordsArray = [];
      
      for ( var i = 0; i < responseJSON.length; i++) {

        if (responseJSON[i] === undefined) {
          callback('Not a user name 2!', null);
        } else {
          recordInfo = {};
          recordInfo = {
            userName: responseJSON[i].owner.login,
            repos_URL: responseJSON[i].html_url,
            repo_name: responseJSON[i].name,
            repo_id: responseJSON[i].id,
            repo_desc: responseJSON[i].description,
            stargazers_count: responseJSON[i].stargazers_count
          }
          recordsArray.push(recordInfo);
        }  
      }
      callback(null, recordsArray);
    }
  });
};

var getAllRepos = (callback) => {

  database.retrieve((error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
}

module.exports.getReposByUsername = getReposByUsername;
module.exports.getAllRepos = getAllRepos;
