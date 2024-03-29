import React, { useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import {Dimensions, Pressable, StyleSheet, TouchableOpacity, View} from "react-native";
import themeColors from "../../../../assets/styles/theme.colors";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import { BiggerText } from "../../../components/global/Text";
import { ScenarioTaskRef } from "./DragDropComponent";
import {ScrollView} from "react-native-gesture-handler";

export type AnswerType = {
    answer: string;
    is_correct: boolean;
}

export type MultipleChoiceType = {
    solve?: boolean;
    partially_correct?: boolean;
    setEmpty: (empty: boolean) => void;
    possible_answers: [AnswerType];
}

const { height: phoneHeight} = Dimensions.get("window")

const styles = StyleSheet.create({
    answerContainer: {
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
        flexDirection: 'row',
        paddingVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        paddingHorizontal: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        marginTop: themeDimensions.MARGIN_VERTICAL_SMALL,
        borderRadius: themeDimensions.BORDER_RADIUS_TAG
    },
    selectedContainer: {
        backgroundColor: themeColors.SECONDARY,
    },
    correctContainer: {
        backgroundColor: themeColors.CORRECT,
    },
    wrongContainer: {
        backgroundColor: themeColors.WRONG,
    },
    almostContainer: {
        backgroundColor: themeColors.ALMOST,
    },
    answerIndex: {
        marginEnd: 24,
    },
    answerText: {
        color: themeColors.GREY,
    },
    answer: {
        flex: 1,
    }
})

export const MultipleChoiceTask = React.forwardRef<ScenarioTaskRef, MultipleChoiceType>(({solve = false,partially_correct= false, possible_answers, setEmpty}, ref) => {
    const [selectedAnswers, setSelectedAnswers] = useState<boolean[]>([]);
    const {t} = useTranslation()

    useImperativeHandle(ref, () => ({
        getCorrectAnswer: () => {
            return possible_answers.map((answer, index) => answer.is_correct ? index+1 : -1).filter(el => el != -1).map((el) => 
                    t("screen_task_mc_answer", {index: (el)})
                )
                .join(", ")
        },
        isCorrect: () => {
            return possible_answers
                .map(possibleAnswer => possibleAnswer.is_correct).every((answer, index) => !answer == !selectedAnswers[index]);
        },
        getCurrentAnswer: () => {
            return selectedAnswers.map((answer, index) => answer ? index : -1).filter(el => el != -1).map((el) =>
                    possible_answers[el].answer
                ).join(", ")
        },
        isPartiallyCorrect: () => {
            const amountOfCorrectAnswers = possible_answers.filter((answer) => answer.is_correct).length;
            const selectedWrongAnswers = possible_answers.filter((answer, index) => !answer.is_correct && selectedAnswers[index]).length;
            if(amountOfCorrectAnswers < 2 || selectedWrongAnswers > 0) return false
            //const selectedCorrectAnswers = possible_answers.filter((answer, index) => answer.is_correct && selectedAnswers[index]).length;
            return true
        }

    }), [possible_answers, selectedAnswers])

    useEffect(() => {
        setEmpty && setEmpty(selectedAnswers.every(answer => !answer))
    }, [selectedAnswers])

    const handleChange = (answerIndex: number) => {
        let answers = [...selectedAnswers];
        answers[answerIndex] = !answers[answerIndex];
        setSelectedAnswers(answers);
    }

    const multipleChoiceAnswers = possible_answers.map((possibleAnswer, index) => {
        return <Pressable key={index}>
            <TouchableOpacity
                style={[styles.answerContainer,
                    selectedAnswers[index] && styles.selectedContainer,
                    solve && possibleAnswer.is_correct && styles.correctContainer,
                    solve && !possibleAnswer.is_correct && selectedAnswers[index] && styles.wrongContainer,
                    solve && possibleAnswer.is_correct && partially_correct && !selectedAnswers[index] && styles.almostContainer,
                ]}
                key={index}
                disabled={solve}
                onPress={() => {
                    handleChange(index)
                }}>
                <BiggerText bold style={[styles.answerText, styles.answerIndex,
                    (selectedAnswers[index] || (solve && possibleAnswer.is_correct)) && {color: themeColors.TEXT_ON_PRIMARY}]}>
                    {index + 1}
                </BiggerText>
                <BiggerText bold style={[styles.answerText, styles.answer,
                    (selectedAnswers[index] || (solve && possibleAnswer.is_correct)) && {color: themeColors.TEXT_ON_PRIMARY}]}>
                    {possibleAnswer.answer}
                </BiggerText>
            </TouchableOpacity>
        </Pressable>
    })

    // Only scrollable if screen height is smaller than 700 OR there are more than 5 answers
    return (phoneHeight <= 700 || possible_answers.length >= 5 ?
        <View>
            <ScrollView>
                {multipleChoiceAnswers}
            </ScrollView>
        </View>
        :
        <View>
            {multipleChoiceAnswers}
        </View>)
})