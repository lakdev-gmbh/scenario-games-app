import { Model } from '@nozbe/watermelondb'
import { immutableRelation } from '@nozbe/watermelondb/decorators';

export default class ScenarioPropertyDB extends Model {
  static table = 'scenarios_properties';

  static associations = {
    scenarios: { type: 'belongs_to', key: 'scenario_watermelon_id' },
    properties: { type: 'belongs_to', key: 'property_watermelon_id' },
  }

  @immutableRelation('properties', 'property_watermelon_id') property;
  @immutableRelation('scenarios', 'scenario_watermelon_id') scenario;

}