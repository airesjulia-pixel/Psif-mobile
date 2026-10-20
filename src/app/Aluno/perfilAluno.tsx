import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { buscarAluno } from "@/data/aluno";
import Voltar from "@/components/voltar";

type IconeNome = React.ComponentProps<typeof FontAwesome5>["name"];

type ItemCardProps = {
  icone: IconeNome;
  titulo: string;
  descricao?: string;
  onPress?: () => void;
};

function ItemCard({ icone, titulo, descricao, onPress }: ItemCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressionado]}
      onPress={onPress}
    >
      <View style={styles.iconeBox}>
        <FontAwesome5 name={icone} size={18} color="#244A69" />
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTexto}>{titulo}</Text>
        {descricao && <Text style={styles.cardDescricao}>{descricao}</Text>}
      </View>

      <FontAwesome5 name="chevron-right" size={14} color="#8AA4BA" />
    </Pressable>
  );
}

export default function PerfilAluno() {
  const { alunoId } = useLocalSearchParams<{ alunoId: string }>();
  const aluno = buscarAluno(alunoId);

  if (!aluno) {
    return (
      <View style={styles.container}>
        <Voltar />
        <View style={styles.vazioBox}>
          <FontAwesome5 name="user-slash" size={40} color="#8AA4BA" />
          <Text style={styles.vazio}>Aluno não encontrado.</Text>
        </View>
      </View>
    );
  }

  const sufixoEtapa = aluno.curso === "ADS" ? "º período" : "º ano";

  return (
    <View style={styles.container}>
      <Voltar />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <View style={styles.cabecalho}>
          <View style={styles.avatar}>
            <FontAwesome5 name="user-graduate" size={30} color="#fff" />
          </View>

          <Text style={styles.nome}>{aluno.nome}</Text>

          <View style={styles.tags}>
            <View style={styles.tag}>
              <Text style={styles.tagTexto}>{aluno.curso}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagTexto}>
                {aluno.etapa}
                {sufixoEtapa}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.rotuloSecao}>ACOMPANHAMENTO</Text>
        <ItemCard
          icone="file-alt"
          titulo="Dados do aluno"
          descricao="Informações cadastrais"
        />
        <ItemCard
          icone="chart-bar"
          titulo="Relatórios"
          descricao="Evolução e progresso"
        />
        <ItemCard
          icone="edit"
          titulo="Observações"
          descricao="Anotações enviadas"
        />
        <ItemCard
          icone="history"
          titulo="Histórico"
          descricao="Registros anteriores"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEAF5",
    padding: 20,
  },

  conteudo: {
    paddingBottom: 30,
  },

  cabecalho: {
    backgroundColor: "#244A69",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    marginBottom: 22,
    elevation: 4,
    shadowColor: "#244A69",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#3d6b8e",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  nome: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },

  tag: {
    backgroundColor: "#3d6b8e",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },

  tagTexto: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },

  rotuloSecao: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#3d6b8e",
    marginBottom: 8,
  },

  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#244A69",
    elevation: 3,
    shadowColor: "#244A69",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  cardPressionado: {
    opacity: 0.75,
  },

  iconeBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAF3FA",
    alignItems: "center",
    justifyContent: "center",
  },

  cardInfo: {
    flex: 1,
  },

  cardTexto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#244A69",
  },

  cardDescricao: {
    fontSize: 13,
    color: "#3d6b8e",
    marginTop: 2,
  },

  vazioBox: {
    alignItems: "center",
    marginTop: 40,
    gap: 12,
  },

  vazio: {
    color: "#666",
    textAlign: "center",
  },
});