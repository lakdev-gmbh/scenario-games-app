import DuoDragDrop, { DuoDragDropRef, Word } from "@jamsch/react-native-duo-drag-drop";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";
import themeColors from "../../../../assets/styles/theme.colors";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../../assets/styles/theme.fontSizes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM
    },
    word: {
        color: themeColors.TEXT_ON_PRIMARY,
        fontWeight: '700',
        fontSize: themeFontSizes.DEFAULT,
    },
    wordContainer: {
        backgroundColor: themeColors.SECONDARY,
    },
    correct: {
        backgroundColor: themeColors.CORRECT,
    },
    wrong: {
        backgroundColor: themeColors.WRONG,
    }
})

export type ScenarioTaskRef = {
    isCorrect(): boolean,
    getCorrectAnswer(): string,
}

type DragDropProps = {
    words: Array<string>,
    solution: Array<string>,
    solve?: boolean,
}

export const DragDropTask = React.forwardRef<ScenarioTaskRef, DragDropProps>(({words, solution, solve = false}, ref) => {
    const isCorrect = () => {
        const answeredWords = duoDragDropRef.current?.getAnsweredWords()
        if(answeredWords?.length != solution.length)
            return false
        return answeredWords.every((word, index) => index < solution.length && word === solution[index]) ?? false
    }

    useImperativeHandle(ref, () => ({
        isCorrect: isCorrect,
        getCorrectAnswer: () => {
            return solution.join(" ")
        }
    }))

    const duoDragDropRef = useRef<DuoDragDropRef>(null);

    const renderWord = useCallback((word: string, index: number) => {    
        const answered = duoDragDropRef.current?.getOffsets()
        // check all selected words for correctness
        const answeredPosition = answered ? answered[index] : -1 // get position in selected (-1 if not or nothing selected)
        let check = solve && answeredPosition != -1
        const correct = check && answeredPosition < solution.length && solution[answeredPosition] == word
        // if not completely correct, also check if there are words in the bank left
        if(solve && !isCorrect() && answeredPosition == -1) {
            check = solution.findIndex(solWord => solWord == word) != -1
        }

        return <Word
            containerStyle={[styles.wordContainer, 
                check && correct && styles.correct, 
                check && !correct && styles.wrong]}
            textStyle={styles.word} />
    }, [solution, solve, duoDragDropRef])

    return <View style={styles.container}>
        <DuoDragDrop
        ref={duoDragDropRef}
        extraData={solve}
        gesturesDisabled={solve}
        renderWord={renderWord} 
        wordHeight={40}
        words={words} />
    </View>
})
