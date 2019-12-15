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
import React, { useCallback, useRef } from 'react';

interface Props {
  onDrag: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => void;
  onRelease: (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => void;
  onLongPress: (event: GestureResponderEvent) => void;
  disabled: boolean;
  size: number;
  imageSource?: ImageSourcePropType;
  backgroundColor?: string;
  x?: number;
  y?: number;
}

export default function Draggable(props: Props) {
  const pan = useRef(new Animated.ValueXY());
  const offsetFromStart = useRef({ x: 0, y: 0 });
  pan.current.addListener((c) => (offsetFromStart.current = c));

  const onShouldMove = () => !props.disabled;

  const onPanResponderRelease = useCallback(
    (e: GestureResponderEvent, gestureState: PanResponderGestureState) => {
      props.onRelease(e, gestureState);
    },
    [props.onRelease],
  );

  const onPanResponderGrant = useCallback(
    (e: GestureResponderEvent) => {
      pan.current.setOffset(offsetFromStart.current);
      pan.current.setValue({ x: 0, y: 0 });
    },
    [pan],
  );

  const onPanResponderMove = useCallback(
    (e: GestureResponderEvent, gestureState?: PanResponderGestureState) => {
      const { dx, dy } = gestureState;
      pan.current.setValue({ x: dx, y: dy });
      props.onDrag(e, gestureState);
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
            resizeMode: 'contain',
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
    <Animated.View
      style={pan.current.getLayout()}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        style={{ ...sizeCss, ...positionCss }}
        onLongPress={props.onLongPress}
      >
        {content}
      </TouchableOpacity>
    </Animated.View>
  );
}

Draggable.defaultProps = {
  onDrag: () => {},
  onRelease: () => {},
  onLongPress: () => {},
  disabled: false,
  x: 0,
  y: 0,
};
