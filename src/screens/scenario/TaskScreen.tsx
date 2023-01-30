import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, View } from "react-native";
import { BiggerText, H1, Label } from "../../components/global/Text";
import { globalStyles } from "../../../assets/styles/global";
import { TouchableOpacity } from "react-native-gesture-handler";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { TextButton } from "../../components/global/Button";
import { Trans, useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/types";
import { ProgressBar } from "./tasks/ProgressBarComponent";
import { DragDropTask, ScenarioTaskRef } from "./tasks/DragDropComponent";
import themeFontSizes from "../../../assets/styles/theme.fontSizes";
import themeColors from "../../../assets/styles/theme.colors";
import { TextualTask } from "./tasks/TextualComponent";
import { MultipleChoiceTask } from "./tasks/MultipleChoiceComponent";
import { NumericTask } from "./tasks/NumericComponent";
import { MultipleChoiceImageTask } from "./tasks/MultipleChoiceImageComponent";
import { ScenarioTaskHTML } from "./tasks/HTMLComponent";

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
    inactiveButton: {
        backgroundColor: themeColors.BACKGROUND_INACTIVE
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
    },
    htmlView: {
        marginVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        borderRadius: themeDimensions.BORDER_RADIUS_BAR,
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
        padding: themeDimensions.MARGIN_VERTICAL_MEDIUM,
    },
    infoLabel: {
        color: themeColors.GREY,
        textAlign: 'right',
        textTransform: 'uppercase',
    }
})

