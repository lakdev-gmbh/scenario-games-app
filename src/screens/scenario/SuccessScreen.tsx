import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../../assets/styles/global";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../assets/styles/theme.fontSizes";
import { TextButton } from "../../components/global/Button";
import { DefaultText, H1 } from "../../components/global/Text";

const styles = StyleSheet.create({
    fullSize: {
        flex: 1
    },
    container: {
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED
    },
    speechContainer: {
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
        borderBottomStartRadius: themeDimensions.BORDER_RADIUS_BAR,
        borderBottomEndRadius: themeDimensions.BORDER_RADIUS_BAR,
    },
    speechTitle: {
        color: themeColors.TEXT_PRIMARY_LIGHT,
        textAlign: 'center',
        fontSize: themeFontSizes.BIG,
        marginVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM
    },
    speechBottom: {
        color: themeColors.PRIMARY,
        textAlign: 'center',
        fontSize: themeFontSizes.BIG,
        marginVertical: themeDimensions.MARGIN_VERTICAL_BIG,
        paddingHorizontal: 30,
    },
    resultText: {
        color: themeColors.TEXT_PRIMARY_LIGHT,
        fontSize: themeFontSizes.H3,
        textAlign: 'center',
        flex: 1,
        paddingVertical: 12,
    },
    results: {
        flexDirection: 'row'
    },
    borderRight: {
        borderRightWidth: themeDimensions.LIST_ITEM_BORDER_WIDTH,
        borderRightColor: themeColors.BORDER,
        marginVertical: 4,
    },
    owl: {
        width: "100%",
        height: 145,
        resizeMode: "contain",
        marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM,
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
      overview: {

      },
      bottomContainer: {
        paddingVertical: themeDimensions.MARGIN_VERTICAL_BIG,
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
      }
})
export const ScenarioSuccessScreen = () => {
    const { t } = useTranslation()

    return <SafeAreaView style={[styles.fullSize, styles.container]}>
        <LinearGradient
            style={styles.fullSize}
            colors={[themeColors.BACKGROUND_GRADIENT_ONE, themeColors.BACKGROUND_GRADIENT_TWO, themeColors.BACKGROUND_GRADIENT_THREE]}
            locations={[0.125, 0.5625, 0.95]}>
            
            <View style={[globalStyles.container, styles.speechContainer]}>
                <H1 bold style={styles.speechTitle}>{ t("screen_success") }</H1>
                <View style={[styles.results, globalStyles.borderTop, globalStyles.borderBottom]}>
                    <DefaultText style={styles.resultText}>90 % Richtig</DefaultText>
                    <View style={styles.borderRight}></View>
                    <DefaultText style={styles.resultText}>Strafzeit: 15 Sek.</DefaultText>
                </View>
                <View style={styles.results}>
                    <DefaultText style={styles.resultText}>Zeit: 3:24 Min</DefaultText>
                </View>

                <H1 bold style={styles.speechBottom}>Oh je. Das kannst du besser.</H1>
            </View>

            <TriangleCorner style={styles.trianglePosition} />

            <Image
                style={styles.owl}
                source={require("../../../assets/images/owls/owl_1.png")} 
                />

            <View style={[styles.fullSize, styles.overview]}>
                
            </View>

            <View style={[globalStyles.container, styles.bottomContainer]}>
                <TextButton>{ t("button_next_scenario") }</TextButton>
            </View>
        </LinearGradient>

    </SafeAreaView>

}

const TriangleCorner = ({style}: {
    style?: StyleProp<ViewStyle>;
}) => {
    return <View style={[styles.triangleCorner, style]} />;
};