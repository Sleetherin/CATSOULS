import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

export class Playlist extends React.Component {

  constructor(props)
  {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);

  }

  handleNameChange(e)
  {
    this.props.onNameChange(e.target.value);
  }



  render() {
   

    return (
      <div className="listTwo">
        <input defaultValue={"NEW PLAYLIST"} onChange={this.handleNameChange}/>
        <TrackList 
        tracks={this.props.playlistTracks} 
        onRemove={this.props.onRemove}
        isRemoval={true}
        />
        <button className='save_button' onClick={this.props.onSave}>Save to playlist</button>
      </div>
    )
  }
}

export default Playlist
