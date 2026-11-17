import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  protected readonly profile = {
    name: 'Seu Nome',
    photo: 'profile-placeholder.svg',
  };

  protected readonly levels = [
    { label: 'Junior', path: 'junior' },
    { label: 'Mid', path: 'mid' },
    { label: 'Senior', path: 'senior' },
  ];
}
