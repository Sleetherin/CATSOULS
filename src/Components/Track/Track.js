import React from 'react';
import './Track.css';


export class Track extends React.Component {
  constructor(props)
  {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction()
  {
    if(this.props.isRemoval)
    {
      return <button onClick={this.removeTrack}>-</button>
    }
    else
    {
      return (
      <button onClick={this.addTrack}>
        +
      </button>);
    }
  }

  addTrack()
  {
    this.props.onAdd(this.props.track);
  }

  removeTrack()
  {
    this.props.onRemove(this.props.track);
  }
 
  render() {
    return (
      <div className="trackStyle">
        <h3>{this.props.track.name}</h3>
        <p>{this.props.track.artist} | {this.props.track.album}</p>
        {this.renderAction()}
      </div>
      
    )
  }
}

export default Track
