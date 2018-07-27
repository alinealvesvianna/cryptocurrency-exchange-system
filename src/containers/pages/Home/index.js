import debounce from 'lodash/debounce';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import React, {Component} from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Default} from '../../../containers/themes';
import {Select, Input, Text, Row, Col, Label, Button, List, ItemList, Loader, Icon} from '../../../components';
import {getAllCryptocurrencies} from '../../../actions/applicationInformationsAction';
import {
  selectCurrency,
  sortLowest,
  sortHighest
} from '../../../actions/exchangeActions';
import {selectDataChart} from '../../../actions/chartCurrencyActions';
import {breakpoints} from '../../../config';
import '../../../config/styles/global-styles';


const Container = styled.div`
  background: ${props => props.theme.body.bg};
  background: #1A004A;
  height: 100vh;
  max-width: 1160px;
  width: 100%;
  padding: 15px;
  margin: 0 auto;
`;

const ContainerChart = styled.div`
    margin: 3rem auto;
    width: 100%;
    max-width: 600px;
    background: #fff;
    padding: 3em 2em;
    box-sizing: content-box;
}
`;

class Home extends Component {
  state = {
    symbols: {},
    name: ['trade', 'to'],
    pathUrl: '',
    inputValue: null,
    pathUrlChartOneDayAgo: '',
    pathUrlChartNow: '',
    toggleChart: false
  };

  componentWillMount() {
    this.props.getAllCryptocurrencies();
    this.delayedCallback = debounce((event) => {
      this.concatCurrency();
    }, 200);
  }

  toggleChart = () => {
    this.setState({
      toggleChart: !this.state.toggleChart
    });
  }

  onChange = (event) => {
    this.setState(
      {
        symbols: {
          ...this.state.symbols,
          [event.target.name]: event.target.value
        }
      },
      () => {
        console.log('o que vem aqui??', this.state.symbols);
        if (this.state.inputValue) {
          this.delayedCallback(this.state.inputValue);
        }
        this.concatUrlChart();
      }
    );
  };

  onChangeInput = (event) => {
    this.setState({
      inputValue: event.target.value
    });
  };

  onClickHighestPrice = () => {
    this.props.sortHighest();
  };

  onClickLowestPrice = () => {
    this.props.sortLowest();
  };

  concatUrlChart = () => {
    const ts = Math.round(new Date().getTime() / 1000);
    const tsYesterday = ts - 24 * 3600;

    const symbolLength = Object.keys(this.state.symbols).length;

    const symbolKey = Object.keys(this.state.symbols);

    const {symbols} = this.state;

    if (symbolLength > 1) {
      this.setState({
        pathUrlChartOneDayAgo: `?fsym=${symbols.trade}&tsyms=${symbols.to},USD,EUR&ts=${tsYesterday}`,
        pathUrlChartNow: `?fsym=${symbols.trade}&tsyms=${symbols.to},USD,EUR&ts=${ts}`
      },
      () => {
        this.props.selectDataChart(
          this.state.pathUrlChartOneDayAgo,
          this.state.pathUrlChartNow
        );
      });
    } else {
      this.setState({
        pathUrlChartOneDayAgo: `?fsym=${symbols[symbolKey]}&tsyms=BTC,USD,EUR&ts=${tsYesterday}`,
        pathUrlChartNow: `?fsym=${symbols[symbolKey]}&tsyms=BTC,USD,EUR&ts=${ts}`
      },
      () => {
        this.props.selectDataChart(
          this.state.pathUrlChartOneDayAgo,
          this.state.pathUrlChartNow
        );
      });
    }
  };

  concatCurrency = () => {
    const symbolLength = Object.keys(this.state.symbols).length;
    const symbolKey = Object.keys(this.state.symbols);

    const {symbols} = this.state;
    if (symbolLength > 1) {
      this.setState(
        {
          pathUrl: `${symbols.trade}-${symbols.to}`
        },
        () => {
          this.props.selectCurrency(this.state.pathUrl);
        }
      );
    } else if (symbolLength === 0) {
      this.props.selectCurrency('btc-usd');
    } else {
      this.setState(
        {
          pathUrl: `${symbols[symbolKey]}-usd`
        },
        () => {
          this.props.selectCurrency(this.state.pathUrl);
        }
      );
    }
  };

  handleKeyPress = (event) => {
    if (event.which >= 48 && event.which <= 57) {
      this.delayedCallback(event.key);
    }
  };

