export type Aluno = {
  id: string;
  nome: string;
  curso: string;
  foto: string;
};

export const CURSOS = ["Informática", "Energias Renováveis", "ADS"] as const;

export const ALUNOS: Aluno[] = [
  {
    id: "1",
    nome: "João Silva",
    curso: "Informática",
    foto: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    nome: "Marília Santos",
    curso: "Informática",
    foto: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    nome: "Pedro Lima",
    curso: "Informática",
    foto: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    nome: "Carol Oliveira",
    curso: "ADS",
    foto: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: "5",
    nome: "Lucas Ferreira",
    curso: "ADS",
    foto: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "6",
    nome: "Amanda Costa",
    curso: "ADS",
    foto: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: "7",
    nome: "Ana Clara",
    curso: "Energias Renováveis",
    foto: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: "8",
    nome: "Carlos Souza",
    curso: "Energias Renováveis",
    foto: "https://i.pravatar.cc/150?img=9",
  },
];

export function filtrarAlunos(
  alunos: Aluno[],
  filtros: { curso?: string; pesquisa?: string }
): Aluno[] {
  const curso = filtros.curso ?? "";
  const pesquisa = (filtros.pesquisa ?? "").trim().toLowerCase();

  return alunos.filter(
    (aluno) =>
      (curso === "" || aluno.curso === curso) &&
      aluno.nome.toLowerCase().includes(pesquisa)
  );
}

export function buscarAluno(id: string): Aluno | undefined {
  return ALUNOS.find((aluno) => aluno.id === id);
}