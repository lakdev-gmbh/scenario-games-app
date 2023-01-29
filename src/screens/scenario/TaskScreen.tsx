import React, { Fragment, useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, View } from "react-native";
import { BiggerText, DefaultText, H1, Label } from "../../components/global/Text";
import { globalStyles } from "../../../assets/styles/global";
import { TouchableOpacity } from "react-native-gesture-handler";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { TextButton } from "../../components/global/Button";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { ProgressBar } from "./tasks/ProgressBarComponent";
import { DragDropTask, ScenarioTaskRef } from "./tasks/DragDropComponent";
import themeFontSizes from "../../../assets/styles/theme.fontSizes";
import themeColors from "../../../assets/styles/theme.colors";
import { TextualTask } from "./tasks/TextualComponent";
import { MultipleChoiceTask } from "./tasks/MultipleChoiceComponent";

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
        marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        marginBottom: themeDimensions.MARGIN_VERTICAL_SMALL
    },
    footer: {
        marginBottom: themeDimensions.MARGIN_VERTICAL_SMALL
    },
    resultTitle: {
        fontSize: themeFontSizes.BIG
    },
    wrong: {
        color: themeColors.WRONG
    },
    correct: {
        color: themeColors.CORRECT
    },
    negativeTime: {
        textAlign: 'right',
    },
    hidden: {
        color: 'transparent'
    }
})

export const ScenarioTaskScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
    const question = "Wie lauten die ersten 6 Wörter des deutschen Textes der Europahymne?"
    const progress = 2/3
    const taskDrag = {
        type: "drag_drop", // TODO: what is the correct key?
        words: ["Freude", "Länder", "schöner", "aus", "Freiheit", "Einigkeit", "und", "Götterfunken", "Tochter", "Elysium"],
        solution: ["Freude", "schöner", "Götterfunken", "Tochter", "aus", "Elysium"]
    }
    const task = {
        type: "text",
        correct_answer: "Hallo"
    }
    const taskMC = {
        type: "multiple_choice",
        possible_answers: [
            {answer: "Alle 2 Jahre", is_correct: false},
            {answer: "Alle 4 Jahre", is_correct: false},
            {answer: "Alle 5 Jahre", is_correct: true},
            {answer: "Alle 8 Jahre", is_correct: false},
        ]
    }

    // TODO: create timer in seconds?
    const time = 130
    const minutes = Math.floor(time/60)
    const seconds = time % 60

    // TODO: make dynamic?
    const negativeSeconds = 15

    const {t} = useTranslation()
    const [solve, setSolve] = useState(false)
    const taskRef = useRef<ScenarioTaskRef>(null)
    const correct = taskRef?.current?.isCorrect()
    const correctAnswer = taskRef?.current?.getCorrectAnswer()

    const onCloseScenario = useCallback(() => {
        navigation.goBack()
    }, [])
    const onContinue = useCallback(() => {
        // TODO: continue task here is solve = true
        setSolve(!solve)
        // TODO: save answer, negative seconds etc.
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
            <AbstractTask 
                task={taskMC}
                ref={taskRef}
                solve={solve} />
        </View>

        <View style={styles.footer}>
            {solve && <H1 bold style={[styles.resultTitle, correct ? styles.correct : styles.wrong]}>
                {correct ? t("screen_task_correct") : t("screen_task_wrong")}
            </H1> }
            {solve && !correct && correctAnswer && <BiggerText style={styles.wrong}>
                {t("screen_task_answer", {answer: correctAnswer})}
            </BiggerText>}

            <TextButton 
                onPress={onContinue}
                style={[styles.continueButton, solve && {
                    backgroundColor: correct ? themeColors.CORRECT : themeColors.WRONG
                }]}>{ t("button_continue") }</TextButton>

            <BiggerText bold style={[styles.hidden, solve && !correct && styles.wrong, styles.negativeTime]}>
                {t("screen_task_negative", {seconds: negativeSeconds})}
            </BiggerText>
        </View>

    </SafeAreaView>

}

type AbstractTaskType = {
    solve?: boolean,
    task: any,
}

const AbstractTask = React.forwardRef<ScenarioTaskRef, AbstractTaskType>(({solve = false, task}, taskRef) => {
    switch(task.type) {
        case "drag_drop": return <DragDropTask 
            ref={taskRef}
            solve={solve}
            solution={task.solution}
            words={task.words} />
        case "text": return <TextualTask
            ref={taskRef}
            solve={solve}
            solution={task.correct_answer} />
        case "multiple_choice": return <MultipleChoiceTask
            ref={taskRef}
            solve={solve}
            possible_answers={task.possible_answers} />
        default: return <View />
    }   
})