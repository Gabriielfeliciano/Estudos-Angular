import { Injectable, computed, effect, signal } from '@angular/core';
import { ALL_TOPICS, Topic } from '../../topics/topics';

const STORAGE_KEY = 'studyangular.progress';

// Ids da versão antiga (página Junior com cards numerados) -> slug do tópico.
// Mantém o progresso de quem já tinha marcado tópicos antes da reestruturação.
const LEGACY_IDS: Record<string, string> = {
  'junior-1': 'instalacao',
  'junior-2': 'componentes',
  'junior-3': 'diretivas',
  'junior-4': 'servicos',
  'junior-5': 'roteamento',
  'junior-6': 'formularios',
  'junior-7': 'http',
  'junior-8': 'typescript',
  'junior-9': 'signals',
};

// Guarda quais tópicos foram concluídos e decide quais estão desbloqueados.
// Regra do "jogo": o primeiro tópico está sempre liberado; cada um seguinte
// só libera quando o anterior foi concluído. Fica salvo no localStorage.
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly completed = signal<ReadonlySet<string>>(this.load());

  readonly total = ALL_TOPICS.length;
  readonly doneCount = computed(() => ALL_TOPICS.filter((t) => this.completed().has(t.slug)).length);
  readonly percent = computed(() => Math.round((this.doneCount() / this.total) * 100));
  readonly allDone = computed(() => this.doneCount() === this.total);

  /** Próximo tópico a estudar: o primeiro ainda não concluído (ou undefined se terminou tudo). */
  readonly current = computed(() => ALL_TOPICS.find((t) => !this.completed().has(t.slug)));

  constructor() {
    effect(() => this.save(this.completed()));
  }

  isDone(slug: string): boolean {
    return this.completed().has(slug);
  }

  isUnlocked(slug: string): boolean {
    // Já concluído continua aberto (mesmo que a ordem do curso mude depois)
    if (this.completed().has(slug)) return true;
    const index = ALL_TOPICS.findIndex((t) => t.slug === slug);
    if (index <= 0) return index === 0;
    return this.completed().has(ALL_TOPICS[index - 1].slug);
  }

  complete(slug: string) {
    this.completed.update((current) => new Set(current).add(slug));
  }

  uncomplete(slug: string) {
    this.completed.update((current) => {
      const next = new Set(current);
      next.delete(slug);
      return next;
    });
  }

  /** Tópico seguinte na ordem do curso. */
  next(slug: string): Topic | undefined {
    return ALL_TOPICS[ALL_TOPICS.findIndex((t) => t.slug === slug) + 1];
  }

  previous(slug: string): Topic | undefined {
    const index = ALL_TOPICS.findIndex((t) => t.slug === slug);
    return index > 0 ? ALL_TOPICS[index - 1] : undefined;
  }

  private load(): ReadonlySet<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const ids = raw ? (JSON.parse(raw) as string[]) : [];
      return new Set(ids.map((id) => LEGACY_IDS[id] ?? id));
    } catch {
      return new Set();
    }
  }

  private save(ids: ReadonlySet<string>) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
    } catch {
      // Sem localStorage (modo privado, bloqueado): o progresso vale só até recarregar
    }
  }
}
