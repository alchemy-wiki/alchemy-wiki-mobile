import { Button, Image, StyleSheet, Text, View } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import Draggable from 'react-native-draggable';
import React from 'react';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function(props: Props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Draggable
          x={75}
          y={100}
          renderSize={56}
          renderColor="black"
          renderText="A"
          isCircle
          shouldReverse
          onShortPressRelease={() => alert('touched!!')}
        />
        <Draggable x={200} y={300} renderColor="red" renderText="B" />
        <Draggable
          x={200}
          y={200}
          isCircle
          renderSize={50}
          renderColor="black"
          imageSource={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
        ></Draggable>
      </View>
      <Button
        onPress={() =>
          props.navigation.navigate('Storage', { name: 'Joddev from Home' })
        }
        title="asdfab"
        style={styles.bottom}
      ></Button>
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
  bottom: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
});
