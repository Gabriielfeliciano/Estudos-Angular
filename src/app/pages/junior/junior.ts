import { Component } from '@angular/core';
import { CodeFile } from '../../shared/code-viewer/code-viewer';
import { TopicCard } from '../../shared/topic-card/topic-card';

@Component({
  selector: 'app-junior',
  imports: [TopicCard],
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
}
