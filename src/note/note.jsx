import React, { Component } from "react";
import "./note.css";
import PropTypes from "prop-types";

class Note extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent;
    this.noteId = props.noteId;
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleRemoveNote(id) {
    this.props.removeNote(id);
  }

  handleUpdate(id, note) {
    this.props.updateNote(id, note);
  }

  render() {
    return (
      <div className="note fade-in">
        <span
          className="closebtn"
          onClick={() => this.handleRemoveNote(this.noteId)}
        >
          {" "}
          &times;
        </span>
        <span
          className="closebtn"
          onClick={() => this.handleUpdate(this.noteId, this.noteContent)}
        >
          &curren;
        </span>
        <p className="noteContent">{this.noteContent}</p>
      </div>
    );
  }
}

Note.propTypes = {
  noteContent: PropTypes.string
};

export default Note;
