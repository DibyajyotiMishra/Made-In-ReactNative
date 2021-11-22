import React from 'react';
import {Dimensions, View, ScrollView, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
//import {mixColor} from 'react-native-redash';
import {products} from './Model';
import Card, {CARD_HEIGHT} from './Card';
import Products from './Products';
import Cards from './components/Cards';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  slider: {height: CARD_HEIGHT},
});

const snapToOffsets = [0, CARD_HEIGHT];

const PhilzCoffee = () => {
  const translateX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x}}) => {
      translateX.value = x;
    },
  });
  const style = useAnimatedStyle(() => ({
    flex: 1,
    backgroundColor: interpolateColor(
      translateX.value,
      products.map((_, i) => width * i),
      products.map(product => product.color2),
    ),
  }));
  return (
    <Animated.View style={style}>
      <ScrollView
        snapToOffsets={snapToOffsets}
        decelerationRate="fast"
        snapToEnd={false}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.slider}>
          <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={onScroll}
            decelerationRate="fast"
            snapToInterval={width}
            showsHorizontalScrollIndicator={false}
            horizontal>
            {products.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </Animated.ScrollView>
          <Products x={translateX} />
        </View>
        <Cards />
      </ScrollView>
    </Animated.View>
  );
};

export default PhilzCoffee;
