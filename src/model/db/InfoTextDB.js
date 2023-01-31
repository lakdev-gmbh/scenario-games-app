import { Model } from '@nozbe/watermelondb'
import { field, relation, text } from '@nozbe/watermelondb/decorators';

export default class InfoTextDB extends Model {
  static table = 'info_texts';

  static associations = {
    task_groups: { type: 'belongs_to', key: 'task_group_watermelon_id' },
  }

  //@text('task_group_watermelon_id') task_group_watermelon_id;
  @text('title') title;
  @text('body') body;
  @text('type') type;
  @field('weight') weight;

  @relation('task_groups', 'task_group_watermelon_id') taskGroup;
}