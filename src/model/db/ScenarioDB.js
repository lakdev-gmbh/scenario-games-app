import { Model } from '@nozbe/watermelondb'
import { children, field, lazy, text } from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb'
import PropertyDB from './PropertyDB';

export default class ScenarioDB extends Model {
  static table = 'scenarios';

  static associations = {
    task_groups: { type: 'has_many', foreignKey: 'scenario_watermelon_id' },
    scenarios_properties: { type: 'has_many', foreignKey: 'scenario_watermelon_id' },
  }

  @text('title') title;
  @text('description') description;
  @text('image') image;
  @field('weight') weight;
  @field('published') published;
  @field('published_global') published_global;

  @children('task_groups') taskGroups;

  @lazy 
  properties = this.collections
    .get('properties').
    query(Q.on('scenarios_properties', 'scenario_watermelon_id', this.id));
}
