import {CALL_API, CHAIN_API} from '../middleware/api';
import * as types from './actionTypes';
import {config} from '../config';

export function requestAllCryptocurrencies() {
  return (dispatch) => {
    dispatch({
      [CHAIN_API]: [
        () => {
          return {
            [CALL_API]: {
              method: 'get',
              type: 'external',
              urlName: `${config.get('apiUrlCurencies')}`,
              path: '',
              successType: types.GET_ALL_CRYPTOCURRENCIES_SUCCESS,
              errorType: types.GET_ALL_CRYPTOCURRENCIES_ERROR
            }
          };
        },
        (response) => {
          console.log(response);
        }
      ]
    });
  };
}

export function getAllCryptocurrencies() {
  return (dispatch) => {
    dispatch({
      type: types.GET_ALL_CRYPTOCURRENCIES
    });
    dispatch(requestAllCryptocurrencies());
  };
}
