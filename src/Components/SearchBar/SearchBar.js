import React from 'react';
import './SearchBar.css';

export class SearchBar extends React.Component {

 constructor(props)
 {
   super(props);
   this.state={term:""};
   this.search = this.search.bind(this);
   this.handleTermChange = this.handleTermChange.bind(this);
 }

  search()
  {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e)
  {
    this.setState({ term: e.target.value });
  }

  render() {
    return (
    <div className="search">
      <input 
      placeholder="Enter a song, album, or artist"
      style={{ width:"310px", height:"31px",marginTop:"140px",fontSize:"20px",textAlign:"center"}}
      onChange={this.handleTermChange}
      />
      <button onClick={this.search}>SEARCH</button>
    </div>
    )
  }
}

export default SearchBar

