import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TextInput } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import themeColors from "../../../assets/styles/theme.colors";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { FatTag } from "../../components/global/Tag";
import { Collapsible } from "../../components/home/Collapsible";
import { ListScreen } from "../ListScreen";

const styles = StyleSheet.create({
    fullHeight: {
        flex: 1,
    },
    searchInput: {
        flex: 1,
        marginTop: 8,
    }
})

export const HomeListScreen = () => {
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


    return <ListScreen 
        scenarios={scenarioData}
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
                        style={[ globalStyles.textInput, styles.searchInput]}
                        onChangeText={text => { }} />
                </Collapsible>
    </ListScreen>
}