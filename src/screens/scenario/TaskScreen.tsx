import React, { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {ActivityIndicator, Image, Keyboard, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
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
import { ScenarioTaskEasyText } from "./tasks/SimpleInfoText";
import { Scenario } from "../../model/ui/Scenario";
import { TaskGroup } from "../../model/ui/TaskGroup";
import { TaskGroupElement } from "../../model/ui/TaskGroupElement";
import { Task } from "../../model/ui/Task";
import { InfoText } from "../../model/ui/InfoText";

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


/*const taskOrderImage = {
    question: "Ordne richtig. Aktuell wird dieser Aufgabentyp NICHT unterstützt.",
    type: "order_image",
    possible_answers: [
        {answer: "https://scenario.laknet.de/storage/2023/01/26/536798e84e84cbb3984f104475b42e80f185a8d8.png", order: 1},
        {answer: "https://scenario.laknet.de/storage/2023/01/26/b81aa670a2a0aa8c0aadbe5a464d1979edc633fe.png", order: 2},
        {answer: "https://scenario.laknet.de/storage/2023/01/26/eea1c439f884f60420eb563ac13d3b28506d9c89.png", order: 3},
        {answer: "https://scenario.laknet.de/storage/2023/01/26/0a9609bc8b9543ef49991106dece62f121ae83f3.png", order: -1},
    ]
}*/

export const ScenarioTaskScreen = ({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'ScenarioTask'>) => {
    const { scenarioId, taskGroupIndex, taskIndex, passedTime, penaltySeconds } = route.params

    const [progress, setProgress] = useState<number>(0)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [task, setTask] = useState<TaskGroupElement>()
    const [scenario, setScenario] = useState<Scenario>()
    const [taskGroup, setTaskGroup] = useState<TaskGroup>()
    const [lastTaskGroup, setLastTaskGroup] = useState<boolean>(false)
    const [lastTask, setLastTask] = useState<boolean>(false)
    const [time, setTime] = useState<number>(passedTime)

    const minutes = String(Math.floor(time / 60)).padStart(2, '0')
    const seconds = String(time % 60).padStart(2, '0')

    // TODO: make dynamic?
    const penaltySecondsPerMistake = 15

    const { t } = useTranslation()
    const [solve, setSolve] = useState(false)
    const taskRef = useRef<ScenarioTaskRef>(null)
    const correct = taskRef?.current?.isCorrect()
    const correctAnswer = taskRef?.current?.getCorrectAnswer()
    const [inactive, setInactive] = useState(false)

    useEffect(() => {
        let interval = 0;
        getScenario(scenarioId)

    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            // Only count time if task is not an info text or speech bubble and if task is not solved.
            if (!solve && task?.type && task?.type !== "info_text" && task?.type !== "speech_bubble") {
                setTime(time => time + 1)
            }
        }, 1000);
        return () => clearInterval(interval);

    }, [task, time, solve])

    useEffect(() => {
        if (correct !== undefined && !correct) {
            setTime(time => time + penaltySecondsPerMistake)
        }
    }, [solve])


    const getScenario = async (scenarioId: string) => {
        const scenarioLocal = await Scenario.load(scenarioId)
        setScenario(scenarioLocal)
        const taskGroupLocal = await scenarioLocal.getTaskGroup(taskGroupIndex)
        setTaskGroup(taskGroupLocal)
        const taskLocal = taskGroupLocal.taskGroupElements[taskIndex];
        setTask(taskLocal)
        let progressLocal = taskGroupIndex / scenarioLocal.taskGroupCount + taskIndex / (scenarioLocal.taskGroupCount * taskGroupLocal.taskGroupElements.length)
        const lastTaskGroupLocal = taskGroupIndex === scenarioLocal.taskGroupCount - 1;
        const lastTaskLocal = taskIndex === taskGroupLocal.taskGroupElements.length - 1;
        if (lastTaskLocal && lastTaskGroupLocal) {
            progressLocal = 1
        }
        setProgress(progressLocal)
        setLastTaskGroup(lastTaskGroupLocal)
        setLastTask(lastTaskLocal)
        setLoading(false);
    }

    const onCloseScenario = useCallback(() => {
        navigation.goBack()
    }, [])
    const onContinue = useCallback(async () => {
        if (solve && taskRef.current?.getCurrentAnswer() !== undefined && correct !== undefined) {
            await ((task as Task)?.saveAnswer(taskRef.current?.getCurrentAnswer(), correct))
        }
        if (solve || ["info_text", "speech_bubble"].includes(task?.type || "")) {
            const totalPenaltySeconds = penaltySeconds + (correct === undefined || correct? 0:1) * penaltySecondsPerMistake
            if (lastTask && lastTaskGroup) {
                navigation.replace("ScenarioSuccess", { scenarioId: scenarioId, passedTime: time, penaltySeconds: totalPenaltySeconds })
            } else if (lastTask) {
                navigation.replace("ScenarioTask", { scenarioId: scenarioId, taskGroupIndex: taskGroupIndex + 1, taskIndex: 0, passedTime: time, penaltySeconds: totalPenaltySeconds })
            }
            else {
                navigation.replace("ScenarioTask", { scenarioId: scenarioId, taskGroupIndex: taskGroupIndex, taskIndex: taskIndex + 1, passedTime: time, penaltySeconds: totalPenaltySeconds })
            }
            return
        }
        setSolve(!solve)
    }, [navigation, solve, lastTask, task, time])

    // --- START RENDERING ---
    if (isLoading) {
        return <View><ActivityIndicator /></View>
    }

    // 1) for simple texts there is a completely different layout
    if (task?.type == "speech_bubble") {
        return <ScenarioTaskEasyText
            title={task?.title}
            body={task?.text}
            onContinue={onContinue} />
    }
    // 2) default rendering for everything else
    return <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={[globalStyles.container, styles.fullSize]}>
        <View style={styles.header}>
            <Label style={styles.headerTime}>{minutes}:{seconds}</Label>
            <TouchableOpacity onPress={onCloseScenario}>
                <Image style={styles.close} source={require("../../../assets/images/actions/action_close.png")} />
            </TouchableOpacity>
        </View>
        <ProgressBar progress={progress} />

        {task?.hasOwnProperty('question') && <BiggerText style={styles.question}>{task.question}</BiggerText>}

        <View style={styles.fullSize}>
            <AbstractTask
                task={task}
                ref={taskRef}
                solve={solve}
                setEmpty={setInactive} />
        </View>

        <View style={styles.footer}>
            {solve && <H1 bold style={[styles.resultTitle, correct ? styles.correct : styles.wrong]}>
                {correct ? t("screen_task_correct") : t("screen_task_wrong")}
            </H1>}
            {solve && !correct && correctAnswer && <BiggerText style={styles.wrong}>
                {t("screen_task_answer", { answer: correctAnswer })}
            </BiggerText>}

            <TextButton
                onPress={onContinue}
                disabled={inactive}
                style={[styles.continueButton, inactive && styles.inactiveButton, solve && {
                    backgroundColor: correct ? themeColors.CORRECT : themeColors.WRONG
                }]}>{t("button_continue")}</TextButton>

                <BiggerText bold style={[styles.hidden, solve && !correct && styles.wrong, styles.negativeTime]}>
                    {t("screen_task_negative", { seconds: penaltySecondsPerMistake })}
                </BiggerText>
            </View>
        </SafeAreaView>
    </TouchableWithoutFeedback>
}

type AbstractTaskType = {
    solve?: boolean,
    task: TaskGroupElement,
    setEmpty: (empty: boolean) => void
}

const AbstractTask = React.forwardRef<ScenarioTaskRef, AbstractTaskType>(({ solve = false, task, setEmpty }, taskRef) => {
    const commonProps = {
        ref: taskRef,
        solve: solve,
        setEmpty: setEmpty
    }

    switch (task.type) {
        case "order_text": return <DragDropTask
            {...commonProps}
            solution={(task as Task).getOrderSolution()}
            words={(task as Task).getOrderAnswers()} />
        case "text": return <TextualTask
            {...commonProps}
            solution={(task as Task).correctAnswer} />
        case "numeric": return <NumericTask
            {...commonProps}
            solution={(task as Task).correctAnswer} />
        case "multiple_choice": return <MultipleChoiceTask
            {...commonProps}
            possible_answers={(task as Task).possibleAnswers} />
        case "multiple_choice_image": return <MultipleChoiceImageTask
            {...commonProps}
            possible_answers={(task as Task).possibleAnswers}
        />
        case "info_text": return <View style={styles.htmlView}>
            <Label style={styles.infoLabel}><Trans i18nKey="screen_task_info" /></Label>
            <ScenarioTaskHTML
                body={(task as InfoText).body}
                title={(task as InfoText).title} />
        </View>
        default: return <View />
    }
})