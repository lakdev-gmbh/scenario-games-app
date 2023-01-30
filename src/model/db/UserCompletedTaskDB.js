import { Model } from '@nozbe/watermelondb';
import { json } from '@nozbe/watermelondb/decorators';
import field from '@nozbe/watermelondb/decorators/field';
import relation from '@nozbe/watermelondb/decorators/relation';


export default class UserCompletedTaskDB extends Model {
  static table = 'user_completed_tasks';
  static associations = {
    task: { type: 'belongs_to', key: 'task_watermelon_id' },
  };

  @field('task_watermelon_id') taskId;
  @json('answer', answer => answer) answer;
  @field('is_correct') isCorrect;

  @relation('tasks', 'task_watermelon_id') task;
}