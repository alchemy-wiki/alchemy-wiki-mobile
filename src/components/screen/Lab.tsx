import { Button, Image, StyleSheet, Text, View } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import Drag from '../ui/Draggable';
import Draggable from 'react-native-draggable';
import React from 'react';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default function(props: Props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Drag
          x={-100}
          y={100}
          size={75}
          imageSource={{
            uri: 'https://image.flaticon.com/icons/png/512/119/119573.png',
          }}
        />
      </View>
      <View style={styles.bottom}>
        <Button
          onPress={() =>
            props.navigation.navigate('Storage', { name: 'Joddev from Home' })
          }
          title="Storage"
        />
      </View>
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
    left: 100,
  },
});
