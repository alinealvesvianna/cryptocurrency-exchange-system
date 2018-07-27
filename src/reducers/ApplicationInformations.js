import * as types from "../actions/actionTypes";

const initialState = {
  loadingCryptocurrencies: false,
  criptoCurrencies: [],
  metadata: [],
  error: {
    type: "",
    message: ""
  }
};

function contentReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_CRYPTOCURRENCIES:
      return {
        ...state,
        loadingCryptocurrencies: true
      };

    case types.GET_ALL_CRYPTOCURRENCIES_ERROR:
      return {
        ...state,
        error: {
          type: "API_ERROR",
          message: action
        },
        loadingCryptocurrencies: false
      };

    case types.GET_ALL_CRYPTOCURRENCIES_SUCCESS:
      return {
        ...state,
        criptoCurrencies: Object.assign([...action.response.data], {
          10: {
            symbol: 'USD',
            websiteSlug: 'dolar'
          }
        }),
        metadata: action.response.metadata,
        loadingCryptocurrencies: false
      };

    default:
      return state;
  }
}

export default contentReducer;
