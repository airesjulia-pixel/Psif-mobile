import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useEncaminhamentos } from "../../data/encaminhamento";
import { useSessao } from "../../data/sessao";

export default function Dashboard() {
  const sessao = useSessao();
  const perfil = sessao?.perfil ?? "professora";
  const ehProfessora = perfil === "professora";
  const encaminhamentos = useEncaminhamentos(
    ehProfessora ? sessao?.email : undefined
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* card principal */}
        <View style={styles.mainCard}>
          <View>
            <Text style={styles.cardTitle}>
              {ehProfessora ? "Encaminhamentos enviados" : "Atendimentos de hoje"}
            </Text>
            <Text style={styles.bigNumber}>
              {ehProfessora
                ? String(encaminhamentos.length).padStart(2, "0")
                : "08"}
            </Text>
            <Text style={styles.compare}>
              {ehProfessora
                ? "Aguardando retorno da psicopedagoga"
                : "+2 em relação a ontem"}
            </Text>
          </View>
        </View>

        {/* cards menores */}
        <View style={styles.row}>
          <View style={styles.smallCard}>
            <Text style={styles.smallTitle}>
              {ehProfessora ? "Meus Alunos" : "Alunos Acompanhados"}
            </Text>
            <Text style={styles.smallNumber}>{ehProfessora ? "08" : "124"}</Text>
          </View>

          <View style={styles.smallCard}>
            <Text style={styles.smallTitle}>
              {ehProfessora ? "Pendentes de análise" : "Relatórios Pendentes"}
            </Text>
            <Text style={styles.smallNumber}>
              {ehProfessora
                ? String(
                    encaminhamentos.filter(
                      (encaminhamento) => encaminhamento.status === "pendente"
                    ).length
                  ).padStart(2, "0")
                : "05"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },

  mainCard: {
    backgroundColor: "#f4f4f4",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  cardTitle: {
    color: "#666",
    fontSize: 14,
  },

  bigNumber: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#157ec4",
    marginVertical: 8,
  },

  compare: {
    color: "#888",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 25,
  },

  smallCard: {
    width: "48%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
  },

  smallTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },

  smallNumber: {
    fontSize: 32,
    fontWeight: "bold",
  },
});