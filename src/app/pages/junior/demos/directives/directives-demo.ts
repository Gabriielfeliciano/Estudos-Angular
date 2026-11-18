import { CurrencyPipe, DatePipe, NgClass, NgStyle, PercentPipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { DurationPipe } from './duration.pipe';

type Level = 'junior' | 'mid' | 'senior';

interface Course {
  title: string;
  level: Level;
  minutes: number;
  price: number;
  startedAt: Date;
  done: boolean;
}

@Component({
  selector: 'app-directives-demo',
  // @if, @for e @switch já vêm no Angular e não precisam de import.
  // ngClass, ngStyle e os pipes precisam ser importados aqui.
  imports: [NgClass, NgStyle, TitleCasePipe, CurrencyPipe, DatePipe, PercentPipe, DurationPipe],
  templateUrl: './directives-demo.html',
  styleUrl: './directives-demo.css',
})
export class DirectivesDemo {
  today = new Date();
  hideDone = false;

  courses: Course[] = [
    { title: 'componentes e binding', level: 'junior', minutes: 90, price: 0, startedAt: new Date(2026, 10, 3), done: true },
    { title: 'diretivas e pipes', level: 'junior', minutes: 75, price: 0, startedAt: new Date(2026, 10, 17), done: false },
    { title: 'change detection', level: 'mid', minutes: 120, price: 49.9, startedAt: new Date(2026, 10, 18), done: false },
    { title: 'arquitetura de micro frontends', level: 'senior', minutes: 45, price: 129, startedAt: new Date(2026, 10, 18), done: false },
  ];

  // Lista que o @for percorre: esconde os concluídos quando hideDone = true
  get visibleCourses(): Course[] {
    return this.hideDone ? this.courses.filter((c) => !c.done) : this.courses;
  }

  // Fração concluída (0 a 1). O pipe percent transforma 0.25 em "25%"
  get progress(): number {
    return this.courses.filter((c) => c.done).length / this.courses.length;
  }

  toggle(course: Course) {
    course.done = !course.done;
  }
}
