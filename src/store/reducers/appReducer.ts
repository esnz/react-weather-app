import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TempUnit } from '../../utils/unitConversion';

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

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode: (state: IAppState) => {
      localStorage.setItem('darkMode', (!state.darkMode).toString());
      state.darkMode = !state.darkMode;
    },
    changeTempUnit: (state: IAppState) => {
      state.tempUnit = state.tempUnit === TempUnit.CELCIUS ? TempUnit.FAHRENHEIT : TempUnit.CELCIUS;
    },
    setIsLoading: (state: IAppState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsInitial: (state: IAppState, action: PayloadAction<boolean>) => {
      state.isInitial = action.payload;
    },
  },
});

export const { changeTempUnit, toggleDarkMode, setIsLoading, setIsInitial } = appSlice.actions;
export default appSlice.reducer;
