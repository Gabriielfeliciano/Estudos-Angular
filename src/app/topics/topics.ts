import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { CodeFile } from '../shared/code-viewer/code-viewer';
import { BindingDemo } from '../pages/junior/demos/binding/binding-demo';
import { DirectivesDemo } from '../pages/junior/demos/directives/directives-demo';
import { FormsDemo } from '../pages/junior/demos/forms/forms-demo';
import { HttpDemo } from '../pages/junior/demos/http/http-demo';
import { RoutingDemo } from '../pages/junior/demos/routing/routing-demo';
import { routingDemoRoutes } from '../pages/junior/demos/routing/routing-demo.routes';
import { ServicesDemo } from '../pages/junior/demos/services/services-demo';
import { SignalsDemo } from '../pages/junior/demos/signals/signals-demo';
import { TsDemo } from '../pages/junior/demos/typescript/ts-demo';

// Conteúdo do curso: grupos (seções do menu) e tópicos (uma página cada).
// A ordem aqui é a ordem do "jogo": cada tópico só desbloqueia quando o anterior é concluído.

export interface Topic {
  /** Parte da URL: /topico/<slug> */
  slug: string;
  /** Título completo, no topo da página. */
  title: string;
  /** Nome curto, no menu. */
  menuLabel: string;
  /** Uma frase sobre o tópico (home e cabeçalho da página). */
  summary: string;
  /** Explicação. Cada parágrafo (separado por linha em branco) vira um bloco na página. */
  explanation: string;
  /** Exemplo executável, se o tópico tiver. */
  demo?: Type<unknown>;
  /** O que fazer no exemplo. */
  tryIt?: string;
  /** Abas de código. */
  files: CodeFile[];
  /** Rotas filhas usadas pelo exemplo (só o de roteamento tem). */
  children?: Routes;
}

export interface TopicGroup {
  id: string;
  label: string;
  topics: Topic[];
}

// Os arquivos dos exemplos são publicados em /code/demos (ver "assets" no angular.json)
// e o code-viewer busca o texto ao abrir cada aba.
const demo = (file: string) => `/code/demos/${file}`;

