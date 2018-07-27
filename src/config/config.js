import {Map} from 'immutable';
import {default as Config} from '../../config.env';

const ENV = Config.NODE_ENV;

const baseConfig = {
  all: {
    env: ENV || 'development',
    isDev: ENV === 'development',
    isStaging: ENV === 'staging',
    basename: process.env.PUBLIC_PATH,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
    isBrowser: typeof window !== 'undefined',
    isServer: typeof window === 'undefined'
  },
  test: {},
  development: {
    apiUrlExchange: 'https://api.cryptonator.com/api/full',
    apiUrlCurencies: 'https://api.coinmarketcap.com/v2/ticker/?start=1&limit=10&sort=rank&structure=array',
    apiUrlHistoryCurrency: 'https://min-api.cryptocompare.com/data/pricehistorical',
  },
  staging: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080
  },
  production: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 8080,
    apiUrlExchange: 'https://api.cryptonator.com/api/full',
    apiUrlCurencies: 'https://api.coinmarketcap.com/v2/ticker/?start=1&limit=10&sort=rank&structure=array',
    apiUrlHistoryCurrency: 'https://min-api.cryptocompare.com/data/pricehistorical'
  }
};


export default Map().merge(baseConfig.all, baseConfig[baseConfig.all.env]);
