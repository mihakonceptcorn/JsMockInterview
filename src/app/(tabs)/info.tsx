import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { s, vs } from 'react-native-size-matters';
import { COLORS } from '@/theme/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from '@expo/vector-icons/Entypo';

const Info = () => {
  return (
    <AnimatedBackground>
      <SafeAreaProvider>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.infoBlockContainer}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>
                    Learn by Doing, Test Like an Interview
                  </Text>
                  <Text style={styles.text}>
                    This app is designed to help you prepare for real technical
                    interviews. You can practice without pressure, or challenge
                    yourself in interview mode with real constraints.
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.title}>Practice Mode</Text>
            <View style={styles.infoBlockContainer}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>
                    Learn, Understand, Improve
                  </Text>
                  <Text style={styles.text}>
                    Practice Mode is designed for learning and deep
                    understanding.
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    You answer questions without time limits
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    Your answer is checked immediately
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    You instantly receive:
                  </Text>
                  <View style={styles.subList}>
                    <Text style={styles.text}>
                      <Entypo name="dot-single" size={14} color="#fff" />
                      the correct answer
                    </Text>
                  </View>
                  <View style={styles.subList}>
                    <Text style={styles.text}>
                      <Entypo name="dot-single" size={14} color="#fff" />a clear
                      explanation
                    </Text>
                  </View>
                  <View style={styles.subList}>
                    <Text style={styles.text}>
                      <Entypo name="dot-single" size={14} color="#fff" />
                      an interview-oriented tip
                    </Text>
                  </View>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    You can take your time, rethink, and learn at your own pace
                  </Text>
                  <Text style={styles.textBold}>Important:</Text>
                  <Text style={styles.text}>
                    Completed stages in Practice Mode do NOT affect your
                    statistics. This mode is purely for learning and
                    preparation.
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.title}>Interview Mode</Text>
            <View style={styles.infoBlockContainer}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>
                    Simulate a Real Interview Experience
                  </Text>
                  <Text style={styles.text}>
                    Interview Mode recreates the pressure of a real technical
                    interview.
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    Each question has a strict time limit
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    If time runs out, the answer is counted as incorrect
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    You do not see whether your answers are correct until the
                    entire stage is completed
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    Once the session starts, you must finish it to see your
                    results
                  </Text>
                  <Text style={styles.text}>
                    This mode tests not only knowledge, but also:
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    speed of thinking
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    focus under pressure
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    decision-making
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.title}>Question Pool & Randomization</Text>
            <View style={styles.infoBlockContainer}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>Always a New Challenge</Text>
                  <Text style={styles.text}>
                    Each stage contains more than 10 questions.
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    When you start the same stage again:
                  </Text>
                  <Text style={styles.subList}>
                    <Text style={styles.text}>
                      <Entypo name="dot-single" size={14} color="#fff" />
                      questions may be different
                    </Text>
                  </Text>
                  <Text style={styles.subList}>
                    <Text style={styles.text}>
                      <Entypo name="dot-single" size={14} color="#fff" />
                      order may change
                    </Text>
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    This prevents memorization and encourages real understanding
                  </Text>
                  <Text style={styles.text}>
                    Every attempt is a new challenge.
                  </Text>
                </View>
              </LinearGradient>
            </View>

            <Text style={styles.title}>Statistics & Progress</Text>
            <View style={[styles.infoBlockContainer, styles.infoBlockPadding]}>
              <LinearGradient
                colors={['#0B1F36', '#102C4C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.innerContainer}>
                  <Text style={styles.subTitle}>Track What Matters</Text>
                  <Text style={styles.text}>
                    Your statistics are calculated only from Interview Mode.
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    Completed stages
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    Correct answer rate
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    Performance over time
                  </Text>
                  <Text style={styles.text}>This helps you:</Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    identify weak areas
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    measure real interview readiness
                  </Text>
                  <Text style={styles.text}>
                    <Entypo name="dot-single" size={14} color="#fff" />
                    track long-term progress
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
        </View>
      </SafeAreaProvider>
    </AnimatedBackground>
  );
};
export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
  },
  infoBlockContainer: {
    borderWidth: 1,
    borderRadius: s(12),
    overflow: 'hidden',
    borderColor: COLORS.borderColor,
    marginTop: vs(6),
  },
  infoBlockPadding: {
    marginBottom: vs(10),
  },
  innerContainer: {
    padding: s(10),
  },
  title: {
    fontSize: s(18),
    color: COLORS.textPrimary,
    paddingTop: s(10),
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: s(14),
    color: COLORS.textPrimary,
    paddingBottom: s(5),
    fontWeight: 'bold',
  },
  text: {
    fontSize: s(12),
    color: COLORS.textPrimary,
  },
  subList: {
    paddingLeft: s(15),
  },
  textBold: {
    fontSize: s(12),
    color: COLORS.textPrimary,
    fontWeight: 'bold',
    paddingTop: s(5),
  },
});
