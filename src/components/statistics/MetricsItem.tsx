import { StyleSheet, Text, View } from 'react-native';
import React, { JSX } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';

interface MetricsItemProps {
  icon: JSX.Element;
  data: string;
  title: string;
}

const MetricsItem = ({ icon, data, title }: MetricsItemProps) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={{ width: '100%' }}
        colors={['#0B1F36', '#102C4C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.innerContainer}>
          {icon}
          <Text style={styles.data}>{data}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};
export default MetricsItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: COLORS.borderColor,
    marginTop: vs(6),
  },
  innerContainer: {
    alignItems: 'center',
    padding: s(10),
  },
  data: {
    fontSize: s(16),
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  title: {
    fontSize: s(10),
    color: COLORS.textSecondary,
  },
});
