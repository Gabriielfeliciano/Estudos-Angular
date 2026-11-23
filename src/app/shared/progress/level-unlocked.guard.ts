import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Level } from './curriculum';
import { ProgressService } from './progress.service';

// Guard: impede abrir um nível trancado digitando a URL (/mid, /senior).
// Se estiver trancado, manda de volta para /junior.
export const levelUnlocked =
  (level: Level): CanActivateFn =>
  () =>
    inject(ProgressService).isUnlocked(level) || inject(Router).createUrlTree(['/junior']);
