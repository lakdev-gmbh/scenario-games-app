export type RootStackParamList = {
    Home: undefined;
    Classrooms: undefined;
    ScenarioStart: undefined;
};

// This registers which makes navigation fully type-safe.

// https://reactnavigation.org/docs/typescript#specifying-default-types-for-usenavigation-link-ref-etc
declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }