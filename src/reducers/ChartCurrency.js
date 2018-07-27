import * as types from '../actions/actionTypes';

const initialState = {
  parametersNow: '?fsym=BTC&tsyms=BTC,USD,EUR&ts=1532065040',
  parametersYesterday: '?fsym=BTC&tsyms=BTC,USD,EUR&ts=1532065040',
  loadingChart: false,
  errorChartNow: {
    type: '',
    message: ''
  },
  errorChartYesterday: {
    type: '',
    message: ''
  },
  chartNow: {},
  chartYesterday: {},
  consolidateData: []
};

function contentReducer(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_DATA_CHART:
      return {
        ...state,
        parametersNow: action.now,
        parametersYesterday: action.yesterday,
        loadingChart: true
      };

    case types.GET_DATA_CHART_SUCCESS_NOW:
      return {
        ...state,
        chartNow: action.response,
        loadingChart: false
      };

    case types.GET_DATA_CHART_ERROR_NOW:
      return {
        ...state,
        errorChartNow: {
          type: 'API_ERROR',
          message: action
        },
        loadingChart: false
      };

    case types.GET_DATA_CHART_SUCCESS_YESTERDAY:
      return {
        ...state,
        chartYesterday: action.response,
        loadingChart: false
      };

    case types.GET_DATA_CHART_ERROR_YESTERDAY:
      return {
        ...state,
        errorChartYesterday: {
          type: 'API_ERROR',
          message: action
        },
        loadingChart: false
      };

    case types.CONSOLIDATE_DATA:
      return {
        ...state,
        consolidateData: action.allData
      };

    default:
      return state;
  }
}

export default contentReducer;
