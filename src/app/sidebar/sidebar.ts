import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { BranchedMenu, BranchedMenuItem } from '../shared/branched-menu/branched-menu';
import { PROFILE } from '../shared/profile';
import { ProgressService } from '../shared/progress/progress.service';
import { ALL_TOPICS, GROUPS, topicUrl } from '../topics/topics';

const HOME = 'home';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, BranchedMenu],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private readonly router = inject(Router);
  protected readonly progress = inject(ProgressService);
  protected readonly profile = PROFILE;

  // URL atual -> valor ativo no menu ("home" ou o slug do tópico)
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.router.url),
    ),
    { initialValue: this.router.url },
  );

  protected readonly active = computed(() => {
    const match = this.url().match(/^\/topico\/([^/?#]+)/);
    return match ? match[1] : HOME;
  });

  // Itens do menu: "Visão geral" + um grupo por seção do curso.
  // Recalcula quando o progresso muda (ícones ✓ / 🔒 / número).
  protected readonly items = computed<BranchedMenuItem[]>(() => [
    { label: 'Visão geral', value: HOME },
    ...GROUPS.map((group) => ({
      label: group.label,
      children: group.topics.map((topic) => {
        const unlocked = this.progress.isUnlocked(topic.slug);
        const done = this.progress.isDone(topic.slug);
        return {
          value: topic.slug,
          label: topic.menuLabel,
          icon: done ? '✓' : unlocked ? String(ALL_TOPICS.indexOf(topic) + 1) : '🔒',
          disabled: !unlocked,
          hint: unlocked ? topic.title : 'Conclua o tópico anterior para desbloquear',
        };
      }),
    })),
  ]);

  protected readonly allOpen = GROUPS.map((_, i) => i + 1);

  protected navigate(value: string) {
    this.router.navigate([value === HOME ? '/' : topicUrl(value)]);
  }
}
