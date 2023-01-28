import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { DefaultText } from "../global/Text";

export const TypingText = ({children, animationDuration = 50, growWhileTyping = false, onFinish}: {
    children: string;
    animationDuration?: number;
    onFinish?: () => void;
    growWhileTyping?: boolean;
}) => {
    const [visibleText, setText] = useState("")

    const typingAnimation = (visibleText: string, totalText: string) => {
        if(visibleText.length >= totalText.length)
            return true
        
        const index = visibleText.length
        setText(visibleText + totalText.charAt(index))
        return false
    }

    let typingTimeout = -1
    useEffect(() => {
        clearTimeout(typingTimeout)
        setText("")
    }, [children])

    useEffect(() => {
        typingTimeout = setTimeout(() => {
            const finished = typingAnimation(visibleText, children)
            if(finished && onFinish)
                onFinish()
        }, animationDuration)

        return () => {
            clearTimeout(typingTimeout)
        }
    }, [visibleText])

    const fixedHeight = !growWhileTyping

    return <View>
        <DefaultText style={fixedHeight && {position: "absolute"}}>{visibleText}</DefaultText>
        {fixedHeight && <DefaultText style={{color: 'transparent'}}>{ children }</DefaultText>}
    </View>

}