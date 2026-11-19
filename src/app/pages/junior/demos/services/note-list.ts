import { Component } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-note-list',
  template: `
    <ul>
      @for (note of notesService.notes; track note.id) {
        <li>
          {{ note.text }}
          <button type="button" (click)="notesService.remove(note.id)">✕</button>
        </li>
      } @empty {
        <li class="empty">Nenhuma anotação</li>
      }
    </ul>
  `,
  styles: `
    ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 6px; }
    li { display: flex; justify-content: space-between; align-items: center; padding: 8px 10px; border: 2px solid var(--ink); border-radius: 8px; background: #fff; }
    li.empty { justify-content: center; opacity: 0.6; }
    button { border: 0; background: none; cursor: pointer; font-size: 1rem; }
  `,
})
export class NoteList {
  // Outra forma de injetar: pelo construtor.
  // Funciona igual ao inject(); o inject() é a forma mais usada hoje.
  constructor(public notesService: NotesService) {}
}
