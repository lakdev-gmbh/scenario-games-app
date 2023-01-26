import React from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { Label } from "./Text";


const styles = StyleSheet.create({
    tagContainer: {
        marginTop: themeDimensions.TAG_MARGIN_TOP,
        marginEnd: themeDimensions.TAG_MARGIN_END,
    },
    tagBase: {
        color: "white",
        backgroundColor: themeColors.PRIMARY,
        borderRadius: themeDimensions.BORDER_RADIUS_TAG,
        alignSelf: 'flex-start',
        overflow: 'hidden',
    },
    smallTag: {
        paddingVertical: 2.5,
        paddingHorizontal: 5,
    },
    fatTag: {
        paddingVertical: themeDimensions.TAG_FAT_PADDING_VERTICAL,
        paddingHorizontal: themeDimensions.TAG_FAT_PADDING_HORIZONTAL,
    },
    inactive: {
        backgroundColor: themeColors.LIGHT,
    },
    secondary: {
        backgroundColor: themeColors.SECONDARY
    }
})

export const Tag = ({children, secondary = false}: {
    children?: React.ReactNode;
    secondary?: boolean
}) => {
    return <Text style={[styles.tagContainer, styles.tagBase, styles.smallTag,
        secondary && styles.secondary]}>
        {children}
    </Text>
}

export const FatTag = ({children, active = true, secondary = false, onPress, style}: {
    children?: React.ReactNode;
    active?: boolean;
    secondary?: boolean
    onPress?: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
}) => {
    return <TouchableOpacity style={[styles.tagContainer, style]} onPress={onPress} disabled={onPress === undefined}>
        <Label style={[styles.tagBase, styles.fatTag, secondary && styles.secondary,
            !active && styles.inactive]}>
            {children}
        </Label>
    </TouchableOpacity>
}