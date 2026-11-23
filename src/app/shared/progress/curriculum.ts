export type Level = 'junior' | 'mid' | 'senior';

// Ordem dos níveis: cada um só desbloqueia quando o anterior estiver 100% concluído.
export const LEVEL_ORDER: Level[] = ['junior', 'mid', 'senior'];

export const LEVEL_LABELS: Record<Level, string> = {
  junior: 'Junior',
  mid: 'Mid',
  senior: 'Senior',
};

// Quantidade de tópicos de cada nível.
// Precisa bater com a quantidade de <app-topic-card> na página do nível.
export const TOPIC_COUNT: Record<Level, number> = {
  junior: 9,
  mid: 0,
  senior: 0,
};

// Id de um tópico: "junior-1", "junior-2"...
export const topicId = (level: Level, index: number) => `${level}-${index}`;
