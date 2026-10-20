import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Voltar from "../../components/voltar";

export default function Relatorios() {
  return (
    <View style={styles.container}>
      <Voltar />
      <Text style={styles.title}>Relatórios</Text>

      <ScrollView>
        <View style={styles.card}>
          <Text style={styles.name}>Relatório Semanal - João Silva</Text>
          <Text>Data: 18/05/2026</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.name}>Relatório Semanal - Maria Souza</Text>
          <Text>Data: 17/05/2026</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f5f5f5",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
});