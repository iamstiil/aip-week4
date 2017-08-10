import React, { Component } from 'react';
import axios from 'axios';
import { Button, Glyphicon, Jumbotron, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
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
        <Modal show={true}>
          <Modal.Body>
            <form>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="e.g. 'People Places Things'"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="date">
                <ControlLabel>Release date</ControlLabel>
                <FormControl
                  type="date"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="duration">
                <ControlLabel>Duration</ControlLabel>
                <FormControl
                  type="number"
                  placeholder="e.g. 90 minutes"
                  min="0"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="genre">
                <ControlLabel>Genre</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="e.g. Comedy, Science-Fiction, etc."
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="synopsis">
                <ControlLabel>Synopsis</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder=" e.g. description of the movie"
                />
                <FormControl.Feedback/>
              </FormGroup>
            </form>
          </Modal.Body>
        </Modal>
      </div>

    );
  }
}

App.defaultProps = {
  movie: false
}

export default App;
