import React, { useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import themeColors from "../../../../assets/styles/theme.colors";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import { BiggerText } from "../../../components/global/Text";
import { ScenarioTaskRef } from "./DragDropComponent";

export type AnswerType = {
    answer: string;
    is_correct: boolean;
}

export type MultipleChoiceType = {
    solve?: boolean;
    setEmpty: (empty: boolean) => void;
    possible_answers: [AnswerType];
}

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
    answerIndex: {
        marginEnd: 24,
    },
    answerText: {
        color: themeColors.GREY,
    }
})

export const MultipleChoiceTask = React.forwardRef<ScenarioTaskRef, MultipleChoiceType>(({solve = false, possible_answers, setEmpty}, ref) => {
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
    }), [possible_answers, selectedAnswers])

    useEffect(() => {
        setEmpty && setEmpty(selectedAnswers.every(answer => !answer))
    }, [selectedAnswers])

    const handleChange = (answerIndex: number) => {
        let answers = [...selectedAnswers];
        answers[answerIndex] = !answers[answerIndex];
        setSelectedAnswers(answers);
    }

    return <View>
        {possible_answers.map((possibleAnswer, index) =>
            <TouchableOpacity 
            style={[styles.answerContainer,
                selectedAnswers[index] && styles.selectedContainer,
                solve && possibleAnswer.is_correct && styles.correctContainer,
                solve && !possibleAnswer.is_correct && selectedAnswers[index] && styles.wrongContainer,]}
            key={index} 
            disabled={solve}
            onPress={() => { handleChange(index) }}>
                <BiggerText bold style={[styles.answerText, styles.answerIndex, 
                    (selectedAnswers[index] || (solve && possibleAnswer.is_correct)) && {color: themeColors.TEXT_ON_PRIMARY}]}>
                    { index+1 }
                </BiggerText>
                <BiggerText bold style={[styles.answerText,, 
                    (selectedAnswers[index] || (solve && possibleAnswer.is_correct)) && {color: themeColors.TEXT_ON_PRIMARY}]}>
                    {possibleAnswer.answer}
                </BiggerText>
            </TouchableOpacity>
        )}
    </View>
})