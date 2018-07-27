import {combineReducers} from 'redux';
import ChartCurrency from './ChartCurrency';
import ApplicationInformations from './ApplicationInformations';
import ExchangeCurrency from './ExchangeCurrency';

const reducer = combineReducers({
  ApplicationInformations,
  ExchangeCurrency,
  ChartCurrency
});

export default reducer;
