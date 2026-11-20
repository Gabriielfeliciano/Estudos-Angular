import { CurrencyPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

// Componente filho: recebe dados do pai (input) e avisa o pai (output).
// Ele não sabe nada do carrinho; só mostra o produto e emite um evento.
@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  // input.required: o pai É OBRIGADO a passar. No pai: [product]="..."
  // Inputs são signals: lidos com product()
  readonly product = input.required<Product>();

  // input com valor padrão: se o pai não passar, vale 0
  readonly inCart = input(0);

  // output: evento que o pai escuta com (added)="..."
  readonly added = output<Product>();

  add() {
    this.added.emit(this.product()); // envia o produto para o pai
  }
}
