import { createActionGroup, emptyProps } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'ui',
  events: {
    'Toggle Sidenav': emptyProps(),
    'Open Sidenav': emptyProps(),
    'Close Sidenav': emptyProps(),
  },
});
