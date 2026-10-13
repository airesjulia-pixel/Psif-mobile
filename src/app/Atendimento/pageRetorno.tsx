
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Voltar from "../../components/voltar";
import {
  rotuloDoStatus,
  useRetornos,
} from "../../data/encaminhamento";
import { useSessao } from "../../data/sessao";

export default function Retornos() {
  const sessao = useSessao();
  const retornos = useRetornos(sessao?.email ?? "");

  return (
    <View style={styles.container}>
      <Voltar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <FontAwesome5
              name="comments"
              size={28}
              color="#244A69"
            />
          </View>

          <Text style={styles.title}>
            Retornos da Psicopedagoga
          </Text>

          <Text style={styles.subtitle}>
            Pareceres, orientações e relatórios recebidos
            sobre os seus alunos.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Acompanhamentos recebidos
          </Text>

          <View style={styles.counter}>
            <Text style={styles.counterText}>
              {retornos.length}
            </Text>
          </View>
        </View>

        {retornos.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <FontAwesome5
                name="inbox"
                size={36}
                color="#8AAAC3"
              />
            </View>

            <Text style={styles.emptyTitle}>
              Nenhum retorno recebido
            </Text>

            <Text style={styles.emptyText}>
              Os pareceres e as orientações da
              psicopedagoga aparecerão aqui quando
              estiverem disponíveis.
            </Text>
          </View>
        ) : (
          retornos.map((encaminhamento) => (
            <View
              key={encaminhamento.id}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <View style={styles.studentIcon}>
                  <FontAwesome5
                    name="user-graduate"
                    size={21}
                    color="#244A69"
                  />
                </View>

                <View style={styles.studentInfo}>
                  <Text style={styles.nome}>
                    {encaminhamento.alunoNome}
                  </Text>

                  <Text style={styles.motivo}>
                    {encaminhamento.motivo}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoBlock}>
                <View style={styles.labelRow}>
                  <FontAwesome5
                    name="clipboard-check"
                    size={15}
                    color="#477CA5"
                  />
                  <Text style={styles.rotulo}>
                    Parecer
                  </Text>
                </View>

                <Text style={styles.texto}>
                  {encaminhamento.retorno?.parecer ||
                    "Nenhum parecer registrado."}
                </Text>
              </View>

              <View style={styles.infoBlock}>
                <View style={styles.labelRow}>
                  <FontAwesome5
                    name="lightbulb"
                    size={15}
                    color="#477CA5"
                  />
                  <Text style={styles.rotulo}>
                    Orientações pedagógicas
                  </Text>
                </View>

                <Text style={styles.texto}>
                  {encaminhamento.retorno?.orientacoes ||
                    "Nenhuma orientação registrada."}
                </Text>
              </View>

              {!!encaminhamento.retorno?.relatorio && (
                <View style={styles.reportBox}>
                  <FontAwesome5
                    name="file-alt"
                    size={18}
                    color="#244A69"
                  />

                  <Text style={styles.relatorio}>
                    {encaminhamento.retorno.relatorio}
                  </Text>
                </View>
              )}

              <View style={styles.statusContainer}>
                <FontAwesome5
                  name="info-circle"
                  size={14}
                  color="#244A69"
                />

                <Text style={styles.meta}>
                  Status:{" "}
                  {rotuloDoStatus(encaminhamento.status)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FC",
    paddingTop: 15,
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 35,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 28,
  },

  headerIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#244A69",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#6F879B",
    marginTop: 8,
    lineHeight: 21,
    textAlign: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#244A69",
    flex: 1,
  },

  counter: {
    minWidth: 32,
    height: 32,
    paddingHorizontal: 9,
    borderRadius: 11,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
  },

  counterText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#244A69",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1EAF2",
  },

  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#EDF4FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#244A69",
    textAlign: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#71869A",
    lineHeight: 21,
    textAlign: "center",
    marginTop: 9,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1EAF2",
    borderRadius: 20,
    padding: 17,
    marginBottom: 15,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  studentIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  studentInfo: {
    flex: 1,
  },

  nome: {
    fontSize: 16,
    fontWeight: "700",
    color: "#244A69",
  },

  motivo: {
    fontSize: 13,
    color: "#71869A",
    marginTop: 5,
    lineHeight: 19,
  },

  divider: {
    height: 1,
    backgroundColor: "#E7EEF5",
    marginVertical: 16,
  },

  infoBlock: {
    marginBottom: 15,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
    gap: 8,
  },

  rotulo: {
    fontSize: 13,
    color: "#244A69",
    fontWeight: "700",
  },

  texto: {
    fontSize: 14,
    color: "#43586A",
    lineHeight: 21,
  },

  reportBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EDF4FA",
    borderRadius: 12,
    padding: 12,
    gap: 10,
    marginTop: 2,
  },

  relatorio: {
    flex: 1,
    fontSize: 13,
    color: "#244A69",
    lineHeight: 20,
  },

  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F8FC",
    padding: 11,
    borderRadius: 11,
    marginTop: 15,
    gap: 8,
  },

  meta: {
    flex: 1,
    fontSize: 12,
    color: "#244A69",
    fontWeight: "600",
  },
});
