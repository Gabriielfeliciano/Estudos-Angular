import { Level, Student } from './models';

// ===== Função tipada =====
// Parâmetros e retorno com tipo: o editor avisa se alguém chamar errado.
export function countByLevel(students: Student[], level: Level): number {
  return students.filter((s) => s.level === level).length;
}

// ===== Arrow function =====
// Forma curta de escrever função. Muito usada em filter, map, find...
export const initials = (name: string): string => name.slice(0, 2).toUpperCase();

// ===== Generics =====
// <T> é um "tipo variável": a função funciona com qualquer tipo e mantém o tipo certo no retorno.
// pickRandom(alunos) devolve Student; pickRandom([1, 2, 3]) devolve number.
// É o mesmo recurso de http.get<User[]>() e signal<number>().
export function pickRandom<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
