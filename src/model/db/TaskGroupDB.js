import { Model } from '@nozbe/watermelondb'
import { children, field, relation, text } from '@nozbe/watermelondb/decorators';

export default class TaskGroupDB extends Model {
  static table = 'task_groups';

  static associations = {
    scenarios: { type: 'belongs_to', key: 'scenario_watermelon_id' },
    tasks: { type: 'has_many', foreignKey: 'task_group_watermelon_id' },
    info_texts: { type: 'has_many', foreignKey: 'task_group_watermelon_id' },

  }

  @text('title') title;
  @field('weight') weight;
  //@text('scenario_watermelon_id') scenario_watermelon_id;

  @relation('scenarios', 'scenario_watermelon_id') scenario;
  @children('tasks') tasks;
  @children('info_texts') infoTexts;
}