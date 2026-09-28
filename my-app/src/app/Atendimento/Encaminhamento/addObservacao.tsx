import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { ALUNOS } from "../../../data/aluno";
import {
  URGENCIAS,
  Urgencia,
  criarEncaminhamento,
  rotuloDaUrgencia,
  validarEncaminhamento,
} from "../../../data/encaminhamento";
import { useSessao } from "../../../data/sessao";
import Voltar from "../../../components/voltar";

export default function NovaObservacao() {
  const { alunoId: alunoIdParam } = useLocalSearchParams<{ alunoId?: string }>();
  const sessao = useSessao();

  const [alunoId, setAlunoId] = useState(alunoIdParam ?? "");
  const [motivo, setMotivo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [urgencia, setUrgencia] = useState<Urgencia>("media");
  const [erros, setErros] = useState<string[]>([]);

  function enviar() {
    const dados = { alunoId, motivo, descricao, urgencia };
    const problemas = validarEncaminhamento(dados);

    setErros(problemas);

    if (problemas.length > 0) {
      return;
    }

    criarEncaminhamento(dados, sessao?.email ?? "");
    router.push("./observacao");
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Voltar />
      <Text style={styles.title}>Nova Observação</Text>

      <Text style={styles.subtitle}>
        Registre o que observou em sala e encaminhe para a psicopedagoga.
      </Text>

      <Text style={styles.label}>Aluno</Text>

      <View style={styles.chips}>
        {ALUNOS.map((aluno) => (
          <TouchableOpacity
            key={aluno.id}
            accessibilityRole="button"
            accessibilityState={{ selected: alunoId === aluno.id }}
            style={[styles.chip, alunoId === aluno.id && styles.chipAtivo]}
            onPress={() => setAlunoId(aluno.id)}
          >
            <Text
              style={[
                styles.chipTexto,
                alunoId === aluno.id && styles.chipTextoAtivo,
              ]}
            >
              {aluno.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Motivo</Text>

      <TextInput
        placeholder="Ex.: dificuldade de leitura"
        style={styles.input}
        value={motivo}
        onChangeText={setMotivo}
      />

      <Text style={styles.label}>Observação</Text>

      <TextInput
        placeholder="Descreva o que foi observado"
        multiline
        numberOfLines={5}
        style={styles.textArea}
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Urgência</Text>

      <View style={styles.chips}>
        {URGENCIAS.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            accessibilityRole="button"
            accessibilityState={{ selected: urgencia === opcao }}
            style={[styles.chip, urgencia === opcao && styles.chipAtivo]}
            onPress={() => setUrgencia(opcao)}
          >
            <Text
              style={[
                styles.chipTexto,
                urgencia === opcao && styles.chipTextoAtivo,
              ]}
            >
              {rotuloDaUrgencia(opcao)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {erros.map((erro) => (
        <Text key={erro} style={styles.erro}>
          {erro}
        </Text>
      ))}

      <TouchableOpacity style={styles.button} onPress={enviar}>
        <Text style={styles.buttonText}>Enviar para a psicopedagoga</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEAF5",
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#244A69",
  },

  subtitle: {
    color: "#3d6b8e",
    marginTop: 6,
    marginBottom: 20,
  },

  label: {
    fontWeight: "bold",
    color: "#244A69",
    marginBottom: 8,
  },

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },

  chip: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  chipAtivo: {
    backgroundColor: "#244A69",
  },

  chipTexto: {
    color: "#244A69",
  },

  chipTextoAtivo: {
    color: "#fff",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
  },

  textArea: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    height: 130,
    textAlignVertical: "top",
    marginBottom: 18,
  },

  erro: {
    color: "#b3261e",
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#1f5d3d",
    padding: 15,
    borderRadius: 10,
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});