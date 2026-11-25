import {
  Component,
  ElementRef,
  afterRenderEffect,
  computed,
  effect,
  input,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';

// Branched Menu: versão Angular do componente React do UIGallery (React Bits).
// Seções que abrem e fecham, com os itens ligados por "galhos" desenhados em SVG.
// O galho do item ativo é desenhado na cor de destaque, e um marcador desliza até a seção ativa.

export interface BranchedMenuChild {
  value: string;
  label: string;
  /** Texto curto antes do label (ex.: ✓, 🔒, número). */
  icon?: string;
  disabled?: boolean;
  /** Tooltip. */
  hint?: string;
}

export interface BranchedMenuItem {
  label: string;
  /** Valor quando o item não tem filhos (vira um item clicável direto). */
  value?: string;
  children?: BranchedMenuChild[];
}

const PAD = 6;
const MARK = 16;

@Component({
  selector: 'app-branched-menu',
  templateUrl: './branched-menu.html',
  styleUrl: './branched-menu.css',
  host: {
    '[style.--bm-w.px]': 'width()',
    '[style.--bm-ink]': 'color()',
    '[style.--bm-accent]': 'accentColor()',
    '[style.--bm-line]': 'lineColor()',
    '[style.--bm-font.px]': 'fontSize()',
    '[style.--bm-row.px]': 'rowHeight()',
    '[style.--bm-indent.px]': 'indent()',
    '[style.--bm-line-w]': 'lineWidth()',
    '[style.--bm-draw.ms]': 'drawDuration()',
    '[style.--bm-fold.ms]': 'foldDuration()',
  },
})
export class BranchedMenu {
  readonly items = input.required<BranchedMenuItem[]>();
  /** Valor do item ativo (controlado por quem usa o menu). */
  readonly active = input('');
  /** Índices das seções que começam abertas. */
  readonly defaultOpen = input<number[]>([0]);
  readonly color = input('#f5f5f5');
  readonly accentColor = input('#f5f5f5');
  readonly lineColor = input('#3f3f46');
  readonly width = input(240);
  readonly rowHeight = input(36);
  readonly indent = input(40);
  readonly trunk = input(14);
  readonly radius = input(10);
  readonly lineWidth = input(1.5);
  readonly fontSize = input(14);
  readonly drawDuration = input(400);
  readonly foldDuration = input(300);

  readonly selected = output<string>();

  protected readonly open = signal<ReadonlySet<number>>(new Set());

  private readonly marker = viewChild.required<ElementRef<HTMLSpanElement>>('marker');
  private readonly heads = viewChildren<ElementRef<HTMLButtonElement>>('head');

  /** Índice da seção que contém o item ativo. */
  protected readonly activeSection = computed(() =>
    this.items().findIndex((it) => it.children?.some((kid) => kid.value === this.active())),
  );

  // Geometria dos galhos (mesmas contas do original)
  private readonly r = computed(() => Math.min(this.radius(), this.rowHeight() / 2 - 2));
  private readonly endX = computed(() => this.indent() - 8);

  constructor() {
    // Estado inicial das seções abertas
    effect(() => this.open.set(new Set(this.defaultOpen())));

    // Ao mudar o item ativo, abre a seção dele
    effect(() => {
      const section = this.activeSection();
      if (section >= 0 && !this.open().has(section)) {
        this.open.update((s) => new Set(s).add(section));
      }
    });

    // Posiciona o marcador ao lado do título da seção ativa (depois que o DOM atualiza)
    afterRenderEffect(() => {
      const m = this.marker().nativeElement;
      const section = this.activeSection();
      const head = this.heads()[section]?.nativeElement;
      const on = section >= 0 && this.open().has(section) && head;
      if (on) m.style.top = `${head.offsetTop + (head.offsetHeight - MARK) / 2}px`;
      m.toggleAttribute('data-on', Boolean(on));
    });
  }

  protected toggle(i: number) {
    this.open.update((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  protected select(value: string) {
    this.selected.emit(value);
  }

  protected bodyHeight(kids: BranchedMenuChild[]) {
    return PAD * 2 + kids.length * this.rowHeight();
  }

  private rowY(k: number) {
    return PAD + k * this.rowHeight() + this.rowHeight() / 2;
  }

  /** Linha vertical (tronco) até o último item. */
  protected trunkPath(count: number) {
    return `M ${this.trunk()} 0 V ${this.rowY(count - 1) - this.r()}`;
  }

  /** Galho curvo do tronco até o item k. */
  protected branchPath(k: number) {
    const t = this.trunk();
    const r = this.r();
    return `M ${t} ${this.rowY(k) - r} A ${r} ${r} 0 0 0 ${t + r} ${this.rowY(k)} H ${this.endX()}`;
  }

  /** Caminho completo do topo até o item k: é o que "acende" no item ativo. */
  protected reachPath(k: number) {
    const t = this.trunk();
    const r = this.r();
    return `M ${t} 0 V ${this.rowY(k) - r} A ${r} ${r} 0 0 0 ${t + r} ${this.rowY(k)} H ${this.endX()}`;
  }

  protected reachLength(k: number) {
    const r = this.r();
    return this.rowY(k) - r + (Math.PI * r) / 2 + (this.endX() - this.trunk() - r);
  }
}
