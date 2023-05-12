import React, { useEffect, useImperativeHandle, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import themeColors from "../../../../assets/styles/theme.colors";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../../assets/styles/theme.fontSizes";
import { ScenarioTaskProps, ScenarioTaskRef } from "./DragDropComponent";

type NumericProps = ScenarioTaskProps<number>

const styles = StyleSheet.create({
    input: {
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
        width: 150,
        alignSelf: 'center',
        padding: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: themeFontSizes.H3,
        marginTop: themeDimensions.MARGIN_TASK_INPUT,
        borderRadius: themeDimensions.BORDER_RADIUS_TAG,
    }
})

export const NumericTask = React.forwardRef<ScenarioTaskRef, NumericProps>(({solution, solve, setEmpty}, ref) => {
    const [currentAnswer, setCurrentAnswer] = useState("")
    const correct = solution.toString() == currentAnswer

    useImperativeHandle(ref, () => ({
        isCorrect: () => {
            return correct
        },
        getCorrectAnswer: () => {
            return solution.toString()
        },
        getCurrentAnswer: () => {
            return currentAnswer
        }
    }), [solution, currentAnswer])

    useEffect(() => {
        setEmpty && setEmpty(currentAnswer == "")
    }, [currentAnswer])

    return <TextInput
        style={[styles.input, solve && {
            color: correct ? themeColors.CORRECT : themeColors.WRONG
        }]}
        autoFocus
        editable={!solve}
        value={currentAnswer}
        onChangeText={setCurrentAnswer}
        keyboardType="numeric"
    />
})