import {
  Animated,
  Button,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  PanResponderGestureState,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import React, { RefObject, createRef, useRef, useState } from 'react';

import Element from '../ui/lab/Element';
import { XY } from '../types';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

interface ElementProps {
  key: string;
  imageSource: ImageSourcePropType;
  zIndex: number;
  ref?: RefObject<Element>;
  x: number;
  y: number;
}

const shake = (pan: Animated.ValueXY, offset: XY, time = 5) => {
  pan.setOffset(offset);
  pan.setValue({ x: 0, y: 0 });

  const animations = [];
  for (let i = 0; i < time; i++) {
    animations.push(
      Animated.timing(pan, {
        toValue: { x: 5, y: 1 },
        duration: 10,
      }),
    );
    animations.push(
      Animated.timing(pan, {
        toValue: { x: 0, y: 0 },
        duration: 10,
      }),
    );
  }
  Animated.sequence(animations).start();
};

const dist = (a: XY, b: XY) => Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);

const ELEMENT_SIZE = 75;

export default function(props: Props) {
  const zIndex = useRef(1);
  const [elements, setElements] = useState([
    {
      key: 'water',
      imageSource: {
        uri: 'https://image.flaticon.com/icons/png/512/119/119573.png',
      },
      zIndex: 0,
      x: 100,
      y: 0,
    },
    {
      key: 'fire',
      imageSource: {
        uri:
          'https://cdn.pixabay.com/photo/2016/05/20/21/57/football-1406106_960_720.jpg',
      },
      zIndex: 0,
      x: 0,
      y: 0,
    },
    {
      key: 'stone',
      imageSource: {
        uri:
          'https://cdn.pixabay.com/photo/2014/12/08/14/23/pocket-watch-560937__340.jpg',
      },
      zIndex: 0,
      x: 0,
      y: 100,
    },
  ]);

  const findOverlapped = (target: ElementProps) =>
    elements.find(
      (element) =>
        element !== target && dist(element, target) < ELEMENT_SIZE * 0.8,
    );

  const onStartDrag = (element: ElementProps) => {
    return (event: GestureResponderEvent, pan: Animated.ValueXY) => {
      element.zIndex = zIndex.current++;
      setElements([...elements]);
    };
  };

  const onDrag = (element: ElementProps) => {
    return (
      event: GestureResponderEvent,
      gestureState: PanResponderGestureState,
      pan: Animated.ValueXY,
      offset: XY,
    ) => {};
  };

  const onRelease = (element: ElementProps) => {
    return (
      event: GestureResponderEvent,
      gestureState: PanResponderGestureState,
      pan: Animated.ValueXY,
      offset: XY,
    ) => {
      element.x = offset.x;
      element.y = offset.y;

      const found = findOverlapped(element);

      !found && shake(pan, offset);
      setElements([...elements]);
    };
  };

  const toElement = (prop: ElementProps) => {
    return (
      <Element
        size={ELEMENT_SIZE}
        {...prop}
        onStartDrag={onStartDrag(prop)}
        onRelease={onRelease(prop)}
        onDrag={onDrag(prop)}
      />
    );
  };

  const children = elements.map(toElement);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>{children}</View>
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
