import React, { useEffect, useImperativeHandle, useState } from "react";
import { ScenarioTaskProps, ScenarioTaskRef } from "./DragDropComponent";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from "../../../../assets/styles/global";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../../assets/styles/theme.fontSizes";
import themeColors from "../../../../assets/styles/theme.colors";

const styles = StyleSheet.create({
    input: {
        marginTop: themeDimensions.MARGIN_TASK_INPUT,
        paddingBottom: themeDimensions.MARGIN_VERTICAL_SMALL,
        fontSize: themeFontSizes.DEFAULT
    }
})

type TextualProps = ScenarioTaskProps<string>

export const TextualTask = React.forwardRef<ScenarioTaskRef, TextualProps>(({solution, solve = false, setEmpty}, ref) => {
    const [currentAnswer, setCurrentAnswer] = useState("")
    const correct = solution == currentAnswer

    useImperativeHandle(ref, () => ({
        isCorrect: () => {
            return correct
        },
        getCorrectAnswer: () => {
            return solution
        },
        getCurrentAnswer: () => {
            return currentAnswer
        }
    }), [solution, currentAnswer])

    useEffect(() => {
        setEmpty && setEmpty(currentAnswer == "")
    }, [currentAnswer])

    return <TextInput
        style={[globalStyles.borderBottom, styles.input, solve && {
            color: correct ? themeColors.CORRECT : themeColors.WRONG
        }]}
        autoFocus
        editable={!solve}
        value={currentAnswer} 
        onChangeText={setCurrentAnswer} />
})