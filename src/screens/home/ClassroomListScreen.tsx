import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { GestureResponderEvent, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { FatTag } from "../../components/global/Tag";
import { DefaultText, Label } from "../../components/global/Text";
import { ListScreen } from "../ListScreen";

const styles = StyleSheet.create({
    addContainer: {
        flexDirection: "row",
        marginTop: themeDimensions.MARGIN_VERTICAL_BIG,
        alignItems: 'center',
    },
    accessInput: {
        marginHorizontal: themeDimensions.TAG_MARGIN_END,
        flex: 1
    },
    emptyText: {
        marginTop: themeDimensions.MARGIN_VERTICAL_BIG
    },
    addButton: {
        marginTop: 0,
        marginEnd: 0,
    },
    classroom: {
        marginTop: themeDimensions.MARGIN_VERTICAL_SMALL,
        paddingBottom: themeDimensions.MARGIN_VERTICAL_SMALL
    },
    classroomContainer: {
        marginTop: themeDimensions.MARGIN_VERTICAL_SMALL
    },
    classroomSubjects: {
        flexDirection: "row",
        marginVertical: themeDimensions.MARGIN_VERTICAL_SMALL,
    }
})


const ClassroomItem = ({title, subjects, levels, onPress}: {
    title: string;
    subjects: Array<any>; // TODO: use subject type
    levels: Array<any>; // TODO: use level type
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}) => {

    return <TouchableOpacity 
        disabled={onPress === undefined}
        onPress={onPress}
        style={[globalStyles.borderBottom, styles.classroom]}>
        <Label>
            { title }
        </Label>

        <View style={styles.classroomSubjects}>
            { subjects.map(subject => <FatTag key={subject.id}>{ subject.name }</FatTag>) }
            { levels.map(level => <FatTag secondary key={level.id}>{ level.name }</FatTag>) }
        </View>

    </TouchableOpacity>
}

export const ClassroomListScreen = () => {
    const {t} = useTranslation()

    // TODO: get correct data
    // TODO: get subjects and level from scenarios: which subjects do they include? 
    const classrooms = [{
        id: 10,
        name: "Herman Mayer, Leistungskurs"
    }]
    const scenarioData = []

    const subjectsInClass = (classroom: {}) => {
        return [
            {name: 'Mathematik', id: 1},
            {name: 'Mathematik2', id: 2},
            {name: 'Physik', id: 3}
        ]
    }

    const levelsInClass = (classroom: {}) => {
        return [
            {name: '7', id: 100},
        ]
    }


    const [activeClassroom, setClassroom] = useState()

    // --- START add classroom logic ---
    const [accessCode, setAccessCode] = useState<string>("")
    // --- END add classroom logic ---


    const allClassroomsFragment = <Fragment>
            { classrooms.length === 0 && <DefaultText style={styles.emptyText}>
                {t("screen_classrooms_empty")}
            </DefaultText>}

            <View style={[globalStyles.borderTop, styles.classroomContainer]}>
                { classrooms.map(classroom =>
                    <ClassroomItem
                         key={classroom.id} 
                         title={classroom.name}
                         subjects={subjectsInClass(classroom)}
                         onPress={() => setClassroom(classroom)}
                         levels={levelsInClass(classroom)} />
                ) }
            </View>
            

            <View style={styles.addContainer}>
                <Label>{t("screen_classrooms_add")}</Label>
                <TextInput
                    placeholder={t("screen_classrooms_placeholder") as string}
                    style={[ globalStyles.textInput, styles.accessInput]}
                    onChangeText={setAccessCode} />
                <FatTag 
                    style={styles.addButton} 
                    active={accessCode != ""}>
                        {t("button_add")}
                </FatTag>
            </View>
    </Fragment>

    const arrowDown = require("../../../assets/images/icons/arrow_down.png")
    const oneClassroomFragment = activeClassroom && <Fragment>
        <View style={[globalStyles.borderTop, styles.classroomContainer]}>
            <ClassroomItem
                key={activeClassroom.id} 
                title={activeClassroom.name}
                subjects={subjectsInClass(activeClassroom)}
                levels={levelsInClass(activeClassroom)} />
        </View>

        <TouchableOpacity 
            onPress={() => setClassroom(undefined)}
            style={[styles.addContainer, {flexDirection: 'row-reverse'}]}>
            <Image style={globalStyles.arrowIcon} source={arrowDown} />
            <Label>{t("screen_classrooms_all")}</Label>
        </TouchableOpacity>
    </Fragment>

    return <ListScreen
        scenarios={scenarioData}
        title={t("screen_list_classrooms")}
        classroom>
            {activeClassroom ? oneClassroomFragment : allClassroomsFragment }
    </ListScreen>

}