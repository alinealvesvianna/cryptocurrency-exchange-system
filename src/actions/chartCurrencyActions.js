import {CALL_API, CHAIN_API} from '../middleware/api';
import * as types from './actionTypes';
import {config} from '../config';

export function consolidateData() {
  return (dispatch, getState) => {
    const {chartYesterday, chartNow} = getState().ChartCurrency;

    const currencyKeyYesterday = Object.keys(chartYesterday);
    const currencyKeyNow = Object.keys(chartNow);

    const allData = [
      {name: 'Yesterday', eUR: chartYesterday[currencyKeyYesterday].eUR, uSD: chartYesterday[currencyKeyYesterday].uSD},
      {name: 'Now', eUR: chartNow[currencyKeyNow].eUR, uSD: chartNow[currencyKeyNow].uSD}
    ];


    dispatch({
      type: types.CONSOLIDATE_DATA,
      allData
    });
  };
}

export function requestDataChartYesterday() {
  return (dispatch, getState) => {
    const {parametersYesterday} = getState().ChartCurrency;
    dispatch({
      [CHAIN_API]: [
        () => {
          return {
            [CALL_API]: {
              method: 'get',
              type: 'external',
              urlName: `${config.get('apiUrlHistoryCurrency')}`,
              path: `${encodeURI(parametersYesterday)}`,
              successType: types.GET_DATA_CHART_SUCCESS_YESTERDAY,
              errorType: types.GET_DATA_CHART_ERROR_YESTERDAY
            }
          };
        },
        (response) => {
          console.log(response);
          dispatch(consolidateData());
        }
      ]
    });
  };
}

export function requestDataChartNow() {
  return (dispatch, getState) => {
    const {parametersNow} = getState().ChartCurrency;
    dispatch({
      [CHAIN_API]: [
        () => {
          return {
            [CALL_API]: {
              method: 'get',
              type: 'external',
              urlName: `${config.get('apiUrlHistoryCurrency')}`,
              path: `${encodeURI(parametersNow)}`,
              successType: types.GET_DATA_CHART_SUCCESS_NOW,
              errorType: types.GET_DATA_CHART_ERROR_NOW
            }
          };
        },
        (response) => {
          console.log(response);
          dispatch(requestDataChartYesterday());
        }
      ]
    });
  };
}

export function selectDataChart(now, yesterday) {
  return (dispatch) => {
    dispatch({
      type: types.SELECT_DATA_CHART,
      now,
      yesterday
    });
    dispatch(requestDataChartNow());
  };
}
