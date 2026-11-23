import { Routes } from '@angular/router';
import { routingDemoRoutes } from './pages/junior/demos/routing/routing-demo.routes';
import { Junior } from './pages/junior/junior';
import { Mid } from './pages/mid';
import { Senior } from './pages/senior';
import { levelUnlocked } from './shared/progress/level-unlocked.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'junior' },
  // children: rotas filhas, mostradas no <router-outlet> do exemplo de roteamento
  { path: 'junior', component: Junior, children: routingDemoRoutes },
  // canActivate: guard que só deixa entrar se o nível estiver desbloqueado
  { path: 'mid', component: Mid, canActivate: [levelUnlocked('mid')] },
  { path: 'senior', component: Senior, canActivate: [levelUnlocked('senior')] },
  // ** (wildcard): qualquer URL que não bateu acima volta para /junior
  { path: '**', redirectTo: 'junior' },
];
