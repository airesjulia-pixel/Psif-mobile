
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

const COR = {
  marinho: "#1E3A5F",
  primaria: "#3B82C4",
  primariaClara: "#E8F1FB",
  borda: "#DCE6F2",
  fundo: "#F4F8FC",
  branco: "#FFFFFF",
  texto: "#26384A",
  textoSuave: "#718096",
};

export default function Perfil() {
  return (
    <ScrollView
      style={styles.tela}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.cabecalho}>
        <View>
          <Text style={styles.subtitulo}>PSIF • Área do professor</Text>
          <Text style={styles.titulo}>Meu perfil</Text>
          <Text style={styles.descricao}>
            Gerencie suas informações pessoais.
          </Text>
        </View>

        <View style={styles.iconeCabecalho}>
          <Feather name="user" size={23} color={COR.branco} />
        </View>
      </View>

      {/* Cartão do perfil */}
      <View style={styles.cartaoPerfil}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Feather name="user" size={42} color={COR.primaria} />
          </View>
          <View style={styles.indicador} />
        </View>

        <Text style={styles.nome}>Nome do Professor(a)</Text>
        <Text style={styles.email}>email@ifpb.edu.br</Text>

        <View style={styles.etiqueta}>
          <Feather name="check-circle" size={15} color={COR.primaria} />
          <Text style={styles.etiquetaTexto}>Professor(a)</Text>
        </View>

        <View style={styles.divisor} />

        <View style={styles.infoLinha}>
          <View style={styles.infoIcone}>
            <Feather name="mail" size={19} color={COR.primaria} />
          </View>
          <View style={styles.infoTexto}>
            <Text style={styles.infoLabel}>E-mail institucional</Text>
            <Text style={styles.infoValor}>email@ifpb.edu.br</Text>
          </View>
        </View>

        <View style={styles.infoLinha}>
          <View style={styles.infoIcone}>
            <Feather name="briefcase" size={19} color={COR.primaria} />
          </View>
          <View style={styles.infoTexto}>
            <Text style={styles.infoLabel}>Instituição</Text>
            <Text style={styles.infoValor}>IFPB - Campus Esperança</Text>
          </View>
        </View>
      </View>

      {/* Opções */}
      <Text style={styles.secaoTitulo}>Minha conta</Text>

      <View style={styles.opcoes}>
        <TouchableOpacity
          style={styles.opcao}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <View style={styles.opcaoIcone}>
            <Feather name="user" size={20} color={COR.primaria} />
          </View>
          <View style={styles.opcaoConteudo}>
            <Text style={styles.opcaoTitulo}>Dados pessoais</Text>
            <Text style={styles.opcaoDescricao}>
              Consulte suas informações
            </Text>
          </View>
          <Feather name="chevron-right" size={21} color={COR.textoSuave} />
        </TouchableOpacity>

        <View style={styles.linha} />

        <TouchableOpacity
          style={styles.opcao}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <View style={styles.opcaoIcone}>
            <Feather name="lock" size={20} color={COR.primaria} />
          </View>
          <View style={styles.opcaoConteudo}>
            <Text style={styles.opcaoTitulo}>Segurança</Text>
            <Text style={styles.opcaoDescricao}>
              Proteção da sua conta
            </Text>
          </View>
          <Feather name="chevron-right" size={21} color={COR.textoSuave} />
        </TouchableOpacity>

        <View style={styles.linha} />

        <TouchableOpacity
          style={styles.opcao}
          activeOpacity={0.7}
          onPress={() => {}}
        >
          <View style={styles.opcaoIcone}>
            <Feather name="help-circle" size={20} color={COR.primaria} />
          </View>
          <View style={styles.opcaoConteudo}>
            <Text style={styles.opcaoTitulo}>Ajuda e suporte</Text>
            <Text style={styles.opcaoDescricao}>
              Informações sobre o PSIF
            </Text>
          </View>
          <Feather name="chevron-right" size={21} color={COR.textoSuave} />
        </TouchableOpacity>
      </View>

      <Text style={styles.rodape}>PSIF • Plataforma de Suporte Psicopedagógico</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: COR.fundo,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 35,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },
  subtitulo: {
    fontSize: 12,
    fontWeight: "600",
    color: COR.primaria,
    marginBottom: 7,
    letterSpacing: 0.4,
  },
  titulo: {
    fontSize: 29,
    fontWeight: "800",
    color: COR.marinho,
  },
  descricao: {
    fontSize: 13,
    color: COR.textoSuave,
    marginTop: 6,
  },
  iconeCabecalho: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COR.marinho,
    alignItems: "center",
    justifyContent: "center",
  },
  cartaoPerfil: {
    backgroundColor: COR.branco,
    borderRadius: 24,
    padding: 22,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COR.borda,
    shadowColor: "#1E3A5F",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 14,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 32,
    backgroundColor: COR.primariaClara,
    borderWidth: 2,
    borderColor: COR.borda,
    alignItems: "center",
    justifyContent: "center",
  },
  indicador: {
    position: "absolute",
    right: 2,
    bottom: 3,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#22A06B",
    borderWidth: 3,
    borderColor: COR.branco,
  },
  nome: {
    fontSize: 21,
    fontWeight: "800",
    color: COR.marinho,
    textAlign: "center",
  },
  email: {
    fontSize: 13,
    color: COR.textoSuave,
    marginTop: 6,
  },
  etiqueta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: COR.primariaClara,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 15,
  },
  etiquetaTexto: {
    fontSize: 12,
    fontWeight: "700",
    color: COR.marinho,
  },
  divisor: {
    height: 1,
    backgroundColor: COR.borda,
    width: "100%",
    marginVertical: 22,
  },
  infoLinha: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 18,
  },
  infoIcone: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COR.primariaClara,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  infoTexto: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: COR.textoSuave,
    marginBottom: 5,
  },
  infoValor: {
    fontSize: 13,
    fontWeight: "600",
    color: COR.texto,
  },
  secaoTitulo: {
    fontSize: 18,
    fontWeight: "800",
    color: COR.marinho,
    marginTop: 28,
    marginBottom: 14,
  },
  opcoes: {
    backgroundColor: COR.branco,
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COR.borda,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
  },
  opcaoIcone: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COR.primariaClara,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },
  opcaoConteudo: {
    flex: 1,
  },
  opcaoTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: COR.marinho,
  },
  opcaoDescricao: {
    fontSize: 12,
    color: COR.textoSuave,
    marginTop: 5,
  },
  linha: {
    height: 1,
    backgroundColor: COR.borda,
  },
  rodape: {
    textAlign: "center",
    color: COR.textoSuave,
    fontSize: 10,
    marginTop: 26,
    lineHeight: 16,
  },
});
