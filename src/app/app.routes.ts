import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TopicPage } from './pages/topic-page/topic-page';
import { topicUnlocked } from './shared/progress/topic-unlocked.guard';
import { ALL_TOPICS } from './topics/topics';

export const routes: Routes = [
  { path: '', component: Home },
  // Uma rota por tópico: /topico/instalacao, /topico/roteamento...
  ...ALL_TOPICS.map((topic) => ({
    path: `topico/${topic.slug}`,
    component: TopicPage,
    data: { slug: topic.slug },
    // canActivate: só abre se o tópico anterior foi concluído
    canActivate: [topicUnlocked],
    // children: rotas filhas (o tópico de roteamento usa para o exemplo)
    children: topic.children ?? [],
  })),
  // ** (wildcard): qualquer URL que não existe volta para a home
  { path: '**', redirectTo: '' },
];
