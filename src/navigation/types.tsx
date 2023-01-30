type ScenarioProp = { scenarioId: number }

type ScenarioTaskProps = ScenarioProp & {
  scenarioId: number;
  taskGroupIndex: number;
  taskIndex: number;
}

export type RootStackParamList = {
    Home: undefined;
    Classrooms: undefined;
    ScenarioStart: ScenarioProp;
    ScenarioSuccess: ScenarioProp;
    ScenarioTask: ScenarioTaskProps;
};

// This registers which makes navigation fully type-safe.

// https://reactnavigation.org/docs/typescript#specifying-default-types-for-usenavigation-link-ref-etc
declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }