import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';
import { s } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setFramework } from '@/store/frameworkSlice';

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

export const FrameworkSwitcher = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.framework.current);

  const handlePress = (item: Item) => {
    dispatch(setFramework(item.key));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {ITEMS.map((item) => {
          const active = item.key === value;

          return (
            <Pressable
              key={item.key}
              onPress={() => handlePress(item)}
              style={styles.itemWrapper}
            >
              {active ? (
                <LinearGradient
                  colors={['#3B82F6', '#2563EB']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.activeItem}
                >
                  <Text style={styles.activeText} numberOfLines={1}>
                    {item.label}
                  </Text>
                  {item.locked && (
                    <Entypo
                      name="lock"
                      size={14}
                      color="#9CA3AF"
                      style={{ marginLeft: 6 }}
                    />
                  )}
                </LinearGradient>
              ) : (
                <View style={styles.inactiveItem}>
                  <Text style={styles.inactiveText} numberOfLines={1}>
                    {item.label}
                  </Text>
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
    alignItems: 'center',
  },

  activeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(12),
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
    paddingHorizontal: s(14),
    paddingVertical: s(10),
    borderRadius: s(12),
  },

  activeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: s(12),
  },

  inactiveText: {
    color: '#9CA3AF',
    fontWeight: '400',
    fontSize: s(12),
  },
});
