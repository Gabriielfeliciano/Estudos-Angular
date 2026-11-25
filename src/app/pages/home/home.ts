import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimatedContent } from '../../shared/animated-content/animated-content';
import { PROFILE } from '../../shared/profile';
import { ProgressService } from '../../shared/progress/progress.service';
import { ALL_TOPICS, GROUPS, topicUrl } from '../../topics/topics';

// Home: visão geral do que já foi estudado e de onde continuar.
@Component({
  selector: 'app-home',
  imports: [RouterLink, AnimatedContent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly progress = inject(ProgressService);
  protected readonly profile = PROFILE;
  protected readonly groups = GROUPS;
  protected readonly topicUrl = topicUrl;

  /** Veio do botão "Concluir o Junior" do último tópico (state passado no router.navigate). */
  protected readonly justFinished = !!history.state?.finished;

  protected number(slug: string) {
    return ALL_TOPICS.findIndex((t) => t.slug === slug) + 1;
  }

  protected groupDone(groupIndex: number) {
    return this.groups[groupIndex].topics.filter((t) => this.progress.isDone(t.slug)).length;
  }
}
