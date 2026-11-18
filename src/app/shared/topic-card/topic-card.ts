import { Component, input, signal } from '@angular/core';
import { CodeFile, CodeViewer } from '../code-viewer/code-viewer';

@Component({
  selector: 'app-topic-card',
  imports: [CodeViewer],
  templateUrl: './topic-card.html',
  styleUrl: './topic-card.css',
})
export class TopicCard {
  readonly index = input.required<number>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly files = input.required<CodeFile[]>();
  /** false para tópicos sem exemplo executável (só código). */
  readonly hasDemo = input(true);

  protected readonly open = signal(false);
}
