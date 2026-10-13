import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
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

      <View style={styles.iconArea}>
        <View style={styles.iconCircle}>
          <FontAwesome5
            name="lock"
            size={45}
            color="#244A69"
          />
          <View style={styles.mailIcon}>
            <FontAwesome5
              name="envelope"
              size={22}
              color="#FFFFFF"
            />
          </View>
        </View>
      </View>

      <Text style={styles.title}>Recuperar senha</Text>

      <Text style={styles.subtitle}>
        Informe seu e-mail para receber as instruções
        de recuperação de senha.
      </Text>

      <View style={styles.inputContainer}>
        <FontAwesome5
          name="envelope"
          size={18}
          color="#244A69"
          style={styles.inputIcon}
        />

        <TextInput
          placeholder="Seu e-mail"
          placeholderTextColor="#7B8B99"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <FontAwesome5
          name="paper-plane"
          size={16}
          color="#FFFFFF"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>
          Enviar instruções
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <FontAwesome5
          name="arrow-left"
          size={15}
          color="#244A69"
        />
        <Text style={styles.backLogin}>
          Voltar para o login
        </Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <FontAwesome5
          name="shield-alt"
          size={16}
          color="#6388A5"
        />
        <Text style={styles.footerText}>
          PSIF • Acompanhamento psicopedagógico
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DCEAF5",
    padding: 25,
    alignItems: "center",
  },

  iconArea: {
    marginTop: 35,
    marginBottom: 20,
    alignItems: "center",
  },

  iconCircle: {
    width: 115,
    height: 115,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#B8D8F0",
  },

  mailIcon: {
    position: "absolute",
    right: -5,
    bottom: 0,
    width: 42,
    height: 42,
    borderRadius: 22,
    backgroundColor: "#244A69",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#DCEAF5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 12,
    color: "#244A69",
  },

  subtitle: {
    fontSize: 15,
    color: "#526C80",
    textAlign: "center",
    lineHeight: 23,
    marginBottom: 30,
  },

  inputContainer: {
    width: "100%",
    height: 55,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#C3D9E9",
    marginBottom: 20,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#244A69",
  },

  button: {
    width: "100%",
    backgroundColor: "#244A69",
    padding: 17,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 3,
  },

  buttonIcon: {
    marginRight: 2,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    gap: 8,
  },

  backLogin: {
    color: "#244A69",
    fontSize: 15,
    fontWeight: "600",
  },

  footer: {
    marginTop: "auto",
    paddingTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  footerText: {
    fontSize: 11,
    color: "#6388A5",
  },
});