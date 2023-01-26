import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { Label } from "../global/Text";

const styles = StyleSheet.create({
    container: {
        marginTop: themeDimensions.MARGIN_VERTICAL_SMALL,
        paddingTop: themeDimensions.MARGIN_VERTICAL_SMALL,
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    title: {
        flex: 1,
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
            <Image style={globalStyles.arrowIcon} source={arrowImage} />
        </TouchableOpacity>
        {open && <View style={styles.contentContainer}>
            { children }
        </View>}
    </View>
}