import { Pipe, PipeTransform } from '@angular/core';

// Pipe customizado: transforma minutos em texto. Ex.: 90 -> "1h 30min"
// Gerado com: ng generate pipe duration
// No template: {{ 90 | duration }}
@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const min = minutes % 60;

    if (h === 0) return `${min}min`;
    if (min === 0) return `${h}h`;
    return `${h}h ${min}min`;
  }
}
