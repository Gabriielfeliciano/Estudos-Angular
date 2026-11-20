// ===== Classe =====
// Componentes, serviços e pipes do Angular são classes como esta.
export class XpCounter {
  // private: só pode ser usado dentro da classe. De fora, só pelos métodos.
  private xp = 0;

  // readonly: só pode receber valor na criação, depois não muda.
  // "public" no parâmetro do construtor cria a propriedade automaticamente.
  constructor(public readonly owner: string) {}

  // Método público (sem modificador, todo membro é public)
  add(points: number): void {
    this.xp += points;
  }

  // get: propriedade calculada, lida como counter.points (sem parênteses)
  get points(): number {
    return this.xp;
  }

  get stars(): string {
    return '★'.repeat(Math.min(5, Math.floor(this.xp / 20)));
  }
}

// Uso:
// const c = new XpCounter('Gabriel');
// c.add(10);
// c.points    -> 10
// c.xp        -> erro: 'xp' é private
// c.owner = 'X' -> erro: 'owner' é readonly
