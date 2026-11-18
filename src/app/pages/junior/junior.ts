import { Component } from '@angular/core';
import { CodeFile } from '../../shared/code-viewer/code-viewer';
import { TopicCard } from '../../shared/topic-card/topic-card';
import { BindingDemo } from './demos/binding/binding-demo';
import { DirectivesDemo } from './demos/directives/directives-demo';

// Os arquivos dos exemplos (pasta demos/) são publicados em /code/junior
// (ver "assets" no angular.json) e o code-viewer busca o texto ao abrir cada aba.
const demo = (file: string) => `/code/junior/${file}`;

@Component({
  selector: 'app-junior',
  imports: [TopicCard, BindingDemo, DirectivesDemo],
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
}
