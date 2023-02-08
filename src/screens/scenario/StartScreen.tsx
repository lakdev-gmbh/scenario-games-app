import { NavigationProp } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { globalStyles } from "../../../assets/styles/global";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { TextButton } from "../../components/global/Button";
import { Tag } from "../../components/global/Tag";
import { DefaultText, H1 } from "../../components/global/Text";
import { Scenario } from "../../model/ui/Scenario";
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
    const [scenario, setScenario] = useState<Scenario|null>(null)

    // --- START scenario properties ---
    const subjects = scenario?.subjects
    const classLevel = scenario?.classLevel?.name
    const scenarioTitle = scenario?.title
    const scenarioText = scenario?.description
    const imageUri = "https://scenario.laknet.de" + scenario?.image
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
            passedTime: 0,
            penaltySeconds: 0
        })
    }

    const getScenario = async () => {
        setScenario(await Scenario.load(scenarioId));
    }

    useEffect(() => {
        getScenario()
    }, [])

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
                {subjects?.map(subject => 
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