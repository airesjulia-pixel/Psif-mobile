import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Voltar from "../../components/voltar";
import {
  rotuloDaUrgencia,
  rotuloDoStatus,
  useEncaminhamentos,
} from "../../data/encaminhamento";
import { useSessao } from "../../data/sessao";

// cor de cada urgência (se surgir uma nova, usa a cor padrão)
const CORES_URGENCIA: Record<string, string> = {
  baixa: "#2E9E6B",
  media: "#E0A100",
  alta: "#D64545",
};
const COR_PADRAO = "#3d6b8e";

export default function Observacoes() {
  const sessao = useSessao();
  const encaminhamentos = useEncaminhamentos(sessao?.email ?? "");

  return (
    <View style={styles.container}>
      <Voltar />

      <View style={styles.cabecalho}>
        <View style={styles.cabecalhoIcone}>
          <FontAwesome5 name="paper-plane" size={20} color="#fff" />
        </View>
        <View style={styles.cabecalhoInfo}>
          <Text style={styles.title}>Encaminhamentos Enviados</Text>
          <Text style={styles.subtitle}>
            {encaminhamentos.length}{" "}
            {encaminhamentos.length === 1 ? "observação enviada" : "observações enviadas"}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
      >
        {encaminhamentos.length === 0 && (
          <View style={styles.vazioBox}>
            <FontAwesome5 name="inbox" size={40} color="#8AA4BA" />
            <Text style={styles.vazio}>
              Você ainda não enviou observações para a psicopedagoga.
            </Text>
          </View>
        )}

        {encaminhamentos.map((encaminhamento) => {
          const cor = CORES_URGENCIA[encaminhamento.urgencia] ?? COR_PADRAO;

          return (
            <View
              key={encaminhamento.id}
              style={[styles.card, { borderLeftColor: cor }]}
            >
              <View style={styles.cardTopo}>
                <Text style={styles.nome}>{encaminhamento.alunoNome}</Text>
                <View style={[styles.badge, { backgroundColor: cor }]}>
                  <Text style={styles.badgeTexto}>
                    {rotuloDaUrgencia(encaminhamento.urgencia)}
                  </Text>
                </View>
              </View>

              <Text style={styles.motivo}>{encaminhamento.motivo}</Text>
              <Text style={styles.descricao}>{encaminhamento.descricao}</Text>

              <View style={styles.rodape}>
                <FontAwesome5 name="clock" size={12} color="#3d6b8e" />
                <Text style={styles.status}>
                  {rotuloDoStatus(encaminhamento.status)}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.85}
        onPress={() =>
          router.push("/Documento/addObservacao" as never)
        }
      >
        <FontAwesome5 name="plus" size={16} color="#fff" />
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

  cabecalho: {
    backgroundColor: "#244A69",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#244A69",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  cabecalhoIcone: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3d6b8e",
    alignItems: "center",
    justifyContent: "center",
  },

  cabecalhoInfo: {
    flex: 1,
  },

  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#fff",
  },

  subtitle: {
    color: "#DCEAF5",
    fontSize: 13,
    marginTop: 3,
  },

  lista: {
    paddingBottom: 10,
  },

  vazioBox: {
    alignItems: "center",
    marginTop: 40,
    gap: 12,
    paddingHorizontal: 20,
  },

  vazio: {
    color: "#3d6b8e",
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    elevation: 3,
    shadowColor: "#244A69",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  cardTopo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  nome: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#244A69",
  },

  badge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  badgeTexto: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  motivo: {
    marginTop: 8,
    fontWeight: "600",
    color: "#333",
  },

  descricao: {
    marginTop: 6,
    color: "#555",
    lineHeight: 20,
  },

  rodape: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E3EDF5",
  },

  status: {
    fontSize: 13,
    fontWeight: "600",
    color: "#3d6b8e",
  },

  button: {
    backgroundColor: "#244A69",
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});