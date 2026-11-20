import { Component } from '@angular/core';
import { CodeFile } from '../../shared/code-viewer/code-viewer';
import { TopicCard } from '../../shared/topic-card/topic-card';
import { BindingDemo } from './demos/binding/binding-demo';
import { DirectivesDemo } from './demos/directives/directives-demo';
import { FormsDemo } from './demos/forms/forms-demo';
import { HttpDemo } from './demos/http/http-demo';
import { RoutingDemo } from './demos/routing/routing-demo';
import { ServicesDemo } from './demos/services/services-demo';

// Os arquivos dos exemplos (pasta demos/) são publicados em /code/junior
// (ver "assets" no angular.json) e o code-viewer busca o texto ao abrir cada aba.
const demo = (file: string) => `/code/junior/${file}`;

@Component({
  selector: 'app-junior',
  imports: [TopicCard, BindingDemo, DirectivesDemo, ServicesDemo, RoutingDemo, FormsDemo, HttpDemo],
  templateUrl: './junior.html',
  styleUrl: './junior.css',
})
export class Junior {
  // 01 - Instalação básica do Angular
  protected readonly installDescription = `Para criar um projeto Angular você precisa de duas coisas: o Node.js (que já vem com o npm) e o Angular CLI.

O Node.js é o ambiente que roda as ferramentas de desenvolvimento. Use a versão LTS. O npm é o gerenciador de pacotes que baixa o Angular e as outras dependências.

O Angular CLI é a ferramenta de linha de comando "ng". Com ela você cria o projeto (ng new), sobe o servidor de desenvolvimento (ng serve), gera componentes e serviços (ng generate) e faz o build (ng build).

O fluxo é: instalar o Node.js, instalar o CLI globalmente, criar o projeto com ng new, entrar na pasta e rodar ng serve. O app abre em http://localhost:4200 e recarrega sozinho a cada alteração salva.`;

  protected readonly install: CodeFile[] = [
    {
      label: '1. Pré-requisitos',
      language: 'bash',
      code: `# Baixe e instale o Node.js LTS em https://nodejs.org
# Depois confira se Node e npm estão disponíveis:
node -v     # ex.: v24.15.0
npm -v      # ex.: 11.12.1`,
    },
    {
      label: '2. Instalar o CLI',
      language: 'bash',
      code: `# Instala o Angular CLI globalmente (comando "ng")
npm install -g @angular/cli

# Confere a instalação
ng version`,
    },
    {
      label: '3. Criar o projeto',
      language: 'bash',
      code: `# Cria o projeto. O CLI pergunta:
#  - qual formato de estilo (CSS, SCSS, Sass, Less)
#  - se quer SSR (renderização no servidor)
ng new StudyAngular

# Ou sem perguntas, usando os padrões:
ng new StudyAngular --defaults`,
    },
    {
      label: '4. Rodar',
      language: 'bash',
      code: `cd StudyAngular

# Sobe o servidor de desenvolvimento
ng serve        # ou: npm start

# Abra http://localhost:4200 no navegador`,
    },
    {
      label: 'Estrutura',
      language: 'plaintext',
      code: `StudyAngular/
├── angular.json        # configuração do CLI (build, serve, assets)
├── package.json        # dependências e scripts (npm start, npm run build)
├── tsconfig.json       # configuração do TypeScript
├── public/             # arquivos estáticos (favicon, imagens)
└── src/
    ├── index.html      # página HTML principal
    ├── main.ts         # ponto de entrada: inicia o app
    ├── styles.css      # estilos globais
    └── app/
        ├── app.ts          # componente raiz (lógica)
        ├── app.html        # componente raiz (template)
        ├── app.css         # componente raiz (estilos)
        ├── app.config.ts   # providers globais (router, http...)
        └── app.routes.ts   # rotas da aplicação`,
    },
  ];

  // 02 - Componentes, templates e data binding
  protected readonly bindingDescription = `Componente é a peça básica de uma aplicação Angular. Cada tela, ou pedaço de tela, é um componente formado por três partes: a classe TypeScript (dados e lógica), o template HTML (o que aparece) e o CSS (o visual, que vale só para aquele componente).

O decorator @Component liga as três partes e define o selector, a tag usada para colocar o componente na tela. O exemplo abaixo é o componente BindingDemo, usado na página com <app-binding-demo />.

Data binding é a ligação entre a classe e o template. São quatro formas:
• Interpolação {{ valor }}: mostra no HTML o valor de uma propriedade da classe.
• Property binding [propriedade]="valor": passa um valor da classe para uma propriedade do elemento, como [disabled] ou [class.highlighted].
• Event binding (evento)="metodo()": chama um método da classe quando algo acontece, como um clique.
• Two-way binding [(ngModel)]="propriedade": junta os dois sentidos. Digitar no input muda a propriedade, e mudar a propriedade muda o input. Precisa do FormsModule.

Teste no exemplo: digite um nome, curta, destaque o card e zere. Depois veja nas abas de código onde cada binding aparece.`;

