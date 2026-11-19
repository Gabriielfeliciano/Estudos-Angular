import { Routes } from '@angular/router';
import { routingDemoRoutes } from './pages/junior/demos/routing/routing-demo.routes';
import { Junior } from './pages/junior/junior';
import { Mid } from './pages/mid';
import { Senior } from './pages/senior';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'junior' },
  // children: rotas filhas, mostradas no <router-outlet> do exemplo de roteamento
  { path: 'junior', component: Junior, children: routingDemoRoutes },
  { path: 'mid', component: Mid },
  { path: 'senior', component: Senior },
  // ** (wildcard): qualquer URL que não bateu acima volta para /junior
  { path: '**', redirectTo: 'junior' },
];
