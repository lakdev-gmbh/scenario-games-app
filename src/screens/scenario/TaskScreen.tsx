import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, View } from "react-native";
import { BiggerText, Label } from "../../components/global/Text";
import { globalStyles } from "../../../assets/styles/global";
import { TouchableOpacity } from "react-native-gesture-handler";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { TextButton } from "../../components/global/Button";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { ProgressBar } from "./tasks/ProgressBarComponent";
import { DragDropTask } from "./tasks/DragDropComponent";

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
        marginVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM,
    },
    continueButton: {
        marginBottom: themeDimensions.MARGIN_VERTICAL_MEDIUM
    }
})

export const ScenarioTaskScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
    const question = "Wie lauten die ersten 6 Wörter des deutschen Textes der Europahymne?"
    const progress = 2/3

    // TODO: create timer in seconds?
    const time = 130
    const minutes = Math.floor(time/60)
    const seconds = time % 60

    const {t} = useTranslation()
    const [solve, setSolve] = useState(false)
    const onCloseScenario = useCallback(() => {
        navigation.goBack()
    }, [])
    const onContinue = useCallback(() => {
        setSolve(!solve)
    }, [solve])


    return <SafeAreaView style={[globalStyles.container, styles.fullSize]}>

        <View style={styles.header}>
            <Label style={styles.headerTime}>{minutes < 10 ? "0" + minutes : minutes}:{seconds}</Label>
            <TouchableOpacity onPress={onCloseScenario}>
                <Image style={styles.close} source={require("../../../assets/images/actions/action_close.png")} />
            </TouchableOpacity>
        </View>
        <ProgressBar progress={progress} />

        <BiggerText style={styles.question}>{question}</BiggerText>

        <View style={styles.fullSize}>
            <DragDropTask 
                solve={solve}
                solution={["Freude", "schöner", "Götterfunken", "Tochter", "aus", "Elysium"]}
                words={["Freude", "Länder", "schöner", "Freiheit", "Einigkeit", "und", "Götterfunken", "Tochter", "aus", "Elysium"]} />
        </View>

        <TextButton 
            onPress={onContinue}
            style={styles.continueButton}>{ t("button_continue") }</TextButton>
    </SafeAreaView>

}

