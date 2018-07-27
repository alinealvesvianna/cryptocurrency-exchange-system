import * as types from '../actions/actionTypes';

const initialState = {
  selectedCurrency: 'btc-usd',
  loadingExchange: false,
  errorExchange: {
    type: '',
    message: ''
  },
  exchange: {}
};

function contentReducer(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_CURRENCY:
      return {
        ...state,
        selectedCurrency: action.currency,
        loadingExchange: true
      };

    case types.GET_EXCHANGE_CURRENCY_SUCCESS:
      return {
        ...state,
        exchange: action.response,
        loadingExchange: false
      };

    case types.GET_EXCHANGE_CURRENCY_ERROR:
      return {
        ...state,
        errorExchange: {
          type: 'API_ERROR',
          message: action
        },
        loadingExchange: false
      };

    case types.SORT_HIGHEST:
      return {
        ...state,
        exchange: action.allData
      };

    case types.SORT_LOWEST:
      return {
        ...state,
        exchange: action.allData
      };

    default:
      return state;
  }
}

export default contentReducer;
