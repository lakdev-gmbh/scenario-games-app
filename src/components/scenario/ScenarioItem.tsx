import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { Tag } from "../global/Tag";
import { DefaultText, SmallLabel } from "../global/Text";

const globalUrl = "https://scenario.laknet.de"

const styles = StyleSheet.create({
    container: {
      paddingVertical: themeDimensions.LIST_ITEM_PADDING_VERTICAL,
      flexDirection: 'row'
    },
    content: {
        flex: 1,
        marginEnd: 12,
        //alignSelf: 'center'
    },
    statusContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    statusImage: {
        height: 22,
        width: 22,
    },
    statusLabel: {
        marginStart: 6,
    },
    title: {
        flex: 1,
        marginVertical: 6
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    image: {
      width: 90,
      height: 75,
      alignSelf: 'flex-end',
      borderRadius: themeDimensions.BORDER_RADIUS_IMAGE,
    },
  });

export const ScenarioItem = ({scenario}: {
    scenario: {
        id: string,
        title: string,
        image: string,
        subjects: Array<{
            name: string
        }>,
        progress: number
    }
}) => {

    const navigation = useNavigation()

    // TODO: get progress, either as prop (probably better) or as watermelon query
    const scenarioProgress: number = scenario.progress

    // --- START calculate progress ---
    const iconFolder = "../../../assets/images/icons/"
    let statusImage = require(iconFolder + "status_none.png")
    if(scenarioProgress == 1) {
        statusImage = require(iconFolder + "status_completed.png")
    } else if(scenarioProgress > 0) {
        statusImage = require(iconFolder + "status_started.png")
    }
    const scenarioPercentage = Math.round(scenarioProgress*100)
    // --- END calculate progress ---


    return <TouchableOpacity 
        onPress={() => {navigation.navigate("ScenarioStart", {
            scenarioId: scenario.id
        })}}
        style={[styles.container, globalStyles.borderBottom]}>
        <View style={styles.content}>
            <View style={styles.statusContainer}>
                <Image 
                    style={styles.statusImage}
                    source={statusImage} />
                <SmallLabel style={styles.statusLabel} bold>{scenarioPercentage} %</SmallLabel>
            </View>
                
            <DefaultText style={styles.title} bold>
                { scenario.title }
            </DefaultText>
            <View style={styles.tagContainer}>
                {scenario.subjects && scenario.subjects.map(subject => 
                    <Tag key={subject.name}> {subject.name} </Tag>
                )}
            </View>
        </View>
        <Image 
            style={styles.image}
            source={{uri: 
                globalUrl + scenario.image}
            } />
    </TouchableOpacity>

}