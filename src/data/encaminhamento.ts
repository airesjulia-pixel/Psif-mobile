import { useEffect, useState } from "react";

import { buscarAluno } from "./aluno";

export const URGENCIAS = ["baixa", "media", "alta"] as const;

export type Urgencia = (typeof URGENCIAS)[number];

export type DadosEncaminhamento = {
  alunoId: string;
  motivo: string;
  descricao: string;
  urgencia: Urgencia;
};

export type Retorno = {
  parecer: string;
  orientacoes: string;
  relatorio: string;
  psicopedagogaEmail: string;
  respondidoEm: string;
};

export type DadosRetorno = {
  parecer: string;
  orientacoes: string;
  relatorio?: string;
};

export type Encaminhamento = DadosEncaminhamento & {
  id: string;
  alunoNome: string;
  professoraEmail: string;
  status: "pendente" | "em_analise" | "concluido";
  criadoEm: string;
  retorno: Retorno | null;
};

export const DESCRICAO_MINIMA = 10;
export const ORIENTACOES_MINIMAS = 10;

let encaminhamentos: Encaminhamento[] = [];
let proximoId = 1;
const ouvintes = new Set<() => void>();

function notificar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

export function validarEncaminhamento(dados: Partial<DadosEncaminhamento>): string[] {
  const erros: string[] = [];

  if (!dados.alunoId) {
    erros.push("Selecione um aluno.");
  }

  if (!dados.motivo?.trim()) {
    erros.push("Informe o motivo do encaminhamento.");
  }

  if ((dados.descricao ?? "").trim().length < DESCRICAO_MINIMA) {
    erros.push(`Descreva a observação com pelo menos ${DESCRICAO_MINIMA} caracteres.`);
  }

  if (!dados.urgencia || !(URGENCIAS as readonly string[]).includes(dados.urgencia)) {
    erros.push("Selecione a urgência.");
  }

  return erros;
}

export function criarEncaminhamento(
  dados: DadosEncaminhamento,
  professoraEmail: string
): Encaminhamento {
  const erros = validarEncaminhamento(dados);

  if (erros.length > 0) {
    throw new Error(erros.join(" "));
  }

  const encaminhamento: Encaminhamento = {
    id: String(proximoId++),
    alunoId: dados.alunoId,
    alunoNome: buscarAluno(dados.alunoId)?.nome ?? "Aluno não identificado",
    motivo: dados.motivo.trim(),
    descricao: dados.descricao.trim(),
    urgencia: dados.urgencia,
    professoraEmail,
    status: "pendente",
    criadoEm: new Date().toISOString(),
    retorno: null,
  };

  encaminhamentos = [encaminhamento, ...encaminhamentos];
  notificar();

  return encaminhamento;
}

export function validarRetorno(dados: Partial<DadosRetorno>): string[] {
  const erros: string[] = [];

  if (!dados.parecer?.trim()) {
    erros.push("Informe o parecer.");
  }

  if ((dados.orientacoes ?? "").trim().length < ORIENTACOES_MINIMAS) {
    erros.push(
      `Descreva as orientações com pelo menos ${ORIENTACOES_MINIMAS} caracteres.`
    );
  }

  return erros;
}

export function responderEncaminhamento(
  id: string,
  dados: DadosRetorno,
  psicopedagogaEmail: string
): Encaminhamento {
  const erros = validarRetorno(dados);

  if (erros.length > 0) {
    throw new Error(erros.join(" "));
  }

  const alvo = encaminhamentos.find((encaminhamento) => encaminhamento.id === id);

  if (!alvo) {
    throw new Error("Encaminhamento não encontrado.");
  }

  const respondido: Encaminhamento = {
    ...alvo,
    status: "concluido",
    retorno: {
      parecer: dados.parecer.trim(),
      orientacoes: dados.orientacoes.trim(),
      relatorio: (dados.relatorio ?? "").trim(),
      psicopedagogaEmail,
      respondidoEm: new Date().toISOString(),
    },
  };

  encaminhamentos = encaminhamentos.map((encaminhamento) =>
    encaminhamento.id === id ? respondido : encaminhamento
  );
  notificar();

  return respondido;
}

export function listarEncaminhamentos(): Encaminhamento[] {
  return encaminhamentos;
}

export function listarRetornosDaProfessora(email: string): Encaminhamento[] {
  return listarEncaminhamentosDaProfessora(email).filter(
    (encaminhamento) => encaminhamento.retorno !== null
  );
}

export function listarPendentes(): Encaminhamento[] {
  return encaminhamentos.filter(
    (encaminhamento) => encaminhamento.retorno === null
  );
}

export function listarEncaminhamentosDaProfessora(email: string): Encaminhamento[] {
  return encaminhamentos.filter(
    (encaminhamento) => encaminhamento.professoraEmail === email
  );
}

export function limparEncaminhamentos() {
  encaminhamentos = [];
  proximoId = 1;
  notificar();
}

export function assinarEncaminhamentos(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

export function useEncaminhamentos(professoraEmail?: string): Encaminhamento[] {
  const ler = () =>
    professoraEmail === undefined
      ? listarEncaminhamentos()
      : listarEncaminhamentosDaProfessora(professoraEmail);

  const [lista, setLista] = useState(ler);

  useEffect(() => {
    setLista(ler());
    return assinarEncaminhamentos(() => setLista(ler()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professoraEmail]);

  return lista;
}

export function useRetornos(professoraEmail: string): Encaminhamento[] {
  const [lista, setLista] = useState(() =>
    listarRetornosDaProfessora(professoraEmail)
  );

  useEffect(() => {
    setLista(listarRetornosDaProfessora(professoraEmail));
    return assinarEncaminhamentos(() =>
      setLista(listarRetornosDaProfessora(professoraEmail))
    );
  }, [professoraEmail]);

  return lista;
}

export function usePendentes(): Encaminhamento[] {
  const [lista, setLista] = useState(listarPendentes);

  useEffect(() => assinarEncaminhamentos(() => setLista(listarPendentes())), []);

  return lista;
}

export function rotuloDaUrgencia(urgencia: Urgencia): string {
  return { baixa: "Baixa", media: "Média", alta: "Alta" }[urgencia];
}

export function rotuloDoStatus(status: Encaminhamento["status"]): string {
  return {
    pendente: "Pendente",
    em_analise: "Em análise",
    concluido: "Concluído",
  }[status];
}