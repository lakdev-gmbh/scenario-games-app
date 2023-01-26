import React from "react";
import { Animated, Image, LayoutChangeEvent, StyleSheet, View } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { H1 } from "../global/Text";

const styles = StyleSheet.create({
    barStyle: {
        position: "absolute",
        width: "100%",
        paddingTop: 24,
        paddingBottom: 14,
        backgroundColor: "white",
        shadowOpacity: 0.2,
        shadowOffset: {width: 10, height: 10},
        borderBottomEndRadius: themeDimensions.BORDER_RADIUS_BAR,
        borderBottomStartRadius: themeDimensions.BORDER_RADIUS_BAR,
        zIndex: 100,
    },
    headerContainer: {
        flexDirection: "row"
    },
    actionIcon: {
        width: 40,
        height: 30,
        resizeMode: "center",
        marginStart: 4,
    }
})

const imageAssets = "../../../assets/images/"

export const CollapsingToolbar = ({title, children, scrollY, onLayout}: {
    title: string;
    children?: React.ReactNode;
    scrollY: Animated.Value;
    onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
}) => {
    const maxHeaderHeight = scrollY.interpolate({
        // make input range a smaller to faster shrink the view
        inputRange: [0, 50], // = size that needs to be scrolled to collapse
        // estimated size of header part (250): must be greater than actual size
        outputRange: [250, 0],
        extrapolate: 'clamp'
    })
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [1,0],
        extrapolate: 'clamp',
    })

    return <View 
                onLayout={onLayout}
                style={[globalStyles.container, styles.barStyle]}>
                    { /* Fixed (not shrinking) part containing header and icons */ }
                <View style={styles.headerContainer}>
                    <H1 
                        style={{flex: 1}}
                        bold>{ title }</H1>
                    <Image
                        style={styles.actionIcon}
                        source={require(imageAssets + "actions/action_users.png")} />
                    <Image
                        style={styles.actionIcon}
                        source={require(imageAssets + "actions/action_info.png")} />
                </View>


                { /* Animated (shrinkable) part */ }
                <Animated.View style={{
                    // animate the view height and opacity on scrolling
                    // use max height, since we do not know real heights
                    maxHeight: maxHeaderHeight,
                    opacity: headerOpacity,
                     // important to hide views when view shrinks
                    overflow: 'hidden',
                }}>
                    { children }
                </Animated.View>

            </View>
}