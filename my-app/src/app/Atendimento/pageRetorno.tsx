import { ScrollView, StyleSheet, Text, View } from "react-native";

import Voltar from "../../components/voltar";
import { rotuloDoStatus, useRetornos } from "../../data/encaminhamento";
import { useSessao } from "../../data/sessao";

export default function Retornos() {
  const sessao = useSessao();
  const retornos = useRetornos(sessao?.email ?? "");

  return (
    <View style={styles.container}>
      <Voltar />

      <Text style={styles.title}>Retornos da Psicopedagoga</Text>
      <Text style={styles.subtitle}>
        Pareceres, orientações e relatórios recebidos sobre os seus alunos.
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {retornos.length === 0 && (
          <Text style={styles.vazio}>
            Nenhum retorno recebido até o momento.
          </Text>
        )}

        {retornos.map((encaminhamento) => (
          <View key={encaminhamento.id} style={styles.card}>
            <Text style={styles.nome}>{encaminhamento.alunoNome}</Text>
            <Text style={styles.motivo}>{encaminhamento.motivo}</Text>

            <Text style={styles.rotulo}>Parecer</Text>
            <Text style={styles.texto}>{encaminhamento.retorno?.parecer}</Text>

            <Text style={styles.rotulo}>Orientações</Text>
            <Text style={styles.texto}>
              {encaminhamento.retorno?.orientacoes}
            </Text>

            {!!encaminhamento.retorno?.relatorio && (
              <Text style={styles.relatorio}>
                📄 {encaminhamento.retorno.relatorio}
              </Text>
            )}

            <Text style={styles.meta}>
              Status: {rotuloDoStatus(encaminhamento.status)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 50 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 6 },
  subtitle: { color: "#666", marginBottom: 18 },
  vazio: { color: "#888" },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  nome: { fontSize: 16, fontWeight: "bold" },
  motivo: { color: "#444", marginBottom: 8 },
  rotulo: {
    fontSize: 12,
    color: "#2f5d43",
    fontWeight: "bold",
    marginTop: 8,
  },
  texto: { color: "#333" },
  relatorio: { marginTop: 10, color: "#1f5d3d" },
  meta: { marginTop: 10, fontSize: 12, color: "#666" },
});