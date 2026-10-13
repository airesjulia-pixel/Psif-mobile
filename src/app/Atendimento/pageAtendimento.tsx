
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Voltar from "../../components/voltar";

type Atendimento = {
  id: string;
  aluno_id: string;
  data_atendimento: string;
  observacoes: string | null;
  progresso: string | null;
  dificuldades: string | null;
  intervencoes: string | null;
  aluno?: {
    nome: string;
  } | null;
};

export default function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [atualizar, setAtualizar] = useState(0);

  const carregarAtendimentos = useCallback(async () => {
    setCarregando(true);
    setErro("");

    try {
      // Impede o carregamento durante a renderização no servidor web.
      if (Platform.OS === "web" && typeof window === "undefined") {
        return;
      }

      // O Supabase só é importado no cliente, após a montagem da tela.
      const { supabase } = await import("../../../lib/supabase");

      const { data, error: erroConsulta } = await supabase
        .from("atendimentos")
        .select(`
          id,
          aluno_id,
          data_atendimento,
          observacoes,
          progresso,
          dificuldades,
          intervencoes,
          aluno:alunos (
            nome
          )
        `)
        .order("data_atendimento", { ascending: false });

      if (erroConsulta) {
        throw erroConsulta;
      }

      setAtendimentos((data ?? []) as unknown as Atendimento[]);
    } catch (e: any) {
      console.error("Erro ao carregar atendimentos:", e);
      setErro(
        e?.message ??
          "Não foi possível carregar os atendimentos."
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarAtendimentos();
  }, [carregarAtendimentos, atualizar]);

  function formatarData(data: string) {
    if (!data) return "Data não informada";

    const partes = data.split("-");
    if (partes.length !== 3) return data;

    return `${partes[2].slice(0, 2)}/${partes[1]}/${partes[0]}`;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Voltar />

        <View style={styles.tituloContainer}>
          <View style={styles.iconeTitulo}>
            <FontAwesome5
              name="clipboard-list"
              size={22}
              color="#244A69"
            />
          </View>

          <View style={styles.tituloTextos}>
            <Text style={styles.titulo}>Atendimentos</Text>
            <Text style={styles.subtitulo}>
              Acompanhamento dos alunos
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.resumo}>
        <View style={styles.resumoIcone}>
          <FontAwesome5
            name="calendar-check"
            size={21}
            color="#244A69"
          />
        </View>

        <View>
          <Text style={styles.resumoNumero}>
            {atendimentos.length}
          </Text>
          <Text style={styles.resumoTexto}>
            {atendimentos.length === 1
              ? "atendimento registrado"
              : "atendimentos registrados"}
          </Text>
        </View>

        <Pressable
          style={styles.botaoAtualizar}
          onPress={() => setAtualizar((valor) => valor + 1)}
          accessibilityRole="button"
          accessibilityLabel="Atualizar atendimentos"
        >
          <FontAwesome5
            name="sync-alt"
            size={16}
            color="#244A69"
          />
        </Pressable>
      </View>

      {carregando ? (
        <View style={styles.estado}>
          <ActivityIndicator size="large" color="#244A69" />
          <Text style={styles.estadoTexto}>
            Carregando atendimentos...
          </Text>
        </View>
      ) : erro ? (
        <View style={styles.estado}>
          <FontAwesome5
            name="exclamation-circle"
            size={34}
            color="#B45353"
          />
          <Text style={styles.erroTitulo}>
            Não foi possível carregar
          </Text>
          <Text style={styles.estadoTexto}>{erro}</Text>

          <Pressable
            style={styles.botaoTentar}
            onPress={() => setAtualizar((valor) => valor + 1)}
          >
            <Text style={styles.botaoTentarTexto}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      ) : atendimentos.length === 0 ? (
        <View style={styles.estado}>
          <View style={styles.vazioIcone}>
            <FontAwesome5
              name="clipboard"
              size={34}
              color="#6D91AE"
            />
          </View>

          <Text style={styles.vazioTitulo}>
            Nenhum atendimento ainda
          </Text>

          <Text style={styles.estadoTexto}>
            Os atendimentos registrados no sistema aparecerão
            aqui.
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.lista}
        >
          {atendimentos.map((item) => {
            const aluno = Array.isArray(item.aluno)
              ? item.aluno[0]
              : item.aluno;

            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardTopo}>
                  <View style={styles.alunoIcone}>
                    <FontAwesome5
                      name="user-graduate"
                      size={19}
                      color="#244A69"
                    />
                  </View>

                  <View style={styles.alunoInfo}>
                    <Text style={styles.nomeAluno}>
                      {aluno?.nome ?? "Aluno não identificado"}
                    </Text>

                    <View style={styles.dataLinha}>
                      <FontAwesome5
                        name="calendar-alt"
                        size={12}
                        color="#6D91AE"
                      />
                      <Text style={styles.dataTexto}>
                        {formatarData(item.data_atendimento)}
                      </Text>
                    </View>
                  </View>

                  <FontAwesome5
                    name="chevron-right"
                    size={14}
                    color="#9BB2C5"
                  />
                </View>

                {item.progresso ? (
                  <View style={styles.detalhe}>
                    <Text style={styles.detalheTitulo}>
                      Progresso
                    </Text>
                    <Text style={styles.detalheTexto}>
                      {item.progresso}
                    </Text>
                  </View>
                ) : null}

                {item.dificuldades ? (
                  <View style={styles.detalhe}>
                    <Text style={styles.detalheTitulo}>
                      Dificuldades identificadas
                    </Text>
                    <Text style={styles.detalheTexto}>
                      {item.dificuldades}
                    </Text>
                  </View>
                ) : null}

                {item.intervencoes ? (
                  <View style={styles.detalhe}>
                    <Text style={styles.detalheTitulo}>
                      Intervenções realizadas
                    </Text>
                    <Text style={styles.detalheTexto}>
                      {item.intervencoes}
                    </Text>
                  </View>
                ) : null}

                {item.observacoes ? (
                  <View style={styles.detalhe}>
                    <Text style={styles.detalheTitulo}>
                      Observações
                    </Text>
                    <Text style={styles.detalheTexto}>
                      {item.observacoes}
                    </Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FC",
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  topo: {
    marginBottom: 22,
  },
  tituloContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    gap: 12,
  },
  iconeTitulo: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
  },
  tituloTextos: {
    flex: 1,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#244A69",
  },
  subtitulo: {
    fontSize: 14,
    color: "#6D8498",
    marginTop: 4,
  },
  resumo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2ECF4",
  },
  resumoIcone: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  resumoNumero: {
    fontSize: 22,
    fontWeight: "700",
    color: "#244A69",
  },
  resumoTexto: {
    fontSize: 13,
    color: "#6D8498",
    marginTop: 2,
  },
  botaoAtualizar: {
    marginLeft: "auto",
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EDF4FA",
    alignItems: "center",
    justifyContent: "center",
  },
  lista: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2ECF4",
  },
  cardTopo: {
    flexDirection: "row",
    alignItems: "center",
  },
  alunoIcone: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  alunoInfo: {
    flex: 1,
  },
  nomeAluno: {
    fontSize: 16,
    fontWeight: "700",
    color: "#244A69",
  },
  dataLinha: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },
  dataTexto: {
    fontSize: 13,
    color: "#6D8498",
  },
  detalhe: {
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EDF2F7",
  },
  detalheTitulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#365E7D",
    marginBottom: 5,
  },
  detalheTexto: {
    fontSize: 14,
    lineHeight: 21,
    color: "#526A7D",
  },
  estado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  estadoTexto: {
    fontSize: 14,
    color: "#6D8498",
    textAlign: "center",
    lineHeight: 21,
    marginTop: 10,
  },
  erroTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#244A69",
    marginTop: 15,
  },
  botaoTentar: {
    backgroundColor: "#244A69",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 18,
  },
  botaoTentarTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  vazioIcone: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
  },
  vazioTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#244A69",
    marginTop: 18,
  },
});
