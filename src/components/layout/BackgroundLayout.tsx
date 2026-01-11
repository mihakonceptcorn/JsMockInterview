import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, View } from 'react-native';
import { COLORS } from '@/theme/colors';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const BackgroundLayout = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.bgTop, COLORS.bgMiddle, COLORS.bgBottom]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Image
        source={require('@/assets/noise.png')}
        resizeMode="repeat"
        style={[StyleSheet.absoluteFillObject, { opacity: 0.08 }]}
      />

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
