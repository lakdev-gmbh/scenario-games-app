import React from "react";
import { StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RenderHTML from "react-native-render-html";
import themeColors from "../../../../assets/styles/theme.colors";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../../assets/styles/theme.fontSizes";
import { H1 } from "../../../components/global/Text";

export const ScenarioTaskHTML = ({title, body}: {
    title: string;
    body: string;
}) => {
    const { width } = useWindowDimensions();

    // do NOT use StyleSheet for RenderHTML
    const colorized = {
        color: themeColors.SECONDARY,
    }
    const styles = StyleSheet.create({
        scrollView: {
            
        },
        title: {
            marginBottom: themeDimensions.MARGIN_VERTICAL_MEDIUM,
            textAlign: 'center',
            color: themeColors.SECONDARY,
        }
    })

    return <ScrollView style={styles.scrollView}>
        <H1 bold style={styles.title}>{title}</H1>
        <RenderHTML
            defaultTextProps={{
                style: {
                    fontSize: themeFontSizes.DEFAULT,
                },
                selectable: true,
            }}
            tagsStyles={{
                p: {
                    marginVertical: 0,
                },
                h1: colorized,
                h2: colorized,
                h3: colorized,
                img: {
                    width: "100%",
                    height: "12rem",
                    marginVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM,
                }
            }}
            contentWidth={width}
            source={{ html: body }}
        />
    </ScrollView>
}