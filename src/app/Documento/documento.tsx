
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { supabase } from "../../../lib/supabase";
import React, { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";

import Voltar from "@/components/voltar";

type Documento = {
  id: string;
  nome: string;
  arquivo_url: string;
};

export default function Documentos() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const buscarDocumentos = useCallback(async () => {
    // Não executa a consulta durante a renderização no servidor web.
    if (Platform.OS === "web" && typeof window === "undefined") {
      setCarregando(false);
      return;
    }

    setCarregando(true);
    setErro("");

    try {
      // O Supabase só é importado quando a consulta é executada no cliente.
      const { supabase } = await import("../../../lib/supabase");

      const { data, error } = await supabase
        .from("documentos")
        .select("id, nome, arquivo_url")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao buscar documentos:", error.message);
        setErro("Não foi possível carregar os documentos.");
        setDocumentos([]);
        return;
      }

      setDocumentos(data ?? []);
    } catch (e) {
      console.error("Erro ao carregar documentos:", e);
      setErro("Ocorreu um erro ao carregar os documentos.");
      setDocumentos([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    buscarDocumentos();
  }, [buscarDocumentos]);

  return (
    <View style={styles.container}>
      <Voltar />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <FontAwesome5
              name="folder-open"
              size={28}
              color="#244A69"
            />
          </View>

          <Text style={styles.title}>Documentos</Text>

          <Text style={styles.subtitle}>
            Documentos dos alunos acompanhados
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Arquivos cadastrados
          </Text>

          <TouchableOpacity
            onPress={buscarDocumentos}
            disabled={carregando}
            accessibilityLabel="Atualizar documentos"
            style={styles.refreshButton}
          >
            <FontAwesome5
              name="sync-alt"
              size={17}
              color="#244A69"
            />
          </TouchableOpacity>
        </View>

        {carregando ? (
          <View style={styles.empty}>
            <ActivityIndicator size="large" color="#244A69" />
            <Text style={styles.emptyText}>
              Carregando documentos...
            </Text>
          </View>
        ) : erro ? (
          <View style={styles.empty}>
            <FontAwesome5
              name="exclamation-circle"
              size={38}
              color="#244A69"
            />

            <Text style={styles.emptyTitle}>
              Não foi possível carregar
            </Text>

            <Text style={styles.emptyText}>{erro}</Text>

            <TouchableOpacity
              style={styles.retryButton}
              onPress={buscarDocumentos}
            >
              <Text style={styles.retryText}>
                Tentar novamente
              </Text>
            </TouchableOpacity>
          </View>
        ) : documentos.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <FontAwesome5
                name="file-alt"
                size={38}
                color="#8AAAC3"
              />
            </View>

            <Text style={styles.emptyTitle}>
              Nenhum documento cadastrado
            </Text>

            <Text style={styles.emptyText}>
              Os documentos dos alunos aparecerão aqui
              quando forem cadastrados no sistema.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {documentos.map((documento) => (
              <View key={documento.id} style={styles.card}>
                <View style={styles.fileIcon}>
                  <FontAwesome5
                    name="file-pdf"
                    size={24}
                    color="#244A69"
                  />
                </View>

                <View style={styles.fileInfo}>
                  <Text style={styles.cardTitle}>
                    {documento.nome}
                  </Text>

                  <Text style={styles.cardSubtitle}>
                    Documento cadastrado
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FC",
    paddingTop: 15,
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingBottom: 35,
  },

  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  headerIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#244A69",
  },

  subtitle: {
    fontSize: 14,
    color: "#6F879B",
    marginTop: 7,
    textAlign: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#244A69",
  },

  refreshButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
  },

  empty: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 35,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E1EAF2",
    marginTop: 5,
  },

  emptyIcon: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#EDF4FA",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#244A69",
    textAlign: "center",
    marginTop: 15,
  },

  emptyText: {
    fontSize: 14,
    color: "#71869A",
    textAlign: "center",
    lineHeight: 21,
    marginTop: 9,
  },

  retryButton: {
    backgroundColor: "#244A69",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
    marginTop: 18,
  },

  retryText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  list: {
    gap: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E1EAF2",
  },

  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#DCEAF5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  fileInfo: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#244A69",
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#8195A7",
    marginTop: 5,
  },
});
