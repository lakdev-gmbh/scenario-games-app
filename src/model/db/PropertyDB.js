import { Model, Q } from '@nozbe/watermelondb'
import { children, lazy, text } from '@nozbe/watermelondb/decorators';

export default class PropertyDB extends Model {
  static table = 'properties';

  static associations = {
    scenarios_properties: { type: 'has_many', foreignKey: 'property_watermelon_id' },
  }

  @text('name') name;
  @text('type') type;

  @lazy 
  scenarios = this.collections
    .get('scenarios').
    query(Q.on('scenarios_properties', 'property_watermelon_id', this.id));
}