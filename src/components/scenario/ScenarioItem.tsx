import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { Tag } from "../global/Tag";
import { DefaultText, SmallLabel } from "../global/Text";

const globalUrl = "https://scenario.laknet.de"

const styles = StyleSheet.create({
    container: {
      paddingVertical: themeDimensions.LIST_ITEM_PADDING_VERTICAL,
      borderBottomWidth: themeDimensions.LIST_ITEM_BORDER_WIDTH,
      borderBottomColor: themeColors.BORDER,
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
        }>
    }
}) => {

    const navigation = useNavigation()

    return <TouchableOpacity 
        onPress={() => {navigation.navigate("ScenarioStart")}}
        style={styles.container}>
        <View style={styles.content}>
            <View style={styles.statusContainer}>
                <Image 
                    style={styles.statusImage}
                    source={require("../../../assets/images/icons/status_none.png")} />
                <SmallLabel style={styles.statusLabel} bold>0 %</SmallLabel>
            </View>
                
            <DefaultText style={styles.title} bold>
                { scenario.title }
            </DefaultText>
            <View style={styles.tagContainer}>
                {scenario.subjects.map(subject => 
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