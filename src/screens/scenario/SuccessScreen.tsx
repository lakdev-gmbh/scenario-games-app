import React, { Fragment, useCallback, useMemo, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Image, ImageBackground, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../../assets/styles/global";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import themeFontSizes from "../../../assets/styles/theme.fontSizes";
import { TextButton } from "../../components/global/Button";
import { DefaultText, H1 } from "../../components/global/Text";
import { ResultsQuestionSummary } from "../../components/results/QuestionSummary";
import BottomSheet, { BottomSheetFlatList, BottomSheetFooter } from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
    fullSize: {
        flex: 1
    },
    container: {
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED
    },
    speechContainer: {
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
        borderBottomStartRadius: themeDimensions.BORDER_RADIUS_BAR,
        borderBottomEndRadius: themeDimensions.BORDER_RADIUS_BAR,
    },
    speechTitle: {
        textAlign: 'center',
        marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        marginBottom: themeDimensions.MARGIN_VERTICAL_MEDIUM
    },
    speechBottom: {
        color: themeColors.PRIMARY,
        textAlign: 'center',
        fontSize: themeFontSizes.BIG,
        marginVertical: themeDimensions.MARGIN_VERTICAL_BIG,
        paddingHorizontal: 30,
    },
    resultText: {
        fontSize: themeFontSizes.H3,
        textAlign: 'center',
        flex: 1,
        paddingVertical: 12,
    },
    results: {
        flexDirection: 'row'
    },
    borderRight: {
        borderRightWidth: themeDimensions.LIST_ITEM_BORDER_WIDTH,
        borderRightColor: themeColors.BORDER,
        marginVertical: 4,
    },
    owl: {
        width: "100%",
        height: 145,
        resizeMode: "contain",
        marginTop: themeDimensions.MARGIN_VERTICAL_MEDIUM,
        marginBottom: themeDimensions.MARGIN_VERTICAL_BIG,
    },
    trianglePosition: {
        left: '60%',
    },
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 60,
        borderTopWidth: 60,
        borderRightColor: "transparent",
        borderTopColor: themeColors.BACKGROUND_HIGHLIGHTED,
        marginTop: -10,
        transform: [{ rotate: "-8deg" }],
      },
      star: {
        position: "absolute", 
        height: 35, 
        width: 35,
      },
      overview: {
        backgroundColor: themeColors.BACKGROUND,
        borderTopStartRadius: themeDimensions.BORDER_RADIUS_BAR,
        borderTopEndRadius: themeDimensions.BORDER_RADIUS_BAR,
      },
      overViewTitle: {
        marginVertical: themeDimensions.MARGIN_VERTICAL_MEDIUM,
      },
      bottomContainer: {
        paddingVertical: themeDimensions.MARGIN_VERTICAL_BIG,
        backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED,
      }
})
export const ScenarioSuccessScreen = () => {
    const { t } = useTranslation()

    // TODO: add real data
    const questionData = ["index-1", "index-2","index-3","index-4"]
    const correctShare = 1
    const negativeSeconds = 15
    const totalTime = 320
    const streak = undefined // TODO
    const averageTime = undefined // TODO
    
    // calculate or format data
    const correctPercentage = (correctShare * 100)
    const totalTimeMinutes = Math.floor(totalTime / 60)
    const totalTimeSeconds = totalTime % 60
    const owlAssets = calculateOwl(correctShare, totalTime, streak, averageTime)

    // Bottom Sheet
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%', '90%'], []);

    const renderQuestion = useCallback(({item}:
         {item: any}) => (
            <ResultsQuestionSummary />
    ), [])

    const hasBackground = streak && streak > 1
    const footer = <View style={[globalStyles.container, styles.bottomContainer]}>
        <TextButton>{ t("button_next_scenario") }</TextButton>
    </View>

    const screenContent = <View style={styles.fullSize}>
        <View style={[globalStyles.container, styles.speechContainer]}>
                <DefaultText bold style={styles.speechTitle}>{ t("screen_success") }</DefaultText>
                <View style={[styles.results, globalStyles.borderTop, globalStyles.borderBottom]}>
                    <DefaultText style={styles.resultText}>
                        <Trans i18nKey="screen_success_correct" values={{percentage: correctPercentage}} />
                    </DefaultText>
                    <View style={styles.borderRight}></View>
                    <DefaultText style={styles.resultText}>
                        <Trans i18nKey="screen_success_negative" values={{seconds: negativeSeconds}} />
                    </DefaultText>
                </View>
                <View style={styles.results}>
                    <DefaultText style={styles.resultText}>
                        <Trans i18nKey="screen_success_time" values={{minutes: totalTimeMinutes, seconds: totalTimeSeconds}} />
                    </DefaultText>
                </View>

                <H1 bold style={styles.speechBottom}>
                    <Trans i18nKey={owlAssets.key} values={{streak: streak}} />
                </H1>
            </View>

            <TriangleCorner style={styles.trianglePosition} />

            <View>
                <Stars count={owlAssets.starCount} />
                <Image
                    style={styles.owl}
                    source={owlAssets.owl} />
            </View>

            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={styles.overview}
                footerComponent={({animatedFooterPosition}) => <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
                    {footer}
                </BottomSheetFooter>}>
                    <H1 style={[styles.overViewTitle,globalStyles.container]} bold>{ t("screen_success_overview") }</H1>
                <BottomSheetFlatList
                    style={globalStyles.container}
                    data={questionData}
                    keyExtractor={(i) => i}
                    alwaysBounceVertical={false}
                    renderItem={renderQuestion}
                />
            </BottomSheet>
    </View>

    return <SafeAreaView style={[styles.fullSize, styles.container]}>
        <LinearGradient
            style={styles.fullSize}
            colors={[themeColors.BACKGROUND_GRADIENT_ONE, themeColors.BACKGROUND_GRADIENT_TWO, themeColors.BACKGROUND_GRADIENT_THREE]}
            locations={[0.0625, 0.5417, 0.9271]}>
            
            {hasBackground ? <ImageBackground
                style={styles.fullSize}
             source={require('../../../assets/images/owls/background_for_owl.png')}>
                 {screenContent} 
            </ImageBackground>  : screenContent}

        </LinearGradient>
    </SafeAreaView>
}

