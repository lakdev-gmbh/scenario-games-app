import React from "react";
import { GestureResponderEvent, Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
    actionIcon: {
        width: 40,
        height: 30,
        resizeMode: "center",
        marginStart: 4,
    }
})

export const ActionIcon = ({source, onPress}: {
    source: ImageSourcePropType;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}) => {
    return <TouchableOpacity onPress={onPress}>
        <Image 
            source={source}
            style={styles.actionIcon} />
    </TouchableOpacity>
}