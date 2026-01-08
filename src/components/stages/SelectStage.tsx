import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import jsStages from "@/data/js.stages.json";
import { s, vs } from "react-native-size-matters";
import SelectStageItem from "./SelectStageItem";

const SelectStage = () => {
  const [selectedStageId, setSelectedStageId] = useState("");

  const onSelectStage = (id: string) => {
    setSelectedStageId(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SelectStage</Text>
      <FlatList
        data={jsStages.stages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SelectStageItem
            title={item.title}
            isSelected={item.id === selectedStageId}
            onPress={() => onSelectStage(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SelectStage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    marginTop: s(10),
  },
  title: {
    fontSize: s(16),
    fontWeight: "bold",
    marginVertical: vs(12),
  },
});
