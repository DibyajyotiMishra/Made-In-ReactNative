import React from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {products} from './Model';

const {width} = Dimensions.get('window');
const SIZE = 200;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

const Product = ({product, index, x}) => {
  const style = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];
    const scale = interpolate(x.value, inputRange, [0.61, 1, 0.61]);
    const translateX = interpolate(x.value, inputRange, [
      width / 2,
      0,
      -width / 2,
    ]);
    return {
      transform: [{translateX}, {scale}],
    };
  });

  return (
    <Animated.View key={index} style={[styles.container, style]}>
      <Image
        source={product.picture}
        style={{width: SIZE, height: SIZE * product.aspectRatio}}
      />
    </Animated.View>
  );
};

const Products = ({x}) => {
  return (
    <View style={styles.container} pointerEvents="none">
      {products.map((product, index) => {
        return <Product key={index} product={product} x={x} index={index} />;
      })}
    </View>
  );
};

export default Products;
