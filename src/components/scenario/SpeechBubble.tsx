import React, { Fragment } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";

const styles = StyleSheet.create({
    speechContainer: {
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
        borderBottomStartRadius: themeDimensions.BORDER_RADIUS_BAR,
        borderBottomEndRadius: themeDimensions.BORDER_RADIUS_BAR,
        minHeight: 100,
    },
    fullSpeechContainer: {
        borderRadius: themeDimensions.BORDER_RADIUS_BAR,
    },
    trianglePosition: {
        left: '60%',
    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 60,
        borderTopWidth: 60,
        borderRightColor: "transparent",
        borderTopColor: themeColors.BACKGROUND_HIGHLIGHTED,
        marginTop: -10,
        transform: [{ rotate: "-8deg" }],
      },
})

export const SpeechBubble = ({children, full, style}: {
    children?: React.ReactNode;
    full?: boolean;
    style?: StyleProp<ViewStyle>;
}) => {
    return <Fragment>
        <View style={[globalStyles.container, styles.speechContainer, full && styles.fullSpeechContainer, style]}>
            { children }
        </View>

        <TriangleCorner style={styles.trianglePosition} />
    </Fragment>
}


const TriangleCorner = ({style}: {
    style?: StyleProp<ViewStyle>;
}) => {
    return <View style={[styles.triangleCorner, style]} />;
};