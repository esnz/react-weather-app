import { TempUnit } from '../../utils/unitConversion';
import { AppActionTypes } from '../actionTypes';

export interface IAppState {
  TempUnit: TempUnit;
  isLoading: boolean;
  isInitial: boolean;
}

const initialState: IAppState = {
  TempUnit: TempUnit.CELCIUS,
  isLoading: false,
  isInitial: true,
};

export const appReducer = (state: IAppState = initialState, action: { type: AppActionTypes; payload: any }) => {
  switch (action.type) {
    case AppActionTypes.CHANGE_TEMP_UNIT:
      if (state.TempUnit === TempUnit.CELCIUS) {
        return {
          ...state,
          TempUnit: TempUnit.FAHRENHEIT,
        };
      }
      return {
        ...state,
        TempUnit: TempUnit.CELCIUS,
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
