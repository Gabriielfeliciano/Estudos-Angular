import { Routes } from '@angular/router';
import { LessonDetail } from './lesson-detail';

// Rotas filhas do exemplo. Elas entram dentro da rota do tópico (topico/roteamento) no app.routes.ts,
// então a URL final fica: /topico/roteamento/aula/1, /topico/roteamento/aula/2...
export const routingDemoRoutes: Routes = [
  // :id é um parâmetro de rota (o valor muda conforme a URL)
  { path: 'aula/:id', component: LessonDetail },
];
