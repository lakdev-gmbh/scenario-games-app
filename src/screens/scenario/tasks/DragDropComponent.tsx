import DuoDragDrop, { DuoDragDropRef, Word } from "@jamsch/react-native-duo-drag-drop";
import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import themeColors from "../../../../assets/styles/theme.colors";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../../assets/styles/theme.fontSizes";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: themeDimensions.MARGIN_VERTICAL_BIG
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

export const DragDropTask = ({words, solution, solve = false}: {
    words: Array<string>,
    solution: Array<string>,
    solve?: boolean,
}) => {
    const duoDragDropRef = useRef<DuoDragDropRef>(null);

    const renderWord = useCallback((word: string, index: number) => {    
        const answered = duoDragDropRef.current?.getOffsets()
        const answeredPosition = answered ? answered[index] : -1 // get position in selected (-1 if not or nothing selected)
        const check = solve && answeredPosition != -1
        const correct = check && answeredPosition < solution.length && solution[answeredPosition] == word

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
}
