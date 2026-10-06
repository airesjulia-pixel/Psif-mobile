import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { router } from "expo-router";

import { PERFIS, Perfil, rotuloDoPerfil } from "../../data/perfil";
import { iniciarSessao } from "../../data/sessao";

export default function Login() {
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState<Perfil>("professora");

  function entrar() {
    iniciarSessao({ email: email.trim(), perfil });
    router.push("./Inicial/deshboard");
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          // source={require("../../../assets/images/logo.png")}
          style={styles.logoImage}
        />

        <Text style={styles.logo}>PSIF</Text>

        <Text style={styles.subtitle}>
          Plataforma de Suporte Psicopedagógico
        </Text>

        <TextInput
          placeholder="Seu E-mail"
          placeholderTextColor="#999"
          style={styles.input}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="********"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.perfilLabel}>Entrar como</Text>

        <View style={styles.perfilRow}>
          {PERFIS.map((opcao) => (
            <TouchableOpacity
              key={opcao}
              accessibilityRole="button"
              accessibilityState={{ selected: perfil === opcao }}
              style={[
                styles.perfilBotao,
                perfil === opcao && styles.perfilBotaoAtivo,
              ]}
              onPress={() => setPerfil(opcao)}
            >
              <Text
                style={[
                  styles.perfilTexto,
                  perfil === opcao && styles.perfilTextoAtivo,
                ]}
              >
                {rotuloDoPerfil(opcao)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.optionsRow}>
          <Text style={styles.remember}>☐ Lembrar-me</Text>

          <TouchableOpacity onPress={() => router.push("./Login/recuperarSenha")}>
            <Text style={styles.forgot}>Esqueceu a senha?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={entrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Acesso exclusivo para psicopedagogos e professores do IFPB
        </Text>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Não tem uma conta?</Text>
          <Text style={styles.registerLink}> Cadastre-se aqui</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  logoImage: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginBottom: 12,
    resizeMode: "contain",
  },

  logo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#222",
  },

  subtitle: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
    backgroundColor: "#fff",
  },

  perfilLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 8,
  },

  perfilRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  perfilBotao: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
  },

  perfilBotaoAtivo: {
    borderColor: "#1f5d3d",
    backgroundColor: "#e8f1ec",
  },

  perfilTexto: {
    textAlign: "center",
    fontSize: 12,
    color: "#777",
  },

  perfilTextoAtivo: {
    color: "#1f5d3d",
    fontWeight: "bold",
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  remember: {
    fontSize: 12,
    color: "#777",
  },

  forgot: {
    fontSize: 12,
    color: "#1f5d3d",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#d84b4b",
    padding: 14,
    borderRadius: 8,
    marginBottom: 18,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  footerText: {
    textAlign: "center",
    fontSize: 10,
    color: "#999",
    marginBottom: 15,
  },

  registerRow: {
    flexDirection: "row",
    justifyContent: "center",
  },

  registerText: {
    fontSize: 11,
    color: "#777",
  },

  registerLink: {
    fontSize: 11,
    color: "#1f5d3d",
    fontWeight: "bold",
  },
});