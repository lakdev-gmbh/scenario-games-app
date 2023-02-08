import { Q } from "@nozbe/watermelondb";
import React, { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GestureResponderEvent, Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../assets/styles/global";
import themeDimensions from "../../../assets/styles/theme.dimensions";
import { FatTag } from "../../components/global/Tag";
import { DefaultText, Label } from "../../components/global/Text";
import { watermelondb } from "../../model/db/database";
import { Property } from "../../model/ui/Property";
import { Scenario } from "../../model/ui/Scenario";
import { Subject } from "../../model/ui/Subject";
import { UserGroup } from "../../model/ui/UserGroup";
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


const ClassroomItem = ({ title, subjects, levels, onPress }: {
    title: string;
    subjects: Array<Subject>;
    levels: Array<Property>;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
}) => {

    return <TouchableOpacity
        disabled={onPress === undefined}
        onPress={onPress}
        style={[globalStyles.borderBottom, styles.classroom]}>
        <Label>
            {title}
        </Label>

        <View style={styles.classroomSubjects}>
            {subjects.map(subject => <FatTag key={subject.id}>{subject.name}</FatTag>)}
            {levels.map(level => <FatTag secondary key={level.id}>{level.name}</FatTag>)}
        </View>

    </TouchableOpacity>
}

export const ClassroomListScreen = () => {
    const { t } = useTranslation()
    const [scenarioData, setScenarioData] = useState<Scenario[]>([]);

    const subjectsInClass = (classroom: UserGroup) => {
        return classroom.scenarios.map((scenario: Scenario) => scenario.subjects).flat();
    }

    const levelsInClass = (classroom: UserGroup) => {
        return classroom.scenarios.map((scenario: Scenario) => scenario.classLevel).flat();
    }


    const [activeClassroom, setClassroom] = useState()

    useEffect(() => {
        getScenarios()
    }, [])

    const getScenarios = async () => {
        const newClassrooms = await watermelondb.get('app_classrooms').query().fetch();
        const newUserGroups = await Promise.all(newClassrooms
            .map(async (app_classroom) => {
                return UserGroup.createFromDB(await app_classroom.userGroup)
            }));
        const newScenarios = newUserGroups.map((userGroup) => userGroup.scenarios).flat();
        setUserGroups(newUserGroups);
        setScenarioData(newScenarios);
    }

    // --- START add classroom logic ---
    const [accessCode, setAccessCode] = useState<string>("")
    const [classrooms, setUserGroups] = useState<UserGroup[]>([]);

    const addClassroom = async () => {
        const user_groups = await watermelondb.get('user_groups').query(
            Q.where('code', accessCode)
        ).fetch();

        if (user_groups.length === 0) {
            console.log("No user group found with this code");
            return;
        } else {
            const user_group = user_groups[0];
            // Write to database
            await watermelondb.write(async () => {
                const localData = await watermelondb.get('app_classrooms').query(
                    Q.where('user_group_watermelon_id', user_group.id)
                ).fetchCount();
                if (localData > 0) {
                    console.log("Classroom already exists, skipping");
                } else {
                    console.log("Classroom does not exist, creating");
                    await watermelondb.get('app_classrooms').create((app_classroom) => {
                        app_classroom.userGroupId = user_group.id;
                    });
                }
            });
            // Update state
            await getScenarios();
        }
    }
    // --- END add classroom logic ---


    const allClassroomsFragment = <Fragment>
        {classrooms.length === 0 && <DefaultText style={styles.emptyText}>
            {t("screen_classrooms_empty")}
        </DefaultText>}

        <View style={[globalStyles.borderTop, styles.classroomContainer]}>
            {classrooms.map(classroom =>
                <ClassroomItem
                    key={classroom.id}
                    title={classroom.title}
                    subjects={subjectsInClass(classroom)}
                    onPress={() => setClassroom(classroom)}
                    levels={levelsInClass(classroom)} />
            )}
        </View>


        <View style={styles.addContainer}>
            <Label>{t("screen_classrooms_add")}</Label>
            <TextInput
                placeholder={t("screen_classrooms_placeholder") as string}
                style={[globalStyles.textInput, styles.accessInput]}
                onChangeText={setAccessCode} />
            <FatTag
                style={styles.addButton}
                active={accessCode != ""}
                onPress={addClassroom}>
                {t("button_add")}
            </FatTag>
        </View>
    </Fragment>

    const arrowDown = require("../../../assets/images/icons/arrow_down.png")
    const oneClassroomFragment = activeClassroom && <Fragment>
        <View style={[globalStyles.borderTop, styles.classroomContainer]}>
            <ClassroomItem
                key={activeClassroom.id}
                title={activeClassroom.title}
                subjects={subjectsInClass(activeClassroom)}
                levels={levelsInClass(activeClassroom)} />
        </View>

        <TouchableOpacity
            onPress={() => setClassroom(undefined)}
            style={[styles.addContainer, { flexDirection: 'row-reverse' }]}>
            <Image style={globalStyles.arrowIcon} source={arrowDown} />
            <Label>{t("screen_classrooms_all")}</Label>
        </TouchableOpacity>
    </Fragment>

    return <ListScreen
        scenarios={
            activeClassroom? activeClassroom.scenarios : scenarioData
        }
        title={t("screen_list_classrooms")}
        classroom>
        {activeClassroom ? oneClassroomFragment : allClassroomsFragment}
    </ListScreen>

}