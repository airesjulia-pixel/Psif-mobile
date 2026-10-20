import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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
  rotuloDaUrgencia,
  usePendentes,
  validarRetorno,
} from "../../data/encaminhamento";
import { useSessao } from "../../data/sessao";

// cor de cada urgência (se surgir uma nova, usa a cor padrão)
const CORES_URGENCIA: Record<string, string> = {
  baixa: "#2E9E6B",
  media: "#E0A100",
  alta: "#D64545",
};
const COR_PADRAO = "#3d6b8e";

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

    responderEncaminhamento(id, dados, sessao?.email ?? "");

    setErros([]);
    setParecer("");
    setOrientacoes("");
    setRelatorio("");
    setSelecionado(null);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <Voltar />

        <View style={styles.cabecalho}>
          <View style={styles.cabecalhoIcone}>
            <FontAwesome5 name="inbox" size={20} color="#fff" />
          </View>
          <View style={styles.cabecalhoInfo}>
            <Text style={styles.title}>Encaminhamentos Recebidos</Text>
            <Text style={styles.subtitle}>
              {pendentes.length}{" "}
              {pendentes.length === 1 ? "pendente" : "pendentes"}
            </Text>
          </View>
        </View>

        {pendentes.length === 0 && (
          <View style={styles.emptyCard}>
            <FontAwesome5 name="check-circle" size={40} color="#2E9E6B" />
            <Text style={styles.emptyTitle}>Nenhum encaminhamento pendente</Text>
            <Text style={styles.emptyText}>
              Quando houver um novo encaminhamento, ele aparecerá aqui.
            </Text>
          </View>
        )}

        {pendentes.map((encaminhamento) => {
          const cor = CORES_URGENCIA[String(encaminhamento.urgencia)] ?? COR_PADRAO;

          return (
            <View
              key={encaminhamento.id}
              style={[styles.card, { borderLeftColor: cor }]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {encaminhamento.alunoNome
                      ? encaminhamento.alunoNome.charAt(0).toUpperCase()
                      : "A"}
                  </Text>
                </View>

                <View style={styles.nameArea}>
                  <Text style={styles.nome}>{encaminhamento.alunoNome}</Text>
                  <Text style={styles.motivo}>{encaminhamento.motivo}</Text>
                </View>

                <View style={[styles.badge, { backgroundColor: cor }]}>
                  <Text style={styles.badgeTexto}>
                    {rotuloDaUrgencia(encaminhamento.urgencia)}
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              <Text style={styles.label}>DESCRIÇÃO</Text>
              <Text style={styles.texto}>{encaminhamento.descricao}</Text>

              <View style={styles.infoBox}>
                <FontAwesome5 name="user" size={13} color="#3d6b8e" />
                <Text style={styles.infoLabel}>Professora</Text>
                <Text style={styles.infoValue} numberOfLines={1}>
                  {encaminhamento.professoraEmail}
                </Text>
              </View>

              {selecionado === encaminhamento.id ? (
                <View style={styles.form}>
                  <Text style={styles.formTitle}>Responder encaminhamento</Text>

                  <Text style={styles.inputLabel}>PARECER</Text>
                  <View style={styles.campo}>
                    <FontAwesome5 name="clipboard-check" size={15} color="#3d6b8e" />
                    <TextInput
                      placeholder="Digite o parecer..."
                      placeholderTextColor="#8AA4BA"
                      value={parecer}
                      onChangeText={setParecer}
                      style={styles.input}
                    />
                  </View>

                  <Text style={styles.inputLabel}>ORIENTAÇÕES</Text>
                  <View style={[styles.campo, styles.campoGrande]}>
                    <TextInput
                      placeholder="Digite as orientações para a professora..."
                      placeholderTextColor="#8AA4BA"
                      value={orientacoes}
                      onChangeText={setOrientacoes}
                      multiline
                      numberOfLines={5}
                      style={[styles.input, styles.textArea]}
                    />
                  </View>

                  <Text style={styles.inputLabel}>RELATÓRIO</Text>
                  <View style={styles.campo}>
                    <FontAwesome5 name="paperclip" size={15} color="#3d6b8e" />
                    <TextInput
                      placeholder="Relatório anexado (opcional)"
                      placeholderTextColor="#8AA4BA"
                      value={relatorio}
                      onChangeText={setRelatorio}
                      style={styles.input}
                    />
                  </View>

                  {erros.length > 0 && (
                    <View style={styles.errorBox}>
                      <FontAwesome5
                        name="exclamation-circle"
                        size={16}
                        color="#b3261e"
                      />
                      <View style={styles.erroLista}>
                        {erros.map((erro) => (
                          <Text key={erro} style={styles.erro}>
                            {erro}
                          </Text>
                        ))}
                      </View>
                    </View>
                  )}

                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.85}
                    onPress={() => responder(encaminhamento.id)}
                  >
                    <FontAwesome5 name="paper-plane" size={15} color="#fff" />
                    <Text style={styles.buttonText}>Enviar retorno</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setSelecionado(null);
                      setErros([]);
                    }}
                  >
                    <Text style={styles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.secondary}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelecionado(encaminhamento.id);
                    setErros([]);
                  }}
                >
                  <Text style={styles.secondaryText}>Responder encaminhamento</Text>
                  <FontAwesome5 name="chevron-right" size={14} color="#244A69" />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEAF5",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
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

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 5,
    elevation: 3,
    shadowColor: "#244A69",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#244A69",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  nameArea: {
    flex: 1,
    marginRight: 8,
  },

  nome: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#244A69",
  },

  motivo: {
    fontSize: 13,
    color: "#3d6b8e",
    marginTop: 2,
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

  divider: {
    height: 1,
    backgroundColor: "#E3EDF5",
    marginVertical: 14,
  },

  label: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#3d6b8e",
    marginBottom: 6,
  },

  texto: {
    fontSize: 14,
    lineHeight: 21,
    color: "#3F4D5C",
  },

  infoBox: {
    backgroundColor: "#EAF3FA",
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  infoLabel: {
    fontSize: 12,
    color: "#3d6b8e",
  },

  infoValue: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#244A69",
    textAlign: "right",
  },

  secondary: {
    marginTop: 14,
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: "#244A69",
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  secondaryText: {
    color: "#244A69",
    fontSize: 14,
    fontWeight: "bold",
  },

  form: {
    marginTop: 16,
  },

  formTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#244A69",
    marginBottom: 14,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#3d6b8e",
    marginBottom: 8,
  },

  campo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#EAF3FA",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  campoGrande: {
    alignItems: "flex-start",
  },

  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: "#244A69",
  },

  textArea: {
    minHeight: 110,
    textAlignVertical: "top",
  },

  errorBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#FDECEA",
    borderLeftWidth: 4,
    borderLeftColor: "#b3261e",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },

  erroLista: {
    flex: 1,
    gap: 3,
  },

  erro: {
    color: "#b3261e",
    fontSize: 13,
  },

  button: {
    backgroundColor: "#244A69",
    borderRadius: 16,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },

  cancelButton: {
    alignItems: "center",
    paddingVertical: 14,
    marginTop: 4,
  },

  cancelText: {
    color: "#3d6b8e",
    fontSize: 14,
    fontWeight: "bold",
  },

  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    alignItems: "center",
    gap: 10,
    elevation: 2,
    shadowColor: "#244A69",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#244A69",
    textAlign: "center",
  },

  emptyText: {
    fontSize: 13,
    color: "#3d6b8e",
    textAlign: "center",
    lineHeight: 19,
  },
});