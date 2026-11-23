import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LEVEL_LABELS, LEVEL_ORDER } from '../shared/progress/curriculum';
import { ProgressService } from '../shared/progress/progress.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly progress = inject(ProgressService);

  protected readonly profile = {
    name: 'Gabriel',
    photo: 'profile-placeholder.svg',
  };

  protected readonly levels = LEVEL_ORDER;
  protected readonly labels = LEVEL_LABELS;
}
