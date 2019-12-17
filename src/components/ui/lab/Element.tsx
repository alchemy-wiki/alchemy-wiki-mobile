import {
  Animated,
  GestureResponderEvent,
  ImageSourcePropType,
  PanResponderGestureState,
} from 'react-native';
import React, { useCallback, useRef } from 'react';

import Draggable from '../base/Draggable';
import { XY } from '../../types';

interface Props {
  onDrag: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    pan: Animated.ValueXY,
    offset: XY,
  ) => void;
  onStartDrag: (
    event: GestureResponderEvent,
    pan: Animated.ValueXY,
    offset: XY,
  ) => void;
  onRelease: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    pan: Animated.ValueXY,
    offset: XY,
  ) => void;
  onLongPress: (
    event: GestureResponderEvent,
    pan: Animated.ValueXY,
    offset: XY,
  ) => void;
  size: number;
  imageSource: ImageSourcePropType;
  x: number;
  y: number;
  zIndex: number;
}

export default function Element(props: Props) {
  return <Draggable {...props}></Draggable>;
}

Element.defaultProps = {
  onDrag: () => {},
  onStartDrag: () => {},
  onRelease: () => {},
  onLongPress: () => {},
};
