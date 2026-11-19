import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson, LESSONS } from './lessons';

// Componente carregado pela rota "aula/:id" (ver routing-demo.routes.ts)
@Component({
  selector: 'app-lesson-detail',
  template: `
    @if (lesson) {
      <h4>Aula {{ lesson.id }}: {{ lesson.title }}</h4>
      <p>{{ lesson.summary }}</p>
    } @else {
      <p>Aula {{ id }} não existe.</p>
    }
  `,
  styles: `
    h4 { margin: 0 0 4px; }
    p { margin: 0; }
  `,
})
export class LessonDetail {
  // ActivatedRoute: informações da rota ativa (parâmetros, query params...)
  private readonly route = inject(ActivatedRoute);

  id = 0;
  lesson?: Lesson;

  constructor() {
    // paramMap é um Observable: avisa toda vez que o parâmetro muda.
    // Importante porque, ao ir de /aula/1 para /aula/2, o Angular reaproveita
    // este mesmo componente em vez de criar outro.
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      this.lesson = LESSONS.find((l) => l.id === this.id);
    });
  }
}
