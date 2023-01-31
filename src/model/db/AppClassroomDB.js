import { Model } from '@nozbe/watermelondb';
import field from '@nozbe/watermelondb/decorators/field';
import relation from '@nozbe/watermelondb/decorators/relation';


export default class AppClassroomDB extends Model {

  static table = 'app_classrooms';
  static associations = {
    task: { type: 'belongs_to', key: 'user_group_watermelon_id' },
  };

  @field('user_group_watermelon_id') userGroupId;

  @relation('user_groups', 'user_group_watermelon_id') userGroup;
}