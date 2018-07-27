import {CALL_API, CHAIN_API} from '../middleware/api';
import * as types from './actionTypes';
import {config} from '../config';

export function sortLowest() {
  return (dispatch, getState) => {
    const {exchange} = getState().ExchangeCurrency;

    const sortData = exchange.ticker.markets.slice().sort((a, b) => {
      return a.price - b.price;
    });

    const allData = {
      ...exchange,
      ticker: {
        markets: sortData,
        base: exchange.ticker.base,
        target: exchange.ticker.target,
        price: exchange.ticker.price,
        volume: exchange.ticker.volume,
        change: exchange.ticker.change
      }
    };

    dispatch({
      type: types.SORT_LOWEST,
      allData
    });
  };
}

export function getExchangeCurrency() {
  return (dispatch, getState) => {
    const {selectedCurrency} = getState().ExchangeCurrency;
    dispatch({
      [CHAIN_API]: [
        () => {
          return {
            [CALL_API]: {
              method: 'get',
              type: 'external',
              urlName: `${config.get('apiUrlExchange')}`,
              path: `/${encodeURI(selectedCurrency)}`,
              successType: types.GET_EXCHANGE_CURRENCY_SUCCESS,
              errorType: types.GET_EXCHANGE_CURRENCY_ERROR
            }
          };
        },
        (response) => {
          console.log(response);
          dispatch(sortLowest());
        }
      ]
    });
  };
}

export function selectCurrency(currency) {
  return (dispatch) => {
    dispatch({
      type: types.SELECT_CURRENCY,
      currency
    });
    dispatch(getExchangeCurrency());
  };
}

export function sortHighest() {
  return (dispatch, getState) => {
    const {exchange} = getState().ExchangeCurrency;

    const sortData = exchange.ticker.markets.slice().sort((a, b) => {
      return b.price - a.price;
    });

    const allData = {
      ...exchange,
      ticker: {
        markets: sortData,
        base: exchange.ticker.base,
        target: exchange.ticker.target,
        price: exchange.ticker.price,
        volume: exchange.ticker.volume,
        change: exchange.ticker.change
      }
    };

    dispatch({
      type: types.SORT_HIGHEST,
      allData
    });
  };
}
