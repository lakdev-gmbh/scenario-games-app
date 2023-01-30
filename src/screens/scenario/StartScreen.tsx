import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import { RootStackParamList } from "../../navigation/types";

// define overlap (negative margin) of the container
const overlap = themeDimensions.BORDER_RADIUS_BAR

const styles = StyleSheet.create({
    headerBackground: {
        height: 230,
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
        marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM
    },
})

export const ScenarioStartScreen = ({navigation, route}: NativeStackScreenProps<RootStackParamList, "ScenarioStart">) => {
    const { t } = useTranslation()
    const { scenarioId } = route.params

    // TODO: change hardcoded props
    // --- START scenario properties ---
    const subjects = [
        {name: 'Mathematik', id: 1},
        {name: 'Mathematik2', id: 2},
        {name: 'Physik', id: 3}
    ]
    const classLevel = "9"
    const scenarioTitle = "EU Scenario"
    const scenarioText = "Die Europäische Union, kurz EU, ist ein einzigartiger wirtschaftlicher und politischer Zusammenschluss aus 27 europäischen Ländern. Dank der EU können wir in viele Länder ganz ohne Grenzkontrollen reisen, leben in Frieden und Stabilität und profitieren indirekt von vielen Förderprogrammen und Unterstützungen. Selbst diese App würde es ohne die EU sowie die Förderung durch das Erasmus+ Programm gar nicht geben." 
    const imageUri = "https://scenario.laknet.de" + "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"
    // --- END scenario properties ---

    //--- START random owl image ---
    const assetFolder = "../../../assets/images/owls"
    const owlAssets = [
        require(assetFolder + '/owl_scenario_1.png'),
        require(assetFolder + '/owl_scenario_2.png'),
        require(assetFolder + '/owl_scenario_3.png'),
        require(assetFolder + '/owl_scenario_4.png'),
        require(assetFolder + '/owl_scenario_5.png'),
    ]
    const randomNumber = Math.floor(Math.random() * owlAssets.length);
    let randomOwlImage = owlAssets[randomNumber]
    //--- END random owl image ---

    const onStart = () => {
        // start first screen
        navigation.replace("ScenarioTask", {
            scenarioId: scenarioId,
            taskGroupIndex: 0,
            taskIndex: 0,
        })
    }

    // TODO: maybe use scrollview + animations for bigger texts
    
    return <View style={{flex: 1}}>
        <ImageBackground
            style={styles.headerBackground}
            resizeMode="cover"
            onError={e=> console.log(e.nativeEvent.error)}
            source={{uri: imageUri}}>
                <LinearGradient
                style={[{ flex: 1, flexDirection: 'column-reverse' }, globalStyles.container]}
                colors={[themeColors.BACKGROUND_OVERLAY_START, themeColors.BACKGROUND_OVERLAY_END]}
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

            <TextButton onPress={onStart} style={styles.button}>
                { t("button_start") }
            </TextButton>
        </View>

    </View>
}