import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy, inject, input } from '@angular/core';

// Animated Content: versão Angular do componente React do UIGallery (React Bits).
// Faz o elemento entrar deslizando e aparecendo quando chega na tela.
// O original usa GSAP + ScrollTrigger; aqui é IntersectionObserver + Web Animations API
// (os dois já vêm no navegador, sem biblioteca extra).
//
// Uso:
//   <div appAnimatedContent>...</div>                    anima o próprio elemento
//   <div appAnimatedContent [stagger]="0.08">...</div>   anima cada filho, um após o outro
@Directive({ selector: '[appAnimatedContent]' })
export class AnimatedContent implements AfterViewInit, OnDestroy {
  /** Distância do deslocamento inicial, em px. */
  readonly distance = input(100);
  readonly direction = input<'vertical' | 'horizontal'>('vertical');
  /** true: vem de cima (vertical) ou da esquerda (horizontal). */
  readonly reverse = input(false);
  /** Duração em segundos. */
  readonly duration = input(0.8);
  /** Curva da animação. O padrão imita o "power3.out" do GSAP. */
  readonly ease = input('cubic-bezier(0.215, 0.61, 0.355, 1)');
  readonly initialOpacity = input(0);
  readonly scale = input(1);
  /** Desfoque inicial em px. */
  readonly blur = input(0);
  /** Quanto do elemento precisa estar acima da borda de baixo da tela (0 a 1) para começar. */
  readonly threshold = input(0.1);
  /** Atraso em segundos. */
  readonly delay = input(0);
  /** Intervalo em segundos entre os filhos. 0 = anima o elemento inteiro. */
  readonly stagger = input(0);
  /** true: anima só na primeira vez. false: volta ao estado inicial ao sair da tela. */
  readonly once = input(true);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduce || !('IntersectionObserver' in window)) return; // sem animação: fica visível normal

    const targets = this.targets();
    targets.forEach((el) => this.applyFrom(el));

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          // Os que entram juntos (ex.: ao abrir a página) saem em sequência com o stagger
          const entering = entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement);
          entering.forEach((el, i) => {
            this.play(el, this.delay() + i * this.stagger());
            if (this.once()) this.observer?.unobserve(el);
          });

          if (!this.once()) {
            entries
              .filter((e) => !e.isIntersecting && e.boundingClientRect.top > 0)
              .forEach((e) => this.applyFrom(e.target as HTMLElement));
          }
        },
        // Começa quando o topo do elemento passa da linha a (threshold)% do fim da tela
        { rootMargin: `0px 0px -${this.threshold() * 100}% 0px` },
      );
      targets.forEach((el) => this.observer?.observe(el));
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private targets(): HTMLElement[] {
    return this.stagger() > 0 && this.host.children.length
      ? (Array.from(this.host.children) as HTMLElement[])
      : [this.host];
  }

  private fromFrame(): Keyframe {
    const offset = this.distance() * (this.reverse() ? -1 : 1);
    const translate =
      this.direction() === 'horizontal' ? `translateX(${offset}px)` : `translateY(${offset}px)`;
    return {
      opacity: this.initialOpacity(),
      transform: `${translate} scale(${this.scale()})`,
      filter: this.blur() > 0 ? `blur(${this.blur()}px)` : 'none',
    };
  }

  private applyFrom(el: HTMLElement) {
    const from = this.fromFrame();
    el.style.opacity = String(from['opacity']);
    el.style.transform = String(from['transform']);
    el.style.filter = String(from['filter']);
  }

  private play(el: HTMLElement, delaySeconds: number) {
    const from = this.fromFrame();
    const to: Keyframe = { opacity: 1, transform: 'none', filter: 'none' };

    // Tira o estado inicial do inline style; o "fill: backwards" segura o início durante o delay
    el.style.removeProperty('opacity');
    el.style.removeProperty('transform');
    el.style.removeProperty('filter');

    el.animate([from, to], {
      duration: this.duration() * 1000,
      delay: delaySeconds * 1000,
      easing: this.ease(),
      fill: 'backwards',
    });
  }
}
