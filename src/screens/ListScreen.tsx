import React, {useEffect, useState} from 'react';
import {Animated, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {globalStyles} from '../../assets/styles/global';
import themeColors from '../../assets/styles/theme.colors';
import themeDimensions from '../../assets/styles/theme.dimensions';
import {CollapsingToolbar} from '../components/home/CollapsingToolbar';
import {ScenarioItem} from '../components/scenario/ScenarioItem';
import {Scenario} from '../model/ui/Scenario';

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
});

export const ListScreen = ({
  title,
  children,
  scenarios,
  classroom = false,
}: {
  title: string;
  children?: React.ReactNode;
  scenarios: Scenario[];
  classroom?: boolean;
}) => {
  const [fullHeaderHeight, setFullHeaderHeight] = useState(0);
  const [paddingTop, setPaddingTop] = useState(0);
  const scrollY = new Animated.Value(0);

  const updatePaddingTop = (newHeight: number) => {
    // If the new height is greater than the paddingTop, or if the difference is less than 50, update the paddingTop
    const difference = Math.abs(paddingTop - newHeight);
    if (
      newHeight > paddingTop ||
      (difference < 50 && newHeight !== paddingTop)
    ) {
      setPaddingTop(newHeight);
    }
  };

  useEffect(() => {
    updatePaddingTop(fullHeaderHeight + themeDimensions.MARGIN_VERTICAL_BIG);
  }, [paddingTop, fullHeaderHeight]);

  return (
    <SafeAreaView
      style={[
        {backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED},
        styles.fullHeight,
      ]}>
      <View
        style={[
          {
            backgroundColor: themeColors.BACKGROUND,
          },
          styles.fullHeight,
        ]}>
        <CollapsingToolbar
          classroom={classroom}
          scrollY={scrollY}
          onLayout={event => {
            // calculate full height used for padding of the list view
            const height = event.nativeEvent.layout.height;
            setFullHeaderHeight(height);
          }}
          title={title}>
          {children}
        </CollapsingToolbar>

        <View style={[globalStyles.container, styles.fullHeight]}>
          <FlatList
            alwaysBounceVertical={false}
            data={scenarios}
            renderItem={({item, index}) => (
              <View
                style={[
                  index === 0 && {
                    paddingTop: paddingTop,
                  },
                  index + 1 === scenarios.length && {
                    paddingBottom: themeDimensions.PADDING_SCROLLVIEW_BOTTOM,
                  },
                ]}>
                <ScenarioItem scenario={item} />
              </View>
            )}
            keyExtractor={item => item.id}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY,
                    },
                  },
                },
              ],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
