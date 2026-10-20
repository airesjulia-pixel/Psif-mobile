export type Aluno = {
  id: string;
  nome: string;
  curso: string;
  etapa: number; // ano (1 a 3) ou período (1 a 6, no ADS)
};

export const CURSOS = ["Informática", "Energias Renováveis", "ADS"] as const;

export const ALUNOS: Aluno[] = [
  { id: "1", nome: "João Silva", curso: "Informática", etapa: 1 },
  { id: "2", nome: "Marília Santos", curso: "Informática", etapa: 2 },
  { id: "3", nome: "Pedro Lima", curso: "Informática", etapa: 3 },
  { id: "4", nome: "Carol Oliveira", curso: "ADS", etapa: 1 },
  { id: "5", nome: "Lucas Ferreira", curso: "ADS", etapa: 4 },
  { id: "6", nome: "Amanda Costa", curso: "ADS", etapa: 6 },
  { id: "7", nome: "Ana Clara", curso: "Energias Renováveis", etapa: 1 },
  { id: "8", nome: "Carlos Souza", curso: "Energias Renováveis", etapa: 3 },
];

export function filtrarAlunos(
  alunos: Aluno[],
  filtros: { curso?: string; etapa?: number | null; pesquisa?: string }
): Aluno[] {
  const curso = filtros.curso ?? "";
  const etapa = filtros.etapa ?? null;
  const pesquisa = (filtros.pesquisa ?? "").trim().toLowerCase();

  return alunos.filter(
    (aluno) =>
      (curso === "" || aluno.curso === curso) &&
      (etapa === null || aluno.etapa === etapa) &&
      aluno.nome.toLowerCase().includes(pesquisa)
  );
}

export function buscarAluno(id: string): Aluno | undefined {
  return ALUNOS.find((aluno) => aluno.id === id);
}