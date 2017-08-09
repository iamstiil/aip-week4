import React, { Component } from 'react';
import axios from 'axios';
import { Button, Glyphicon, Jumbotron } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movie: props.movie
    };
  }
  
  componentDidMount() {
    axios.get(`/`)
      .then(res => {
        console.log("fetch", res);
        this.setState((prevState, props) => {
          return {
            movie: {
              title: 'People Places Things',
              date: 'August 2015',
              duration: 85,
              genre: 'Comedy',
              synopsis: 'Will Henry is a newly single graphic novelist balancing parenting hisyoung twin daughters and a classroom full of students while exploringand navigating the rich complexities of new love and letting go of thewoman who left him.'
            }
          };
        });
      });
  }
  
  render() {
    if(!this.state.movie)
      return (
        <div className="container loading">
          <Jumbotron><Glyphicon className="spinner" glyph="refresh" /></Jumbotron>
        </div>
      );
    
    return (
      <div className="container">
        <Jumbotron>
          <Button className="edit-button" bsStyle="default"><Glyphicon glyph="pencil" /></Button>
          <h1>{this.state.movie.title}</h1>
          <h2>Released {this.state.movie.date} - {this.state.movie.genre} - {this.state.movie.duration} minutes</h2>
          <p>{this.state.movie.synopsis}</p>
        </Jumbotron>
      </div>
    );
  }
}

App.defaultProps = {
  movie: false
}

export default App;
