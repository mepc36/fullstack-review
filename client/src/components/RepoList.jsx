import React from 'react';
import RepoListItem from './RepoListItem.jsx'

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
      if (this.props.repos.length !== 0) {
        return (
          <ol>
            {this.props.repos.map((item) => {
              return (<RepoListItem repo={item} />)
            })}
          </ol>
        )
      } else {
        return (
          <ol>
            <RepoListItem repo={''}/>
          </ol>
        )
      }
    }
  }


export default RepoList;