const calculateOwl = (
    // percentage of correct answers
    correct: number,
    // needed time in seconds to complete the scenario
    totalTime: number,
    // current streak amount, if exists
    streak?: number,
    // average time in seconds of other users to complete this scenario
    averageTime?: number,
) => {    
    const isFast = averageTime && averageTime > totalTime

    const owlAssets = "../../../assets/images/owls/"
    let starCount = 0;
    let key, owl;
    if(correct <= 0.3) {
        key = "screen_success_message_bad_1"
        owl = require(owlAssets + "owl_1.png")
    } else if(correct <= 0.5) {
        key = "screen_success_message_bad_2"
        owl = require(owlAssets + "owl_1.png")
    } else if(correct <= 0.6) {
        key = "screen_success_message_okay"
        owl = require(owlAssets + "owl_okay.png")
    } else if(correct <= 0.75) {
        key = "screen_success_message_good"
        owl = require(owlAssets + "owl_good.png")
    } else if (correct < 1) {
        key = isFast ? "screen_success_message_fast" : "screen_success_message_very_good"
        owl = require(owlAssets + "owl_good.png")
    } else if(streak && streak > 1) {
        starCount = 5;
        owl = require(owlAssets + "owl_super.png")
        key = "screen_success_message_streak"
    } else {
        starCount = 7;
        key = isFast ? "screen_success_message_complete_fast" : "screen_success_message_complete"
        owl = require(owlAssets + "owl_okay.png")
    }

    return {
        key,
        owl,
        starCount
    }
}

const Stars = ({count}: {count: number}) => {
    const positions = [
        {top: -35, left: 80},
        {top: 0, left: 20},
        {top: 10, right: 40},
        {top: -25, right: 80},
        {top: 35, right: 90},
        {top: 80, left: 100},
        {top: 40, left: 60},
    ]
    
    const starCount = Math.min(positions.length, count)

    return <Fragment>
        {[...Array(starCount).keys()]
            .map((i) => <Star style={positions[i]} />)}
    </Fragment>
}

const Star = ({style}: {
    style?: StyleProp<ImageStyle>;
}) => {
    return <Image 
        source={require("../../../assets/images/icons/star_white.png")}
        style={[styles.star, style]} />
}

const TriangleCorner = ({style}: {
    style?: StyleProp<ViewStyle>;
}) => {
    return <View style={[styles.triangleCorner, style]} />;
};