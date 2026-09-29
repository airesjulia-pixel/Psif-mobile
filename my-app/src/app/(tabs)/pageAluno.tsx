import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { router } from "expo-router";

import { ALUNOS, CURSOS, filtrarAlunos } from "../../data/aluno";
import { useSessao } from "../../data/sessao";
import Voltar from "../../components/voltar";

export default function Alunos() {
  const [cursoSelecionado, setCursoSelecionado] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const sessao = useSessao();
  const ehProfessora = (sessao?.perfil ?? "professora") === "professora";

  const alunosFiltrados = filtrarAlunos(ALUNOS, {
    curso: cursoSelecionado,
    pesquisa,
  });

  function abrirAluno(alunoId: string) {
    if (ehProfessora) {
      router.push(`/nova-observacao?alunoId=${alunoId}` as never);
      return;
    }

    router.push("./Aluno/perfilAluno");
  }

  return (
    <View style={styles.container}>
      <Voltar />
      <Text style={styles.title}>Meus Alunos</Text>

      {ehProfessora && (
        <Text style={styles.hint}>
          Toque em um aluno para registrar uma observação para a psicopedagoga.
        </Text>
      )}

      <TextInput
        style={styles.search}
        placeholder="Pesquisar aluno..."
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <View style={styles.cursos}>
        <TouchableOpacity
          testID="curso-todos"
          style={styles.botao}
          onPress={() => setCursoSelecionado("")}
        >
          <Text style={styles.botaoTexto}>Todos</Text>
        </TouchableOpacity>

        {CURSOS.map((curso) => (
          <TouchableOpacity
            key={curso}
            testID={`curso-${curso}`}
            style={styles.botao}
            onPress={() => setCursoSelecionado(curso)}
          >
            <Text style={styles.botaoTexto}>{curso}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {alunosFiltrados.length === 0 && (
          <Text style={styles.vazio}>Nenhum aluno encontrado.</Text>
        )}

        {alunosFiltrados.map((aluno) => (
          <TouchableOpacity
            key={aluno.id}
            style={styles.card}
            onPress={() => abrirAluno(aluno.id)}
          >
            <Image source={{ uri: aluno.foto }} style={styles.foto} />

            <View>
              <Text style={styles.nome}>{aluno.nome}</Text>

              <Text style={styles.curso}>{aluno.curso}</Text>
            </View>
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
    marginBottom: 15,
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
  },

  cursos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#244A69",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#244A69",
  },

  curso: {
    marginTop: 5,
    color: "#666",
  },

  hint: {
    color: "#3d6b8e",
    marginBottom: 12,
  },

  vazio: {
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});