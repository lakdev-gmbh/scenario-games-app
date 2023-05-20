import React, { useState } from "react";
import { Animated, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { globalStyles } from "../../assets/styles/global";
import themeColors from "../../assets/styles/theme.colors";
import themeDimensions from "../../assets/styles/theme.dimensions";
import { CollapsingToolbar } from "../components/home/CollapsingToolbar";
import { ScenarioItem } from "../components/scenario/ScenarioItem";
import { Scenario } from "../model/ui/Scenario";

const styles = StyleSheet.create({
    fullHeight: {
        flex: 1,
    },
})

export const ListScreen = ({title, children, scenarios, classroom = false}: {
    title: string;
    children?: React.ReactNode;
    scenarios: Scenario[];
    classroom?: boolean;
}) => {
    const [fullHeaderHeight, setFullHeaderHeight] = useState(0)
    const scrollY = new Animated.Value(0)
    return <SafeAreaView style={[
            {backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED},
            styles.fullHeight]}>

        <View style={
            [{
                backgroundColor: themeColors.BACKGROUND,
            }, styles.fullHeight]
        }>
            <CollapsingToolbar
                classroom={classroom}
                scrollY={scrollY}
                onLayout={event => {
                    // calculate full height used for padding of the list view
                    const height = event.nativeEvent.layout.height
                    setFullHeaderHeight(height)
                }}
                title={title}>
                {children}
            </CollapsingToolbar>
            

            <View style={[globalStyles.container,
                styles.fullHeight]}>
                <FlatList
                    alwaysBounceVertical={false}
                    data={scenarios}
                    renderItem={({item, index}) => <View 
                        style={[
                            index === 0 && {paddingTop: fullHeaderHeight + themeDimensions.MARGIN_VERTICAL_BIG},
                            index+1 === scenarios.length && {paddingBottom: themeDimensions.PADDING_SCROLLVIEW_BOTTOM}
                        ]}>
                            <ScenarioItem scenario={item} />
                        </View>
                    }
                    keyExtractor={item => item.id}
                    onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                 // BUG: This line causes scroll to be janky
                                y: scrollY
                                 // END BUG
                            }
                        }
                    }], {useNativeDriver: false})}
                    scrollEventThrottle={16}
                />
            </View>
        </View>
    </SafeAreaView>
}