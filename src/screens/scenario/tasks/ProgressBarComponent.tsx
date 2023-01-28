import React from "react"
import { StyleSheet, View } from "react-native"
import themeColors from "../../../../assets/styles/theme.colors"
import themeDimensions from "../../../../assets/styles/theme.dimensions"


const progressStyles = StyleSheet.create({
    bar: {
        width: "100%",
        backgroundColor: themeColors.LIGHT,
        height: themeDimensions.PROGRESSBAR_HEIGHT,
        borderRadius: themeDimensions.BORDER_RADIUS_PROGRESS,
        marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM
    },
    progress: {
        backgroundColor: themeColors.PRIMARY,
        height: "100%",
        borderRadius: themeDimensions.BORDER_RADIUS_PROGRESS,
    }
})

export const ProgressBar = ({progress}: {
    progress: number
}) => {
    let progressPercentage = 0
    if(progress >= 0 && progress <= 1)
        progressPercentage = Math.floor(progress*100)
    
    const progressWidth = progressPercentage + "%"

    return <View style={progressStyles.bar}>
        <View style={[progressStyles.progress, {width: progressWidth}]}></View>
    </View>
}