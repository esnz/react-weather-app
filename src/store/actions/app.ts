import { AppActionTypes } from '../actionTypes';

export const changeDegreeType = () => ({
  type: AppActionTypes.CHANGE_TEMP_UNIT,
  payload: {},
});

export const setIsLoading = (loading: boolean) => ({
  type: AppActionTypes.SET_IS_LOADING,
  payload: loading,
});

export const setIsInitialState = (state: boolean) => ({
  type: AppActionTypes.SET_IS_INITIAL,
  payload: state,
});

export const toggleDarkMode = () => ({
  type: AppActionTypes.TOGGLE_DARK_MODE,
});
