import React from 'react';
import RepoListItem from './RepoListItem.jsx'

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <RepoListItem />
    )
  }
}

export default RepoList;