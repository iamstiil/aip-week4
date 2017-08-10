import React, { Component } from 'react';
import axios from 'axios';
import { Button, Glyphicon, Jumbotron, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      movie: props.movie,
      showForm: props.showForm,
      formData: {
        title: "",
        date: "",
        duration: 0,
        genre: "",
        synopsis: ""
      }
    };
    this.openForm = this.openForm.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.saveForm = this.saveForm.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleSynopsisChange = this.handleSynopsisChange.bind(this);
  }

  openForm() {
    this.setState({ showForm: true });
  }

  closeForm() {
    this.setState({ showForm: false });
  }

  saveForm() {
    // TODO data needs to be sent to the server
    this.setState({
      movie: { ...this.state.formData }
    });
    this.closeForm();
  }

  handleTitleChange(e) {
    this.setState({
      formData: {
        ...this.state.formData,
        title: e.target.value
      }
    });
  }

  handleDateChange(e) {
    this.setState({
      formData: {
        ...this.state.formData,
        date: e.target.value
      }
    });
  }

  handleDurationChange(e) {
    this.setState({
      formData: {
        ...this.state.formData,
        duration: e.target.value
      }
    });
  }

  handleGenreChange(e) {
    this.setState({
      formData: {
        ...this.state.formData,
        genre: e.target.value
      }
    });
  }

  handleSynopsisChange(e) {
    this.setState({
      formData: {
        ...this.state.formData,
        synopsis: e.target.value
      }
    });
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
          <Button className="edit-button" bsStyle="default" onClick={this.openForm}><Glyphicon glyph="pencil" /></Button>
          <h1>{this.state.movie.title}</h1>
          <h2>Released {this.state.movie.date} - {this.state.movie.genre} - {this.state.movie.duration} minutes</h2>
          <p>{this.state.movie.synopsis}</p>
        </Jumbotron>
        <Modal show={this.state.showForm} onHide={this.closeForm}>
          <Modal.Header closeButton>
            Edit your Recommendation
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup controlId="title">
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="e.g. 'People Places Things'"
                  value={this.state.formData.title}
                  onChange={this.handleTitleChange}
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="date">
                <ControlLabel>Release date</ControlLabel>
                <FormControl
                  type="date"
                  value={this.state.formData.date}
                  onChange={this.handleDateChange}
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="duration">
                <ControlLabel>Duration</ControlLabel>
                <FormControl
                  type="number"
                  placeholder="e.g. 90 minutes"
                  min="0"
                  value={this.state.formData.duration}
                  onChange={this.handleDurationChange}
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="genre">
                <ControlLabel>Genre</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="e.g. Comedy, Science-Fiction, etc."
                  value={this.state.formData.genre}
                  onChange={this.handleGenreChange}
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="synopsis">
                <ControlLabel>Synopsis</ControlLabel>
                <FormControl
                  componentClass="textarea"
                  placeholder=" e.g. description of the movie"
                  value={this.state.formData.synopsis}
                  onChange={this.handleSynopsisChange}
                />
                <FormControl.Feedback/>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeForm}>Cancel</Button>
            <Button onClick={this.saveForm}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>

    );
  }
}

App.defaultProps = {
  movie: false,
  showForm: false
}

export default App;
