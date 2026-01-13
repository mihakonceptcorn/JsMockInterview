import { View, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ReactNode, useEffect, useRef } from 'react';
import { COLORS } from '@/theme/colors';

type Props = {
  children: ReactNode;
};

export const AnimatedBackground = ({ children }: Props) => {
  const translate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translate, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(translate, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = translate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  const translateY = translate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -40],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.bgTop, COLORS.bgMiddle, COLORS.bgBottom]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.Image
        source={require('@/assets/noise.png')}
        resizeMode="cover"
        style={[
          styles.noise,
          {
            transform: [{ translateX }, { translateY }],
          },
        ]}
      />

      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noise: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.1,
  },
  content: {
    flex: 1,
  },
});
