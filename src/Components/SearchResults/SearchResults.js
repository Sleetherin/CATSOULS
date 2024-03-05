import React from 'react'
import TrackList from '../TrackList/TrackList';

export class SearchResults extends React.Component {
  render() {
    return (
      <div>
        <h2>RESULTS</h2>
        <TrackList 
        tracks={this.props.searchResults}
        onAdd={this.props.onAdd}
        isRemoval={false}
        />
      </div>
    )
  }
}

export default SearchResults
