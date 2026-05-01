// screens/Welcome.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  Animated,
  Dimensions,
  StatusBar,
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function Welcome({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('AppTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1B4E" />
      
      {/* Background Gradient with better contrast */}
      <LinearGradient
        colors={['#0D1B4E', '#1A3A8F', '#4A6FDC']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Animated Stars/Sparkles with better visibility */}
      <View style={styles.sparkleContainer}>
        {[...Array(15)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.sparkle,
              {
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.8 + 0.2,
                backgroundColor: i % 2 === 0 ? '#FFD166' : '#FFFFFF',
                width: Math.random() * 6 + 3,
                height: Math.random() * 6 + 3,
              }
            ]}
          />
        ))}
      </View>

      {/* Floating bubbles with better contrast */}
      <View style={styles.bubbleContainer}>
        <View style={[styles.bubble, styles.bubble1]} />
        <View style={[styles.bubble, styles.bubble2]} />
        <View style={[styles.bubble, styles.bubble3]} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Animated Logo with enhanced colors */}
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>💰</Text>
              <LinearGradient
                colors={['#FFD166', '#FFB347', '#FF8C42']}
                style={styles.logoGlow}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
              <View style={styles.logoRing} />
            </View>
          </Animated.View>

          {/* Main Title with better contrast */}
          <Animated.View 
            style={[
              styles.titleContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.title}>ExpenseTracker</Text>
            <Text style={styles.subtitle}>Smart Finance Management</Text>
          </Animated.View>

          {/* Compact Feature Cards */}
          <Animated.View 
            style={[
              styles.featuresContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Card 1 - Compact Design */}
            <TouchableOpacity 
              style={[styles.featureCard, styles.featureCard1]}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardIconContainer}>
                    <View style={[styles.cardIconBackground, styles.iconBackground1]}>
                      <Text style={styles.cardEmoji}>📊</Text>
                    </View>
                  </View>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Track Expenses</Text>
                    <Text style={styles.cardDesc}>Monitor daily spending</Text>
                  </View>
                  {/* <View style={styles.cardArrow}>
                    <Text style={styles.arrowIcon}>→</Text>
                  </View> */}
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Card 2 - Compact Design */}
            <TouchableOpacity 
              style={[styles.featureCard, styles.featureCard2]}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#3B82F6', '#2563EB']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardIconContainer}>
                    <View style={[styles.cardIconBackground, styles.iconBackground2]}>
                      <Text style={styles.cardEmoji}>🎯</Text>
                    </View>
                  </View>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Set Goals</Text>
                    <Text style={styles.cardDesc}>Achieve savings targets</Text>
                  </View>
                  {/* <View style={styles.cardArrow}>
                    <Text style={styles.arrowIcon}>→</Text>
                  </View> */}
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* Card 3 - Compact Design */}
            <TouchableOpacity 
              style={[styles.featureCard, styles.featureCard3]}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#F59E0B', '#D97706']}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardContent}>
                  <View style={styles.cardIconContainer}>
                    <View style={[styles.cardIconBackground, styles.iconBackground3]}>
                      <Text style={styles.cardEmoji}>📈</Text>
                    </View>
                  </View>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Analytics</Text>
                    <Text style={styles.cardDesc}>Understand patterns</Text>
                  </View>
                  {/* <View style={styles.cardArrow}>
                    <Text style={styles.arrowIcon}>→</Text>
                  </View> */}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <Animated.View 
        style={[
          styles.buttonContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.buttonWrapper}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#FF6B35', '#FF3D00']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <View style={styles.buttonIconContainer}>
                <Text style={styles.buttonArrow}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          {/* Privacy Note with better contrast */}
          <View style={styles.privacyContainer}>
            <Text style={styles.privacyIcon}>🔒</Text>
            <Text style={styles.privacyText}>
              Your data stays private & secure
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Enhanced Bottom Wave */}
      <View style={styles.waveContainer}>
        <LinearGradient
          colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.15)']}
          style={styles.wave}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <LinearGradient
          colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
          style={[styles.wave, styles.wave2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B4E',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 180, // Space for fixed button
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  sparkleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkle: {
    position: 'absolute',
    borderRadius: 50,
    shadowColor: '#FFD166',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 4,
  },
  bubbleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  bubble: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  bubble1: {
    width: 150,
    height: 150,
    top: '15%',
    left: '-8%',
  },
  bubble2: {
    width: 120,
    height: 120,
    top: '65%',
    right: '-4%',
  },
  bubble3: {
    width: 80,
    height: 80,
    bottom: '25%',
    left: '15%',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#FF8C42',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 50,
    zIndex: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  logoGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.4,
  },
  logoRing: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E2E8F0',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
    lineHeight: 22,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 20,
  },
  featureCard: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 12, // Reduced margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  featureCard1: {
    shadowColor: '#10B981',
  },
  featureCard2: {
    shadowColor: '#3B82F6',
  },
  featureCard3: {
    shadowColor: '#F59E0B',
  },
  cardGradient: {
    paddingVertical: 16, // Reduced padding
    paddingHorizontal: 18,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    marginRight: 14,
  },
  cardIconBackground: {
    width: 50, // Reduced size
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconBackground1: {
    backgroundColor: '#FFFFFF',
  },
  iconBackground2: {
    backgroundColor: '#EFF6FF',
  },
  iconBackground3: {
    backgroundColor: '#FFFBEB',
  },
  cardEmoji: {
    fontSize: 24, // Reduced size
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18, // Reduced size
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  cardDesc: {
    fontSize: 13, // Reduced size
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '500',
    lineHeight: 18,
  },
  cardArrow: {
    marginLeft: 10,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#FF3D00',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    marginBottom: 16,
  },
  buttonGradient: {
    paddingVertical: 18, // Slightly reduced
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  buttonIconContainer: {
    marginLeft: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonArrow: {
    fontSize: 22,
    color: 'white',
    fontWeight: '700',
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  privacyIcon: {
    fontSize: 14,
    marginRight: 8,
    color: '#E2E8F0',
  },
  privacyText: {
    fontSize: 12,
    color: '#E2E8F0',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    overflow: 'hidden',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  wave2: {
    height: 50,
    transform: [{ scaleX: 1.1 }],
  },
});