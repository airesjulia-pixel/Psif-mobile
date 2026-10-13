
import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { supabase } from "../../../../lib/supabase";
import Voltar from "../../components/voltar";
import { CURSOS, filtrarAlunos } from "../../data/aluno";

type Aluno = {
  id: string;
  nome: string;
  curso: string;
  foto: string;
};

export default function Alunos() {
  const [cursoSelecionado, setCursoSelecionado] = useState("");
  const [pesquisa, setPesquisa] = useState("");
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      try {
        const { data, error } = await supabase
          .from("alunos")
          .select(
            "id, nome, matricula, foto_url, turma:turmas(nome, curso:cursos(nome))"
          );

        if (error) throw error;

        if (ativo) {
          setAlunos(
            (data ?? []).map((a: any) => ({
              id: String(a.id),
              nome: a.nome,
              curso: a.turma?.curso?.nome ?? "",
              foto:
                a.foto_url ??
                `https://i.pravatar.cc/200?u=${a.id}`,
            }))
          );
        }
      } catch (e: any) {
        console.log("Erro ao carregar alunos:", e.message);

        if (ativo) {
          setErro("Não foi possível carregar os alunos.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, []);

  const alunosFiltrados = filtrarAlunos(alunos, {
    curso: cursoSelecionado,
    pesquisa,
  });

  function abrirAluno(alunoId: string) {
    router.push({
      pathname: "/Aluno/perfilAluno",
      params: { id: alunoId },
    } as never);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F8FC" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.conteudo}
      >
        <View style={styles.topo}>
          <Voltar />

          <View style={styles.iconeTopo}>
            <FontAwesome5
              name="users"
              size={19}
              color="#FFFFFF"
            />
          </View>
        </View>

        <Text style={styles.subtitulo}>ÁREA DO PROFESSOR</Text>

        <Text style={styles.titulo}>TESTE PSIF 123</Text>

        <Text style={styles.descricao}>
          Consulte os alunos acompanhados e acesse seus perfis
          para visualizar informações importantes.
        </Text>

        <View style={styles.resumo}>
          <View style={styles.iconeResumo}>
            <FontAwesome5
              name="user-graduate"
              size={23}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.resumoTexto}>
            <Text style={styles.resumoNumero}>
              {carregando ? "..." : alunos.length}
            </Text>
            <Text style={styles.resumoLegenda}>
              alunos cadastrados
            </Text>
          </View>

          <View style={styles.resumoDetalhe}>
            <FontAwesome5
              name="id-card"
              size={25}
              color="#8DBCE0"
            />
          </View>
        </View>

        <View style={styles.tituloSecao}>
          <Text style={styles.tituloSecaoTexto}>
            Lista de alunos
          </Text>
          <Text style={styles.contador}>
            {carregando ? "..." : alunosFiltrados.length} encontrados
          </Text>
        </View>

        <View style={styles.buscaContainer}>
          <FontAwesome5
            name="search"
            size={16}
            color="#7895AC"
          />

          <TextInput
            style={styles.busca}
            placeholder="Buscar por nome..."
            placeholderTextColor="#8CA1B3"
            value={pesquisa}
            onChangeText={setPesquisa}
          />

          {pesquisa.length > 0 && (
            <TouchableOpacity onPress={() => setPesquisa("")}>
              <FontAwesome5
                name="times-circle"
                size={16}
                color="#7895AC"
              />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.filtroTitulo}>Filtrar por curso</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtros}
          contentContainerStyle={styles.filtrosConteudo}
        >
          <TouchableOpacity
            style={[
              styles.filtro,
              cursoSelecionado === "" && styles.filtroAtivo,
            ]}
            onPress={() => setCursoSelecionado("")}
          >
            <Text
              style={[
                styles.filtroTexto,
                cursoSelecionado === "" && styles.filtroTextoAtivo,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>

          {CURSOS.map((curso) => (
            <TouchableOpacity
              key={curso}
              style={[
                styles.filtro,
                cursoSelecionado === curso && styles.filtroAtivo,
              ]}
              onPress={() => setCursoSelecionado(curso)}
            >
              <Text
                style={[
                  styles.filtroTexto,
                  cursoSelecionado === curso &&
                    styles.filtroTextoAtivo,
                ]}
              >
                {curso}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {carregando ? (
          <View style={styles.estado}>
            <ActivityIndicator size="large" color="#3979A8" />
            <Text style={styles.estadoTexto}>
              Carregando alunos...
            </Text>
          </View>
        ) : erro ? (
          <View style={styles.estado}>
            <FontAwesome5
              name="exclamation-circle"
              size={30}
              color="#C06A6A"
            />
            <Text style={styles.estadoErro}>{erro}</Text>
          </View>
        ) : alunosFiltrados.length === 0 ? (
          <View style={styles.estadoVazio}>
            <View style={styles.iconeVazio}>
              <FontAwesome5
                name="user-slash"
                size={27}
                color="#7399B7"
              />
            </View>

            <Text style={styles.vazioTitulo}>
              Nenhum aluno encontrado
            </Text>

            <Text style={styles.vazioDescricao}>
              Tente pesquisar por outro nome ou selecionar outro curso.
            </Text>

            <TouchableOpacity
              style={styles.limparFiltros}
              onPress={() => {
                setPesquisa("");
                setCursoSelecionado("");
              }}
            >
              <Text style={styles.limparFiltrosTexto}>
                Limpar filtros
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.lista}>
            {alunosFiltrados.map((aluno) => (
              <TouchableOpacity
                key={aluno.id}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => abrirAluno(aluno.id)}
              >
                <View style={styles.fotoContainer}>
                  <Image
                    source={{ uri: aluno.foto }}
                    style={styles.foto}
                  />
                  <View style={styles.indicador} />
                </View>

                <View style={styles.infoAluno}>
                  <Text style={styles.nome} numberOfLines={1}>
                    {aluno.nome}
                  </Text>

                  <View style={styles.cursoLinha}>
                    <FontAwesome5
                      name="graduation-cap"
                      size={11}
                      color="#7292AA"
                    />
                    <Text style={styles.curso} numberOfLines={2}>
                      {aluno.curso || "Curso não informado"}
                    </Text>
                  </View>

                  <View style={styles.acessarLinha}>
                    <Text style={styles.acessarTexto}>
                      Ver perfil
                    </Text>
                    <FontAwesome5
                      name="arrow-right"
                      size={10}
                      color="#3979A8"
                    />
                  </View>
                </View>

                <View style={styles.setaContainer}>
                  <FontAwesome5
                    name="chevron-right"
                    size={13}
                    color="#3979A8"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.rodape}>
          PSIF • Acompanhamento psicopedagógico
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FC",
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
  },

  topo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  iconeTopo: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: "#3979A8",
    alignItems: "center",
    justifyContent: "center",
  },

  subtitulo: {
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "800",
    color: "#5685A8",
    marginBottom: 7,
  },

  titulo: {
    fontSize: 32,
    fontWeight: "800",
    color: "#244A69",
    letterSpacing: -0.8,
  },

  descricao: {
    fontSize: 14,
    lineHeight: 21,
    color: "#71899D",
    marginTop: 8,
    marginBottom: 22,
    maxWidth: 340,
  },

  resumo: {
    backgroundColor: "#244A69",
    borderRadius: 22,
    padding: 19,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    overflow: "hidden",
  },

  iconeResumo: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#3979A8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },

  resumoTexto: {
    flex: 1,
  },

  resumoNumero: {
    fontSize: 27,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  resumoLegenda: {
    color: "#D5E6F3",
    fontSize: 13,
    marginTop: 1,
  },

  resumoDetalhe: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    opacity: 0.95,
    alignItems: "center",
    justifyContent: "center",
  },

  tituloSecao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  tituloSecaoTexto: {
    color: "#244A69",
    fontSize: 19,
    fontWeight: "800",
  },

  contador: {
    fontSize: 11,
    color: "#66849B",
    backgroundColor: "#E5EFF7",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    overflow: "hidden",
  },

  buscaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E1EAF2",
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 53,
    marginBottom: 21,
  },

  busca: {
    flex: 1,
    color: "#244A69",
    fontSize: 14,
    marginLeft: 11,
    paddingVertical: 10,
  },

  filtroTitulo: {
    color: "#496C87",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 11,
  },

  filtros: {
    marginBottom: 24,
    flexGrow: 0,
  },

  filtrosConteudo: {
    gap: 9,
    paddingRight: 8,
  },

  filtro: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0EAF2",
  },

  filtroAtivo: {
    backgroundColor: "#3979A8",
    borderColor: "#3979A8",
  },

  filtroTexto: {
    color: "#5C7890",
    fontSize: 12,
    fontWeight: "700",
  },

  filtroTextoAtivo: {
    color: "#FFFFFF",
  },

  lista: {
    gap: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: "#E5EDF4",
    shadowColor: "#244A69",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.045,
    shadowRadius: 8,
    elevation: 2,
  },

  fotoContainer: {
    position: "relative",
    marginRight: 13,
  },

  foto: {
    width: 59,
    height: 59,
    borderRadius: 19,
    backgroundColor: "#E4EEF6",
  },

  indicador: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#83B6D9",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  infoAluno: {
    flex: 1,
    minWidth: 0,
  },

  nome: {
    color: "#244A69",
    fontSize: 15,
    fontWeight: "800",
  },

  cursoLinha: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    gap: 6,
  },

  curso: {
    color: "#7890A4",
    fontSize: 11,
    flex: 1,
  },

  acessarLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 10,
  },

  acessarTexto: {
    color: "#3979A8",
    fontSize: 12,
    fontWeight: "700",
  },

  setaContainer: {
    width: 31,
    height: 31,
    borderRadius: 11,
    backgroundColor: "#EDF5FB",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  estado: {
    paddingVertical: 55,
    alignItems: "center",
    justifyContent: "center",
  },

  estadoTexto: {
    color: "#66849B",
    marginTop: 12,
    fontSize: 13,
  },

  estadoErro: {
    color: "#A95D5D",
    textAlign: "center",
    marginTop: 12,
    fontSize: 14,
  },

  estadoVazio: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    marginTop: 2,
    borderWidth: 1,
    borderColor: "#E5EDF4",
  },

  iconeVazio: {
    width: 65,
    height: 65,
    borderRadius: 22,
    backgroundColor: "#EAF3FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  vazioTitulo: {
    color: "#244A69",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  vazioDescricao: {
    color: "#7890A4",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },

  limparFiltros: {
    marginTop: 17,
    backgroundColor: "#3979A8",
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 12,
  },

  limparFiltrosTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },

  rodape: {
    color: "#9AAEBD",
    textAlign: "center",
    fontSize: 10,
    marginTop: 30,
    marginBottom: 8,
  },
});
