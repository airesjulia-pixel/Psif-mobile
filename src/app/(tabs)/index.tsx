import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEncaminhamentos } from "../../data/encaminhamento";
import { rotuloDoPerfil } from "../../data/perfil";
import { useSessao } from "../../data/sessao";

function nomeDoEmail(email?: string) {
  if (!email) return "Professor(a)";

  return email
    .split("@")[0]
    .split(/[._-]/)
    .filter(Boolean)
    .map(
      (parte) => parte[0].toUpperCase() + parte.slice(1)
    )
    .join(" ");
}


function iniciais(nome: string) {
  const partes = nome.trim().split(" ");
  const primeira = partes[0]?.[0] ?? "";
  const ultima =
    partes.length > 1 ? partes[partes.length - 1][0] : "";

  return (primeira + ultima).toUpperCase();
}

export default function Dashboard() {
  const sessao = useSessao();

  const perfil = sessao?.perfil ?? "professora";
  const ehProfessora = perfil === "professora";

  const encaminhamentos = useEncaminhamentos(
    ehProfessora ? sessao?.email : undefined
  );

  const pendentes = encaminhamentos.filter(
    (encaminhamento) =>
      encaminhamento.status === "pendente"
  ).length;

  const nome = nomeDoEmail(sessao?.email);


  function abrirPerfil() {
    router.push("/professor/perfil");
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {}
        <Text style={styles.rotuloSecao}>MEU PERFIL</Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={abrirPerfil}
          accessibilityRole="button"
          accessibilityLabel="Abrir meu perfil"
        >
          <View style={styles.perfilCard}>
            <View style={styles.perfilAvatar}>
              <Text style={styles.perfilIniciais}>
                {iniciais(nome)}
              </Text>
            </View>

            <View style={styles.perfilInfo}>
              <Text
                style={styles.perfilNome}
                numberOfLines={1}
              >
                {nome}
              </Text>

              <View style={styles.perfilLinha}>
                <FontAwesome5
                  name="envelope"
                  size={11}
                  color="#3d6b8e"
                />

                <Text
                  style={styles.perfilEmail}
                  numberOfLines={1}
                >
                  {sessao?.email || "E-mail não informado"}
                </Text>
              </View>

              <View style={styles.perfilTag}>
                <FontAwesome5
                  name={
                    ehProfessora
                      ? "chalkboard-teacher"
                      : "user-md"
                  }
                  size={11}
                  color="#244A69"
                />

                <Text style={styles.perfilTagTexto}>
                  {rotuloDoPerfil(perfil)}
                </Text>
              </View>
            </View>

            <FontAwesome5
              name="chevron-right"
              size={16}
              color="#3d6b8e"
            />
          </View>
        </TouchableOpacity>

        {}
        <Text style={styles.rotuloSecao}>RESUMO</Text>

        {}
        <View style={styles.mainCard}>
          <View style={styles.mainTopo}>
            <View style={styles.mainIcone}>
              <FontAwesome5
                name={
                  ehProfessora
                    ? "paper-plane"
                    : "calendar-check"
                }
                size={18}
                color="#fff"
              />
            </View>

            <Text style={styles.cardTitle}>
              {ehProfessora
                ? "Encaminhamentos enviados"
                : "Atendimentos de hoje"}
            </Text>
          </View>

          <Text style={styles.bigNumber}>
            {ehProfessora
              ? String(encaminhamentos.length).padStart(2, "0")
              : "08"}
          </Text>

          <View style={styles.compareBox}>
            <FontAwesome5
              name={ehProfessora ? "clock" : "arrow-up"}
              size={11}
              color="#DCEAF5"
            />

            <Text style={styles.compare}>
              {ehProfessora
                ? "Aguardando retorno da psicopedagoga"
                : "+2 em relação a ontem"}
            </Text>
          </View>
        </View>

        {}
        <View style={styles.row}>
          <View style={styles.smallCard}>
            <View style={styles.smallIcone}>
              <FontAwesome5
                name="users"
                size={16}
                color="#244A69"
              />
            </View>

            <Text style={styles.smallNumber}>
              {ehProfessora ? "08" : "124"}
            </Text>

            <Text style={styles.smallTitle}>
              {ehProfessora
                ? "Meus Alunos"
                : "Alunos Acompanhados"}
            </Text>
          </View>

          <View style={styles.smallCard}>
            <View style={styles.smallIcone}>
              <FontAwesome5
                name={
                  ehProfessora
                    ? "hourglass-half"
                    : "file-alt"
                }
                size={16}
                color="#244A69"
              />
            </View>

            <Text style={styles.smallNumber}>
              {ehProfessora
                ? String(pendentes).padStart(2, "0")
                : "05"}
            </Text>

            <Text style={styles.smallTitle}>
              {ehProfessora
                ? "Pendentes de análise"
                : "Relatórios Pendentes"}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEAF5",
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  rotuloSecao: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#3d6b8e",
    marginBottom: 10,
  },

  perfilCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 22,
    gap: 14,
    elevation: 3,
    shadowColor: "#244A69",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  perfilAvatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#244A69",
    alignItems: "center",
    justifyContent: "center",
  },

  perfilIniciais: {
    fontSize: 24,
    fontWeight: "800",
    color: "#fff",
  },

  perfilInfo: {
    flex: 1,
    minWidth: 0,
  },

  perfilNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#244A69",
  },

  perfilLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },

  perfilEmail: {
    flex: 1,
    fontSize: 13,
    color: "#3d6b8e",
  },

  perfilTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "#EAF3FA",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 10,
  },

  perfilTagTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: "#244A69",
  },

  mainCard: {
    backgroundColor: "#244A69",
    borderRadius: 20,
    padding: 22,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#244A69",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  mainTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  mainIcone: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#3d6b8e",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: {
    flex: 1,
    color: "#DCEAF5",
    fontSize: 15,
    fontWeight: "600",
  },

  bigNumber: {
    fontSize: 54,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 14,
    marginBottom: 8,
  },

  compareBox: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "#3d6b8e",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  compare: {
    color: "#DCEAF5",
    fontSize: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  smallCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 5,
    borderLeftColor: "#244A69",
    elevation: 3,
    shadowColor: "#244A69",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  smallIcone: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EAF3FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  smallNumber: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#244A69",
  },

  smallTitle: {
    fontSize: 13,
    color: "#3d6b8e",
    marginTop: 2,
  },
});
