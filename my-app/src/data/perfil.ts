export const PERFIS = ["professora", "psicopedagoga"] as const;

export type Perfil = (typeof PERFIS)[number];

export type AcaoRapida = {
  titulo: string;
  rota: string;
};

const ROTULOS: Record<Perfil, string> = {
  professora: "Professora",
  psicopedagoga: "Psicopedagoga",
};

const SAUDACOES: Record<Perfil, string> = {
  professora: "Olá, Professor(a)",
  psicopedagoga: "Olá, Psicopedagogo(a)",
};

const ACOES: Record<Perfil, AcaoRapida[]> = {
  professora: [
    { titulo: "👨‍🎓 Meus Alunos", rota: "/alunos" },
    { titulo: "📝 Nova Observação", rota: "/nova-observacao" },
    { titulo: "📤 Encaminhamentos Enviados", rota: "/observacoes" },
    { titulo: "📥 Retornos da Psicopedagoga", rota: "/retornos" },
  ],
  psicopedagoga: [
    { titulo: "📝 Novo Atendimento", rota: "/atendimentos" },
    { titulo: "👨‍🎓 Meus Alunos", rota: "/alunos" },
    { titulo: "📄 Relatórios", rota: "/relatorios" },
    { titulo: "📨 Encaminhamentos Recebidos", rota: "/encaminhamentos-recebidos" },
  ],
};

export function ehPerfil(valor: string): valor is Perfil {
  return (PERFIS as readonly string[]).includes(valor);
}

export function rotuloDoPerfil(perfil: Perfil): string {
  return ROTULOS[perfil];
}

export function saudacaoDoPerfil(perfil: Perfil): string {
  return SAUDACOES[perfil];
}

export function acoesDoPerfil(perfil: Perfil): AcaoRapida[] {
  return ACOES[perfil];
}