export const ScenarioTaskScreen = ({navigation}: NativeStackScreenProps<RootStackParamList>) => {
    const progress = 2/3

    // example tasks
    const taskDrag = {
        question: "Wie lauten die ersten 6 Wörter des deutschen Textes der Europahymne?",
        type: "order_text",
        words: ["Freude", "Länder", "schöner", "aus", "Freiheit", "Einigkeit", "und", "Götterfunken", "Tochter", "Elysium"],
        solution: ["Freude", "schöner", "Götterfunken", "Tochter", "aus", "Elysium"]
    }
    const taskText = {
        question: "Gib Hallo ein.",
        type: "text",
        correct_answer: "Hallo"
    }
    const taskMC = {
        question: "Wie häufig wird gewählt?",
        type: "multiple_choice",
        possible_answers: [
            {answer: "Alle 2 Jahre", is_correct: false},
            {answer: "Alle 4 Jahre", is_correct: false},
            {answer: "Alle 5 Jahre", is_correct: true},
            {answer: "Alle 8 Jahre", is_correct: false},
        ]
    }
    const taskMCImage = {
        question: "Die Flagge von diesem einem Land. Nummer 3 nämlich.",
        type: "multiple_choice_image",
        possible_answers: [
            {answer: "https://scenario.laknet.de/storage/2022/10/05/d972c5b8aad6a627506ddc4b8bbcdf28b55bff9c.png", is_correct: false},
            {answer: "https://scenario.laknet.de/storage/2022/10/05/b6e1ad49861571b74f6c4821d2ac444c4911aab4.png", is_correct: false},
            {answer: "https://scenario.laknet.de/storage/2022/10/05/742c4f16c51ddd22adcdae82205f13038bf352b1.png", is_correct: true},
            {answer: "https://scenario.laknet.de/storage/2022/10/05/d9828ed2b055fcabc8ce2897dca09d32d3361176.png", is_correct: false},
        ]
    }
    /*const taskOrderImage = {
        question: "Ordne richtig. Aktuell wird dieser Aufgabentyp NICHT unterstützt.",
        type: "order_image",
        possible_answers: [
            {answer: "https://scenario.laknet.de/storage/2023/01/26/536798e84e84cbb3984f104475b42e80f185a8d8.png", is_correct: false},
            {answer: "https://scenario.laknet.de/storage/2023/01/26/b81aa670a2a0aa8c0aadbe5a464d1979edc633fe.png", is_correct: false},
            {answer: "https://scenario.laknet.de/storage/2023/01/26/eea1c439f884f60420eb563ac13d3b28506d9c89.png", is_correct: true},
            {answer: "https://scenario.laknet.de/storage/2023/01/26/0a9609bc8b9543ef49991106dece62f121ae83f3.png", is_correct: false},
        ]
    }*/
    const taskNumeric = {
        question: "Wenn du 427 eingibst, dann ist die Lösung richtig. Sonst falsch.",
        type: "numeric",
        correct_answer: 427,
    }
    const infotext = {
        type: 'infotext',
        title: "Sägearten",
        body: "<p>Die Säge ist das Herzstück des gesamten Werks. Hier werden das zuvor angelieferte Rundholz zu hochwertigem Schnittholz verarbeitet.</p><p><br /></p><p>Für verschiedene Produkte, Durchmesser oder Schnittleistung werden unterschiedliche Sägetypen verwendet.</p><p>Beispiele für gebräuchliche Sägen sind:</p><ul><li>Bandsäge</li><li>Gattersäge</li></ul><p>Moderne Sägewerke nutzen auch:</p><ul><li>Zerspaner-Kreissägen-Kombinationen</li><li>Gatter-Kreissägen-Kombination</li></ul><h3>Funktion Bandsäge:</h3><p>Eine Bandsäge ist eine Maschine, deren Werkzeug aus einem zu einem geschlossenen Ring verlöteten Bandsägeblatt besteht. Das Endlosblatt wird über 2 Rollen geführt und angetrieben.</p><h3>Funktion Gattersäge:</h3><p>Eine Gattersäge ist eine zum Rundholzaufschnitt geeignete Maschine, die über ein Schwungrad und einen Flachriemen angetrieben wird. Das Schwungrad bewegt durch eine Pleuelstange einen an Führungen geleiteten Rahmen auf- und abwärts, an den mehrere Sägeblätter eingespannt sind.</p><p>https://commons.wikimedia.org/wiki/File:Puchberg_Gatters%C3%A4ge_in_Sonnleiten.jpg</p><p><img src=\"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Puchberg_Gatters%C3%A4ge_in_Sonnleiten.jpg/800px-Puchberg_Gatters%C3%A4ge_in_Sonnleiten.jpg?20091023091239\" alt=\"File:Puchberg Gattersäge in Sonnleiten.jpg\"></p>"
    }

    const task: any = infotext

    // TODO: create timer in seconds, do not measure time for infotext tasks...
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
    const [inactive, setInactive] = useState(false)

    const onCloseScenario = useCallback(() => {
        navigation.goBack()
    }, [])
    const onContinue = useCallback(() => {
        if(solve || task.type === "infotext") {
            // TODO: continue to next task here 
            return
        }
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

        {task.hasOwnProperty('question') && <BiggerText style={styles.question}>{task.question}</BiggerText>}

        <View style={styles.fullSize}>
            <AbstractTask 
                task={task}
                ref={taskRef}
                solve={solve} 
                setEmpty={setInactive}/>
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
                disabled={inactive}
                style={[styles.continueButton, inactive && styles.inactiveButton, solve && {
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
    setEmpty: (empty: boolean) => void
}

const AbstractTask = React.forwardRef<ScenarioTaskRef, AbstractTaskType>(({solve = false, task, setEmpty}, taskRef) => {
    const commonProps = {
        ref: taskRef,
        solve: solve,
        setEmpty: setEmpty
    }

    switch (task.type) {
        case "order_text": return <DragDropTask
            {...commonProps}
            solution={task.solution}
            words={task.words} />
        case "text": return <TextualTask
            {...commonProps}
            solution={task.correct_answer} />
        case "numeric": return <NumericTask
            {...commonProps}
            solution={task.correct_answer} />
        case "multiple_choice": return <MultipleChoiceTask
            {...commonProps}
            possible_answers={task.possible_answers} />
        case "multiple_choice_image": return <MultipleChoiceImageTask
            {...commonProps}
            possible_answers={task.possible_answers}
        />
        case "infotext": return <View style={styles.htmlView}>
            <Label style={styles.infoLabel}><Trans i18nKey="screen_task_info" /></Label>
            <ScenarioTaskHTML
                body={task.body} 
                title={task.title} />
        </View>
        default: return <View />
    }
})