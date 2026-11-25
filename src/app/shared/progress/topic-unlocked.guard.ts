import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProgressService } from './progress.service';

// Guard: impede abrir um tópico trancado digitando a URL.
// Se o tópico anterior ainda não foi concluído, volta para a home.
export const topicUnlocked: CanActivateFn = (route) =>
  inject(ProgressService).isUnlocked(route.data['slug']) || inject(Router).createUrlTree(['/']);
