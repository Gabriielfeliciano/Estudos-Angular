import { Injectable, effect, signal } from '@angular/core';
import { LEVEL_ORDER, Level, TOPIC_COUNT, topicId } from './curriculum';

const STORAGE_KEY = 'studyangular.progress';

// Guarda quais tópicos foram concluídos e decide quais níveis estão desbloqueados.
// O progresso fica salvo no localStorage do navegador.
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly completed = signal<ReadonlySet<string>>(this.load());

  constructor() {
    // Salva no localStorage sempre que o progresso muda
    effect(() => this.save(this.completed()));
  }

  isDone(level: Level, index: number): boolean {
    return this.completed().has(topicId(level, index));
  }

  toggle(level: Level, index: number) {
    const id = topicId(level, index);
    this.completed.update((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  /** Quantos tópicos do nível foram concluídos. */
  doneCount(level: Level): number {
    let count = 0;
    for (let i = 1; i <= TOPIC_COUNT[level]; i++) {
      if (this.completed().has(topicId(level, i))) count++;
    }
    return count;
  }

  /** Nível com todos os tópicos concluídos. Nível sem tópicos ainda não conta como concluído. */
  isLevelComplete(level: Level): boolean {
    const total = TOPIC_COUNT[level];
    return total > 0 && this.doneCount(level) === total;
  }

  /** O primeiro nível está sempre liberado; os outros precisam do anterior completo. */
  isUnlocked(level: Level): boolean {
    const position = LEVEL_ORDER.indexOf(level);
    return position === 0 || this.isLevelComplete(LEVEL_ORDER[position - 1]);
  }

  /** Nível anterior, usado na mensagem de bloqueio. */
  previousLevel(level: Level): Level | undefined {
    return LEVEL_ORDER[LEVEL_ORDER.indexOf(level) - 1];
  }

  private load(): ReadonlySet<string> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return new Set(raw ? (JSON.parse(raw) as string[]) : []);
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
