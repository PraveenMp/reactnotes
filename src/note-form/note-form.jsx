import React, { Component } from "react";
import "./note-form.css";

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: "",
      noteId: ""
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }
  handleUserInput(e) {
    this.setState({
      newNoteContent: e.target.value
    });
  }
  writeNote() {
    if (!this.state.noteId) {
      this.props.addNote(this.state.newNoteContent);
      this.setState({
        newNoteContent: ""
      });
    } else {
      this.props.updateNoteToDB(this.state.noteId, this.state.newNoteContent);
      this.setState({
        newNoteContent: "",
        noteId: ""
      });
    }
  }

  updateNotes(id, value) {
    this.setState({
      noteId: id,
      newNoteContent: value
    });
  }

  render() {
    return (
      <div className="form-wrapper">
        <input
          className="note-input"
          placeholder="write a note here..."
          onChange={this.handleUserInput}
          value={this.state.newNoteContent}
        />
        <button className="note-button" onClick={this.writeNote}>
          Add note
        </button>
      </div>
    );
  }
}

export default NoteForm;
