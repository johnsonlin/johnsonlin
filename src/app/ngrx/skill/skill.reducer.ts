import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { SkillSets } from '../../models/skill.model';

import { SkillActions } from './skill.actions';

export const skillFeatureKey = 'skill';

export interface State {
  skills: SkillSets;
  skillsLoading: boolean;
  skillsLoaded: boolean;
  skillsError: unknown | null;
}

export const initialState: State = {
  skills: {},
  skillsLoading: false,
  skillsLoaded: false,
  skillsError: null,
};

export const reducer = createReducer(
  initialState,
  on(SkillActions.loadSkills, (state) => ({
    ...state,
    skillsLoading: true,
    skillsLoaded: false,
    skillsError: null,
  })),
  on(SkillActions.loadSkillsSuccess, (state, action) => ({
    ...state,
    skillsLoading: false,
    skillsLoaded: true,
    skills: action.data,
  })),
  on(SkillActions.loadSkillsFailure, (state, action) => ({
    ...state,
    skillsLoading: false,
    skillsLoaded: false,
    skillsError: action.error,
  })),
);

export const skillFeature = createFeature({
  name: skillFeatureKey,
  reducer,
  extraSelectors: ({ selectSkillState }) => ({
    selectSkillsLoading: createSelector(selectSkillState, (state) => state.skillsLoading),
    selectSkillsError: createSelector(selectSkillState, (state) => state.skillsError),
    selectSkills: createSelector(selectSkillState, (state) => state.skills),
  }),
});

export const { selectSkills, selectSkillsLoading, selectSkillsError } = skillFeature;
