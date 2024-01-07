import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { Work } from '../../models/work.model';

export const WorkActions = createActionGroup({
  source: 'Work/API',
  events: {
    'Load Works': emptyProps(),
    'Load Works Success': props<{ works: Work[] }>(),
    'Load Works Failure': props<{ error: unknown }>(),
    'Clear Works': emptyProps(),
  },
});
