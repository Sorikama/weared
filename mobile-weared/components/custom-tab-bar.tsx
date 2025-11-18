import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import { IconSymbol } from '@/components/ui/icon-symbol';

const { width } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 65;
const CIRCLE_SIZE = 65;
const CURVE_DEPTH = 25;

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const focusedIndex = state.index;
  const tabWidth = width / 5;
  const circleX = tabWidth * focusedIndex + tabWidth / 2;

  const getIconName = (routeName: string) => {
    switch (routeName) {
      case 'index':
        return 'house';
      case 'search':
        return 'magnifyingglass';
      case 'add':
        return 'plus.circle';
      case 'messages':
        return 'message';
      case 'profile':
        return 'person';
      default:
        return 'house';
    }
  };

  return (
    <View style={styles.container}>
      <Svg
        width={width}
        height={TAB_BAR_HEIGHT + CURVE_DEPTH}
        style={styles.svg}
      >
        <Path
          d={`
            M 0,${CURVE_DEPTH}
            Q 0,${CURVE_DEPTH - 5} 5,${CURVE_DEPTH - 10}
            Q 15,${CURVE_DEPTH - 20} 25,${CURVE_DEPTH - 20}
            L ${circleX - 40},${CURVE_DEPTH - 20}
            Q ${circleX - 35},${CURVE_DEPTH - 20} ${circleX - 32},${CURVE_DEPTH - 23}
            Q ${circleX - 25},${CURVE_DEPTH - 30} ${circleX},${CURVE_DEPTH - 30}
            Q ${circleX + 25},${CURVE_DEPTH - 30} ${circleX + 32},${CURVE_DEPTH - 23}
            Q ${circleX + 35},${CURVE_DEPTH - 20} ${circleX + 40},${CURVE_DEPTH - 20}
            L ${width - 25},${CURVE_DEPTH - 20}
            Q ${width - 15},${CURVE_DEPTH - 20} ${width - 5},${CURVE_DEPTH - 10}
            Q ${width},${CURVE_DEPTH - 5} ${width},${CURVE_DEPTH}
            L ${width},${TAB_BAR_HEIGHT + CURVE_DEPTH}
            L 0,${TAB_BAR_HEIGHT + CURVE_DEPTH}
            Z
          `}
          fill="#1B9876"
        />
      </Svg>

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
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={styles.tab}
            >
              {isFocused ? (
                <View style={styles.activeIconContainer}>
                  <IconSymbol
                    name={getIconName(route.name)}
                    size={28}
                    color="#FFFFFF"
                  />
                </View>
              ) : (
                <View style={styles.inactiveIconContainer}>
                  <IconSymbol
                    name={getIconName(route.name)}
                    size={24}
                    color="#FFFFFF"
                  />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT + CURVE_DEPTH,
  },
  svg: {
    position: 'absolute',
    bottom: 0,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT + CURVE_DEPTH,
    alignItems: 'flex-end',
    paddingBottom: 15,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: '#2EAD85',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },
});
