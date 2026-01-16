import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS } from '@/theme/colors';
import { s, vs } from 'react-native-size-matters';

const UserData = () => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.avatarContainer}>
          <FontAwesome
            name="user-secret"
            size={50}
            color={COLORS.textSecondary}
          />
        </View>

        <View style={styles.userData}>
          <Text style={styles.userName}>Guest</Text>
          <Text style={styles.localProgress}>Local progress only</Text>
          <Text style={styles.userDescription}>
            Progress is stored on this device.
          </Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsItemValue}>12</Text>
          <Text style={styles.statsItemTitle}>Sessions</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsItemValue}>57%</Text>
          <Text style={styles.statsItemTitle}>Accuracy</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsItemValue}>12:22</Text>
          <Text style={styles.statsItemTitle}>Time</Text>
        </View>
      </View>
    </View>
  );
};
export default UserData;
const styles = StyleSheet.create({
  container: {
    paddingTop: vs(20),
    paddingBottom: vs(10),
    paddingHorizontal: s(20),
    backgroundColor: COLORS.bgMiddle,
    width: '100%',
  },
  avatarContainer: {
    borderRadius: s(8),
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    width: s(60),
    height: s(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.bgTop,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
    paddingBottom: s(10),
  },
  userData: {
    paddingStart: s(10),
  },
  userName: {
    fontSize: s(16),
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  userDescription: {
    fontSize: s(10),
    color: COLORS.textSecondary,
  },
  localProgress: {
    alignSelf: 'flex-start',
    fontSize: s(10),
    color: COLORS.textSecondary,
    backgroundColor: COLORS.bgTop,
    borderRadius: s(4),
    paddingVertical: s(2),
    paddingHorizontal: s(4),
    marginVertical: s(4),
  },
  statsContainer: {
    flexDirection: 'row',
    paddingTop: s(10),
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
  },
  statsItemValue: {
    fontSize: s(16),
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  statsItemTitle: {
    fontSize: s(12),
    color: COLORS.textSecondary,
  },
});
