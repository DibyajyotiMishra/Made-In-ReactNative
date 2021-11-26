import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import {canvas2Polar, normalizeRad} from 'react-native-redash';

import {RADIUS, DELTA} from './Quadrant';

const SIZE = RADIUS * 2;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quadrant: {
    width: SIZE,
    height: SIZE,
  },
});

const blockValue = (prevValue, newValue) => {
  'worklet';
  if ((prevValue > 1.5 * Math.PI && newValue < Math.PI / 2) || newValue === 0) {
    return 2 * Math.PI;
  }
  if (prevValue < Math.PI / 2 && newValue > 1.5 * Math.PI) {
    return 0.01;
  }
  return newValue;
};

const Gesture = ({theta, passcode}) => {
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offset = theta.value;
    },
    onActive: ({x, y}, ctx) => {
      const newVal = normalizeRad(
        canvas2Polar({x, y}, {x: RADIUS, y: RADIUS}).theta,
      );
      theta.value = blockValue(ctx.offset, newVal);
      ctx.offset = theta.value;
    },
    onEnd: () => {
      const val = Math.round(theta.value / DELTA) + 1;
      passcode.value += `${val === 10 ? 0 : val}`;
      theta.value = withSpring(2 * Math.PI);
    },
  });
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={styles.quadrant} />
      </PanGestureHandler>
    </View>
  );
};

export default Gesture;
