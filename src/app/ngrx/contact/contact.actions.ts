import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { ContactInfo } from '../../models/contact-info.model';

export const ContactActions = createActionGroup({
  source: 'Contact',
  events: {
    'Send Message': props<{ data: ContactInfo }>(),
    'Send Message Success': emptyProps(),
    'Send Message Failure': props<{ error: unknown }>(),
  },
});
