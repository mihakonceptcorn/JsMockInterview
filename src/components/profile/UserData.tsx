import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { COLORS } from '@/theme/colors';
import { s, vs } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { formatTime } from '@/helpers/formatTime';
import { useAuth } from '@/context/AuthContext';
import jsStages from '@/data/js/js.stages.json';
import reactStages from '@/data/react/react.stages.json';

const UserData = () => {
  const { t } = useTranslation('profile');
  const results = useSelector((state: RootState) => state.results.current);
  const { user } = useAuth();
  const isPro = useSelector((state: RootState) => state.user.isPro);

  const [stagesCompleted, setStagesCompleted] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let totalScore = 0;
    let totalQuestions = 0;
    let totalTime = 0;
    let totalStages = 0;

    const jsIds = jsStages.stages.map((s) => s.id);
    const reactIds = reactStages.stages.map((s) => s.id);

    Object.entries(results).forEach(([framework, data]) => {
      const validIds = framework === 'js' ? jsIds : reactIds;
      Object.entries(data).forEach(([id, stage]) => {
        if (validIds.includes(id) && stage.score > 0) {
          totalScore += stage.score;
          totalQuestions += stage.total;
          totalTime += stage.time;
          totalStages++;
        }
      });
    });

    const totalPercentage =
      totalQuestions > 0
        ? Number(((totalScore / totalQuestions) * 100).toFixed(0))
        : 0;

    setStagesCompleted(totalStages);
    setAccuracy(totalPercentage);
    setTotalTime(totalTime);
  }, [results]);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View style={styles.avatarContainer}>
          {user && user.photoURL ? (
            <Image
              source={user?.photoURL ? { uri: user.photoURL } : undefined}
              width={s(60)}
              height={s(60)}
            />
          ) : (
            <FontAwesome
              name="user-secret"
              size={50}
              color={COLORS.textSecondary}
            />
          )}
        </View>

        <View style={styles.userData}>
          <View style={styles.nameRow}>
            <Text style={styles.userName}>
              {user ? (user.displayName ?? user.email) : 'Guest'}
            </Text>
            {isPro && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumText}>Premium</Text>
              </View>
            )}
          </View>
          <Text style={styles.localProgress}>
            {user ? t('account.cloud_progress') : t('account.local_progress')}
          </Text>
          <Text style={styles.userDescription}>
            {user ? t('account.cloud_sync_desc') : t('account.local_desc')}
          </Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsItemValue}>{stagesCompleted}</Text>
          <Text style={styles.statsItemTitle}>
            {t('account.stages_completed')}
          </Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsItemValue}>{accuracy}%</Text>
          <Text style={styles.statsItemTitle}>{t('account.accuracy')}</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsItemValue}>{formatTime(totalTime)}</Text>
          <Text style={styles.statsItemTitle}>{t('account.total_time')}</Text>
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
    overflow: 'hidden',
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
    paddingEnd: s(20),
    flex: 1,
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
    textAlign: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
  },
  premiumBadge: {
    backgroundColor: COLORS.middleBar,
    paddingHorizontal: s(6),
    paddingVertical: vs(2),
    borderRadius: s(4),
  },
  premiumText: {
    fontSize: s(10),
    fontWeight: 'bold',
    color: '#000',
  },
});