export const GROUPS: TopicGroup[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    topics: [
      {
        slug: 'instalacao',
        title: 'Instalação e Angular CLI',
        menuLabel: 'Instalação e CLI',
        summary: 'Prepare o ambiente e conheça os comandos ng que você vai usar o tempo todo.',
        explanation: `Para criar um projeto Angular você precisa de duas coisas: o Node.js (que já vem com o npm) e o Angular CLI.

O Node.js é o ambiente que roda as ferramentas de desenvolvimento. Use a versão LTS. O npm é o gerenciador de pacotes que baixa o Angular e as outras dependências.

O Angular CLI é a ferramenta de linha de comando "ng". Os comandos principais:
• ng new: cria o projeto.
• ng serve: sobe o servidor de desenvolvimento.
• ng generate (ou ng g): cria componentes, serviços, pipes e outros arquivos já no padrão do Angular.
• ng build: gera a versão de produção na pasta dist/.

O fluxo é: instalar o Node.js, instalar o CLI globalmente, criar o projeto com ng new, entrar na pasta e rodar ng serve. O app abre em http://localhost:4200 e recarrega sozinho a cada alteração salva.`,
        files: [
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
            label: '5. Gerar código',
            language: 'bash',
            code: `# ng generate (ou ng g) cria os arquivos já no padrão do Angular
ng generate component pages/perfil   # pasta perfil/ com perfil.ts, .html, .css e .spec.ts
ng generate service services/notes   # notes.ts (classe @Injectable) + notes.spec.ts
ng generate pipe pipes/duration      # duration-pipe.ts (classe @Pipe) + duration-pipe.spec.ts
ng generate interface models/user    # user.ts (interface)

# Forma curta: g = generate, c = component, s = service, p = pipe
ng g c pages/perfil

# Opções úteis
ng g c pages/perfil --skip-tests     # não cria o .spec.ts
ng g c pages/perfil --inline-template --inline-style   # tudo dentro do .ts
ng g c pages/perfil --dry-run        # só mostra o que seria criado, sem criar`,
          },
          {
            label: '6. Build',
            language: 'bash',
            code: `# Gera a versão de produção (otimizada e minificada)
ng build        # ou: npm run build

# O resultado vai para:
# dist/StudyAngular/browser/
#   index.html, main-XXXX.js, styles-XXXX.css...
#
# É essa pasta que se publica num servidor ou numa hospedagem (Vercel, Netlify...).
# O ng serve é só para desenvolvimento; ele não gera a pasta dist.`,
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
        ],
      },
      {
        slug: 'typescript',
        title: 'TypeScript básico para Angular',
        menuLabel: 'TypeScript',
        summary: 'Tipos, interfaces, generics e classes: a base de todo código Angular.',
        explanation: `Angular é escrito em TypeScript: JavaScript com tipos. Os tipos não existem quando o app roda; servem para o editor e o build acharem erros antes, e para o autocomplete saber o que cada coisa tem.

Tipos e union types:
• Tipos básicos: string, number, boolean e arrays como number[]. Muitas vezes o TypeScript deduz o tipo sozinho.
• Union type: type Level = 'junior' | 'mid' | 'senior' só aceita esses valores.

Interfaces: descrevem o formato de um objeto (Student, User, Course...). O ? marca um campo opcional (email?), e o operador ?? dá um valor padrão quando ele não existe. Você vai ver interfaces em quase todos os próximos tópicos.

Funções:
• Parâmetros e retorno tipados: function contar(lista: Student[]): number.
• Arrow functions: (s) => s.level === 'junior'. Usadas o tempo todo em filter, map e find.

Generics: <T> é um tipo variável. pickRandom<T>(lista: T[]): T funciona com qualquer lista e devolve o tipo certo. Você vai reencontrar isso em http.get<User[]>(), no tópico de HttpClient.

Classes: componentes, serviços e pipes são classes.
• private: só a própria classe usa. protected: a classe e o template do componente.
• readonly: não muda depois de criado.
• constructor: roda quando a instância é criada.
• get: propriedade calculada, lida sem parênteses.

Decorators: @Component, @Injectable e @Pipe são decorators. Eles ficam em cima da classe e dizem ao Angular o que ela é.`,
        demo: TsDemo,
        tryIt:
          'Troque o Level, sorteie e ganhe XP. No arquivo models.ts há linhas comentadas com erros que o TypeScript impede: descomente uma no editor para ver o aviso.',
        files: [
          { label: 'models.ts', path: demo('typescript/models.ts') },
          { label: 'utils.ts', path: demo('typescript/utils.ts') },
          { label: 'xp-counter.ts', path: demo('typescript/xp-counter.ts') },
          { label: 'ts-demo.html', path: demo('typescript/ts-demo.html') },
          { label: 'ts-demo.css', path: demo('typescript/ts-demo.css') },
          { label: 'ts-demo.ts', path: demo('typescript/ts-demo.ts') },
        ],
      },
    ],
  },
  {
    id: 'first-steps',
    label: 'First Steps',
    topics: [
      {
        slug: 'componentes',
        title: 'Componentes, templates e data binding',
        menuLabel: 'Componentes',
        summary: 'A peça básica do Angular e as quatro formas de ligar a classe ao HTML.',
        explanation: `Componente é a peça básica de uma aplicação Angular. Cada tela, ou pedaço de tela, é um componente formado por três partes: a classe TypeScript (dados e lógica), o template HTML (o que aparece) e o CSS (o visual, que vale só para aquele componente).

O decorator @Component liga as três partes e define o selector, a tag usada para colocar o componente na tela. O exemplo desta página é o componente BindingDemo, usado com <app-binding-demo />.

Data binding é a ligação entre a classe e o template. São quatro formas:
• Interpolação {{ valor }}: mostra no HTML o valor de uma propriedade da classe.
• Property binding [propriedade]="valor": passa um valor da classe para uma propriedade do elemento, como [disabled] ou [class.highlighted].
• Event binding (evento)="metodo()": chama um método da classe quando algo acontece, como um clique.
• Two-way binding [(ngModel)]="propriedade": junta os dois sentidos. Digitar no input muda a propriedade, e mudar a propriedade muda o input. Precisa do FormsModule.`,
        demo: BindingDemo,
        tryIt:
          'Digite um nome, curta, destaque o card e zere. Depois veja no código onde cada binding aparece.',
        files: [
          { label: 'binding-demo.html', path: demo('binding/binding-demo.html') },
          { label: 'binding-demo.css', path: demo('binding/binding-demo.css') },
          { label: 'binding-demo.ts', path: demo('binding/binding-demo.ts') },
        ],
      },
      {
        slug: 'diretivas',
        title: 'Diretivas (@if, @for, ngClass...) e pipes',
        menuLabel: 'Diretivas e pipes',
        summary: 'Mostrar, repetir e estilizar partes do template, e formatar valores na exibição.',
        explanation: `Diretivas mudam o que aparece no template ou como um elemento se comporta. Pipes formatam um valor só na hora de exibir, sem alterar o dado original.

Controle de fluxo (já vem no Angular, sem import):
• @if / @else: mostra um bloco ou outro conforme uma condição.
• @for: repete um bloco para cada item de uma lista. O track é obrigatório e diz ao Angular como identificar cada item. Dentro dele existem variáveis como $index, $first e $last. O bloco @empty aparece quando a lista está vazia.
• @switch / @case / @default: escolhe um bloco conforme um valor.

Diretivas de atributo (importadas de @angular/common):
• [ngClass]: aplica várias classes CSS a partir de um objeto { classe: condição }.
• [ngStyle]: aplica estilos calculados, como a largura da barra de progresso.

Pipes, usados com | no template, como {{ valor | pipe: argumento }}:
• Prontos: uppercase, lowercase, titlecase, date, currency, number, percent, entre outros. Precisam estar no imports do componente.
• Customizados: uma classe com @Pipe e um método transform(). O exemplo cria o pipe duration, que transforma minutos em "1h 30min".`,
        demo: DirectivesDemo,
        tryIt:
          'Clique em um curso para marcar como concluído e use "Esconder concluídos". Marque todos e esconda para ver o @empty.',
        files: [
          { label: 'directives-demo.html', path: demo('directives/directives-demo.html') },
          { label: 'directives-demo.css', path: demo('directives/directives-demo.css') },
          { label: 'directives-demo.ts', path: demo('directives/directives-demo.ts') },
          { label: 'duration.pipe.ts', path: demo('directives/duration.pipe.ts') },
        ],
      },
      {
        slug: 'servicos',
        title: 'Serviços e injeção de dependência básica',
        menuLabel: 'Serviços e DI',
        summary: 'Tirar lógica e estado dos componentes e compartilhar entre eles.',
        explanation: `Serviço é uma classe para lógica e dados que não pertencem a um componente só: buscar dados de uma API, guardar um estado compartilhado, regras de negócio. Componentes cuidam da tela; serviços cuidam do resto.

Injeção de dependência (DI) é o jeito como o componente recebe o serviço. Ele não cria o serviço com new; ele pede, e o Angular entrega:
• @Injectable({ providedIn: 'root' }) registra o serviço no app inteiro. O Angular cria uma única instância (singleton) na primeira vez que alguém pede.
• inject(NotesService) dentro do componente pede essa instância. Também dá para pedir pelo construtor: constructor(public notesService: NotesService). Os dois funcionam igual; o inject() é o mais usado hoje.

Como todos recebem a mesma instância, o serviço vira um ponto de estado compartilhado. No exemplo, três componentes usam o mesmo NotesService:
• app-note-form só adiciona anotações.
• app-note-list só lista e remove.
• services-demo (o pai) só mostra o total.
Nenhum deles fala direto com o outro, e mesmo assim tudo fica sincronizado.

Os componentes filhos também mostram outra forma de escrever componente: template e styles inline, dentro do próprio .ts.`,
        demo: ServicesDemo,
        tryIt: 'Adicione e remova anotações e veja a lista e o total mudarem juntos.',
        files: [
          { label: 'notes.service.ts', path: demo('services/notes.service.ts') },
          { label: 'services-demo.html', path: demo('services/services-demo.html') },
          { label: 'services-demo.css', path: demo('services/services-demo.css') },
          { label: 'services-demo.ts', path: demo('services/services-demo.ts') },
          { label: 'note-form.ts', path: demo('services/note-form.ts') },
          { label: 'note-list.ts', path: demo('services/note-list.ts') },
        ],
      },
      {
        slug: 'roteamento',
        title: 'Roteamento simples (rotas, parâmetros, navegação)',
        menuLabel: 'Roteamento',
        summary: 'Várias "páginas" num app só: rotas, parâmetros na URL e navegação.',
        explanation: `O Router troca o componente exibido conforme a URL, sem recarregar a página. É o que faz um app Angular ter várias "páginas", como cada tópico deste site.

Rotas: em app.routes.ts, cada rota liga um path a um component. O app.config.ts entrega essas rotas ao Angular com provideRouter(routes). Algumas opções úteis:
• redirectTo: redireciona um caminho para outro.
• children: rotas filhas, mostradas dentro do componente da rota pai.
• canActivate: um guard que decide se a rota pode abrir. É ele que tranca os tópicos ainda não liberados.
• '**' (wildcard): pega qualquer URL que não existe.

Onde o componente aparece: no <router-outlet />. O app.html tem um para as páginas, e o exemplo desta página tem outro para as rotas filhas.

Parâmetros: em 'aula/:id', o :id muda conforme a URL (/topico/roteamento/aula/1, /topico/roteamento/aula/2). O componente lê o valor com ActivatedRoute.paramMap, que avisa a cada mudança.

Navegação:
• No template, com [routerLink]. O routerLinkActive marca o link da rota atual.
• No código, com router.navigate(), útil depois de uma ação como salvar ou fazer login. O botão de ir para o próximo tópico usa isso.`,
        demo: RoutingDemo,
        tryIt:
          'Clique nas aulas, use os botões e repare na URL do navegador. Tente a aula inexistente e depois o "Limpar".',
        children: routingDemoRoutes,
        files: [
          {
            label: 'app.routes.ts',
            language: 'typescript',
            code: `import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TopicPage } from './pages/topic-page/topic-page';
import { topicUnlocked } from './shared/progress/topic-unlocked.guard';
import { ALL_TOPICS } from './topics/topics';

export const routes: Routes = [
  { path: '', component: Home },
  // Uma rota por tópico: /topico/instalacao, /topico/roteamento...
  ...ALL_TOPICS.map((topic) => ({
    path: \`topico/\${topic.slug}\`,
    component: TopicPage,
    data: { slug: topic.slug },
    // canActivate: só abre se o tópico anterior foi concluído
    canActivate: [topicUnlocked],
    // children: rotas filhas (o tópico de roteamento usa para o exemplo)
    children: topic.children ?? [],
  })),
  // ** (wildcard): qualquer URL que não existe volta para a home
  { path: '**', redirectTo: '' },
];`,
          },
          { label: 'routing-demo.routes.ts', path: demo('routing/routing-demo.routes.ts') },
          { label: 'routing-demo.html', path: demo('routing/routing-demo.html') },
          { label: 'routing-demo.css', path: demo('routing/routing-demo.css') },
          { label: 'routing-demo.ts', path: demo('routing/routing-demo.ts') },
          { label: 'lesson-detail.ts', path: demo('routing/lesson-detail.ts') },
          { label: 'lessons.ts', path: demo('routing/lessons.ts') },
        ],
      },
      {
        slug: 'formularios',
        title: 'Formulários template-driven e reactive básicos',
        menuLabel: 'Formulários',
        summary: 'As duas formas de ler, validar e enviar dados do usuário.',
        explanation: `O Angular tem duas formas de criar formulários. As duas fazem a mesma coisa (ler valores, validar, mostrar erros); muda onde o formulário é definido.

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
• (ngSubmit) chama o método de envio.`,
        demo: FormsDemo,
        tryIt:
          'Clique nos campos e saia sem preencher, digite um e-mail inválido e envie. Os blocos cinza mostram o valor e o estado de cada formulário em tempo real.',
        files: [
          { label: 'template-form.html', path: demo('forms/template-form.html') },
          { label: 'template-form.ts', path: demo('forms/template-form.ts') },
          { label: 'reactive-form.html', path: demo('forms/reactive-form.html') },
          { label: 'reactive-form.ts', path: demo('forms/reactive-form.ts') },
          { label: 'form.css', path: demo('forms/form.css') },
          { label: 'forms-demo.html', path: demo('forms/forms-demo.html') },
          { label: 'forms-demo.css', path: demo('forms/forms-demo.css') },
          { label: 'forms-demo.ts', path: demo('forms/forms-demo.ts') },
        ],
      },
      {
        slug: 'http',
        title: 'HttpClient para consumir APIs',
        menuLabel: 'HttpClient',
        summary: 'Buscar e enviar dados para uma API, com carregando e erro.',
        explanation: `HttpClient é o serviço do Angular para conversar com APIs: buscar, enviar, atualizar e apagar dados pela rede.

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

O exemplo usa a jsonplaceholder, uma API pública de testes. Ela precisa de internet, e o POST é de mentira: a API devolve o objeto com um id novo, mas não salva nada.`,
        demo: HttpDemo,
        tryIt:
          'Busque os usuários, clique em um para ver o detalhe, force o erro 404 e crie um post. Para ver as requisições de verdade, abra o DevTools (F12) na aba Network.',
        files: [
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
        ],
      },
      {
        slug: 'signals',
        title: 'Signals e inputs/outputs',
        menuLabel: 'Signals',
        summary: 'Estado reativo moderno e a conversa entre componentes pai e filho.',
        explanation: `Signal é um valor reativo: quando ele muda, o Angular sabe exatamente o que precisa atualizar na tela. É a forma moderna de guardar estado em Angular. Nos tópicos anteriores usamos propriedades comuns para focar em cada assunto; daqui pra frente, o padrão é usar signals.

O básico:
• signal(valor): cria. Ler é chamar como função: cart(). No template também: {{ count() }}.
• set(novo): troca o valor inteiro.
• update(fn): calcula o novo valor a partir do atual. Crie sempre um array ou objeto novo, sem alterar o antigo.
• computed(() => ...): valor derivado de outros signals. Recalcula sozinho quando eles mudam e não aceita set().
• effect(() => ...): roda um efeito colateral (log, salvar no localStorage...) sempre que um signal lido dentro dele muda.

Comunicação entre componentes:
• input(): o filho recebe dados do pai. No pai: [product]="p". O input também é um signal, lido com product(). Com input.required() o pai é obrigado a passar; com input(0) existe um valor padrão.
• output(): o filho avisa o pai que algo aconteceu. O filho chama added.emit(valor); o pai escuta com (added)="addToCart($event)", e $event é o valor emitido.

A regra é: dados descem por input, eventos sobem por output. O filho não altera o estado do pai diretamente.

No exemplo, o ProductCard (filho) só mostra o produto e emite "adicionado". O SignalsDemo (pai) guarda o carrinho num signal e calcula a quantidade, o total e o frete grátis com computed.`,
        demo: SignalsDemo,
        tryIt:
          'Adicione produtos e veja o carrinho, o total, o contador em cada botão e o frete grátis mudarem juntos. Abra o console (F12) para ver o effect rodando a cada mudança.',
        files: [
          { label: 'signals-demo.html', path: demo('signals/signals-demo.html') },
          { label: 'signals-demo.css', path: demo('signals/signals-demo.css') },
          { label: 'signals-demo.ts', path: demo('signals/signals-demo.ts') },
          { label: 'product-card.html', path: demo('signals/product-card.html') },
          { label: 'product-card.css', path: demo('signals/product-card.css') },
          { label: 'product-card.ts', path: demo('signals/product-card.ts') },
        ],
      },
    ],
  },
];

/** Todos os tópicos em ordem, sem os grupos. */
export const ALL_TOPICS: Topic[] = GROUPS.flatMap((group) => group.topics);

export const findTopic = (slug: string) => ALL_TOPICS.find((t) => t.slug === slug);

export const groupOf = (slug: string) => GROUPS.find((g) => g.topics.some((t) => t.slug === slug));

export const topicUrl = (slug: string) => `/topico/${slug}`;
