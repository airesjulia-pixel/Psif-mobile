import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Voltar from "../../components/voltar";

export default function Documentos() {
  return (
    <View style={styles.container}>
      <Voltar />
      <Text style={styles.title}>Documentos</Text>

      <View style={styles.card}>
        <Text>📄 Laudo João Silva.pdf</Text>
      </View>

      <View style={styles.card}>
        <Text>📄 Parecer Maria Souza.pdf</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
});