import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { globalStyles } from "../../../assets/styles/global";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { TextButton } from "../../components/global/Button";
import { Tag } from "../../components/global/Tag";
import { DefaultText, H1 } from "../../components/global/Text";

// define overlap (negative margin) of the container
const overlap = themeDimensions.BORDER_RADIUS_BAR

const styles = StyleSheet.create({
    headerBackground: {
        height: 280,
    },
    owlImage: {
        alignSelf: 'flex-end',
        marginBottom: overlap + themeDimensions.MARGIN_VERTICAL_MEDIUM,
        height: 60,
        resizeMode: "contain",
        aspectRatio: 2,
    },
    container: {
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
        flex: 1,
        marginTop: -1 * overlap,
        paddingVertical: themeDimensions.MARGIN_VERTICAL_BIG,
        borderRadius: themeDimensions.BORDER_RADIUS_BAR
    },
    tagsContainer: {
        paddingBottom: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        marginVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        flexDirection: 'row-reverse',
        
    },
    button: {
        marginVertical: themeDimensions.MARGIN_VERTICAL_BIG
    },
})

export const ScenarioStartScreen = () => {
    const { t } = useTranslation()

    // TODO: change hardcoded props
    // --- START scenario properties ---
    const subjects = [
        {name: 'Mathematik', id: 1},
        {name: 'Mathematik2', id: 2},
        {name: 'Physik', id: 3}
    ]
    const classLevel = "9"
    const scenarioTitle = "EU Scenario Biologische Vielfalt"
    const scenarioText = "Auch gibt es niemanden, der den Schmerz an sich liebt, sucht oder wünscht, nur, weil er Schmerz ist, es sei denn, es kommt zu zufälligen Umständen, in denen Mühen und Schmerz ihm große Freude bereiten können. Um ein triviales Beispiel zu nehmen, wer von uns unterzieht sich je anstrengender körperlicher Betätigung, außer um Vorteile daraus zu ziehen? Aber wer hat irgend ein Recht, einen Menschen zu tadeln, der die Entscheidung trifft, eine Freude zu genießen, die keine unangenehmen Folgen hat, oder einen, der Schmerz vermeidet, welcher."
    // --- END scenario properties ---

    //--- START random owl image ---
        let randomOwlImage = require('../../../assets/images/owls/owl_scenario_4.png')
    //--- END random owl image ---

    // TODO: maybe use scrollview + animations for bigger texts

    return <View style={{flex: 1}}>
        <ImageBackground
            style={styles.headerBackground}
            resizeMode="cover"
            source={require("../../../assets/images/placeholder_scenario.png")}>
                <LinearGradient
                style={[{ flex: 1, flexDirection: 'column-reverse' }, globalStyles.container]}
                colors={[themeColors.BACKGROUND_GRADIENT_START, themeColors.BACKGROUND_GRADIENT_END]}
                locations={[0.2, 1]}>
                    <Image
                     style={styles.owlImage}
                     source={randomOwlImage} />
                </LinearGradient>
        </ImageBackground>

        <View
            style={[styles.container, globalStyles.container]}>
            <H1 bold>{ scenarioTitle }</H1>
            <View style={[styles.tagsContainer, globalStyles.borderBottom]}>
                <Tag secondary>{classLevel}</Tag>
                {subjects.map(subject => 
                    <Tag key={subject.id}>{subject.name}</Tag>
                )}
            </View>

            <DefaultText style={{flex: 1}}>
                { scenarioText }
            </DefaultText>

            <TextButton style={styles.button}>{ t("button_start") }</TextButton>
        </View>

    </View>
}