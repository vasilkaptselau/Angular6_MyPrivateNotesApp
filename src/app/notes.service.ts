import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class NotesService {
  constructor(private http: Http) {}
    getNotes() {
      const header = new Headers({
        'Content-Type': 'application/json; charset=utf8'
      });
      return this.http.get('http://localhost:3000/notes', {
        headers: header
      })
        .map((response: Response) => response.json())
        .catch((error: Response) => {
          return Observable.throw('Server not response. Please, try again later.');
        });
    }

    addNote(notesName: string) {
      const data = {
        name: notesName,
        color: 'blue'
      };
      const header = new Headers({
        'Content-Type': 'application/json; charset=utf8'
      });
      return this.http.post('http://localhost:3000/notes', data, {
        headers: header
      })
        .map((response: Response) => response.json());
    }

    changeColor(note: any, color: string) {
      note.color = color;
      return this.http.put(`http://localhost:3000/notes/${note.id}`, note)
        .map((response: Response) => response.json());
    }
  deleteNote(note: any) {
    return this.http.delete(`http://localhost:3000/notes/${note.id}`)
      .map((response: Response) => response.json());
  }


}
