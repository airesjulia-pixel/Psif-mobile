import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import Voltar from "../../components/voltar";

export default function Turma() {
  const [curso, setCurso] = useState("");
  const [turma, setTurma] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  const alunos = [
    {
      nome: "João Silva",
      curso: "Informática",
      turma: "3º Ano",
    },
    {
      nome: "Maria Souza",
      curso: "Informática",
      turma: "2º Ano",
    },
    {
      nome: "Pedro Santos",
      curso: "Informática",
      turma: "1º Ano",
    },
    {
      nome: "Ana Clara",
      curso: "ADS",
      turma: "2º Ano",
    },
    {
      nome: "Lucas Alves",
      curso: "ADS",
      turma: "3º Ano",
    },
    {
      nome: "Carlos Lima",
      curso: "Energias Renováveis",
      turma: "1º Ano A",
    },
    {
      nome: "Vitória Costa",
      curso: "Energias Renováveis",
      turma: "2º Ano B",
    },
    {
      nome: "Gabriel Souza",
      curso: "Energias Renováveis",
      turma: "3º Ano A",
    },
  ];

  const alunosFiltrados = alunos.filter((aluno) => {
    const filtroNome = aluno.nome
      .toLowerCase()
      .includes(pesquisa.toLowerCase());

    const filtroCurso =
      curso === "" || aluno.curso === curso;

    const filtroTurma =
      turma === "" || aluno.turma === turma;

    return filtroNome && filtroCurso && filtroTurma;
  });

  return (
    <ScrollView style={styles.container}>
      <Voltar />
      <Text style={styles.title}>Meus Alunos</Text>

      <TextInput
        style={styles.search}
        placeholder="Pesquisar aluno"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <View style={styles.filtros}>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={curso}
            onValueChange={setCurso}
          >
            <Picker.Item label="Curso" value="" />
            <Picker.Item
              label="Informática"
              value="Informática"
            />
            <Picker.Item
              label="ADS"
              value="ADS"
            />
            <Picker.Item
              label="Energias Renováveis"
              value="Energias Renováveis"
            />
          </Picker>
        </View>

        <View style={styles.pickerBox}>
          <Picker
            selectedValue={turma}
            onValueChange={setTurma}
          >
            <Picker.Item label="Turma" value="" />

            <Picker.Item label="1º Ano" value="1º Ano" />
            <Picker.Item label="2º Ano" value="2º Ano" />
            <Picker.Item label="3º Ano" value="3º Ano" />

            <Picker.Item
              label="1º Ano A"
              value="1º Ano A"
            />
            <Picker.Item
              label="1º Ano B"
              value="1º Ano B"
            />
            <Picker.Item
              label="2º Ano A"
              value="2º Ano A"
            />
            <Picker.Item
              label="2º Ano B"
              value="2º Ano B"
            />
            <Picker.Item
              label="3º Ano A"
              value="3º Ano A"
            />
            <Picker.Item
              label="3º Ano B"
              value="3º Ano B"
            />
          </Picker>
        </View>
      </View>

      {alunosFiltrados.map((aluno) => (
        <TouchableOpacity
          key={aluno.nome}
          style={styles.card}
          onPress={() => router.push("./perfilAluno")}
        >
          <Image
            source={{
              uri: "https://i.pravatar.cc/150?u=" + aluno.nome,
            }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.nome}>
              {aluno.nome}
            </Text>

            <Text style={styles.info}>
              {aluno.curso} - {aluno.turma}
            </Text>

            <Text style={styles.status}>
              Em acompanhamento
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEAF5",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  search: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  filtros: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  pickerBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },

  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#244A69",
  },

  info: {
    marginTop: 5,
  },

  status: {
    marginTop: 10,
    color: "#244A69",
  },
});