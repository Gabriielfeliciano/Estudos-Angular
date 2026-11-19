import { Component, inject } from '@angular/core';
import { NoteForm } from './note-form';
import { NoteList } from './note-list';
import { NotesService } from './notes.service';

// Este componente junta os dois filhos. Nenhum deles conversa direto com o outro:
// o NoteForm adiciona no serviço e o NoteList lê do mesmo serviço.
@Component({
  selector: 'app-services-demo',
  imports: [NoteForm, NoteList],
  templateUrl: './services-demo.html',
  styleUrl: './services-demo.css',
})
export class ServicesDemo {
  // O pai também injeta o serviço só para mostrar o total
  protected readonly notesService = inject(NotesService);
}
