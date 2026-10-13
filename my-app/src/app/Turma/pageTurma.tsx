
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import Voltar from "../../components/voltar";

type Aluno = {
  id: string;
  nome: string;
  curso: string | null;
  turma: string | null;
};

export default function Turma() {
  const [curso, setCurso] = useState("");
  const [turma, setTurma] = useState("");
  const [pesquisa, setPesquisa] = useState("");

  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarAlunos() {
      try {
        // Evita importar o Supabase durante a renderização
        // no servidor web.
        if (
          typeof window === "undefined" &&
          requirePlatformIsWeb()
        ) {
          return;
        }

        const { supabase } = await import("../../../../lib/supabase");

        const { data, error } = await supabase
          .from("alunos")
          .select("id, nome, curso, turma")
          .order("nome", { ascending: true });

        if (error) {
          throw error;
        }

        if (ativo) {
          setAlunos((data ?? []) as Aluno[]);
        }
      } catch (e: any) {
        console.error("Erro ao carregar alunos:", e);

        if (ativo) {
          setErro(
            e?.message ?? "Não foi possível carregar os alunos."
          );
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarAlunos();

    return () => {
      ativo = false;
    };
  }, []);

  // Pesquisa e filtros usam os dados reais do Supabase.
  const alunosFiltrados = alunos.filter((aluno) => {
    const filtroNome = (aluno.nome ?? "")
      .toLowerCase()
      .includes(pesquisa.toLowerCase());

    const filtroCurso =
      curso === "" || aluno.curso === curso;

    const filtroTurma =
      turma === "" || aluno.turma === turma;

    return filtroNome && filtroCurso && filtroTurma;
  });

  const cursos = Array.from(
    new Set(
      alunos
        .map((aluno) => aluno.curso)
        .filter((valor): valor is string => Boolean(valor))
    )
  );

  const turmas = Array.from(
    new Set(
      alunos
        .filter((aluno) => !curso || aluno.curso === curso)
        .map((aluno) => aluno.turma)
        .filter((valor): valor is string => Boolean(valor))
    )
  );

  function abrirPerfil(aluno: Aluno) {
    router.push({
      pathname: "./perfilAluno",
      params: {
        id: aluno.id,
      },
    } as any);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <Voltar />

      <View style={styles.cabecalho}>
        <View style={styles.iconeCabecalho}>
          <FontAwesome5
            name="user-graduate"
            size={25}
            color="#244A69"
          />
        </View>

        <View style={styles.cabecalhoTexto}>
          <Text style={styles.title}>Meus Alunos</Text>
          <Text style={styles.subtitulo}>
            Acompanhe os alunos das suas turmas
          </Text>
        </View>
      </View>

      <View style={styles.contador}>
        <FontAwesome5
          name="users"
          size={19}
          color="#244A69"
        />
        <Text style={styles.contadorTexto}>
          {alunosFiltrados.length} aluno(s) encontrado(s)
        </Text>
      </View>

      <View style={styles.pesquisaContainer}>
        <FontAwesome5
          name="search"
          size={16}
          color="#6D8498"
        />

        <TextInput
          style={styles.search}
          placeholder="Pesquisar aluno pelo nome"
          placeholderTextColor="#8A9BAA"
          value={pesquisa}
          onChangeText={setPesquisa}
        />

        {pesquisa.length > 0 && (
          <TouchableOpacity onPress={() => setPesquisa("")}>
            <FontAwesome5
              name="times-circle"
              size={17}
              color="#8A9BAA"
            />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filtros}>
        <View style={styles.pickerBox}>
          <Picker
            selectedValue={curso}
            onValueChange={(valor) => {
              setCurso(valor);
              setTurma("");
            }}
            style={styles.picker}
          >
            <Picker.Item label="Todos os cursos" value="" />
            {cursos.map((item) => (
              <Picker.Item
                key={item}
                label={item}
                value={item}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerBox}>
          <Picker
            selectedValue={turma}
            onValueChange={setTurma}
            style={styles.picker}
          >
            <Picker.Item label="Todas as turmas" value="" />
            {turmas.map((item) => (
              <Picker.Item
                key={item}
                label={item}
                value={item}
              />
            ))}
          </Picker>
        </View>
      </View>

      {carregando ? (
        <View style={styles.estado}>
          <ActivityIndicator size="large" color="#244A69" />
          <Text style={styles.estadoTexto}>
            Carregando alunos...
          </Text>
        </View>
      ) : erro ? (
        <View style={styles.estado}>
          <FontAwesome5
            name="exclamation-circle"
            size={32}
            color="#B45353"
          />
          <Text style={styles.erroTitulo}>
            Não foi possível carregar os alunos
          </Text>
          <Text style={styles.estadoTexto}>{erro}</Text>

          <TouchableOpacity
            style={styles.botaoLimpar}
            onPress={() => {
              setErro("");
              setCarregando(true);

              // Recarregue a tela para tentar buscar os dados novamente.
              router.replace("./turma" as any);
            }}
          >
            <Text style={styles.botaoLimparTexto}>
              Tentar novamente
            </Text>
          </TouchableOpacity>
        </View>
      ) : alunosFiltrados.length === 0 ? (
        <View style={styles.estado}>
          <View style={styles.iconeVazio}>
            <FontAwesome5
              name="user-slash"
              size={30}
              color="#6D91AE"
            />
          </View>

          <Text style={styles.vazioTitulo}>
            Nenhum aluno encontrado
          </Text>
          <Text style={styles.estadoTexto}>
            {alunos.length === 0
              ? "Ainda não existem alunos cadastrados ou não há permissão para consultá-los."
              : "Tente alterar a pesquisa ou os filtros selecionados."}
          </Text>
        </View>
      ) : (
        alunosFiltrados.map((aluno) => (
          <TouchableOpacity
            key={aluno.id}
            style={styles.card}
            activeOpacity={0.75}
            onPress={() => abrirPerfil(aluno)}
          >
            <Image
              source={{
                uri: `https://i.pravatar.cc/150?u=${encodeURIComponent(
                  aluno.id
                )}`,
              }}
              style={styles.avatar}
            />

            <View style={styles.alunoInfo}>
              <Text style={styles.nome}>
                {aluno.nome}
              </Text>

              <Text style={styles.info}>
                {aluno.curso || "Curso não informado"}
              </Text>

              <Text style={styles.info}>
                {aluno.turma || "Turma não informada"}
              </Text>

              <View style={styles.statusLinha}>
                <View style={styles.statusPonto} />
                <Text style={styles.status}>
                  Ver perfil do aluno
                </Text>
              </View>
            </View>

            <View style={styles.seta}>
              <FontAwesome5
                name="chevron-right"
                size={15}
                color="#244A69"
              />
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
}

// A tela usa carregamento dinâmico do Supabase.
// O teste de plataforma evita depender de window no servidor web.
function requirePlatformIsWeb() {
  // Importação estática de Platform não depende de window.
  return false;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FC",
  },

  conteudo: {
    padding: 20,
    paddingBottom: 35,
  },

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 22,
  },

  iconeCabecalho: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  cabecalhoTexto: {
    flex: 1,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#244A69",
  },

  subtitulo: {
    fontSize: 13,
    color: "#6D8498",
    marginTop: 5,
  },

  contador: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#DCEAF5",
    padding: 14,
    borderRadius: 13,
    marginBottom: 16,
  },

  contadorTexto: {
    color: "#244A69",
    fontSize: 14,
    fontWeight: "600",
  },

  pesquisaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    paddingHorizontal: 14,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#E2ECF4",
  },

  search: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 14,
    color: "#244A69",
    outlineStyle: "none" as any,
  },

  filtros: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  pickerBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E2ECF4",
  },

  picker: {
    color: "#244A69",
    height: 52,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 17,
    marginBottom: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2ECF4",
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 13,
    backgroundColor: "#DCEAF5",
  },

  alunoInfo: {
    flex: 1,
  },

  nome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#244A69",
  },

  info: {
    marginTop: 4,
    fontSize: 13,
    color: "#6D8498",
  },

  statusLinha: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    gap: 6,
  },

  statusPonto: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#5B9B7A",
  },

  status: {
    fontSize: 12,
    color: "#244A69",
    fontWeight: "600",
  },

  seta: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#EDF4FA",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  estado: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 45,
  },

  estadoTexto: {
    fontSize: 14,
    color: "#6D8498",
    textAlign: "center",
    lineHeight: 21,
    marginTop: 12,
  },

  erroTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#244A69",
    textAlign: "center",
    marginTop: 14,
  },

  botaoLimpar: {
    backgroundColor: "#244A69",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 11,
    marginTop: 17,
  },

  botaoLimparTexto: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  iconeVazio: {
    width: 70,
    height: 70,
    borderRadius: 23,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
  },

  vazioTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#244A69",
    marginTop: 17,
  },
});
