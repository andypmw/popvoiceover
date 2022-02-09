import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div>
        <audio controls>
          <source src={this.props.url} />
        </audio>
      </div>
    );
  }
}
