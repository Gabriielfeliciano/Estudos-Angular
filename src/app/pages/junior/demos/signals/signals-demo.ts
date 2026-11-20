import { CurrencyPipe } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { Product, ProductCard } from './product-card';

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-signals-demo',
  imports: [ProductCard, CurrencyPipe],
  templateUrl: './signals-demo.html',
  styleUrl: './signals-demo.css',
})
export class SignalsDemo {
  readonly products: Product[] = [
    { id: 1, name: 'Curso Angular', price: 99.9 },
    { id: 2, name: 'Curso RxJS', price: 59.9 },
    { id: 3, name: 'Curso TypeScript', price: 39.9 },
  ];

  // signal: um valor reativo. Ler: cart(). Alterar: cart.set(...) ou cart.update(...)
  // Quando muda, o Angular atualiza só o que depende dele.
  readonly cart = signal<CartItem[]>([]);

  // computed: valor DERIVADO de outros signals. Recalcula sozinho quando cart muda.
  // Não dá para fazer set() num computed.
  readonly count = computed(() => this.cart().reduce((sum, item) => sum + item.quantity, 0));
  readonly total = computed(() =>
    this.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );
  readonly freeShipping = computed(() => this.total() >= 100);

  constructor() {
    // effect: roda um efeito colateral sempre que um signal lido dentro dele muda.
    // Bom para log, salvar no localStorage, etc. Abra o console (F12) para ver.
    effect(() => {
      console.log(`[effect] carrinho com ${this.count()} item(ns), total ${this.total().toFixed(2)}`);
    });
  }

  // Recebe o produto emitido pelo output (added) do filho
  addToCart(product: Product) {
    // update: calcula o novo valor a partir do atual.
    // Sempre crie um array/objeto novo em vez de alterar o antigo.
    this.cart.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) => (i === existing ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  quantityOf(product: Product): number {
    return this.cart().find((i) => i.product.id === product.id)?.quantity ?? 0;
  }

  clear() {
    this.cart.set([]); // set: troca o valor inteiro
  }
}
