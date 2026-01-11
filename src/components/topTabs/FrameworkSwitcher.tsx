import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import { s } from 'react-native-size-matters';

type Framework = 'js' | 'react' | 'react-native' | 'vue';

type Item = {
  key: Framework;
  label: string;
  locked?: boolean;
};

const ITEMS: Item[] = [
  { key: 'js', label: 'JS' },
  { key: 'react', label: 'React', locked: true },
  { key: 'react-native', label: 'React Native', locked: true },
  { key: 'vue', label: 'Vue', locked: true },
];

type Props = {
  value: Framework;
  onChange: (value: Framework) => void;
};

export const FrameworkSwitcher = ({ value, onChange }: Props) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {ITEMS.map((item) => {
          const active = item.key === value;

          return (
            <Pressable
              key={item.key}
              disabled={item.locked}
              onPress={() => onChange(item.key)}
              style={styles.itemWrapper}
            >
              {active ? (
                <LinearGradient
                  colors={['#3B82F6', '#2563EB']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.activeItem}
                >
                  <Text style={styles.activeText}>{item.label}</Text>
                </LinearGradient>
              ) : (
                <View style={styles.inactiveItem}>
                  <Text style={styles.inactiveText}>{item.label}</Text>
                  {item.locked && (
                    <Entypo
                      name="lock"
                      size={14}
                      color="#9CA3AF"
                      style={{ marginLeft: 6 }}
                    />
                  )}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },

  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: s(16),
    padding: s(4),
    width: '100%',
    justifyContent: 'space-between',
  },

  itemWrapper: {
    //marginHorizontal: s(2),
    gap: s(4),
  },

  activeItem: {
    paddingHorizontal: s(18),
    paddingVertical: s(10),
    borderRadius: s(12),
    shadowColor: '#3B82F6',
    shadowOpacity: 0.6,
    shadowRadius: s(10),
    elevation: 8,
  },

  inactiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(10),
    paddingVertical: s(10),
    borderRadius: s(12),
  },

  activeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: s(12),
  },

  inactiveText: {
    color: '#9CA3AF',
    fontWeight: '600',
    fontSize: s(12),
  },
});
