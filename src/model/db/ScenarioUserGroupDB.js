import { Model } from '@nozbe/watermelondb'
import { immutableRelation } from '@nozbe/watermelondb/decorators';

export default class ScenarioPropertyDB extends Model {
  static table = 'scenarios_user_groups';

  static associations = {
    scenarios: { type: 'belongs_to', key: 'scenario_watermelon_id' },
    user_groups: { type: 'belongs_to', key: 'user_group_watermelon_id' },
  }

  @immutableRelation('user_groups', 'user_group_watermelon_id') userGroup;
  @immutableRelation('scenarios', 'scenario_watermelon_id') scenario;

}