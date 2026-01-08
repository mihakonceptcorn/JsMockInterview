import Progression from "@/components/progressionBar/Progression";
import SelectStage from "@/components/stages/SelectStage";
import TopTabs from "@/components/topTabs/TopTabs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { s } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>JS Mock Interview</Text>

      <TopTabs />

      <Progression />

      <SelectStage />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Start Interview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary}>
          <Text style={styles.buttonSecondaryText}>Practice Mode</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
  },
  actions: {
    gap: 12,
    flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: s(20),
  },
  button: {
    padding: 16,
    textAlign: "center",
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 8,
    width: "50%",
  },
  buttonSecondary: {
    padding: 16,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 8,
    width: "50%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  buttonSecondaryText: {
    textAlign: "center",
    fontSize: 16,
  },
});
