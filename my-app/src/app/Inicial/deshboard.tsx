import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import Voltar from "../../components/voltar";
import { acoesDoPerfil, rotuloDoPerfil, saudacaoDoPerfil } from "../../data/perfil";
import { useEncaminhamentos } from "../../data/encaminhamento";
import { encerrarSessao, useSessao } from "../../data/sessao";

export default function Dashboard() {
  const sessao = useSessao();
  const perfil = sessao?.perfil ?? "professora";
  const ehProfessora = perfil === "professora";
  const encaminhamentos = useEncaminhamentos(
    ehProfessora ? sessao?.email : undefined
  );

  function sair() {
    encerrarSessao();
    router.replace("./Login/telaLogin");
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.voltar}>
          <Voltar onPress={sair} />
        </View>

        {/* topo */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{saudacaoDoPerfil(perfil)}</Text>
            <Text style={styles.subGreeting}>
              Perfil: {rotuloDoPerfil(perfil)}
            </Text>
          </View>

          <Text style={styles.menu}>☰</Text>
        </View>

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

          <Text style={styles.icon}>👥</Text>
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

        <Text style={styles.sectionTitle}>Ações rápidas</Text>

        {acoesDoPerfil(perfil).map((acao) => (
          <TouchableOpacity
            key={acao.rota}
            style={styles.actionCard}
            onPress={() => router.push(acao.rota as never)}
          >
            <Text style={styles.actionText}>{acao.titulo}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>


      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("/Inicial/deshboard")}>
            <Text style={styles.navItem}>🏠{"\n"}Início</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Atendimento/Encaminhamento/observacao")}>
            <Text style={styles.navItem}>
                {ehProfessora ? `📝${"\n"}Observ.` : `📅${"\n"}Atend.`}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Aluno/pageAluno")}>
            <Text style={styles.navItem}>
                {ehProfessora ? `👨‍🎓${"\n"}Alunos` : `👩‍🏫${"\n"}Professores`}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/Atendimento/Encaminhamento/pageEncaminhamento")}>
            <Text style={styles.navItem}>
              {ehProfessora ? `📤${"\n"}Enviados` : `📄${"\n"}Relat.`}
            </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },

  voltar: {
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111",
  },

  subGreeting: {
    color: "#888",
    marginTop: 4,
  },

  menu: {
    fontSize: 24,
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
    color: "#1f5d3d",
    marginVertical: 8,
  },

  compare: {
    color: "#888",
    fontSize: 12,
  },

  icon: {
    fontSize: 45,
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 15,
  },

  actionCard: {
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  actionText: {
    fontSize: 15,
    color: "#333",
  },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  navItem: {
    textAlign: "center",
    fontSize: 11,
    color: "#666",
  },
});