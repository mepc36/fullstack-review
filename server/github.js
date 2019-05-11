const request = require('request');
const config = require('../config.js');

let getReposByUsername = (name, callback) => {

  let options = {
    url: `https://api.github.com/users/${name}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (error, response, body) => {
    if (error) {
      console.log('gRBUN:' + error)
    } else {
      var responseJSON = JSON.parse(response.body);
      // console.log(responseJSON[0].owner.login) // repo owner's name
      // console.log(responseJSON[0].name); // repo name
      // console.log(responseJSON[0].id); // repo id
      // console.log(responseJSON[0].description) // repo description
      // console.log(responseJSON[0].html_url) // repo URL
      var recordInfo = {
        userName: responseJSON[0].owner.login,
        repos_URL: responseJSON[0].html_url,
        repo_name: responseJSON[0].name,
        repo_id: responseJSON[0].id,
        repo_desc: responseJSON[0].description,
        stargazers_count: responseJSON[0].stargazers_count
      }
      callback(null, recordInfo);
    }
  });

};

module.exports.getReposByUsername = getReposByUsername;