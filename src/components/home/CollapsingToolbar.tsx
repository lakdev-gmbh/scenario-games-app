import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback } from "react";
import { Animated, LayoutChangeEvent, Linking, StyleSheet, View } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import appConfig from "../../app.config";
import { RootStackParamList } from "../../navigation/types";
import { ActionIcon } from "../global/ActionIcon";
import { H1 } from "../global/Text";

const styles = StyleSheet.create({
    barStyle: {
        position: "absolute",
        width: "100%",
        paddingVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
        shadowOpacity: 0.2,
        shadowOffset: {width: 10, height: 10},
        borderBottomEndRadius: themeDimensions.BORDER_RADIUS_BAR,
        borderBottomStartRadius: themeDimensions.BORDER_RADIUS_BAR,
        zIndex: 100,
    },
    headerContainer: {
        flexDirection: "row"
    },
})

const imageAssets = "../../../assets/images/"

export const CollapsingToolbar = ({title, children, scrollY, onLayout, classroom = false}: {
    title: string;
    children?: React.ReactNode;
    scrollY: Animated.Value;
    onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
    classroom?: boolean
}) => {
    const maxHeaderHeight = scrollY.interpolate({
        // make input range a smaller to faster shrink the view
        inputRange: [0, 50], // = size that needs to be scrolled to collapse
        // estimated size of header part (250): must be greater than actual size
        // TODO: Decide which height to use
        outputRange: [300, 0],
        extrapolate: 'clamp'
    })
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [1,0],
        extrapolate: 'clamp',
    })

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const onInfo = useCallback(() => {
        // currently only open the official website in a browser
        Linking.openURL(appConfig.infoWebsite)
    }, [])
    
    const classroomButton = <ActionIcon
        onPress={() => {
            navigation.replace("Classrooms")
        }}
        source={require(imageAssets + "actions/action_users.png")} />
    const homeButton = <ActionIcon
        onPress={() => {
            navigation.replace("Home")
        }}
        source={require(imageAssets + "actions/action_user.png")} />

    return <View 
                onLayout={onLayout}
                style={[globalStyles.container, styles.barStyle]}>
                    { /* Fixed (not shrinking) part containing header and icons */ }
                <View style={styles.headerContainer}>
                    <H1 
                        style={{flex: 1}}
                        bold>{ title }</H1>
                    {classroom ? homeButton : classroomButton}
                    <ActionIcon
                        onPress={onInfo}
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