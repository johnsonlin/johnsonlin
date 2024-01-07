import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SkillActions = createActionGroup({
  source: 'Skill',
  events: {
    'Load Skills': emptyProps(),
    'Load Skills Success': props<{ data: unknown }>(),
    'Load Skills Failure': props<{ error: unknown }>(),
  },
});
