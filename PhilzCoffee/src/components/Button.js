import React from 'react';
import {View, Pressable, Text, StyleSheet, Dimensions} from 'react-native';

const width = (Dimensions.get('window').width - 64) / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#432406',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 27,
    height: 54,
    width: width,
  },
  label: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    alignSelf: 'center',
  },
});

const Button = ({label}) => {
  return (
    <Pressable>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
