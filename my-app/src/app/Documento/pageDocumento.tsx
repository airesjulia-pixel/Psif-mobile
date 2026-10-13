import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import { useFocusEffect } from "expo-router";
import Voltar from "../../components/voltar";
import { supabase } from "../../../../lib/supabase";

export default function Documentos() {
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [carregando, setCarregando] = useState(true);

  // recarrega toda vez que a tela volta a ficar visível
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        const { data, error } = await supabase
          .from("documentos")
          .select("id, nome, caminho, aluna:alunos(nome)")
          .order("created_at", { ascending: false });

        if (error) {
          console.log(error.message);
        } else {
          setDocumentos(data ?? []);
        }
        setCarregando(false);
      }
      carregar();
    }, [])
  );

  async function abrirDocumento(caminho: string) {
    // link temporário de 60 segundos, porque o bucket é privado
    const { data, error } = await supabase.storage
      .from("documentos")
      .createSignedUrl(caminho, 60);

    if (error || !data?.signedUrl) {
      console.log(error?.message);
      Alert.alert("Não foi possível abrir o documento.");
      return;
    }

    Linking.openURL(data.signedUrl);
  }

  return (
    <View style={styles.container}>
      <Voltar />
      <Text style={styles.title}>Documentos</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#244A69" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {documentos.length === 0 && (
            <Text style={styles.vazio}>Nenhum documento encontrado.</Text>
          )}

          {documentos.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={styles.card}
              onPress={() => abrirDocumento(doc.caminho)}
            >
              <Text>📄 {doc.nome}</Text>
              {doc.aluna?.nome && (
                <Text style={styles.meta}>{doc.aluna.nome}</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 18,
    borderRadius: 12,
    marginBottom: 15,
  },
  meta: { marginTop: 4, fontSize: 12, color: "#666" },
  vazio: { color: "#888", textAlign: "center", marginTop: 20 },
});