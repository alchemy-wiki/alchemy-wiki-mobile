import { Button, Image, StyleSheet, Text, View } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { useState } from 'react';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function App(props: Props) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>!!!Alchemy Wiki!!!</Text>
      <Button
        onPress={() =>
          props.navigation.navigate('Home', { name: 'Joddev from Home' })
        }
        title="Play"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
