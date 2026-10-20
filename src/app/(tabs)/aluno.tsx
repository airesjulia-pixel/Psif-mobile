import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { router } from "expo-router";

import { ALUNOS, CURSOS, filtrarAlunos } from "@/data/aluno";
import Voltar from "@/components/voltar";

function etapasDoCurso(curso: string) {
  if (curso === "ADS") {
    return { rotulo: "º período", total: 6 };
  }
  return { rotulo: "º ano", total: 3 };
}

export default function Alunos() {
  const [cursoSelecionado, setCursoSelecionado] = useState<string>(CURSOS[0]);
  const [etapaSelecionada, setEtapaSelecionada] = useState<number>(1);
  const [pesquisa, setPesquisa] = useState("");

  const etapas = etapasDoCurso(cursoSelecionado);

  const alunosFiltrados = filtrarAlunos(ALUNOS, {
    curso: cursoSelecionado,
    etapa: etapaSelecionada,
    pesquisa,
  });

  function selecionarCurso(curso: string) {
    setCursoSelecionado(curso);
    setEtapaSelecionada(1); // sempre começa no 1º ano/período
  }

  function abrirAluno(alunoId: string) {
    router.push({
      pathname: "/Aluno/perfilAluno",
      params: { alunoId },
    } as never);
  }

  return (
    <View style={styles.container}>
      <Voltar />

      <Text style={styles.title}>Meus Alunos</Text>
      <Text style={styles.subtitle}>
        {alunosFiltrados.length}{" "}
        {alunosFiltrados.length === 1 ? "aluno" : "alunos"}
      </Text>

      <Text style={styles.hint}>Toque em um aluno para abrir o perfil.</Text>

      <TextInput
        style={styles.search}
        placeholder="Pesquisar aluno..."
        placeholderTextColor="#8AA4BA"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <View style={styles.cursos}>
        {CURSOS.map((curso) => {
          const ativo = cursoSelecionado === curso;
          return (
            <TouchableOpacity
              key={curso}
              testID={`curso-${curso}`}
              style={[styles.botao, ativo && styles.botaoAtivo]}
              onPress={() => selecionarCurso(curso)}
            >
              <Text style={[styles.botaoTexto, ativo && styles.botaoTextoAtivo]}>
                {curso}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.etapas}>
        {Array.from({ length: etapas.total }, (_, i) => i + 1).map((n) => {
          const ativo = etapaSelecionada === n;
          return (
            <TouchableOpacity
              key={n}
              style={[styles.etapa, ativo && styles.etapaAtiva]}
              onPress={() => setEtapaSelecionada(n)}
            >
              <Text style={[styles.etapaTexto, ativo && styles.etapaTextoAtivo]}>
                {n}
                {etapas.rotulo}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {alunosFiltrados.length === 0 && (
          <Text style={styles.vazio}>Nenhum aluno encontrado.</Text>
        )}

        {alunosFiltrados.map((aluno) => (
          <TouchableOpacity
            key={aluno.id}
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => abrirAluno(aluno.id)}
          >
            <View style={styles.info}>
              <Text style={styles.nome}>{aluno.nome}</Text>
              <View style={styles.tag}>
                <Text style={styles.tagTexto}>
                  {aluno.curso} · {aluno.etapa}
                  {aluno.curso === "ADS" ? "º período" : "º ano"}
                </Text>
              </View>
            </View>

            <Text style={styles.seta}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEAF5",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#244A69",
  },

  subtitle: {
    color: "#3d6b8e",
    marginTop: 2,
    marginBottom: 6,
  },

  hint: {
    color: "#3d6b8e",
    marginBottom: 12,
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
    marginBottom: 15,
  },

  cursos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },

  botao: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#244A69",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  botaoAtivo: {
    backgroundColor: "#244A69",
  },

  botaoTexto: {
    color: "#244A69",
    fontWeight: "bold",
  },

  botaoTextoAtivo: {
    color: "#fff",
  },

  etapas: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },

  etapa: {
    backgroundColor: "#EAF3FA",
    borderWidth: 1,
    borderColor: "#3d6b8e",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },

  etapaAtiva: {
    backgroundColor: "#3d6b8e",
  },

  etapaTexto: {
    color: "#3d6b8e",
    fontWeight: "600",
    fontSize: 13,
  },

  etapaTextoAtivo: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 5,
    borderLeftColor: "#244A69",
  },

  info: {
    flex: 1,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#244A69",
  },

  tag: {
    alignSelf: "flex-start",
    marginTop: 6,
    backgroundColor: "#DCEAF5",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },

  tagTexto: {
    color: "#3d6b8e",
    fontSize: 13,
  },

  seta: {
    fontSize: 28,
    color: "#244A69",
  },

  vazio: {
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});