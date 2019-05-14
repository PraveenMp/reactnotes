import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Note from "./note/note";
import NoteForm from "./note-form/note-form";
import { DB_CONFIG } from "./config/config";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

class App extends Component {
  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(DB_CONFIG);
    }
    this.database = firebase
      .database()
      .ref()
      .child("notes");

    this.state = {
      notes: []
    };
    this.noteContent = "";
    this.noteId = "";
    this.noteFormElement = React.createRef();
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.updateNoteToDB = this.updateNoteToDB.bind(this);
  }

  componentWillMount() {
    let previousNotes = this.state.notes;

    this.database.on("child_added", snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });
      this.setState({
        notes: previousNotes
      });
    });

    this.database.on("child_removed", snap => {
      console.log("remove");
      for (let i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes.splice(i, 1);
        }
      }
      this.setState({
        notes: previousNotes
      });
    });

    this.database.on("child_changed", snap => {
      console.log("updated");
      for (let i = 0; i < previousNotes.length; i++) {
        if (previousNotes[i].id === snap.key) {
          previousNotes[i].noteContent = snap.val().noteContent;
        }
      }
      this.setState({
        notes: previousNotes
      });
    });
  }

  addNote(note) {
    this.database.push().set({ noteContent: note });
  }

  removeNote(noteId) {
    this.database.child(noteId).remove();
  }

  updateNote(id, note) {
    this.noteFormElement.current.updateNotes(id, note);
  }

  updateNoteToDB(id, note) {
    this.database.child(id).set({ noteContent: note });
  }

  render() {
    return (
      <div className="notes-wrapper">
        <div className="notes-header">
          <div>React and Firebase Todo list</div>
        </div>
        <div className="notes-body">
          {this.state.notes.map(note => {
            return (
              <Note
                noteContent={note.noteContent}
                noteId={note.id}
                key={note.id + Math.random()}
                removeNote={this.removeNote}
                updateNote={this.updateNote}
              />
            );
          })}
        </div>
        <div className="notes-footer">
          <NoteForm
            addNote={this.addNote}
            ref={this.noteFormElement}
            noteContent={this.noteContent}
            noteId={this.noteId}
            updateNoteToDB={this.updateNoteToDB}
          />
        </div>
      </div>
    );
  }
}

export default App;
