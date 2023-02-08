import { Model } from '@nozbe/watermelondb';
import { json } from '@nozbe/watermelondb/decorators';
import field from '@nozbe/watermelondb/decorators/field';
import relation from '@nozbe/watermelondb/decorators/relation';


export default class UserCompletedScenarioDB extends Model {
  static table = 'user_completed_scenarios';
  static associations = {
    scenarios: { type: 'belongs_to', key: 'scenario_watermelon_id' },
  };

  @field('scenario_watermelon_id') scenarioId;
  @field('progress') progress;

  @relation('scenarios', 'scenario_watermelon_id') scenario;
}