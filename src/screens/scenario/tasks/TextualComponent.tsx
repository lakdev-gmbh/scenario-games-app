import React, { useImperativeHandle, useState } from "react";
import { ScenarioTaskRef } from "./DragDropComponent";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { globalStyles } from "../../../../assets/styles/global";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../../assets/styles/theme.fontSizes";
import themeColors from "../../../../assets/styles/theme.colors";

const styles = StyleSheet.create({
    input: {
        marginTop: 80,
        paddingBottom: themeDimensions.MARGIN_VERTICAL_SMALL,
        fontSize: themeFontSizes.DEFAULT
    }
})

type TextualProps = {
    solution: string;
    solve?: boolean;
}

export const TextualTask = React.forwardRef<ScenarioTaskRef, TextualProps>(({solution, solve = false}, ref) => {
    const [currentAnswer, setCurrentAnswer] = useState("")
    const correct = solution == currentAnswer

    useImperativeHandle(ref, () => ({
        isCorrect: () => {
            return correct
        },
        getCorrectAnswer: () => {
            return solution
        }
    }))

    return <TextInput
        style={[globalStyles.borderBottom, styles.input, solve && {
            color: correct ? themeColors.CORRECT : themeColors.WRONG
        }]}
        autoFocus
        editable={!solve}
        value={currentAnswer} 
        onChangeText={setCurrentAnswer} />
})