import React, { useState } from 'react';
import { Image } from 'react-native';
import { authApi } from '../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import {
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

// ==========================================
// 1. Theme Configuration
// ==========================================
const theme = {
  colors: {
    background: '#FFFFFF',    // White background
    surface: '#F5F7FA',       // Light card
    surfaceLight: '#FCE8EC',  // Light pink tint for disabled
    primary: '#E85874',       // Primary Pink
    text: '#1E293B',          // Dark text on white bg
    textMuted: '#64748B',     // Medium Gray
    textSecondary: '#475569', // Slate gray
    border: '#E2E8F0',
    borderFocus: '#39A3DD',   // Primary Blue
    error: '#C4455D',         // Dark Pink
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    md: 12,
    lg: 16,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
  },
};

// ==========================================
// 2. Custom InputField Component
// ==========================================
interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  isPassword = false,
  secureTextEntry,
  onFocus,
  onBlur,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <View style={inputStyles.container}>
      <Text style={inputStyles.label}>{label}</Text>
      <View
        style={[
          inputStyles.inputContainer,
          isFocused && inputStyles.inputFocused,
          error ? inputStyles.inputError : null,
        ]}
      >
        <TextInput
          style={inputStyles.input}
          placeholderTextColor={theme.colors.textMuted}
          secureTextEntry={isPassword ? !showPassword : secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity
            style={inputStyles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <Text style={inputStyles.iconText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={inputStyles.errorText}>{error}</Text> : null}
    </View>
  );
};

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  label: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    height: 52,
    paddingHorizontal: theme.spacing.md,
  },
  inputFocused: {
    borderColor: theme.colors.borderFocus,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#1E293B',
    fontSize: theme.typography.sizes.md,
    padding: 0,
  },
  iconContainer: {
    paddingHorizontal: theme.spacing.xs,
    justifyContent: 'center',
  },
  iconText: {
    color: theme.colors.borderFocus,
    fontSize: theme.typography.sizes.xs,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.sizes.xs,
    marginTop: theme.spacing.xs,
    fontWeight: '500',
  },
});

// ==========================================
// 3. Custom Button Component
// ==========================================
interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  disabled,
  style,
  ...props
}) => {
  const isButtonDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        buttonStyles.button,
        isButtonDisabled && buttonStyles.disabledButton,
        style,
      ]}
      activeOpacity={0.8}
      disabled={isButtonDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <Text style={[buttonStyles.text, { color: '#FFF' }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: 52,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: theme.spacing.sm,
  },
  disabledButton: {
    backgroundColor: theme.colors.surfaceLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

// ==========================================
// 4. Main LoginScreen Component
// ==========================================
interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const floatAnim = React.useRef(new Animated.Value(0)).current;
  const logoScaleAnim = React.useRef(new Animated.Value(0.3)).current;
  const logoOpacityAnim = React.useRef(new Animated.Value(0)).current;
  const cardSlideAnim = React.useRef(new Animated.Value(50)).current;
  const cardOpacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();

    // Entrance Animations
    Animated.parallel([
      Animated.spring(logoScaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacityAnim, {
        toValue: 1,
        duration: 600,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.spring(cardSlideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating loop animation for logo
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -12,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim, logoScaleAnim, logoOpacityAnim, cardSlideAnim, cardOpacityAnim]);

  const handleBiometricLogin = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert('Not Supported', 'This device/emulator does not support biometric authentication. If you are on an emulator, please configure fingerprint settings.');
        return;
      }

      const savedEmail = await AsyncStorage.getItem('userEmail');
      const savedPassword = await AsyncStorage.getItem('userPassword');

      if (!savedEmail || !savedPassword) {
        Alert.alert('Setup Required', 'Please login with your email and password first to enable biometric login.');
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert('No Biometrics Found', 'Please set up Face ID or Touch ID on your device.');
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        fallbackLabel: 'Use Passcode',
      });

      if (result.success) {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setIsLoading(true);
        const response = await authApi.login({ email: savedEmail, password: savedPassword });
        const actualToken = response.token || response.accessToken || response.data?.token;
        if (actualToken) {
          await AsyncStorage.setItem('userToken', actualToken);
          await authApi.getMe();
        }
        setIsLoading(false);
        onLoginSuccess();
      }
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Biometric Error', error.message || 'Authentication failed.');
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Mail ID is required');
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid Mail ID');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authApi.login({ email, password });

      // Save the token to phone storage
      if (response.token || response.accessToken || response.data?.token) {
        const actualToken = response.token || response.accessToken || response.data?.token;
        await AsyncStorage.setItem('userToken', actualToken);
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userPassword', password);

        // Fetch the user data behind the scenes
        const userData = await authApi.getMe();

        // Here you would typically save `userData` to Redux, Context, or Zustand
        // For now, we will just silently go to the Home screen!
      } else {
        console.warn("No token found in response", response);
      }

      setIsLoading(false);
      onLoginSuccess();
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert('Login Failed', error.message || 'Check your credentials and try again.');
    }
  };

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <KeyboardAvoidingView
        style={screenStyles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={screenStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View style={[screenStyles.headerContainer, { opacity: logoOpacityAnim, transform: [{ scale: logoScaleAnim }] }]}>
            <Animated.Image
              source={require('../../assets/robot_logo.png')}
              style={[screenStyles.logoImage, { transform: [{ translateY: floatAnim }] }]}
              resizeMode="contain"
            />
            <Text style={screenStyles.subtitle}>
              The premium workflow management workspace
            </Text>
          </Animated.View>

          {/* Form Card */}
          <Animated.View style={[screenStyles.card, { opacity: cardOpacityAnim, transform: [{ translateY: cardSlideAnim }] }]}>
            <Text style={screenStyles.cardTitle}>Welcome Back</Text>
            <Text style={screenStyles.cardSubtitle}>
              Enter your credentials to access your dashboard
            </Text>

            <InputField
              label="Mail ID"
              placeholder="name@company.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              error={emailError}
            />

            <InputField
              label="Password"
              placeholder="••••••••"
              isPassword={true}
              autoCapitalize="none"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
              error={passwordError}
            />

            <TouchableOpacity
              style={screenStyles.forgotPasswordContainer}
              activeOpacity={0.7}
              onPress={() => Alert.alert('Reset Password', 'A reset link has been sent.')}
            >
              <Text style={screenStyles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              loading={isLoading}
              onPress={handleLogin}
              style={screenStyles.submitButton}
            />

            <TouchableOpacity
              style={screenStyles.biometricButton}
              activeOpacity={0.7}
              onPress={handleBiometricLogin}
            >
              <Text style={screenStyles.biometricButtonText}>Login with Biometrics</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer - Removed Sign Up as per user request */}
          <View style={screenStyles.footerContainer}></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const screenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoImage: {
    width: 300,
    height: 150,
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#94A3B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xl,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardSubtitle: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
    marginBottom: theme.spacing.lg,
    lineHeight: 20,
    textAlign: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.md,
  },
  forgotPasswordText: {
    color: theme.colors.borderFocus,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: theme.spacing.xs,
  },
  biometricButton: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  biometricButtonText: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '700',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  footerText: {
    color: theme.colors.textMuted,
    fontSize: theme.typography.sizes.sm,
  },
  signUpLink: {
    color: theme.colors.borderFocus,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '700',
  },
});
