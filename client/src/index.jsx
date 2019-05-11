import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  search (term) {
    var dataObject = { term: term };

    $.ajax({
      method: "POST",
      url: '/repos',
      data: dataObject,
      success: (result) => {
        console.log('Repos: ' + result);
        var parsedResult = JSON.parse(result);
        var newRepos = this.state.repos;
        for (var i = 0; i < parsedResult.length; i++) {
          newRepos.push(parsedResult[i]);
        }
        this.setState({
          repos: newRepos
        })
      }
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <p>There are {this.state.repos.length} repos.</p>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));