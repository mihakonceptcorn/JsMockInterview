import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Bar } from "react-native-progress";
import { s, vs } from "react-native-size-matters";
import ProgressionBar from "./ProgressionBar";

const Progression = () => {
  return (
    <View style={styles.container}>
      <ProgressionBar title="Stages Completed: 4/10" progress={0.4} />
      <ProgressionBar title="Correct Answers: 75%" progress={0.75} />
    </View>
  );
};

export default Progression;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: s(20),
    marginTop: vs(20),
  },
});
