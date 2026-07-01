import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform, Dimensions } from 'react-native';
import Svg, { Circle, Path, Ellipse, Rect } from 'react-native-svg';
import * as Updates from 'expo-updates';

const COLOR_NAVY = '#1F2937';
const COLOR_BLUE = '#378ADD';
const COLOR_RED = '#D85A30';
const COLOR_WHITE = '#FFFFFF';
const COLOR_GRAY = '#E5E7EB';

export default function SplashScreen() {
  const [dots, setDots] = useState('');
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('Checking for updates');

  // Animation Refs
  const ringRotation = useRef(new Animated.Value(0)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Ring Rotation (continuous, ~3s)
    Animated.loop(
      Animated.timing(ringRotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // 2. Wave Animation (oscillating, ~1.6s loop)
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: -1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3. Blink Animation (~3s loop)
    Animated.loop(
      Animated.sequence([
        Animated.delay(2800),
        Animated.timing(blinkAnim, {
          toValue: 0.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 4. Progress bar indeterminate
    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    ).start();

    // Dots interval (cycle . .. ...)
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(dotInterval);
  }, [ringRotation, waveAnim, blinkAnim, progressAnim]);

  useEffect(() => {
    // Expo Updates Logic
    const handleUpdates = async () => {
      try {
        if (__DEV__) {
          // Skip update logic in local development
          setIsCheckingUpdate(false);
          return;
        }

        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          setIsCheckingUpdate(false);
          setIsDownloading(true);
          setUpdateMessage('New update available, downloading');
          
          await Updates.fetchUpdateAsync();
          
          setUpdateMessage('Restart to update');
          setIsDownloading(false);
        } else {
          setIsCheckingUpdate(false);
        }
      } catch (error) {
        setIsCheckingUpdate(false);
        console.warn('Error checking for updates', error);
      }
    };

    handleUpdates();
  }, []);

  const spinOuter = ringRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const spinInner = ringRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'],
  });

  const waveRotate = waveAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-25deg', '25deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Calculate some dimensions to properly center
  const ringSize = 220;
  const innerRingSize = 190;

  return (
    <View style={styles.container}>
      {/* 2. Loading from Server Banner */}
      <View style={styles.topBanner}>
        {isCheckingUpdate ? (
          <Text style={styles.topBannerText}>Loading from server{dots}</Text>
        ) : (
          <Text style={styles.topBannerText}> </Text>
        )}
      </View>

      {/* 3. Center Mascot and Rings */}
      <View style={styles.centerContent}>
        <View style={styles.mascotContainer}>
          
          {/* Outer Red Ring */}
          <Animated.View style={[styles.ringContainer, { width: ringSize, height: ringSize, transform: [{ rotate: spinOuter }] }]}>
            <Svg width="100%" height="100%" viewBox={`0 0 ${ringSize} ${ringSize}`}>
              <Path
                d={`M 15 ${ringSize / 2} A ${ringSize / 2 - 15} ${ringSize / 2 - 15} 0 0 1 ${ringSize - 15} ${ringSize / 2}`}
                fill="none"
                stroke={COLOR_RED}
                strokeWidth={5}
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>

          {/* Inner Blue Ring */}
          <Animated.View style={[styles.ringContainer, { width: innerRingSize, height: innerRingSize, transform: [{ rotate: spinInner }] }]}>
            <Svg width="100%" height="100%" viewBox={`0 0 ${innerRingSize} ${innerRingSize}`}>
              <Path
                d={`M 15 ${innerRingSize / 2} A ${innerRingSize / 2 - 15} ${innerRingSize / 2 - 15} 0 0 0 ${innerRingSize - 15} ${innerRingSize / 2}`}
                fill="none"
                stroke={COLOR_BLUE}
                strokeWidth={5}
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>

          {/* Robot Mascot */}
          <View style={styles.robotWrapper}>
            <Svg width={140} height={140} viewBox="0 0 140 140">
              {/* Drop Shadow */}
              <Ellipse cx={70} cy={130} rx={45} ry={5} fill="rgba(0,0,0,0.08)" />
              
              {/* Body */}
              <Rect x={45} y={60} width={50} height={60} rx={25} fill={COLOR_WHITE} stroke={COLOR_GRAY} strokeWidth={2} />
              
              {/* Clock/Gauge on chest */}
              <Circle cx={70} cy={90} r={12} fill="#F3F4F6" stroke={COLOR_NAVY} strokeWidth={2} />
              <Path d="M 70 90 L 70 82 M 70 90 L 76 94" stroke={COLOR_RED} strokeWidth={2} strokeLinecap="round" />
              
              {/* Head */}
              <Rect x={35} y={20} width={70} height={45} rx={22.5} fill={COLOR_WHITE} stroke={COLOR_GRAY} strokeWidth={2} />
              
              {/* Visor */}
              <Rect x={45} y={30} width={50} height={20} rx={10} fill={COLOR_NAVY} />
              
              {/* Left Arm (Static) */}
              <Path d="M 45 75 Q 30 75 35 100" fill="none" stroke={COLOR_WHITE} strokeWidth={12} strokeLinecap="round" />
              {/* Left Arm Border (to give some outline) */}
              <Path d="M 45 75 Q 30 75 35 100" fill="none" stroke={COLOR_GRAY} strokeWidth={2} strokeLinecap="round" x="-2" />
            </Svg>
            
            {/* Eyes (Animated Blink) */}
            <Animated.View style={[styles.eyesContainer, { transform: [{ scaleY: blinkAnim }] }]}>
              <Svg width={50} height={20} viewBox="0 0 50 20">
                <Circle cx={12} cy={10} r={4} fill={COLOR_BLUE} />
                <Circle cx={38} cy={10} r={4} fill={COLOR_BLUE} />
              </Svg>
            </Animated.View>
            
            {/* Right Arm (Waving) */}
            <Animated.View style={[
              styles.wavingArmContainer,
              { transform: [{ rotate: waveRotate }] }
            ]}>
              <Svg width={40} height={50} viewBox="0 0 40 50">
                {/* Arm path */}
                <Path d="M 10 10 Q 30 -5 30 25" fill="none" stroke={COLOR_WHITE} strokeWidth={12} strokeLinecap="round" />
                {/* Outline */}
                <Path d="M 10 10 Q 30 -5 30 25" fill="none" stroke={COLOR_GRAY} strokeWidth={2} strokeLinecap="round" x="2" />
              </Svg>
            </Animated.View>
          </View>
        </View>

        {/* 4. App Name */}
        <Text style={styles.appName}>Perfect Flow 360</Text>
      </View>

      {/* 5. Update Banner */}
      <View style={styles.bottomBannerContainer}>
        {(isDownloading || updateMessage === 'Restart to update') && (
          <View style={styles.bottomBanner}>
            <Text style={styles.bannerText}>
              {updateMessage}{isDownloading ? dots : ''}
            </Text>
            {isDownloading && (
              <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Subtle off-white background
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Avoid system status bar
    paddingBottom: 30,
  },
  topBanner: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  topBannerText: {
    color: '#6B7280', // Medium gray
    fontSize: 14,
    fontWeight: '500',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  mascotContainer: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ringContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  robotWrapper: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyesContainer: {
    position: 'absolute',
    top: 30,
    left: 45,
    width: 50,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wavingArmContainer: {
    position: 'absolute',
    top: 65,
    right: 20,
    width: 40,
    height: 50,
    transformOrigin: '10px 10px', // Rotate from shoulder (top-left of the svg box)
  },
  appName: {
    marginTop: 40,
    fontSize: 26,
    fontWeight: '800',
    color: COLOR_NAVY,
    letterSpacing: 0.5,
  },
  bottomBannerContainer: {
    height: 60,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
  },
  bottomBanner: {
    width: '100%',
    backgroundColor: COLOR_WHITE,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerText: {
    color: COLOR_NAVY,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLOR_BLUE,
  },
});
