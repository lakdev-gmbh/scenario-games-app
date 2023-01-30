import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
  version: 7,
  tables: [
    tableSchema({
      name: 'scenarios',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'published', type: 'boolean' },
        { name: 'published_global', type: 'boolean' },
        { name: 'image', type: 'string', isOptional: true },
        { name: 'user_id', type: 'string', isOptional: true },
      ]
    }),
    tableSchema({
      name: 'tasks',
      columns: [
        { name: 'task_group_watermelon_id', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'weight', type: 'number' },
        { name: 'question', type: 'string' },
        { name: 'correct_answer', type: 'string' },
        { name: 'possible_answers_string', type: 'string' },
        { name: 'type', type: 'string' },
        { name: 'options', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'info_texts',
      columns: [
        { name: 'task_group_watermelon_id', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'weight', type: 'number' },
        { name: 'body', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'task_groups',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'weight', type: 'number' },
        { name: 'scenario_watermelon_id', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'properties',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'scenarios_properties',
      columns: [
        { name: 'scenario_watermelon_id', type: 'string' },
        { name: 'property_watermelon_id', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'user_groups',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'code', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'scenarios_user_groups',
      columns: [
        { name: 'scenario_watermelon_id', type: 'string' },
        { name: 'user_group_watermelon_id', type: 'string' },
      ]
    }),
    // Local tables
    tableSchema({
      name: 'user_completed_tasks',
      columns: [
        { name: 'task_watermelon_id', type: 'string' },
        { name: 'answer', type: 'string' },
        { name: 'is_correct', type: 'boolean' },
      ],
    }),
    tableSchema({
      name: 'app_classrooms',
      columns: [
        { name: 'user_group_watermelon_id', type: 'string' },
      ],
    }),
  ]
})
