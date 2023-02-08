import React, { useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import themeColors from "../../../../assets/styles/theme.colors";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import { BiggerText, Label } from "../../../components/global/Text";
import { ScenarioTaskRef } from "./DragDropComponent";
import { MultipleChoiceType } from "./MultipleChoiceComponent";

const styles = StyleSheet.create({
    answerContainer: {
        flex: 1,
        margin: themeDimensions.MARGIN_VERTICAL_SMALL/2,
        borderRadius: themeDimensions.BORDER_RADIUS_TAG,
        borderColor: "transparent",
        borderWidth: 7,
    },
    selectedContainer: {
        borderColor: themeColors.SECONDARY,
    },
    correctContainer: {
        borderColor: themeColors.CORRECT,
    },
    wrongContainer: {
        borderColor: themeColors.WRONG,
    },
    answerIndex: {
        marginEnd: 24,
        position: "absolute",
        zIndex: 100,
        backgroundColor: "white",
        top: 2,
        left: 2,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 8,
        overflow: 'hidden',
    },
})

export const MultipleChoiceImageTask = React.forwardRef<ScenarioTaskRef, MultipleChoiceType>(({solve = false, possible_answers, setEmpty}, ref) => {
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
            return selectedAnswers.map((answer, index) => answer ? index+1 : -1).filter(el => el != -1).map((el) => 
                    t("screen_task_mc_answer", {index: (el)})
                )
                .join(", ")
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

    return <FlatList
        alwaysBounceVertical={false}
        data={possible_answers}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        renderItem={(item) => {
            const possibleAnswer = item.item
            const index = item.index

            return <TouchableOpacity 
            style={[styles.answerContainer,
                selectedAnswers[index] && styles.selectedContainer,
                solve && possibleAnswer.is_correct && styles.correctContainer,
                solve && !possibleAnswer.is_correct && selectedAnswers[index] && styles.wrongContainer,]}
            disabled={solve}
            onPress={() => { handleChange(index) }}>
                <Label bold style={[styles.answerIndex]}>
                    { index+1 }
                </Label>
                <Image 
                    style={{width: "100%", height: 100, resizeMode: "cover"}}
                    source={{uri: possibleAnswer.answer}} />
            </TouchableOpacity>
        }} />
})