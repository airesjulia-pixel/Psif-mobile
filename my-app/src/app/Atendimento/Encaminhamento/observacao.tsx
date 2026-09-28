import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import {
  rotuloDaUrgencia,
  rotuloDoStatus,
  useEncaminhamentos,
} from "../../../data/encaminhamento";
import { useSessao } from "../../../data/sessao";
import Voltar from "../../../components/voltar";

export default function Observacoes() {
  const sessao = useSessao();
  const encaminhamentos = useEncaminhamentos(sessao?.email ?? "");

  return (
    <View style={styles.container}>
      <Voltar />
      <Text style={styles.title}>Encaminhamentos Enviados</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {encaminhamentos.length === 0 && (
          <Text style={styles.vazio}>
            Você ainda não enviou observações para a psicopedagoga.
          </Text>
        )}

        {encaminhamentos.map((encaminhamento) => (
          <View key={encaminhamento.id} style={styles.card}>
            <Text style={styles.nome}>{encaminhamento.alunoNome}</Text>
            <Text style={styles.motivo}>{encaminhamento.motivo}</Text>
            <Text style={styles.descricao}>{encaminhamento.descricao}</Text>
            <Text style={styles.meta}>
              Urgência: {rotuloDaUrgencia(encaminhamento.urgencia)} · Status:{" "}
              {rotuloDoStatus(encaminhamento.status)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/Atendimento/Encaminhamento/addObservacao" as never)}
      >
        <Text style={styles.buttonText}>Nova Observação</Text>
      </TouchableOpacity>
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

  vazio: {
    color: "#3d6b8e",
    textAlign: "center",
    marginTop: 30,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#244A69",
  },

  motivo: {
    marginTop: 4,
    fontWeight: "600",
    color: "#333",
  },

  descricao: {
    marginTop: 6,
    color: "#555",
  },

  meta: {
    marginTop: 10,
    fontSize: 12,
    color: "#777",
  },

  button: {
    backgroundColor: "#1f5d3d",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});