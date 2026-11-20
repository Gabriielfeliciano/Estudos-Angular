// ===== Tipos básicos =====
// O tipo vem depois dos dois-pontos. Na maioria das vezes o TypeScript deduz sozinho.
const curso: string = 'Angular';
const horas: number = 40;
const concluido: boolean = false;
const notas: number[] = [8, 9.5, 7];
const idade = 25; // tipo deduzido: number

// ===== Union type =====
// Só aceita um destes três textos. Qualquer outro é erro de compilação.
export type Level = 'junior' | 'mid' | 'senior';

export const LEVELS: Level[] = ['junior', 'mid', 'senior'];

// ===== Interface =====
// Descreve o formato de um objeto: que campos ele tem e de que tipo.
export interface Student {
  name: string;
  level: Level;
  skills: string[];
  email?: string; // ? = opcional: pode não existir
}

export const STUDENTS: Student[] = [
  { name: 'Ana', level: 'junior', skills: ['HTML', 'CSS'], email: 'ana@email.com' },
  { name: 'Bruno', level: 'junior', skills: ['TypeScript'] },
  { name: 'Carla', level: 'mid', skills: ['Angular', 'RxJS'], email: 'carla@email.com' },
  { name: 'Diego', level: 'senior', skills: ['Arquitetura', 'Testes', 'CI/CD'] },
];

// ===== O que o TypeScript impede (descomente para ver o erro no editor) =====
// const errado: Student = { name: 'Eva', level: 'master', skills: [] };
//   -> erro: 'master' não é um Level
// const semNome: Student = { level: 'junior', skills: [] };
//   -> erro: falta o campo obrigatório 'name'
// horas = 'quarenta';
//   -> erro: string não pode ir numa variável number (e horas é const)

// Exporta para não dar aviso de variável não usada
export const EXEMPLOS = { curso, horas, concluido, notas, idade };
