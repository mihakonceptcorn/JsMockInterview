import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import TopTabItem from './TopTabItem';
import { s } from 'react-native-size-matters';

const TopTabs = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separatorHorizontal} />

      <View style={styles.tabsContainer}>
        <TopTabItem title="JS" isBlocked={false} isActive />
        <View style={styles.separatorVertical} />
        <TopTabItem title="React" isBlocked={true} />
        <View style={styles.separatorVertical} />
        <TopTabItem title="React Native" isBlocked={true} />
        <View style={styles.separatorVertical} />
        <TopTabItem title="Vue" isBlocked={true} />
      </View>

      <View style={styles.separatorHorizontal} />
    </View>
  );
};

export default TopTabs;

const styles = StyleSheet.create({
  container: {},
  separatorHorizontal: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: s(5),
  },
  tabsContainer: {
    flexDirection: 'row',
  },
  separatorVertical: {
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: s(5),
  },
});
