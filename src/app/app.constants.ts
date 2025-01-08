// APIs
export const WORKS_API =
  'https://public-api.wordpress.com/rest/v1.1/sites/johnsonlinportfolio.wordpress.com/posts/?number=50';

export const SKILLS_API =
  'https://johnsonlin-service.netlify.app/api/skills';

export const SEND_MESSAGE_API =
  'https://johnsonlin-service.netlify.app/api/contact';

export const RECAPTCHA_KEY = '6LfwFLgZAAAAAJH2XQU1t2CdTRI8xyXD0om_B-fd';

export const GRID_COLS_DESKTOP = 4;

export const GRID_COLS_MOBILE = 2;

export const PROJECT_IMAGE_WIDTH = 700;

export const MOBILE_BREAK_POINT = 767;

export enum AppRoute {
  Home = 'home',
  Works = 'works',
  Skills = 'skills',
  Contact = 'contact',
}

export const NAV_ITEMS = [
  {
    path: `/${AppRoute.Home}`,
    label: 'Home',
    icon: 'home',
  },
  {
    path: `/${AppRoute.Works}`,
    label: 'Works',
    icon: 'work',
  },
  {
    path: `/${AppRoute.Skills}`,
    label: 'Skills',
    icon: 'format_align_left',
  },
  {
    path: `/${AppRoute.Contact}`,
    label: 'Contact',
    icon: 'message',
  },
];
