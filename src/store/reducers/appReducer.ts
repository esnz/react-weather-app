import { TempUnit } from '../../utils/unitConversion';
import { AppActionTypes } from '../actionTypes';

export interface IAppState {
  tempUnit: TempUnit;
  isLoading: boolean;
  isInitial: boolean;
  darkMode: boolean;
}

const initialState: IAppState = {
  tempUnit: TempUnit.CELCIUS,
  isLoading: false,
  isInitial: true,
  darkMode: JSON.parse(localStorage.getItem('darkMode') as string) as boolean,
};

export const appReducer = (state: IAppState = initialState, action: { type: AppActionTypes; payload: any }) => {
  switch (action.type) {
    case AppActionTypes.TOGGLE_DARK_MODE:
      localStorage.setItem('darkMode', (!state.darkMode).toString());
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case AppActionTypes.CHANGE_TEMP_UNIT:
      return {
        ...state,
        tempUnit: state.tempUnit === TempUnit.CELCIUS ? TempUnit.FAHRENHEIT : TempUnit.CELCIUS,
      };
    case AppActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AppActionTypes.SET_IS_INITIAL:
      return {
        ...state,
        isInitial: action.payload,
      };
    default:
      return state;
  }
};
