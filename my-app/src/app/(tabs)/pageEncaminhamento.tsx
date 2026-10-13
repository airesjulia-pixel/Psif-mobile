import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Voltar from "../../components/voltar";
import { rotuloDaUrgencia, validarRetorno } from "../../data/encaminhamento";
import { useSessao } from "../../data/sessao";
import { supabase } from "../../../../lib/supabase";

export default function EncaminhamentosRecebidos() {
  const sessao = useSessao();
  const [pendentes, setPendentes] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const [parecer, setParecer] = useState("");
  const [orientacoes, setOrientacoes] = useState("");
  const [relatorio, setRelatorio] = useState("");
  const [erros, setErros] = useState<string[]>([]);

  async function carregarPendentes() {
    const { data, error } = await supabase
      .from("encaminhamentos")
      .select("*, aluna:alunos(nome)")
      .eq("status", "pendente")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error.message);
    } else {
      setPendentes(
        (data ?? []).map((e: any) => ({
          id: String(e.id),
          alunoNome: e.aluna?.nome ?? "",
          motivo: e.motivo,
          descricao: e.descricao,
          urgencia: e.urgencia,
          professoraEmail: e.professor_email,
        }))
      );
    }
    setCarregando(false);
  }

  // recarrega toda vez que a tela volta a ficar visível
  useFocusEffect(
    useCallback(() => {
      carregarPendentes();
    }, [])
  );

  async function responder(id: string) {
    const dados = { parecer, orientacoes, relatorio };
    const problemas = validarRetorno(dados);

    if (problemas.length > 0) {
      setErros(problemas);
      return;
    }

    setEnviando(true);

    const { error } = await supabase
      .from("encaminhamentos")
      .update({
        parecer,
        orientacoes,
        relatorio,
        status: "respondido",
        respondido_por: sessao?.email ?? "",
        respondido_em: new Date().toISOString(),
      })
      .eq("id", id);

    setEnviando(false);

    if (error) {
      console.log(error.message);
      setErros(["Não foi possível enviar o retorno. Tente novamente."]);
      return;
    }

    setErros([]);
    setParecer("");
    setOrientacoes("");
    setRelatorio("");
    setSelecionado(null);
    carregarPendentes();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Voltar />

      <Text style={styles.title}>Encaminhamentos Recebidos</Text>
      <Text style={styles.subtitle}>
        Responda com o parecer e as orientações para a professora.
      </Text>

      {carregando && <ActivityIndicator size="large" color="#2f5d43" />}

      {!carregando && pendentes.length === 0 && (
        <Text style={styles.vazio}>Nenhum encaminhamento pendente.</Text>
      )}

      {pendentes.map((encaminhamento) => (
        <View key={encaminhamento.id} style={styles.card}>
          <Text style={styles.nome}>{encaminhamento.alunoNome}</Text>
          <Text style={styles.motivo}>{encaminhamento.motivo}</Text>
          <Text style={styles.texto}>{encaminhamento.descricao}</Text>
          <Text style={styles.meta}>
            Urgência: {rotuloDaUrgencia(encaminhamento.urgencia)} · Professora:{" "}
            {encaminhamento.professoraEmail}
          </Text>

          {selecionado === encaminhamento.id ? (
            <View style={styles.form}>
              <TextInput
                placeholder="Parecer"
                value={parecer}
                onChangeText={setParecer}
                style={styles.input}
              />
              <TextInput
                placeholder="Orientações para a professora"
                value={orientacoes}
                onChangeText={setOrientacoes}
                multiline
                numberOfLines={4}
                style={styles.textArea}
              />
              <TextInput
                placeholder="Relatório anexado (opcional)"
                value={relatorio}
                onChangeText={setRelatorio}
                style={styles.input}
              />

              {erros.map((erro) => (
                <Text key={erro} style={styles.erro}>
                  {erro}
                </Text>
              ))}

              <TouchableOpacity
                style={[styles.button, enviando && { opacity: 0.6 }]}
                disabled={enviando}
                onPress={() => responder(encaminhamento.id)}
              >
                <Text style={styles.buttonText}>
                  {enviando ? "Enviando..." : "Enviar retorno"}
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
              <Text style={styles.secondaryText}>Responder</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 20, paddingTop: 50 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 6 },
  subtitle: { color: "#666", marginBottom: 18 },
  vazio: { color: "#888" },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  nome: { fontSize: 16, fontWeight: "bold" },
  motivo: { color: "#444", marginBottom: 6 },
  texto: { color: "#333" },
  meta: { marginTop: 8, fontSize: 12, color: "#666" },
  form: { marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    minHeight: 90,
    textAlignVertical: "top",
  },
  erro: { color: "#b00020", marginBottom: 6 },
  button: {
    backgroundColor: "#2f5d43",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  secondary: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#2f5d43",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  secondaryText: { color: "#2f5d43", fontWeight: "bold" },
});