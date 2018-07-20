import {Component} from '@angular/core';
import {NotesService} from './notes.service';

interface Notes {
  id: number;
  name: string;
  color: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  colors = [
    '#BBC6C9',
    '#C9BEBB',
    '#BFC9BB',
    '#C9BEBB',
    '#C4AFA9',
    '#BDA9C4',
    '#B0C4A9',
    '#DE8D71'
  ];
  notes: Notes[] = [];
  notesName: string = '';

  constructor(private notesService: NotesService) {}
  loadNotes() {
    this.notesService.getNotes().subscribe((notes: Notes[]) => {
      this.notes = notes;
    },
      (error) => {
        alert(error);
      }
    );
  }
  addNote() {
    this.notesService
      .addNote(this.notesName)
      .subscribe((note: Notes) => {
        this.notes.push(note);
      });
    this.notesName = '';
  }

  getRandomColor() {
    const num = Math.round(Math.random() * (this.colors.length));
    return this.colors[num];
  }

  newColor(note: Notes) {
    this.notesService.changeColor(note, this.getRandomColor())
      .subscribe((data) => {
          console.log(data);
      });
  }
  deleteNote(note: Notes) {
    this.notesService.deleteNote(note)
      .subscribe((data) => {
        this.notes = this.notes.filter(c => c.id !== note.id);
      });
  }
}
