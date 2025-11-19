import { View, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 65;
const CIRCLE_SIZE = 55;
const WHITE_HOLE_SIZE = 70;
const LIFT_HEIGHT = 20;

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const focusedIndex = state.index;
  const tabWidth = width / 5;
  const circleX = tabWidth * focusedIndex + tabWidth / 2;

  const getIconName = (routeName: string): keyof typeof Ionicons.glyphMap => {
    switch (routeName) {
      case 'index':
        return 'home-outline';
      case 'search':
        return 'search-outline';
      case 'add':
        return 'add-circle-outline';
      case 'messages':
        return 'chatbubble-outline';
      case 'profile':
        return 'person-outline';
      default:
        return 'home-outline';
    }
  };

  return (
    <View style={styles.container}>
      {/* Barre verte avec dégradé */}
      <Svg
        width={width}
        height={TAB_BAR_HEIGHT}
        style={styles.svg}
      >
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#0d7a5f" stopOpacity="1" />
            <Stop offset="100%" stopColor="#1a9977" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Path
          d={`
            M 0,0
            L ${circleX - 35},0
            Q ${circleX - 30},0 ${circleX - 27},3
            Q ${circleX - 20},10 ${circleX},10
            Q ${circleX + 20},10 ${circleX + 27},3
            Q ${circleX + 30},0 ${circleX + 35},0
            L ${width},0
            L ${width},${TAB_BAR_HEIGHT}
            L 0,${TAB_BAR_HEIGHT}
            Z
          `}
          fill="url(#grad)"
        />
      </Svg>

      {/* Icônes */}
      <View style={styles.tabsContainer}>
        {state.routes.map((route, index) => {
          if (route.name === 'explore') return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TabIcon
              key={route.key}
              isFocused={isFocused}
              iconName={getIconName(route.name)}
              onPress={onPress}
            />
          );
        })}
      </View>
    </View>
  );
}

function TabIcon({ isFocused, iconName, onPress }: { isFocused: boolean; iconName: string; onPress: () => void }) {
  const liftAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(liftAnim, {
      toValue: isFocused ? 1 : 0,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, [isFocused]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const translateY = liftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -LIFT_HEIGHT],
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tab}
      activeOpacity={0.7}
    >
      {/* Creux blanc ovale */}
      {isFocused && (
        <View style={styles.whiteHoleContainer}>
          <Svg width={WHITE_HOLE_SIZE} height={WHITE_HOLE_SIZE / 2} style={styles.whiteHoleSvg}>
            <Path
              d={`
                M 0,0
                Q 0,${WHITE_HOLE_SIZE / 2} ${WHITE_HOLE_SIZE / 2},${WHITE_HOLE_SIZE / 2}
                Q ${WHITE_HOLE_SIZE},${WHITE_HOLE_SIZE / 2} ${WHITE_HOLE_SIZE},0
                Z
              `}
              fill="#FFFFFF"
            />
          </Svg>
        </View>
      )}

      {/* Boule verte qui se soulève */}
      <Animated.View
        style={[
          styles.greenBubble,
          {
            opacity: liftAnim,
            transform: [
              { translateY },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <Ionicons
          name={iconName}
          size={26}
          color="#FFFFFF"
        />
      </Animated.View>

      {/* Icône normale (non active) */}
      {!isFocused && (
        <Animated.View style={{ transform: [{ scale: scaleAnim }], marginTop: LIFT_HEIGHT + 5 }}>
          <Ionicons
            name={iconName}
            size={26}
            color="#FFFFFF"
          />
        </Animated.View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT + LIFT_HEIGHT,
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT + LIFT_HEIGHT,
    alignItems: 'center',
    paddingBottom: 10,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  whiteHoleContainer: {
    position: 'absolute',
    width: WHITE_HOLE_SIZE,
    height: WHITE_HOLE_SIZE / 2,
    top: '25%',
    overflow: 'hidden',
    borderBottomLeftRadius: WHITE_HOLE_SIZE / 2,
    borderBottomRightRadius: WHITE_HOLE_SIZE / 2,
  },
  whiteHoleSvg: {
    position: 'absolute',
    top: 0,
  },
  greenBubble: {
    position: 'absolute',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#1a9977',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
  },
});
