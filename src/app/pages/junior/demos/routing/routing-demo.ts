import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LESSONS } from './lessons';

@Component({
  selector: 'app-routing-demo',
  // RouterLink, RouterLinkActive e RouterOutlet são diretivas do router
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './routing-demo.html',
  styleUrl: './routing-demo.css',
})
export class RoutingDemo {
  // Router: serviço para navegar pelo código
  private readonly router = inject(Router);

  lessons = LESSONS;

  // Navegação pelo código: útil depois de uma ação (salvar, login, etc.)
  goToRandom() {
    const id = Math.ceil(Math.random() * this.lessons.length);
    this.router.navigate(['/junior/aula', id]);
  }

  goToMissing() {
    this.router.navigate(['/junior/aula', 99]);
  }
}