  protected readonly binding: CodeFile[] = [
    { label: 'binding-demo.html', path: demo('binding/binding-demo.html') },
    { label: 'binding-demo.css', path: demo('binding/binding-demo.css') },
    { label: 'binding-demo.ts', path: demo('binding/binding-demo.ts') },
  ];

  // 03 - Diretivas e pipes
  protected readonly directivesDescription = `Diretivas mudam o que aparece no template ou como um elemento se comporta. Pipes formatam um valor só na hora de exibir, sem alterar o dado original.

Controle de fluxo (já vem no Angular, sem import):
• @if / @else: mostra um bloco ou outro conforme uma condição.
• @for: repete um bloco para cada item de uma lista. O track é obrigatório e diz ao Angular como identificar cada item. Dentro dele existem variáveis como $index, $first e $last. O bloco @empty aparece quando a lista está vazia.
• @switch / @case / @default: escolhe um bloco conforme um valor.

Diretivas de atributo (importadas de @angular/common):
• [ngClass]: aplica várias classes CSS a partir de um objeto { classe: condição }.
• [ngStyle]: aplica estilos calculados, como a largura da barra de progresso.

Pipes, usados com | no template, como {{ valor | pipe: argumento }}:
• Prontos: uppercase, lowercase, titlecase, date, currency, number, percent, entre outros. Precisam estar no imports do componente.
• Customizados: uma classe com @Pipe e um método transform(). O exemplo cria o pipe duration, que transforma minutos em "1h 30min".

Teste no exemplo: clique em um curso para marcar como concluído e use "Esconder concluídos". Marque todos e esconda para ver o @empty.`;

  protected readonly directives: CodeFile[] = [
    { label: 'directives-demo.html', path: demo('directives/directives-demo.html') },
    { label: 'directives-demo.css', path: demo('directives/directives-demo.css') },
    { label: 'directives-demo.ts', path: demo('directives/directives-demo.ts') },
    { label: 'duration.pipe.ts', path: demo('directives/duration.pipe.ts') },
  ];

  // 04 - Serviços e injeção de dependência
  protected readonly servicesDescription = `Serviço é uma classe para lógica e dados que não pertencem a um componente só: buscar dados de uma API, guardar um estado compartilhado, regras de negócio. Componentes cuidam da tela; serviços cuidam do resto.

Injeção de dependência (DI) é o jeito como o componente recebe o serviço. Ele não cria o serviço com new; ele pede, e o Angular entrega:
• @Injectable({ providedIn: 'root' }) registra o serviço no app inteiro. O Angular cria uma única instância (singleton) na primeira vez que alguém pede.
• inject(NotesService) dentro do componente pede essa instância. Também dá para pedir pelo construtor: constructor(public notesService: NotesService). Os dois funcionam igual; o inject() é o mais usado hoje.

Como todos recebem a mesma instância, o serviço vira um ponto de estado compartilhado. No exemplo, três componentes usam o mesmo NotesService:
• app-note-form só adiciona anotações.
• app-note-list só lista e remove.
• services-demo (o pai) só mostra o total.
Nenhum deles fala direto com o outro, e mesmo assim tudo fica sincronizado.

Os componentes filhos também mostram outra forma de escrever componente: template e styles inline, dentro do próprio .ts.

Teste no exemplo: adicione e remova anotações e veja a lista e o total mudarem juntos.`;

  protected readonly services: CodeFile[] = [
    { label: 'notes.service.ts', path: demo('services/notes.service.ts') },
    { label: 'services-demo.html', path: demo('services/services-demo.html') },
    { label: 'services-demo.css', path: demo('services/services-demo.css') },
    { label: 'services-demo.ts', path: demo('services/services-demo.ts') },
    { label: 'note-form.ts', path: demo('services/note-form.ts') },
    { label: 'note-list.ts', path: demo('services/note-list.ts') },
  ];

  // 05 - Roteamento simples
  protected readonly routingDescription = `O Router troca o componente exibido conforme a URL, sem recarregar a página. É o que faz um app Angular ter várias "páginas".

Rotas: em app.routes.ts, cada rota liga um path a um component. O app.config.ts entrega essas rotas ao Angular com provideRouter(routes). Algumas rotas úteis:
• redirectTo: redireciona um caminho para outro (o '' vai para 'junior').
• children: rotas filhas, mostradas dentro do componente da rota pai.
• '**' (wildcard): pega qualquer URL que não existe.

Onde o componente aparece: no <router-outlet />. O app.html tem um para as páginas (Junior, Mid, Senior), e o exemplo abaixo tem outro para as rotas filhas.

Parâmetros: em 'aula/:id', o :id muda conforme a URL (/junior/aula/1, /junior/aula/2). O componente lê o valor com ActivatedRoute.paramMap, que avisa a cada mudança.

Navegação:
• No template, com [routerLink]. O routerLinkActive marca o link da rota atual (é assim que a sidebar destaca Junior, Mid ou Senior).
• No código, com router.navigate(), útil depois de uma ação como salvar ou fazer login.

Teste no exemplo: clique nas aulas, use os botões e repare na URL do navegador. Tente a aula inexistente e depois o "Limpar".`;

