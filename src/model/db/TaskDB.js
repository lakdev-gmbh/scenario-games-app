import { Model } from '@nozbe/watermelondb'
import { children, field, json, relation, text, writer } from '@nozbe/watermelondb/decorators';

const castPossibleAnswers = possibleAnswersObject => {
  if (possibleAnswersObject == null) return null;
  possibleAnswers = Object.values(possibleAnswersObject)
  for (let i = 0; i < possibleAnswers.length; i++) {
    if (possibleAnswers[i]['is_correct'] == '1') {
      possibleAnswers[i]['is_correct'] = true;
    } else if(possibleAnswers[i]['is_correct'] == '0') {
      possibleAnswers[i]['is_correct'] = false;
    }

    if (possibleAnswers[i]['order']) {
      possibleAnswers[i]['order'] = parseInt(possibleAnswers[i]['order']);
    }
  }
  return possibleAnswers
};

const castOptions = optionsObject => {
  if (optionsObject == null) return null;
  return optionsObject;
};

export default class Task extends Model {
  static table = 'tasks';

  static associations = {
    task_groups: { type: 'belongs_to', key: 'task_group_watermelon_id' },
    user_answers: { type: 'has_many', foreignKey: 'task_watermelon_id' },
  }

  //@text('task_group_watermelon_id') task_group_watermelon_id;

  @text('title') title;
  @field('weight') weight;
  @text('question') question;
  @text('correct_answer') correct_answer;
  @json('possible_answers_string', castPossibleAnswers) possible_answers;
  @text('type') type;
  @json('options', castPossibleAnswers) options;

  @relation('task_groups', 'task_group_watermelon_id') taskGroup;

  // TODO: not working, why?
  @children('user_answers') userAnswers;

  isCorrect(answer) {
    let isCorrect = true;
    if (this.possible_answers != null) {
      // TODO: check if answer is object
      for (let y = 0; y < answer.length; y++) {
        if (answer[y] != this.possible_answers[y]['is_correct']) {
          isCorrect = false;
          break;
        }
      }
    } else {
      isCorrect = answer == this.correct_answer
    }
    return isCorrect;
  }

  @writer async addUserAnswer(answer) {
    let isCorrect = this.isCorrect(answer);
    console.log(isCorrect);
    const newComment = await this.collections.get('user_completed_tasks').create(userCompletedTask => {
      userCompletedTask.taskId = this.id
      userCompletedTask.answer = answer
      userCompletedTask.isCorrect = isCorrect
    })
    return newComment
  }
}