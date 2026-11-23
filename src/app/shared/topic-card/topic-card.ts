import { Component, computed, inject, input, signal } from '@angular/core';
import { CodeFile, CodeViewer } from '../code-viewer/code-viewer';
import { Level } from '../progress/curriculum';
import { ProgressService } from '../progress/progress.service';

@Component({
  selector: 'app-topic-card',
  imports: [CodeViewer],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.css',
})
export class TopicCard {
  private readonly progress = inject(ProgressService);

  /** Nível do tópico; junto com o index forma o id salvo no progresso. */
  readonly level = input.required<Level>();
  readonly index = input.required<number>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly files = input.required<CodeFile[]>();
  /** false para tópicos sem exemplo executável (só código). */
  readonly hasDemo = input(true);

  protected readonly open = signal(false);
  protected readonly done = computed(() => this.progress.isDone(this.level(), this.index()));

  protected toggleDone() {
    this.progress.toggle(this.level(), this.index());
  }
}
