import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { s } from "react-native-size-matters";
import Entypo from "@expo/vector-icons/Entypo";

interface TopTabItemProps {
  title: string;
  isBlocked: boolean;
}

const TopTabItem: FC<TopTabItemProps> = ({ title, isBlocked }) => {
  return (
    <TouchableOpacity style={styles.tabContainer}>
      <Text style={[styles.tabTitle, isBlocked && styles.tabTitleBlocked]}>
        {title}
      </Text>
      {isBlocked && (
        <>
          <Entypo name="lock" size={20} color="#888" />
          <Text style={styles.proLabel}>Pro version</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default TopTabItem;

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: s(14),
  },
  tabTitleBlocked: {
    color: "#888",
  },
  proLabel: {
    fontSize: s(10),
    color: "#888",
  },
});
