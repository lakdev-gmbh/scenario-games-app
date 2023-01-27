import React from "react";
import { Trans } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { DefaultText, Label } from "../global/Text";

const QUESTION_PADDING = themeDimensions.MARGIN_VERTICAL_MEDIUM
const RESULT_ICON_WIDTH = 16

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: themeDimensions.MARGIN_VERTICAL_SMALL,
        marginBottom: themeDimensions.MARGIN_VERTICAL_SMALL
    },
    questionTitle: {
        paddingEnd: QUESTION_PADDING,
    },
    questionContainer: {
        marginTop: themeDimensions.MARGIN_VERTICAL_SMALL
    },
    tickImage: {
        height: RESULT_ICON_WIDTH, 
        width: RESULT_ICON_WIDTH,
        resizeMode: 'contain',
        // calculate position based on needed padding and size of image
        position: 'absolute',
        marginLeft: -(QUESTION_PADDING + RESULT_ICON_WIDTH), 
    },
    correct: {
        color: themeColors.CORRECT,
    },
    wrong: {
        color: themeColors.WRONG,
        marginBottom: themeDimensions.MARGIN_VERTICAL_SMALL
    }
})

export const ResultsQuestionSummary = () => {
    // TODO: use real data
    const correct = false
    const questionTitle = "Frage 1"
    const questionText = "Vor den Messungen benötigen wir einige Informationen von Ihnen, um die Messungen auf Plausibilität zu prüfen?"
    const answeredText = '13 Länder'
    const correctAnswer = "14 Länder"

    // set assets
    const wrongIcon = require("../../../assets/images/icons/icon_wrong.png")
    const correctIcon = require("../../../assets/images/icons/icon_correct.png")
    const resultIcon = correct ? correctIcon : wrongIcon

    return <View style={[globalStyles.borderBottom, styles.container]}>
    <View style={{flexDirection: 'row'}}>
        <DefaultText style={styles.questionTitle} bold>{ questionTitle }</DefaultText>
        <View style={{flex: 1}}>
            <Label>
                { questionText }
            </Label>
            <View style={styles.questionContainer}>
                <Image style={styles.tickImage} 
                    source={resultIcon} />
                <Label style={correct ? styles.correct : styles.wrong}>
                    { answeredText }
                </Label>
                {!correct && <Label style={styles.correct}>
                    <Trans i18nKey="question_correct_answer" values={{answer: correctAnswer}}></Trans>
                </Label>}
            </View>
        </View>
    </View>
</View>
}