import { setupConsoleTools } from "../../utils/consoleTools";

import preprocessedData from "../../data/preprocessed.json";

const initialState = {
  loaded: false,
  loading: false,
  data: {},
  allDates: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "DATA.LOAD.BEGIN":
      return {
        ...state,
        loading: true,
        error: undefined,
        errorMessage: "",
        lastDate: undefined,
      };

    case "DATA.LOAD.SUCCESS":
      return { ...state, loading: false, loaded: true, ...action.values };

    case "DATA.LOAD.FAILURE":
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        errorMessage: action.errorMessage,
      };

    default:
      return state;
  }
}

/* ================================================================================================================== */

export function fetchDataDispatcher(dispatch) {
  dispatch({ type: "DATA.LOAD.BEGIN" });
  dispatch({ type: "DATA.LOAD.SUCCESS", values: preprocessedData });
  setupConsoleTools(preprocessedData.data, preprocessedData.allDates, dispatch);
}

export default reducer;
