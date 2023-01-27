import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, View } from "react-native";
import { BiggerText, DefaultText, Label } from "../../components/global/Text";
import { globalStyles } from "../../../assets/styles/global";
import { TouchableOpacity } from "react-native-gesture-handler";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { TextButton } from "../../components/global/Button";
import { useTranslation } from "react-i18next";
import themeColors from "../../../assets/styles/theme.colors";
import themeFontSizes from "../../../assets/styles/theme.fontSizes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";


const styles = StyleSheet.create({
    fullSize: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM
    },
    headerTime: {
        flex: 1,
    },
    close: {
        height: 20,
        width: 20,
    },
    question: {
        marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM,
    },
    continueButton: {
        marginBottom: themeDimensions.MARGIN_VERTICAL_MEDIUM
    }
})

export const ScenarioTaskScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
    const question = "Welche der folgenden Worte musst du wie anordnen, damit das alles Sinn ergibt?"
    const progress = 2/3

    // TODO: create timer in seconds?
    const time = 130
    const minutes = Math.floor(time/60)
    const seconds = time % 60

    const {t} = useTranslation()
    const onCloseScenario = useCallback(() => {
        navigation.goBack()
    }, [])

    return <SafeAreaView style={[globalStyles.container, styles.fullSize]}>

        <View style={styles.header}>
            <Label style={styles.headerTime}>{minutes < 10 ? "0" + minutes : minutes}:{seconds}</Label>
            <TouchableOpacity onPress={onCloseScenario}>
                <Image style={styles.close} source={require("../../../assets/images/actions/action_close.png")} />
            </TouchableOpacity>
        </View>
        <ProgressBar progress={progress} />

        <BiggerText style={styles.question}>{question}</BiggerText>

        <View style={styles.fullSize}></View>

        <TextButton style={styles.continueButton}>{ t("button_continue") }</TextButton>
    </SafeAreaView>

}

const ProgressBar = ({progress}: {
    progress: number
}) => {
    const progressStyles = StyleSheet.create({
        bar: {
            width: "100%",
            backgroundColor: themeColors.LIGHT,
            height: themeDimensions.PROGRESSBAR_HEIGHT,
            borderRadius: themeDimensions.BORDER_RADIUS_PROGRESS,
            marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM
        },
        progress: {
            backgroundColor: themeColors.PRIMARY,
            height: "100%",
            borderRadius: themeDimensions.BORDER_RADIUS_PROGRESS,
        }
    })

    let progressPercentage = 0
    if(progress >= 0 && progress <= 1)
        progressPercentage = Math.floor(progress*100)
    
    const progressWidth = progressPercentage + "%"

    return <View style={progressStyles.bar}>
        <View style={[progressStyles.progress, {width: progressWidth}]}></View>
    </View>
}