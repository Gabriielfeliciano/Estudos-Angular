import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotesService } from './notes.service';

// Componente com template e estilos inline (dentro do próprio .ts).
// Bom para componentes pequenos.
@Component({
  selector: 'app-note-form',
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="save()">
      <input name="text" [(ngModel)]="text" placeholder="Nova anotação" />
      <button type="submit" [disabled]="!text.trim()">Adicionar</button>
    </form>
  `,
  styles: `
    form { display: flex; gap: 8px; }
    input { flex: 1; padding: 6px 8px; border: 1px solid #ccc; border-radius: 6px; font: inherit; }
    button { padding: 6px 12px; border: 0; border-radius: 6px; background: var(--sidebar-bg); color: #fff; font: inherit; cursor: pointer; }
    button:disabled { opacity: 0.4; cursor: not-allowed; }
  `,
})
export class NoteForm {
  // inject(): pede ao Angular a instância do serviço
  private readonly notesService = inject(NotesService);

  text = '';

  save() {
    this.notesService.add(this.text.trim());
    this.text = '';
  }
}
