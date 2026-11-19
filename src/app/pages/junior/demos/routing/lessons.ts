// Dados fixos do exemplo (num app real viriam de um serviço/API)
export interface Lesson {
  id: number;
  title: string;
  summary: string;
}

export const LESSONS: Lesson[] = [
  { id: 1, title: 'Rotas', summary: 'Uma rota liga um caminho da URL (path) a um componente.' },
  { id: 2, title: 'Parâmetros', summary: 'Em "aula/:id", o :id é um parâmetro: muda a cada URL e é lido com ActivatedRoute.' },
  { id: 3, title: 'Navegação', summary: 'Navegue pelo template com routerLink ou pelo código com router.navigate().' },
];
