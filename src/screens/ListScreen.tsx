import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, FlatList, Image, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { globalStyles } from "../../assets/styles/global";
import themeColors from "../../assets/styles/theme.colors";
import themeDimensions from "../../assets/styles/theme.dimensions";
import { FatTag, Tag } from "../components/global/Tag";
import { H1, Label } from "../components/global/Text";
import { Collapsible } from "../components/home/Collapsible";
import { ScenarioItem } from "../components/scenario/ScenarioItem";

const styles = StyleSheet.create({
    fullHeight: {
        flex: 1,
    },
    actionIcon: {
        width: 40,
        height: 30,
        resizeMode: "center",
        marginStart: 4,
    }
})

export const ListScreen = () => {
    const {t} = useTranslation()

    const subjects = [
        {name: 'Mathematik', id: 1},
        {name: 'Mathematik2', id: 2},
        {name: 'Physik', id: 3}
    ]

    const scenarioData = [{subjects, id: "1", title: "EU Scenario Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"}, 
    {subjects, id: "1000", title: "Mehr EU Scenario 137 Biologische Vielfalt Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"},
    {subjects: [{name: 'Biologie'}], id: "1001", title: "Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"},
    {subjects: [{name: 'Biologie'}], id: "1003", title: "Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"},
    {subjects: [{name: 'Biologie'}], id: "1005", title: "Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"},
    {subjects: [{name: 'Biologie'}], id: "1002", title: "Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"}]


    const [fullHeaderHeight, setFullHeaderHeight] = useState(0)
    const scrollY = new Animated.Value(0)
    const maxHeaderHeight = scrollY.interpolate({
        // estimated size of header part (250): must be greater than actual size
        outputRange: [250, 0],
        // make input range a bit smaller to faster shrink the view
        inputRange: [0, 150],
        extrapolate: 'clamp'
    })
    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 150],
        outputRange: [1,0],
        extrapolate: 'clamp',
    })

    return <SafeAreaView style={styles.fullHeight}>
        <View style={
            [{
                backgroundColor: themeColors.BACKGROUND,
            }, styles.fullHeight]
        }>
            <View 
                onLayout={event => {
                        // calculate full height used for padding of the list view
                        const height = event.nativeEvent.layout.height
                        setFullHeaderHeight(height)
                    }
                } 
                style={[globalStyles.container, {
                    position: "absolute",
                    width: "100%",
                    paddingTop: 24,
                    paddingBottom: 14,
                    backgroundColor: "white",
                    shadowOpacity: 0.2,
                    shadowOffset: {width: 10, height: 10},
                    borderBottomEndRadius: themeDimensions.BORDER_RADIUS_BAR,
                    borderBottomStartRadius: themeDimensions.BORDER_RADIUS_BAR,
                    zIndex: 100,
                }]}
                >
                    { /* Fixed (not shrinking) part containing header and icons */ }
                <View style={{flexDirection: "row"}}>
                    <H1 
                        style={{flex: 1}}
                        bold>{ t("screen_list_scenarios") }</H1>
                    <Image
                        style={styles.actionIcon}
                        source={require("../../assets/images/actions/action_users.png")} />
                    <Image
                        style={styles.actionIcon}
                        source={require("../../assets/images/actions/action_info.png")} />
                </View>


                { /* Animated (shrinkable) part */ }
                <Animated.View style={{
                    // animate the view height and opacity on scrolling
                    // use max height, since we do not know real heights
                    maxHeight: maxHeaderHeight,
                    opacity: headerOpacity,
                     // important to hide views when view shrinks
                    overflow: 'hidden',
                }}>
                    <Collapsible 
                        title={t('filter_subjects')}
                        openOnDefault>
                        { subjects.map(subject => 
                            <FatTag key={subject.id} active={false}>{subject.name}</FatTag>)
                        }
                    </Collapsible>

                    <Collapsible
                        title={t('filter_grades')}>
                            { subjects.map(subject => 
                                <FatTag key={subject.id} active={false}>{subject.name}</FatTag>)
                            }
                    </Collapsible>

                    <Collapsible title={t('filter_search')}>
                        <TextInput 
                            placeholder={t("filter_search_placeholder") as string}
                            style={{
                                paddingVertical: 4,
                                paddingHorizontal: 10,
                                flex: 1,
                                marginTop: 8,
                                borderColor: themeColors.BORDER_INPUT, 
                                borderRadius: themeDimensions.BORDER_RADIUS_INPUT,
                                borderWidth: 1}}
                            onChangeText={text => {}}/>
                    </Collapsible>
                </Animated.View>

            </View>
            

            <View style={[globalStyles.container, 
                styles.fullHeight]}>
                <FlatList
                    data={scenarioData}
                    renderItem={({item, index}) => <View 
                        style={[
                            index === 0 && {paddingTop: fullHeaderHeight + 24},
                            index+1 === scenarioData.length && {paddingBottom: 32}
                        ]}>
                            <ScenarioItem scenario={item} />
                        </View>
                    }
                    keyExtractor={item => item.id}
                    onScroll={Animated.event([{
                        nativeEvent: {
                            contentOffset: {
                                y: scrollY
                            }
                        }
                    }], {useNativeDriver: false})}
                    scrollEventThrottle={16}
                />
            </View>
        </View>
    </SafeAreaView>
}