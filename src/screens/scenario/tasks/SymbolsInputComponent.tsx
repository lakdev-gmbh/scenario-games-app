import React, { useEffect, useImperativeHandle, useState} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import {globalStyles} from "../../../../assets/styles/global";
import themeColors from "../../../../assets/styles/theme.colors";
import {ScenarioTaskProps, ScenarioTaskRef} from "./DragDropComponent";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../../assets/styles/theme.fontSizes";

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "black",
        alignSelf: 'center',
        width: 30,
        padding: 5,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: themeFontSizes.H3,
        marginTop: themeDimensions.MARGIN_TASK_INPUT,
    }
})

type TextualProps = ScenarioTaskProps<string>

export const SymbolsInputComponent = React.forwardRef<ScenarioTaskRef, TextualProps>(({solution, solve = false, setEmpty}, ref) => {
    const hintsIndexesArray = [1,2,4]
    const modifiedArray: string[] = solution.split("").map((element, index) => {
        if(hintsIndexesArray.includes(index)) return element
        return ""
    });
    const [currentAnswer, setCurrentAnswer] = useState(modifiedArray)
    const correct = solution == currentAnswer.join("")
    const solutionArray = solution.split("")

    const handleChange = (text: string, index: number) => {
        const newAnswer = [...currentAnswer]
        newAnswer[index] = text
        setCurrentAnswer(newAnswer)
    }

    useImperativeHandle(ref, () => ({
        isCorrect: () => {
            return correct
        },
        getCorrectAnswer: () => {
            return solution
        },
        getCurrentAnswer: () => {
            return currentAnswer.join("")
        }
    }), [solution, currentAnswer])

    useEffect(() => {
        setEmpty && setEmpty(currentAnswer.includes(""));
    }, [currentAnswer])

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
            marginTop: 20,
            marginBottom: 20
        }}>
            {solutionArray.map((symbol, index) => {
                if(hintsIndexesArray.includes(index)) {
                    return <TextInput key={index} maxLength={1} value={symbol} style={[styles.input, solve && {
                        color: correct ? themeColors.CORRECT : themeColors.WRONG
                    }, {
                        borderBottomWidth: 0,
                    }]} />
                }
                return <TextInput maxLength={1} style={[globalStyles.borderBottom, styles.input, solve && {
                    color: correct ? themeColors.CORRECT : themeColors.WRONG
                }]} editable={!solve} key={index} keyboardType={"decimal-pad"} onChangeText={(value) => handleChange(value, index)}/>
            })}
        </View>
    )
})
