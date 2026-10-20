import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { router } from "expo-router";

import { PERFIS, Perfil, rotuloDoPerfil } from "../../data/perfil";
import { iniciarSessao } from "../../data/sessao";

const COR = {
  azul: "#244A69",
  azulEscuro: "#162f45",
  azulClaro: "#e6edf3",
  fundo: "#f2f5f8",
  texto: "#1a2733",
  textoSuave: "#64768a",
  borda: "#d3dce5",
  placeholder: "#9aa7b5",
  rodape: "#8593a3",
  branco: "#ffffff",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const [perfil, setPerfil] = useState<Perfil>("professora");
  const [campoAtivo, setCampoAtivo] = useState<"email" | "senha" | null>(null);

  function entrar() {
    iniciarSessao({ email: email.trim(), perfil });
    router.push("./Inicial/deshboard");
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" backgroundColor={COR.azul} />

      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.logoCirculo}>
            {
          }
            <Text style={styles.logoLetra}>P</Text>
          </View>

          <Text style={styles.logo}>PSIF</Text>
          <Text style={styles.subtitle}>
            Plataforma de Suporte Psicopedagógico
          </Text>
        </View>

        {/* Cartão */}
        <View style={styles.card}>
          <Text style={styles.titulo}>Bem-vindo(a) de volta</Text>
          <Text style={styles.tituloAjuda}>Entre para acessar sua conta.</Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            placeholder="seu.nome@ifpb.edu.br"
            placeholderTextColor={COR.placeholder}
            style={[styles.input, campoAtivo === "email" && styles.inputAtivo]}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setCampoAtivo("email")}
            onBlur={() => setCampoAtivo(null)}
          />

          <Text style={styles.label}>Senha</Text>
          <View
            style={[
              styles.inputLinha,
              campoAtivo === "senha" && styles.inputAtivo,
            ]}
          >
            <TextInput
              placeholder="Sua senha"
              placeholderTextColor={COR.placeholder}
              secureTextEntry={!mostrarSenha}
              style={styles.inputSenha}
              value={senha}
              onChangeText={setSenha}
              onFocus={() => setCampoAtivo("senha")}
              onBlur={() => setCampoAtivo(null)}
            />
            <TouchableOpacity
              onPress={() => setMostrarSenha((v) => !v)}
              accessibilityRole="button"
              accessibilityLabel={
                mostrarSenha ? "Ocultar senha" : "Mostrar senha"
              }
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.mostrar}>
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Entrar como</Text>
          <View style={styles.perfilRow}>
            {PERFIS.map((opcao) => {
              const ativo = perfil === opcao;
              return (
                <TouchableOpacity
                  key={opcao}
                  accessibilityRole="button"
                  accessibilityState={{ selected: ativo }}
                  activeOpacity={0.8}
                  style={[styles.perfilBotao, ativo && styles.perfilBotaoAtivo]}
                  onPress={() => setPerfil(opcao)}
                >
                  <Text
                    style={[styles.perfilTexto, ativo && styles.perfilTextoAtivo]}
                  >
                    {rotuloDoPerfil(opcao)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.rememberRow}
              onPress={() => setLembrar((v) => !v)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: lembrar }}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, lembrar && styles.checkboxAtivo]}>
                {lembrar && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={styles.remember}>Lembrar-me</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("./Login/recuperarSenha")}
            >
              <Text style={styles.forgot}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={entrar}
            activeOpacity={0.85}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText} onPress={() => router.push("/")}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Acesso exclusivo para psicopedagogos e professores do IFPB
          </Text>
        </View>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Não tem uma conta?</Text>
          <TouchableOpacity>
            <Text style={styles.registerLink}> Cadastre-se aqui</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: COR.fundo,
  },

  scroll: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 32,
  },

  /* Cabeçalho azul com curva inferior */
  header: {
    width: "100%",
    backgroundColor: COR.azul,
    alignItems: "center",
    paddingTop: 64,
    paddingBottom: 96,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },

  logoCirculo: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COR.branco,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.35)",
  },

  logoImage: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },

  logoLetra: {
    fontSize: 34,
    fontWeight: "800",
    color: COR.azul,
  },

  logo: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 3,
    color: COR.branco,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    paddingHorizontal: 24,
  },

  /* Cartão sobreposto ao cabeçalho */
  card: {
    width: "100%",
    maxWidth: 380,
    marginTop: -56,
    backgroundColor: COR.branco,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 26,
    shadowColor: COR.azulEscuro,
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: COR.texto,
  },

  tituloAjuda: {
    fontSize: 13,
    color: COR.textoSuave,
    marginTop: 2,
    marginBottom: 22,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COR.texto,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1.5,
    borderColor: COR.borda,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    marginBottom: 16,
    backgroundColor: COR.branco,
    fontSize: 15,
    color: COR.texto,
  },

  inputLinha: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COR.borda,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: COR.branco,
  },

  inputSenha: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: COR.texto,
  },

  inputAtivo: {
    borderColor: COR.azul,
    backgroundColor: "#fafbfd",
  },

  mostrar: {
    fontSize: 12,
    fontWeight: "700",
    color: COR.azul,
    paddingLeft: 10,
  },

  /* Seleção de perfil */
  perfilRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  perfilBotao: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: COR.borda,
    borderRadius: 12,
    paddingVertical: 12,
    backgroundColor: COR.branco,
  },

  perfilBotaoAtivo: {
    borderColor: COR.azul,
    backgroundColor: COR.azulClaro,
  },

  perfilTexto: {
    textAlign: "center",
    fontSize: 13,
    color: COR.textoSuave,
    fontWeight: "500",
  },

  perfilTextoAtivo: {
    color: COR.azul,
    fontWeight: "700",
  },

  /* Lembrar-me / Esqueceu a senha */
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COR.borda,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: COR.branco,
  },

  checkboxAtivo: {
    backgroundColor: COR.azul,
    borderColor: COR.azul,
  },

  checkMark: {
    color: COR.branco,
    fontSize: 12,
    fontWeight: "800",
    lineHeight: 14,
  },

  remember: {
    fontSize: 13,
    color: COR.textoSuave,
  },

  forgot: {
    fontSize: 13,
    color: COR.azul,
    fontWeight: "600",
  },

  /* Botão principal */
  button: {
    backgroundColor: COR.azul,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 18,
    shadowColor: COR.azul,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  buttonText: {
    color: COR.branco,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },

  footerText: {
    textAlign: "center",
    fontSize: 11,
    lineHeight: 16,
    color: COR.rodape,
  },

  /* Cadastro */
  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  registerText: {
    fontSize: 13,
    color: COR.textoSuave,
  },

  registerLink: {
    fontSize: 13,
    color: COR.azul,
    fontWeight: "700",
  },
});