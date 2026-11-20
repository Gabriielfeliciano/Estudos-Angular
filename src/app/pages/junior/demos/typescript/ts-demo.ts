import { Component } from '@angular/core';
import { LEVELS, Level, STUDENTS, Student } from './models';
import { countByLevel, initials, pickRandom } from './utils';
import { XpCounter } from './xp-counter';

@Component({
  selector: 'app-ts-demo',
  templateUrl: './ts-demo.html',
  styleUrl: './ts-demo.css',
})
export class TsDemo {
  // protected: o template enxerga, mas código de fora do componente não
  protected readonly levels = LEVELS;
  protected readonly initials = initials;

  // Union type: o TypeScript só deixa atribuir 'junior', 'mid' ou 'senior'
  protected level: Level = 'junior';

  // Generics: o tipo do retorno acompanha o tipo da lista
  protected randomStudent?: Student; // vem de pickRandom<Student>
  protected randomNumber?: number; // vem de pickRandom<number>

  // Classe: uma instância criada com new
  protected readonly counter = new XpCounter('Gabriel');

  // Getter + arrow function no filter
  protected get filtered(): Student[] {
    return STUDENTS.filter((s) => s.level === this.level);
  }

  protected count(level: Level): number {
    return countByLevel(STUDENTS, level);
  }

  protected pick() {
    this.randomStudent = pickRandom(STUDENTS);
    this.randomNumber = pickRandom([10, 20, 30, 40, 50]);
  }
}
