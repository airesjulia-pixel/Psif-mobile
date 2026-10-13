import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Voltar from "../../components/voltar";
import { supabase } from "../../../../lib/supabase";

export default function PerfilAluno() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [aluno, setAluno] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from("alunos") // nome real da sua tabela
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.log(error.message);
      else setAluno(data);
      setCarregando(false);
    }
    carregar();
  }, [id]);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#244A69" />
      </View>
    );
  }

  if (!aluno) {
    return (
      <View style={styles.container}>
        <Voltar />
        <Text>Aluno não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Voltar />
      <Image
        source={{ uri: aluno.foto_url ?? "https://i.pravatar.cc/200?img=1" }}
        style={styles.foto}
      />

      <Text style={styles.nome}>{aluno.nome}</Text>
      <Text style={styles.info}>Matrícula: {aluno.matricula}</Text>
      <Text style={styles.info}>Curso: {aluno.curso}</Text>
      <Text style={styles.info}>Status: {aluno.status}</Text>

      <View style={styles.card}>
        <Text>📄 Dados do aluno</Text>
      </View>

      <View style={styles.card}>
        <Text>📊 Relatórios</Text>
      </View>

      <View style={styles.card}>
        <Text>📝 Observações</Text>
      </View>

      <View style={styles.card}>
        <Text>📚 Histórico</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEAF5",
    padding: 20,
    alignItems: "center",
  },

  foto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
  },

  nome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#244A69",
    marginBottom: 15,
  },

  info: {
    fontSize: 16,
    marginBottom: 5,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginTop: 12,
  },
});