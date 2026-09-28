import { useEffect, useState } from "react";

import type { Perfil } from "./perfil";

export type Sessao = {
  email: string;
  perfil: Perfil;
};

let sessaoAtual: Sessao | null = null;
const ouvintes = new Set<() => void>();

function notificar() {
  ouvintes.forEach((ouvinte) => ouvinte());
}

export function iniciarSessao(sessao: Sessao) {
  sessaoAtual = sessao;
  notificar();
}

export function encerrarSessao() {
  sessaoAtual = null;
  notificar();
}

export function obterSessao(): Sessao | null {
  return sessaoAtual;
}

export function assinarSessao(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

export function useSessao(): Sessao | null {
  const [sessao, setSessao] = useState(obterSessao);

  useEffect(() => assinarSessao(() => setSessao(obterSessao())), []);

  return sessao;
}