import { Routes } from '@angular/router';
import { Junior } from './pages/junior';
import { Mid } from './pages/mid';
import { Senior } from './pages/senior';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'junior' },
  { path: 'junior', component: Junior },
  { path: 'mid', component: Mid },
  { path: 'senior', component: Senior },
];
