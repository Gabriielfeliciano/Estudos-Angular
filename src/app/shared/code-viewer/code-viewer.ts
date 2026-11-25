import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, inject, input, signal, untracked } from '@angular/core';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import plaintext from 'highlight.js/lib/languages/plaintext';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

// Registra só as linguagens usadas (deixa o bundle menor que importar o highlight.js inteiro).
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('css', css);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('plaintext', plaintext);

export type CodeLanguage = 'bash' | 'css' | 'typescript' | 'html' | 'plaintext';

export interface CodeFile {
  label: string;
  /** Código já em texto. */
  code?: string;
  /** Caminho de um asset de texto, buscado ao abrir a aba. */
  path?: string;
  /** Linguagem para colorir. Se omitida, é deduzida pela extensão do path. */
  language?: CodeLanguage;
}

const byExtension: Record<string, CodeLanguage> = {
  ts: 'typescript',
  html: 'html',
  css: 'css',
  sh: 'bash',
};

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.html',
  styleUrl: './code-viewer.css',
})
export class CodeViewer {
  private readonly http = inject(HttpClient);

  readonly files = input.required<CodeFile[]>();
  protected readonly selected = signal(0);
  private readonly loaded = signal<Record<string, string>>({});

  private readonly currentFile = computed(() => this.files()[this.selected()]);

  private readonly currentCode = computed(() => {
    const file = this.currentFile();
    if (!file) return '';
    if (file.code !== undefined) return file.code;
    return (file.path && this.loaded()[file.path]) ?? 'Carregando...';
  });

  /** HTML com <span class="hljs-..."> em volta de cada parte do código. */
  protected readonly highlighted = computed(() => {
    const code = this.currentCode();
    const language = this.languageOf(this.currentFile());
    return hljs.highlight(code, { language }).value;
  });

  constructor() {
    // Busca o arquivo da aba atual sempre que a aba (ou a lista de arquivos) muda.
    // effect só roda depois que os inputs chegam, então files() já tem valor aqui.
    effect(() => {
      const path = this.currentFile()?.path;
      if (path) untracked(() => this.load(path));
    });
  }

  protected select(index: number) {
    this.selected.set(index);
  }

  private languageOf(file: CodeFile | undefined): CodeLanguage {
    if (!file) return 'plaintext';
    if (file.language) return file.language;
    const ext = file.path?.split('.').pop() ?? '';
    return byExtension[ext] ?? 'plaintext';
  }

  private load(path: string) {
    if (this.loaded()[path] !== undefined) return;
    this.http.get(path, { responseType: 'text' }).subscribe({
      next: (text) => this.loaded.update((m) => ({ ...m, [path]: text })),
      error: () => this.loaded.update((m) => ({ ...m, [path]: '// Não foi possível carregar o arquivo' })),
    });
  }
}
