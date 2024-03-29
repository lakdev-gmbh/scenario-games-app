import DuoDragDrop, { DuoDragDropRef, Word } from "@jamsch/react-native-duo-drag-drop";
import React, {useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {Dimensions, Pressable, StyleSheet, View} from "react-native";
import themeColors from "../../../../assets/styles/theme.colors";
import themeDimensions from "../../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../../assets/styles/theme.fontSizes";
import {ScrollView} from "react-native-gesture-handler";


const { height: phoneHeight} = Dimensions.get("window")

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

export type ScenarioTaskProps<T> = {
    solution: T;
    solve?: boolean;
    setEmpty?: ((empty: boolean) => void);
}

export type ScenarioTaskRef = {
    isCorrect(): boolean;
    getCorrectAnswer(): string;
    getCurrentAnswer(): string;
    isPartiallyCorrect?(): boolean;
}

type DragDropProps = ScenarioTaskProps<Array<string>> & {
    words: Array<string>;
}

export const DragDropTask = React.forwardRef<ScenarioTaskRef, DragDropProps>(({words, solution, solve = false, setEmpty}, ref) => {
    const duoDragDropRef = useRef<DuoDragDropRef>(null);
    const [shuffledWords, setShuffledWords] = useState<string[]>(words);
    const [wordsShuffled, setWordsShuffled] = useState<boolean>(false);
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
        },
        getCurrentAnswer: () => {
            return duoDragDropRef.current?.getAnsweredWords().join(" ") ?? ""
        }
    }))

    const checkEmpty = () => {
        const answeredWords = duoDragDropRef.current?.getAnsweredWords().length ?? 0
        setEmpty && setEmpty(answeredWords == 0)
    }

    useEffect(() => {
        checkEmpty()
        if(!wordsShuffled) {
            setShuffledWords([...words].sort(() => Math.random() - 0.5))
            setWordsShuffled(true)
        }
    }, [])

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

    // Only scrollable if screen height is smaller than 700

    const duoDragDrop = <Pressable>
        <DuoDragDrop
            ref={duoDragDropRef}
            extraData={solve}
            gesturesDisabled={solve}
            renderWord={renderWord}
            wordHeight={phoneHeight >= 700 ? 40 : 32}
            onDrop={checkEmpty}
            words={shuffledWords} />
    </Pressable>

    return (phoneHeight <= 700 ?
            <View style={styles.container}>
                <ScrollView>
                    {duoDragDrop}
                </ScrollView>
            </View>
         :
            <View style={styles.container}>
                {duoDragDrop}
            </View>
    )
})
