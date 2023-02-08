type ScenarioProp = { scenarioId: string }

type SuccessSreenProps = ScenarioProp & {
  passedTime: number;
  penaltySeconds: number;
}

type ScenarioTaskProps = ScenarioProp & {
  scenarioId: string;
  taskGroupIndex: number;
  taskIndex: number;
  passedTime: number;
  penaltySeconds: number;
}

export type RootStackParamList = {
    Home: undefined;
    Classrooms: undefined;
    ScenarioStart: ScenarioProp;
    ScenarioSuccess: SuccessSreenProps;
    ScenarioTask: ScenarioTaskProps;
};

// This registers which makes navigation fully type-safe.

// https://reactnavigation.org/docs/typescript#specifying-default-types-for-usenavigation-link-ref-etc
declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }