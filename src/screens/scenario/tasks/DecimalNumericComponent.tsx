import React, {useEffect, useImperativeHandle, useState} from 'react';
import {StyleSheet, TextInput} from "react-native";
import {globalStyles} from "../../../../assets/styles/global";
import themeColors from "../../../../assets/styles/theme.colors";
import {ScenarioTaskProps, ScenarioTaskRef} from "./DragDropComponent";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../../assets/styles/theme.fontSizes";

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

type TextualProps = ScenarioTaskProps<string>

export const DecimalNumericComponent = React.forwardRef<ScenarioTaskRef, TextualProps>(({solution, solve = false, setEmpty}, ref) => {
    const [currentAnswer, setCurrentAnswer] = useState("")
    const correct = solution == currentAnswer

    const handleChange = (text: string) => {
        // Remove all characters except digits, dots, and commas
        const cleanedText = text.replace(/[^0-9.,]/g, '');

        // Replace dots with commas
        const commaText = cleanedText.replace(/\./g, ',');

        // Limit the number of digits and commas to 3
        const truncatedText = commaText.slice(0, 4).replace(/(.*),.*?,.*?/, '$1');

        // Format the value as xx,x%
        const formattedText = truncatedText.replace(
            /(\d{1,2})(\d{0,1})(\d{0,})/,
            (match, p1, p2, p3) => {
                let result = p1;
                if (p2.length > 0) {
                    result += `,${p2}`;
                }
                if (p3.length > 0) {
                    result += `%`;
                }
                return result;
            }
        );

        // Update the input value
        setCurrentAnswer(formattedText);
    };


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
        onChangeText={handleChange}
        keyboardType="decimal-pad"
    />
})
