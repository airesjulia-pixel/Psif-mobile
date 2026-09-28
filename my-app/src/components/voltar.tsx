import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

type Props = {
  onPress?: () => void;
};

export default function Voltar({ onPress }: Props) {
  return (
    <TouchableOpacity
      testID="voltar"
      accessibilityRole="button"
      accessibilityLabel="Voltar"
      style={styles.botao}
      onPress={onPress ?? (() => router.back())}
    >
      <Text style={styles.seta}>←</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingRight: 16,
    marginBottom: 4,
  },
  seta: { fontSize: 26, color: "#2f5d43" },
});