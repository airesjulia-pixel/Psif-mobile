import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

import Voltar from "../../components/voltar";

export default function RecuperarSenha() {
  return (
    <View style={styles.container}>
      <Voltar />

      <Text style={styles.title}>Recuperar senha</Text>

      <Text style={styles.subtitle}>
        Informe o seu E-mail para receber instruções de recuperação
      </Text>

      <TextInput
        placeholder="Seu E-mail"
        placeholderTextColor="#999"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar instruções</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backLogin}>Voltar para o login</Text>
      </TouchableOpacity>

      <View style={styles.iconArea}>
        <Text style={styles.icon}>✉️ 🔒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 25,
  },

  backArrow: {
    fontSize: 28,
    marginTop: 20,
    color: "#333",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#111",
  },

  subtitle: {
    fontSize: 13,
    color: "#777",
    textAlign: "center",
    marginVertical: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#d84b4b",
    padding: 14,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  backLogin: {
    textAlign: "center",
    color: "#1f5d3d",
    marginTop: 18,
    fontWeight: "500",
  },

  iconArea: {
    marginTop: 120,
    alignItems: "center",
  },

  icon: {
    fontSize: 70,
  },
});