import React, {useState} from 'react';
import {Animated, FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {globalStyles} from '../../assets/styles/global';
import themeColors from '../../assets/styles/theme.colors';
import themeDimensions from '../../assets/styles/theme.dimensions';
import {CollapsingToolbar} from '../components/home/CollapsingToolbar';
import {ScenarioItem} from '../components/scenario/ScenarioItem';
import {Scenario} from '../model/ui/Scenario';
import {useRoute} from '@react-navigation/native';

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
  // const [classroomHeaderFullHeight, setClassroomHeaderFullHeight] = useState(0);
  // const [classroomHeightIsSet, setClassroomHeightIsSet] = useState(false);
  // const [homeHeaderFullHeight, setHomeHeaderFullHeight] = useState(0);
  // const [homeHeightIsSet, setHomeHeightIsSet] = useState(false);
  const [fullHeaderHeight, setFullHeaderHeight] = useState(0);
  const scrollY = new Animated.Value(0);
  const route = useRoute();

  // const getPaddingTop = () => {
  //   if (route.name === 'Home') {
  //     console.log(
  //       'Returning homeHeaderFullHeight + themeDimensions.MARGIN_VERTICAL_BIG',
  //     );
  //     return homeHeaderFullHeight + themeDimensions.MARGIN_VERTICAL_BIG;
  //   }
  //   if (route.name === 'Classrooms' && classroomHeaderFullHeight !== 0) {
  //     console.log(
  //       'Returning classroomHeaderFullHeight + themeDimensions.MARGIN_VERTICAL_BIG',
  //     );
  //     return classroomHeaderFullHeight + themeDimensions.MARGIN_VERTICAL_BIG;
  //   }
  //
  //   // Return a default value if none of the conditions are met
  //   return 0;
  // };

  // useEffect(() => {
  //   console.log(`Padding top: ${getPaddingTop()}`);
  //   getPaddingTop();
  // }, [route.name]);

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
            // if (route.name === 'Home' && !homeHeightIsSet) {
            //   setHomeHeaderFullHeight(height);
            //   setHomeHeightIsSet(true);
            // }
            //
            // if (route.name === 'Classrooms' && !classroomHeightIsSet) {
            //   setClassroomHeaderFullHeight(height);
            //   setClassroomHeightIsSet(true);
            // }
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
                    paddingTop: route.name === 'Home' ? '90%' : '65%',
                    // fullHeaderHeight + themeDimensions.MARGIN_VERTICAL_BIG,
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
