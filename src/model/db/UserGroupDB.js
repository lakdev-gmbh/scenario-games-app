import { Model, Q } from '@nozbe/watermelondb'
import { children, lazy, text } from '@nozbe/watermelondb/decorators';

export default class UserGroupDB extends Model {
  static table = 'user_groups';

  static associations = {
    scenarios_user_groups: { type: 'has_many', foreignKey: 'user_group_watermelon_id' },
  }

  @text('title') title;
  @text('code') code;

  @lazy
  scenarios = this.collections
    .get('scenarios')
    .query(Q.on('scenarios_user_groups', 'user_group_watermelon_id', this.id));

  @lazy
  publicScenarios = this.scenarios.extend(
    Q.where('published', true)
  )
}