import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, FlatList, SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { globalStyles } from "../../assets/styles/global";
import themeColors from "../../assets/styles/theme.colors";
import themeDimensions from "../../assets/styles/theme.dimensions";
import { FatTag} from "../components/global/Tag";
import { Collapsible } from "../components/home/Collapsible";
import { CollapsingToolbar } from "../components/home/CollapsingToolbar";
import { ScenarioItem } from "../components/scenario/ScenarioItem";

const styles = StyleSheet.create({
    fullHeight: {
        flex: 1,
    },
    searchInput: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        flex: 1,
        marginTop: 8,
        borderColor: themeColors.BORDER_INPUT,
        borderRadius: themeDimensions.BORDER_RADIUS_INPUT,
        borderWidth: 1
    }
})

export const ListScreen = () => {
    const {t} = useTranslation()

    const subjects = [
        {name: 'Mathematik', id: 1},
        {name: 'Mathematik2', id: 2},
        {name: 'Physik', id: 3}
    ]

    const classLevels = [
        {name: '7. Klasse', id: 100},
        {name: '8. Klasse', id: 1100},
    ]

    const scenarioData = [{subjects, id: "1", title: "EU Scenario Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"}, 
    {subjects, id: "1000", title: "Mehr EU Scenario 137 Biologische Vielfalt Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"},
    {subjects: [{name: 'Biologie'}], id: "1001", title: "Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"},
    {subjects: [{name: 'Biologie'}], id: "1003", title: "Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"},
    {subjects: [{name: 'Biologie'}], id: "1005", title: "Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"},
    {subjects: [{name: 'Biologie'}], id: "1002", title: "Biologische Vielfalt", "image": "/storage/2022/02/25/c6af290bc45c413d724b7a0a36aaafa9304d378c.png"}]


    const [fullHeaderHeight, setFullHeaderHeight] = useState(0)
    const scrollY = new Animated.Value(0)

    return <SafeAreaView style={[
            {backgroundColor: themeColors.BACKGROUND_HIGHLIGHTED},
            styles.fullHeight]}>

        <View style={
            [{
                backgroundColor: themeColors.BACKGROUND,
            }, styles.fullHeight]
        }>
            <CollapsingToolbar
                scrollY={scrollY}
                onLayout={event => {
                    // calculate full height used for padding of the list view
                    const height = event.nativeEvent.layout.height
                    setFullHeaderHeight(height)
                }}
                title={t('screen_list_scenarios')}>
                <Collapsible
                    title={t('filter_subjects')}
                    openOnDefault>
                    {subjects.map(subject =>
                        <FatTag key={subject.id} active={false}>{subject.name}</FatTag>)
                    }
                </Collapsible>

                <Collapsible
                    title={t('filter_grades')}>
                    {classLevels.map(classLevel =>
                        <FatTag key={classLevel.id} active={false}>{classLevel.name}</FatTag>)
                    }
                </Collapsible>

                <Collapsible title={t('filter_search')}>
                    <TextInput
                        placeholder={t("filter_search_placeholder") as string}
                        style={styles.searchInput}
                        onChangeText={text => { }} />
                </Collapsible>

            </CollapsingToolbar>
            

            <View style={[globalStyles.container, 
                styles.fullHeight]}>
                <FlatList
                    data={scenarioData}
                    renderItem={({item, index}) => <View 
                        style={[
                            index === 0 && {paddingTop: fullHeaderHeight + themeDimensions.MARGIN_VERTICAL_BIG},
                            index+1 === scenarioData.length && {paddingBottom: themeDimensions.PADDING_SCROLLVIEW_BOTTOM}
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