  render() {
    const {
      applicationInformations,
      loadingExchange,
      errorExchange,
      tickerExchange,
      exchangeCurrency,
      chartCurrency
    } = this.props;

    const chartLength = Object.keys(chartCurrency.chartNow).length;

    return (
      <ThemeProvider theme={Default}>
        <Container>
          <Icon icon="iconHeader" component={{kind: 'iconHeader'}} itemProp="image" />
          <Text.h1 component={{kind: 'headerPage'}}>Cryptocurrency Convert</Text.h1>
          <Row>
            <Col component={{kind: 'colSelectCurrency'}}>
              <Label htmlFor="trade">
                <Select
                  id="trade"
                  selected="USD"
                  name={this.state.name[0]}
                  value={this.state.symbols.trade}
                  onChange={this.onChange}
                  options={applicationInformations.criptoCurrencies}
                />
              </Label>
            </Col>
            <Col component={{kind: 'colSelectCurrency'}}>
              <Label htmlFor="to">
                <Select
                  id="to"
                  selected="BTC"
                  name={this.state.name[1]}
                  value={this.state.symbols.to}
                  onChange={this.onChange}
                  options={applicationInformations.criptoCurrencies}
                />
              </Label>
            </Col>
          </Row>

          <Input
            onKeyDown={this.handleKeyPress}
            onChange={this.onChangeInput}
            type="number"
            placeholder="Enter Amount"
          />
          {tickerExchange && (
            <Text.p
              component={{kind: 'totalPrice'}}
            >
              {`${this.state.inputValue} 
                ${this.state.symbols.trade ? this.state.symbols.trade : ''} = 
                ${(tickerExchange.price * this.state.inputValue).toFixed(2)} 
                ${this.state.symbols.to ? this.state.symbols.to : ''}`}
            </Text.p>
          )}

          {loadingExchange && <Loader />}

          {errorExchange && <Text.p component={{kind: 'error'}}> {errorExchange}</Text.p>}

          {chartLength > 0 &&
            !chartCurrency.chartNow.response && (
            <React.Fragment>
              <Text.p
                component={{kind: 'toggleChart'}}
                onClick={this.toggleChart}
              >
                {this.state.toggleChart ? 'Hide Chart' : 'Show Chart'}
              </Text.p>
              {this.state.toggleChart && (
                <ContainerChart>
                  <LineChart
                    width={600}
                    height={300}
                    data={chartCurrency.consolidateData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5
                    }}
                  >
                    <Line
                      type="monotone"
                      dataKey="uSD"
                      stroke="#8884d8"
                      activeDot={{
                        r: 8
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="eUR"
                      stroke="#f0f"
                      activeDot={{
                        r: 8
                      }}
                    />{' '}
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <YAxis />
                    <XAxis dataKey="name" />
                    <Legend />
                  </LineChart>
                </ContainerChart>

              )}
            </React.Fragment>
          )}


          {tickerExchange &&
            tickerExchange.markets.length > 0 && (
            <Row component={{kind: 'orderButtonsRow'}}>
              <Col component={{kind: 'colButtonOrder'}}>
                <Button onClick={this.onClickHighestPrice}>
                  Biggest price
                </Button>
              </Col>
              <Col component={{kind: 'colButtonOrder'}}>
                <Button onClick={this.onClickLowestPrice}>
                Lowest Price
                </Button>
              </Col>
            </Row>
          )}

          {tickerExchange &&
            !loadingExchange && (
            <List>
              {tickerExchange.markets.map((market, index) => {
                return index === 0 ? (
                  <ItemList
                    key={market.market}
                    component={{kind: 'itemSelected'}}
                  >
                    <Text.p component={{kind: 'labelInformations'}}>
                      <Text.bold>Market: </Text.bold>
                      { market.market}
                    </Text.p>
                    <Text.p component={{kind: 'labelInformations'}}>
                      <Text.bold>Price: </Text.bold>
                      { market.price}
                    </Text.p>
                    <Text.p component={{kind: 'labelInformations'}}>
                      <Text.bold>Volume: </Text.bold>
                      { market.volume}
                    </Text.p>
                  </ItemList>
                ) : (
                  <ItemList
                    key={market.market}
                    component={{kind: 'item'}}
                  >
                    <Text.p component={{kind: 'labelInformations'}}>
                      <Text.bold>Market: </Text.bold>
                      {market.market}
                    </Text.p>
                    <Text.p component={{kind: 'labelInformations'}}>
                      <Text.bold>Price: </Text.bold>
                      {market.price}
                    </Text.p>
                    <Text.p component={{kind: 'labelInformations'}}>
                      <Text.bold>Volume: </Text.bold>
                      {market.volume}
                    </Text.p>
                  </ItemList>
                );
              })}
            </List>
          )}
          {tickerExchange &&
            tickerExchange.markets.length === 0 && (
            <Text.p component={{kind: 'error'}}>
                We do not find any results.
            </Text.p>
          )}
          {chartCurrency &&
            chartCurrency.chartNow.response === 'Error' && (
            <Text.p component={{kind: 'error'}}>
              {`${chartCurrency.chartNow.message}.. So we can't show the chart`}
            </Text.p>
          )}
        </Container>
      </ThemeProvider>
    );
  }
}

Home.propTypes = {
  selectCity: PropTypes.func,
  testAction: PropTypes.func
};

function mapStateToProps(state) {
  return {
    applicationInformations: state.ApplicationInformations,
    exchangeCurrency: state.ExchangeCurrency,
    errorExchange: state.ExchangeCurrency.exchange.error,
    tickerExchange: state.ExchangeCurrency.exchange.ticker,
    loadingExchange: state.ExchangeCurrency.loadingExchange,
    chartCurrency: state.ChartCurrency
  };
}

export default connect(
  mapStateToProps,
  {
    getAllCryptocurrencies,
    selectCurrency,
    sortLowest,
    sortHighest,
    selectDataChart
  }
)(Home);
