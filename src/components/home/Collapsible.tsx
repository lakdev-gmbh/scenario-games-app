import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import { Label } from "../global/Text";

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        paddingTop: 8
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    title: {
        flex: 1,
    },
    arrowIcon: {
        width: 18,
        height: 18,
        resizeMode: "center",
    },
    contentContainer: {
        flexDirection: "row", 
        flexWrap: "wrap"
    }
})

export const Collapsible = ({title, children, openOnDefault = false}: {
    title: string;
    children?: React.ReactNode;
    openOnDefault?: boolean
}) => {
    const [open, setOpen] = useState(openOnDefault)

    const arrowUp = require("../../../assets/images/icons/arrow_up.png")
    const arrowDown = require("../../../assets/images/icons/arrow_down.png")
    const arrowImage = open ? arrowUp : arrowDown

    return <View style={[styles.container, globalStyles.borderTop]}>
        <TouchableOpacity 
            onPress={() => setOpen(!open)}
            style={styles.titleContainer}>
            <Label style={styles.title}>
                { title }
            </Label>
            <Image style={styles.arrowIcon} source={arrowImage} />
        </TouchableOpacity>
        {open && <View style={styles.contentContainer}>
            { children }
        </View>}
    </View>
}