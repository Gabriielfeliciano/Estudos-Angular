import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // necessário para usar [(ngModel)]

// @Component transforma a classe em um componente:
// - selector: a "tag" usada para colocar o componente na tela (<app-binding-demo />)
// - imports: o que o template deste componente usa (aqui, o FormsModule)
// - templateUrl / styleUrl: o HTML e o CSS do componente
@Component({
  selector: 'app-binding-demo',
  imports: [FormsModule],
  templateUrl: './binding-demo.html',
  styleUrl: './binding-demo.css',
})
export class BindingDemo {
  // Propriedades da classe: o template enxerga tudo que estiver aqui
  name = 'Gabriel';
  course = 'Angular';
  likes = 0;
  highlighted = false;

  // Métodos: chamados pelo template quando um evento acontece
  like() {
    this.likes++;
  }

  toggleHighlight() {
    this.highlighted = !this.highlighted;
  }

  reset() {
    this.name = '';
    this.likes = 0;
    this.highlighted = false;
  }
}
