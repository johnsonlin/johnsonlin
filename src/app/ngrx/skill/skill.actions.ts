import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { SkillSets } from '../../models/skill.model';

export const SkillActions = createActionGroup({
  source: 'Skill',
  events: {
    'Load Skills': emptyProps(),
    'Load Skills Success': props<{ data: SkillSets }>(),
    'Load Skills Failure': props<{ error: unknown }>(),
  },
});
