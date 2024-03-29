import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput} from 'react-native';
import {globalStyles} from '../../../assets/styles/global';
import {FatTag} from '../../components/global/Tag';
import {Collapsible} from '../../components/home/Collapsible';
import {sync} from '../../model/db/database';
import {Scenario} from '../../model/ui/Scenario';
import {ListScreen} from '../ListScreen';
import {Subject} from '../../model/ui/Subject';
import {SchoolYear} from '../../model/ui/SchoolYear';
import {PropertyBag} from '../../model/ui/PropertyBag';
import {Property} from '../../model/ui/Property';
import SplashScreen from 'react-native-splash-screen';
import {useIsFocused} from '@react-navigation/native';

const styles = StyleSheet.create({
  fullHeight: {
    flex: 1,
  },
  searchInput: {
    flex: 1,
  },
});

export const HomeListScreen = () => {
  const {t} = useTranslation();

  // check if screen is focused, to update when coming back from other screens
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [scenarioData, setScenarios] = useState<Scenario[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);

  // Filters
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [selectedSchoolYears, setSelectedSchoolYears] = useState<SchoolYear[]>(
    [],
  );
  const [searchString, setSearchString] = useState<string>('');

  const getScenariosSubjects = (scenarios: any) => {
    if (!scenarios) return [];
    const subjects = scenarios.flatMap((scenario: any) => {
      return scenario.subjects.map((subject: any) => subject);
    });
    const uniqueSubjects = subjects.reduce((uniqueArr: any, subject: any) => {
      const subjectExists = uniqueArr.some((s: any) => s.id === subject.id);
      if (!subjectExists) {
        uniqueArr.push(subject);
      }
      return uniqueArr;
    }, []);

    return uniqueSubjects;
  };

  const getScenariosSchoolYears = (scenarios: any) => {
    if (!scenarios) return [];
    const schoolYears = scenarios.flatMap((scenario: any) => {
      // return scenario.classLevel.map((classLevel: any) => classLevel);
      return scenario.schoolYears.map((schoolYear: any) => schoolYear);
    });
    const uniqueSchoolYears = schoolYears.reduce(
      (uniqueArr: any, schoolYear: any) => {
        const schoolYearExists = uniqueArr.some(
          (s: any) => s.id === schoolYear.id,
        );
        if (!schoolYearExists) {
          uniqueArr.push(schoolYear);
        }
        return uniqueArr;
      },
      [],
    );
    return uniqueSchoolYears;
  };

  const getScenarios = async () => {
    try {
      await sync();
    } catch (error) {
      console.log('Sync error: ' + error);
    } finally {
      //let propertyBag = await PropertyBag.all();
      // setSubjects(propertyBag.subjects);
      // setSchoolYears(propertyBag.schoolYears);

      let scenarios: Scenario[] = (await Scenario.all()).filter(
        (scenario: Scenario) => {
          // Filter by published global
          return scenario.publishedGlobal;
        },
      );
      // getScenariosSchoolYears(scenarios);
      setSubjects(getScenariosSubjects(scenarios));
      setSchoolYears(getScenariosSchoolYears(scenarios));
      setScenarios(scenarios);

      setLoading(false);
    }
  };

  const adjustSubjects = (subject: Subject) => {
    setSelectedSubjects(getSelection(selectedSubjects, subject));
  };

  const adjustSchoolYears = (schoolYear: SchoolYear) => {
    setSelectedSchoolYears(getSelection(selectedSchoolYears, schoolYear));
  };

  const adjustSearchString = (topic: string) => {
    setSearchString(topic);
  };

  const getSelection = (currentProperties: Property[], property: Property) => {
    if (currentProperties.some(prop => prop.id === property.id)) {
      // Return all properties except the one that was clicked
      return currentProperties.filter(function (item) {
        return item.id !== property.id;
      });
    } else {
      // Return all properties plus the one that was clicked
      return [...currentProperties, property];
    }
  };

  const checkProperties = (scenario: Scenario) => {
    if (selectedSubjects.length > 0) {
      if (
        !selectedSubjects
          .map(subject => subject.id)
          .some(subjectId =>
            scenario.subjects.map(x => x.id).includes(subjectId),
          )
      ) {
        return false;
      }
    }
    if (selectedSchoolYears.length > 0) {
      if (
        !selectedSchoolYears
          .map(schoolYear => schoolYear.id)
          .some(schoolYearId =>
            scenario.schoolYears.map(x => x.id).includes(schoolYearId),
          )
      ) {
        return false;
      }
    }
    if (searchString.length > 0) {
      if (scenario.title.toLowerCase().includes(searchString.toLowerCase())) {
        return true;
      }
      if (
        scenario.description.toLowerCase().includes(searchString.toLowerCase())
      ) {
        return true;
      }
      if (
        scenario.subjects
          .map(subject => subject.name.toLowerCase())
          .some(subjectName => subjectName.includes(searchString.toLowerCase()))
      ) {
        return true;
      }
      if (
        scenario.topics
          .map(topic => topic.name.toLowerCase())
          .some(topicName => topicName.includes(searchString.toLowerCase()))
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

  // listen for isFocused, if useFocused changes
  useEffect(() => {
    isFocused &&
      getScenarios().then(() => {
        SplashScreen.hide();
      });
  }, [isFocused]);

  return (
    <ListScreen
      scenarios={scenarioData.filter(checkProperties)}
      title={t('screen_list_scenarios')}>
      <Collapsible title={t('filter_subjects')} openOnDefault>
        {subjects.map(subject => {
          // scenarioData.map(scenario => {});
          return (
            <FatTag
              key={subject.id}
              active={selectedSubjects.some(s => s.id === subject.id)}
              onPress={() => adjustSubjects(subject)}>
              {subject.name}
            </FatTag>
          );
        })}
      </Collapsible>

      <Collapsible title={t('filter_grades')}>
        {schoolYears.map(schoolYear => (
          <FatTag
            key={schoolYear.id}
            active={selectedSchoolYears.some(s => s.id === schoolYear.id)}
            onPress={() => adjustSchoolYears(schoolYear)}>
            {schoolYear.name}
          </FatTag>
        ))}
      </Collapsible>

      <Collapsible title={t('filter_search')}>
        <TextInput
          placeholder={t('filter_search_placeholder') as string}
          style={[globalStyles.textInput, styles.searchInput]}
          onChangeText={adjustSearchString}
        />
      </Collapsible>
    </ListScreen>
  );
};
