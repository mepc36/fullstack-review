import React from 'react';

class RepoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <li><a href={this.props.repo.repos_URL}>{this.props.repo.repo_name}</a></li>
    )
  }
}

export default RepoListItem;