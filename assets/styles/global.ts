import { StyleSheet } from "react-native";
import themeColors from "./theme.colors";
import themeDimensions from "./theme.dimensions";

export const globalStyles = StyleSheet.create({
    container: {
        paddingHorizontal: themeDimensions.SCREEN_MARGIN_HORIZONTAL 
    },
    borderTop: {
        borderTopColor: themeColors.BORDER,
        borderTopWidth: themeDimensions.LIST_ITEM_BORDER_WIDTH
    },
    borderBottom: {
        borderBottomColor: themeColors.BORDER,
        borderBottomWidth: themeDimensions.LIST_ITEM_BORDER_WIDTH
    },
    textInput: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderColor: themeColors.BORDER_INPUT,
        borderRadius: themeDimensions.BORDER_RADIUS_INPUT,
        borderWidth: 1
    },
    arrowIcon: {
        width: 18,
        height: 18,
        resizeMode: "center",
    },
})