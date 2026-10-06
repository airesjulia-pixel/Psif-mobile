import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Voltar from "../../components/voltar";

export default function PerfilAluno() {
  return (
    <View style={styles.container}>
      <Voltar />
      <Image
        source={{
          uri: "https://i.pravatar.cc/200?img=1",
        }}
        style={styles.foto}
      />

      <Text style={styles.nome}>João Silva</Text>

      <Text style={styles.info}>
        Matrícula: 2025001
      </Text>

      <Text style={styles.info}>
        Curso: Informática
      </Text>

      <Text style={styles.info}>
        Status: Em acompanhamento
      </Text>

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