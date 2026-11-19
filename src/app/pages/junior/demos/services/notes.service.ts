import { Injectable } from '@angular/core';

export interface Note {
  id: number;
  text: string;
}

// @Injectable marca a classe como um serviço que o Angular pode injetar.
// providedIn: 'root' = o Angular cria UMA instância para o app inteiro (singleton).
// Todo componente que pedir o NotesService recebe essa mesma instância.
// Gerado com: ng generate service notes
@Injectable({ providedIn: 'root' })
export class NotesService {
  private nextId = 1;

  // O estado fica no serviço, não nos componentes
  notes: Note[] = [{ id: this.nextId++, text: 'Revisar data binding' }];

  add(text: string) {
    this.notes.push({ id: this.nextId++, text });
  }

  remove(id: number) {
    this.notes = this.notes.filter((n) => n.id !== id);
  }

  get count(): number {
    return this.notes.length;
  }
}
