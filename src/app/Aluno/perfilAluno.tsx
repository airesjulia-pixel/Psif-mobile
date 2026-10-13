import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Voltar from "../../components/voltar";

type ItemCardProps = {
  icone: React.ComponentProps<typeof FontAwesome5>["name"];
  titulo: string;
  onPress?: () => void;
};

function ItemCard({ icone, titulo, onPress }: ItemCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <FontAwesome5 name={icone} size={20} color="#244A69" style={styles.icone} />
      <Text style={styles.cardTexto}>{titulo}</Text>
      <FontAwesome5 name="chevron-right" size={16} color="#244A69" />
    </Pressable>
  );
}

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

      <Text style={styles.info}>Matrícula: 2025001</Text>
      <Text style={styles.info}>Curso: Informática</Text>
      <Text style={styles.info}>Status: Em acompanhamento</Text>

      <ItemCard icone="file-alt" titulo="Dados do aluno" />
      <ItemCard icone="chart-bar" titulo="Relatórios" />
      <ItemCard icone="edit" titulo="Observações" />
      <ItemCard icone="history" titulo="Histórico" />
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
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  icone: {
    width: 26,
    textAlign: "center",
  },

  cardTexto: {
    flex: 1,
    fontSize: 16,
    color: "#244A69",
  },
});