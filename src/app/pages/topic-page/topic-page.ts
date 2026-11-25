import { NgComponentOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  signal,
  viewChildren,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AnimatedContent } from '../../shared/animated-content/animated-content';
import { CodeViewer } from '../../shared/code-viewer/code-viewer';
import { ProgressService } from '../../shared/progress/progress.service';
import { ALL_TOPICS, Topic, findTopic, groupOf, topicUrl } from '../../topics/topics';

interface Step {
  id: string;
  label: string;
}

// Página de um tópico. Segue uma trilha: Entenda -> Veja funcionando -> Leia o código -> Conclua.
// No fim, concluir libera e abre o próximo tópico.
@Component({
  selector: 'app-topic-page',
  imports: [NgComponentOutlet, RouterLink, AnimatedContent, CodeViewer],
  templateUrl: './topic-page.html',
  styleUrl: './topic-page.css',
})
export class TopicPage {
  private readonly router = inject(Router);
  protected readonly progress = inject(ProgressService);

  // Cada tópico tem sua própria rota, então o componente é recriado ao trocar de tópico
  protected readonly topic: Topic = findTopic(inject(ActivatedRoute).snapshot.data['slug'])!;
  protected readonly group = groupOf(this.topic.slug);
  protected readonly position = ALL_TOPICS.indexOf(this.topic) + 1;
  protected readonly total = ALL_TOPICS.length;
  protected readonly paragraphs = this.topic.explanation.split('\n\n');
  protected readonly nextTopic = this.progress.next(this.topic.slug);
  protected readonly previousTopic = this.progress.previous(this.topic.slug);
  protected readonly topicUrl = topicUrl;

  protected readonly steps: Step[] = [
    { id: 'entenda', label: 'Entenda' },
    ...(this.topic.demo ? [{ id: 'exemplo', label: 'Veja funcionando' }] : []),
    { id: 'codigo', label: 'Leia o código' },
    { id: 'concluir', label: 'Conclua' },
  ];

  protected readonly done = computed(() => this.progress.isDone(this.topic.slug));
  /** Etapa que está na tela agora, para destacar na trilha. */
  protected readonly currentStep = signal('entenda');

  private readonly sections = viewChildren<ElementRef<HTMLElement>>('step');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      window.scrollTo({ top: 0 });

      // Marca na trilha a etapa cuja seção cruza a faixa do meio da tela
      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.find((e) => e.isIntersecting);
          if (visible) this.currentStep.set(visible.target.id);
        },
        { rootMargin: '-45% 0px -45% 0px' },
      );
      this.sections().forEach((s) => observer.observe(s.nativeElement));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected goTo(stepId: string) {
    document.getElementById(stepId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  protected completeAndContinue() {
    this.progress.complete(this.topic.slug);
    // router.navigate: navegação pelo código, depois de uma ação
    if (this.nextTopic) this.router.navigate([topicUrl(this.nextTopic.slug)]);
    else this.router.navigate(['/'], { state: { finished: true } });
  }

  protected undo() {
    this.progress.uncomplete(this.topic.slug);
  }
}
