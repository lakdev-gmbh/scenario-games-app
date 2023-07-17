import React, {ReactNode} from 'react';
import {Dimensions} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

interface SwipeGestureHandlerProps {
  children: ReactNode;
  onSwipe: () => void;
}

export const SwipeGestureHandler = ({
  children,
  onSwipe,
}: SwipeGestureHandlerProps) => {
  const screenWidth = Dimensions.get('window').width;

  const handleGestureEvent = ({nativeEvent}: {nativeEvent: any}) => {
    const {translationX, x} = nativeEvent;
    if (translationX > 0 && x > screenWidth / 4) {
      onSwipe();
    }
  };

  const handleHandlerStateChange = ({nativeEvent}: {nativeEvent: any}) => {
    if (nativeEvent.state === State.END) {
      // Reset any changes or animations
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
      onHandlerStateChange={handleHandlerStateChange}>
      {children}
    </PanGestureHandler>
  );
};
