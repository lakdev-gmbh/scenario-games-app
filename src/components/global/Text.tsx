import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import themeFontSizes from "../../../assets/styles/theme.fontSizes";


function createTextComponent(fontSize: number) {
    return ({children, style, bold}: {
        children?: React.ReactNode;
        style?: StyleProp<TextStyle> | undefined;
        bold?: boolean;
    }) => {
    
        return <Text style={[
            style,
            {
                fontWeight: bold ? '700' : 'normal',
                fontSize: fontSize
            }
        ]}>
                { children }
        </Text>
    } 
}

export const H1 = createTextComponent(themeFontSizes.H1)
export const DefaultText = createTextComponent(themeFontSizes.DEFAULT)
export const Label = createTextComponent(themeFontSizes.LABEL)
export const SmallLabel = createTextComponent(themeFontSizes.TAG)