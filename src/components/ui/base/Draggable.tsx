import {
  Animated,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  PanResponder,
  PanResponderGestureState,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { forwardRef, useCallback, useRef } from 'react';

interface Props {
  onDrag: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    pan: Animated.ValueXY,
    offset: { x: number; y: number },
  ) => void;
  onStartDrag: (
    event: GestureResponderEvent,
    pan: Animated.ValueXY,
    offset: { x: number; y: number },
  ) => void;
  onRelease: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    pan: Animated.ValueXY,
    offset: { x: number; y: number },
  ) => void;
  onLongPress: (
    event: GestureResponderEvent,
    pan: Animated.ValueXY,
    offset: { x: number; y: number },
  ) => void;
  disabled: boolean;
  size: number;
  imageSource?: ImageSourcePropType;
  backgroundColor?: string;
  x?: number;
  y?: number;
  zIndex?: number;
}

export default function Draggable(props: Props) {
  const pan = useRef(new Animated.ValueXY({ x: props.x, y: props.y }));
  const offsetFromStart = useRef({ x: props.x, y: props.y });
  pan.current.addListener((c) => (offsetFromStart.current = c));

  const onShouldMove = () => !props.disabled;

  const onPanResponderRelease = useCallback(
    (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      props.onRelease(e, gestureState, pan.current, offsetFromStart.current);
    },
    [props.onRelease],
  );

  const onPanResponderGrant = useCallback(
    (e: GestureResponderEvent) => {
      pan.current.setOffset(offsetFromStart.current);
      pan.current.setValue({ x: 0, y: 0 });
      props.onStartDrag(e, pan.current, offsetFromStart.current);
    },
    [pan, props.onStartDrag],
  );

  const onPanResponderMove = useCallback(
    (e: GestureResponderEvent, gestureState?: PanResponderGestureState) => {
      const { dx, dy } = gestureState;
      pan.current.setValue({ x: dx, y: dy });
      props.onDrag(e, gestureState, pan.current, offsetFromStart.current);
    },
    [pan, props.onDrag],
  );

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: onShouldMove,
    onMoveShouldSetPanResponderCapture: onShouldMove,
    onPanResponderGrant,
    onPanResponderRelease,
    onPanResponderMove: Animated.event([], { listener: onPanResponderMove }),
  });

  const onLongPress = (event: GestureResponderEvent) => {
    props.onLongPress(event, pan.current, offsetFromStart.current);
  };

  const sizeCss = {
    width: props.size,
    height: props.size,
    borderRadius: props.size / 2,
    backgroundColor: props.backgroundColor,
  };

  const positionCss = {
    top: props.y,
    left: props.x,
  };

  const content = (() => {
    if (props.imageSource) {
      return (
        <Image
          style={{
            ...sizeCss,
            resizeMode: 'cover', // 'contain'
          }}
          source={props.imageSource}
        />
      );
    }
    return (
      <View
        style={{ ...sizeCss, backgroundColor: props.backgroundColor }}
      ></View>
    );
  })();

  return (
    <View style={{ position: 'absolute' }}>
      <Animated.View
        style={[pan.current.getLayout(), { zIndex: props.zIndex }]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity style={{ ...sizeCss }} onLongPress={onLongPress}>
          {content}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

Draggable.defaultProps = {
  onDrag: () => {},
  onStartDrag: () => {},
  onRelease: () => {},
  onLongPress: () => {},
  disabled: false,
  x: 0,
  y: 0,
};
