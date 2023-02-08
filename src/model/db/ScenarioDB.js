import { Model } from '@nozbe/watermelondb'
import { children, field, lazy, text, writer } from '@nozbe/watermelondb/decorators';
import { Q } from '@nozbe/watermelondb'
import PropertyDB from './PropertyDB';

export default class ScenarioDB extends Model {
  static table = 'scenarios';

  static associations = {
    task_groups: { type: 'has_many', foreignKey: 'scenario_watermelon_id' },
    scenarios_properties: { type: 'has_many', foreignKey: 'scenario_watermelon_id' },
    scenarios_user_groups: { type: 'has_many', foreignKey: 'scenario_watermelon_id' },
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


  @lazy 
  userGroups = this.collections
    .get('user_groups').
    query(Q.on('scenarios_user_groups', 'scenario_watermelon_id', this.id));

  @lazy 
  highestUserCompletions = this.collections
    .get('user_completed_scenarios')
    .query(Q.where('scenario_watermelon_id', this.id), Q.sortBy('progress', Q.desc), Q.take(1));

  @writer async addUserProgress(progress) {
    const existingUserCompletions = await this.collections.get('user_completed_scenarios').query(
      Q.where('scenario_watermelon_id', this.id),
      Q.where('progress', Q.gt(progress))
    ).fetchCount();

    if (existingUserCompletions > 0) {
      return; // do nothing, because we already have a better score
    }

    const newUserCompletion = await this.collections.get('user_completed_scenarios').create(userCompletedScenario => {
      userCompletedScenario.scenarioId = this.id
      userCompletedScenario.progress = progress
    })
    console.log('new Scenario completion', newUserCompletion)
    return newUserCompletion
  }
}