  protected readonly routing: CodeFile[] = [
    {
      label: 'app.routes.ts',
      language: 'typescript',
      code: `import { Routes } from '@angular/router';
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
];`,
    },
    { label: 'routing-demo.routes.ts', path: demo('routing/routing-demo.routes.ts') },
    { label: 'routing-demo.html', path: demo('routing/routing-demo.html') },
    { label: 'routing-demo.css', path: demo('routing/routing-demo.css') },
    { label: 'routing-demo.ts', path: demo('routing/routing-demo.ts') },
    { label: 'lesson-detail.ts', path: demo('routing/lesson-detail.ts') },
    { label: 'lessons.ts', path: demo('routing/lessons.ts') },
  ];

  // 06 - Formulários template-driven e reactive
  protected readonly formsDescription = `O Angular tem duas formas de criar formulários. As duas fazem a mesma coisa (ler valores, validar, mostrar erros); muda onde o formulário é definido.

Template-driven (FormsModule):
• O formulário vive no HTML. Cada campo usa [(ngModel)] e precisa de um name.
• As validações são atributos do HTML: required, minlength, email...
• Variáveis de template dão acesso ao estado: #f="ngForm" para o formulário e #nameCtrl="ngModel" para um campo.
• Bom para formulários simples.

Reactive (ReactiveFormsModule):
• O formulário vive na classe: FormBuilder cria um FormGroup com um FormControl por campo, cada um com valor inicial e Validators.
• O HTML só liga as partes: [formGroup] no <form> e formControlName em cada campo.
• Mais controle e mais fácil de testar e de crescer. É o mais usado em formulários grandes.

Nos dois casos:
• Cada campo tem estados: valid/invalid, touched (o usuário saiu do campo) e dirty (o valor mudou). Mostrar o erro só com touched evita erro antes de digitar.
• O Angular coloca classes CSS sozinho, como ng-invalid e ng-touched, usadas aqui para deixar a borda vermelha.
• (ngSubmit) chama o método de envio.

Teste no exemplo: clique nos campos e saia sem preencher, digite um e-mail inválido e envie. Os blocos cinza mostram o valor e o estado de cada formulário em tempo real.`;

  protected readonly forms: CodeFile[] = [
    { label: 'template-form.html', path: demo('forms/template-form.html') },
    { label: 'template-form.ts', path: demo('forms/template-form.ts') },
    { label: 'reactive-form.html', path: demo('forms/reactive-form.html') },
    { label: 'reactive-form.ts', path: demo('forms/reactive-form.ts') },
    { label: 'form.css', path: demo('forms/form.css') },
    { label: 'forms-demo.html', path: demo('forms/forms-demo.html') },
    { label: 'forms-demo.css', path: demo('forms/forms-demo.css') },
    { label: 'forms-demo.ts', path: demo('forms/forms-demo.ts') },
  ];

  // 07 - HttpClient para consumir APIs
  protected readonly httpDescription = `HttpClient é o serviço do Angular para conversar com APIs: buscar, enviar, atualizar e apagar dados pela rede.

Configuração: o app.config.ts precisa ter provideHttpClient() nos providers. Sem isso, inject(HttpClient) dá erro.

Métodos principais, um para cada verbo HTTP:
• get<T>(url): busca dados.
• post<T>(url, corpo): cria um registro.
• put<T>(url, corpo) e patch<T>(url, corpo): atualizam um registro.
• delete<T>(url): apaga um registro.
O <T> informa o tipo da resposta, então o TypeScript sabe que campos ela tem. Parâmetros de query (?_limit=5) vão em { params: {...} }.

Observable: os métodos não devolvem os dados direto, devolvem um Observable. A requisição só sai quando alguém chama subscribe(), que recebe:
• next: a resposta, quando dá certo.
• error: um HttpErrorResponse, quando falha. O err.status traz o código HTTP (404, 500...).

Boa prática: as chamadas ficam num serviço (users-api.service.ts) e o componente só chama o serviço e cuida da tela: os estados de carregando, erro e dados.

O exemplo usa a jsonplaceholder, uma API pública de testes. Ela precisa de internet, e o POST é de mentira: a API devolve o objeto com um id novo, mas não salva nada.

Teste no exemplo: busque os usuários, clique em um para ver o detalhe, force o erro 404 e crie um post. Para ver as requisições de verdade, abra o DevTools (F12) na aba Network.`;

  protected readonly http: CodeFile[] = [
    {
      label: 'app.config.ts',
      language: 'typescript',
      code: `import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient() // habilita o HttpClient no app inteiro
  ]
};`,
    },
    { label: 'users-api.service.ts', path: demo('http/users-api.service.ts') },
    { label: 'http-demo.html', path: demo('http/http-demo.html') },
    { label: 'http-demo.css', path: demo('http/http-demo.css') },
    { label: 'http-demo.ts', path: demo('http/http-demo.ts') },
  ];
}
