import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Voltar from "../../components/voltar";
import {
  responderEncaminhamento,
  usePendentes,
  validarRetorno,
} from "../../data/encaminhamento";
import { useSessao } from "../../data/sessao";

export default function EncaminhamentosRecebidos() {
  const sessao = useSessao();
  const pendentes = usePendentes();

  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [parecer, setParecer] = useState("");
  const [orientacoes, setOrientacoes] = useState("");
  const [relatorio, setRelatorio] = useState("");
  const [erros, setErros] = useState<string[]>([]);

  function responder(id: string) {
    const dados = {
      parecer,
      orientacoes,
      relatorio,
    };

    const problemas = validarRetorno(dados);

    if (problemas.length > 0) {
      setErros(problemas);
      return;
    }

    responderEncaminhamento(
      id,
      dados,
      sessao?.email ?? ""
    );

    setErros([]);
    setParecer("");
    setOrientacoes("");
    setRelatorio("");
    setSelecionado(null);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Voltar />

      {pendentes.length === 0 && (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>
            Nenhum encaminhamento pendente
          </Text>

          <Text style={styles.emptyText}>
            Quando houver um novo encaminhamento, ele aparecerá aqui.
          </Text>
        </View>
      )}

      {pendentes.map((encaminhamento) => (
        <View key={encaminhamento.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {encaminhamento.alunoNome
                  ? encaminhamento.alunoNome.charAt(0).toUpperCase()
                  : "A"}
              </Text>
            </View>

            <View style={styles.nameArea}>
              <Text style={styles.nome}>
                {encaminhamento.alunoNome}
              </Text>

              <Text style={styles.motivo}>
                {encaminhamento.motivo}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.label}>Descrição</Text>

          <Text style={styles.texto}>
            {encaminhamento.descricao}
          </Text>

          <View style={styles.infoBox}>
            <View>
              <Text style={styles.infoLabel}>Urgência</Text>
              <Text style={styles.infoValue}>
                {String(encaminhamento.urgencia)}
              </Text>
            </View>

            <View style={styles.infoRight}>
              <Text style={styles.infoLabel}>Professora</Text>
              <Text style={styles.infoValue}>
                {encaminhamento.professoraEmail}
              </Text>
            </View>
          </View>

          {selecionado === encaminhamento.id ? (
            <View style={styles.form}>
              <Text style={styles.formTitle}>
                Responder encaminhamento
              </Text>

              <Text style={styles.inputLabel}>
                Parecer
              </Text>

              <TextInput
                placeholder="Digite o parecer..."
                placeholderTextColor="#8A96A3"
                value={parecer}
                onChangeText={setParecer}
                style={styles.input}
              />

              <Text style={styles.inputLabel}>
                Orientações
              </Text>

              <TextInput
                placeholder="Digite as orientações para a professora..."
                placeholderTextColor="#8A96A3"
                value={orientacoes}
                onChangeText={setOrientacoes}
                multiline
                numberOfLines={5}
                style={styles.textArea}
              />

              <Text style={styles.inputLabel}>
                Relatório
              </Text>

              <TextInput
                placeholder="Relatório anexado (opcional)"
                placeholderTextColor="#8A96A3"
                value={relatorio}
                onChangeText={setRelatorio}
                style={styles.input}
              />

              {erros.length > 0 && (
                <View style={styles.errorBox}>
                  {erros.map((erro) => (
                    <Text key={erro} style={styles.erro}>
                      {erro}
                    </Text>
                  ))}
                </View>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => responder(encaminhamento.id)}
              >
                <Text style={styles.buttonText}>
                  Enviar retorno
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setSelecionado(null);
                  setErros([]);
                }}
              >
                <Text style={styles.cancelText}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.secondary}
              onPress={() => {
                setSelecionado(encaminhamento.id);
                setErros([]);
              }}
            >
              <Text style={styles.secondaryText}>
                Responder encaminhamento
              </Text>

              <Text style={styles.arrow}>
                →
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1EFF8",
  },

  content: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },

  header: {
    marginTop: 15,
    marginBottom: 20,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#16233A",
    marginBottom: 7,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#657383",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#16233A",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1E3A5F",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  nameArea: {
    flex: 1,
  },

  nome: {
    fontSize: 17,
    fontWeight: "700",
    color: "#16233A",
    marginBottom: 3,
  },

  motivo: {
    fontSize: 13,
    color: "#667586",
  },

  divider: {
    height: 1,
    backgroundColor: "#E8EDF2",
    marginVertical: 16,
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1E3A5F",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  texto: {
    fontSize: 14,
    lineHeight: 21,
    color: "#3F4D5C",
  },

  infoBox: {
    backgroundColor: "#F3F7FA",
    borderRadius: 12,
    padding: 12,
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  infoRight: {
    maxWidth: "55%",
    alignItems: "flex-end",
  },

  infoLabel: {
    fontSize: 11,
    color: "#7B8794",
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2B4E7D",
  },

  secondary: {
    marginTop: 16,
    minHeight: 47,
    borderWidth: 1,
    borderColor: "#1E3A5F",
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  secondaryText: {
    color: "#1E3A5F",
    fontSize: 13,
    fontWeight: "700",
  },

  arrow: {
    color: "#1E3A5F",
    fontSize: 20,
    fontWeight: "700",
  },

  form: {
    marginTop: 18,
  },

  formTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16233A",
    marginBottom: 15,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#35465A",
    marginBottom: 6,
  },

  input: {
    minHeight: 47,
    borderWidth: 1,
    borderColor: "#D5DEE7",
    borderRadius: 11,
    paddingHorizontal: 13,
    backgroundColor: "#FAFCFD",
    color: "#16233A",
    marginBottom: 13,
  },

  textArea: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#D5DEE7",
    borderRadius: 11,
    paddingHorizontal: 13,
    paddingTop: 12,
    backgroundColor: "#FAFCFD",
    color: "#16233A",
    textAlignVertical: "top",
    marginBottom: 13,
  },

  errorBox: {
    backgroundColor: "#FFF1F1",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  erro: {
    color: "#B42318",
    fontSize: 12,
    marginBottom: 3,
  },

  button: {
    minHeight: 48,
    backgroundColor: "#1E3A5F",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  cancelButton: {
    minHeight: 44,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  cancelText: {
    color: "#687684",
    fontSize: 13,
    fontWeight: "600",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16233A",
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 13,
    color: "#71808F",
    textAlign: "center",
    lineHeight: 19,
  },
});