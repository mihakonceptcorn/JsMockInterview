import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

const Stage = () => {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen
        options={{
          title: `${id}`,
        }}
      />
      <Text style={styles.title}>Stage: {id}</Text>
    </View>
  );
};
export default Stage;
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: '#fff',
  },
});
