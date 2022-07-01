import React from 'react';
import * as R from 'ramda';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import AAPL from '../StubData/AAPL.js';

// Get data out of the obj
// Use props to get the keys in the correct order
// Convert date to ms time stamp
const deriveCandleStickData = R.pipe(
  R.prop('data'),
  R.map(R.props(['date', 'open', 'low', 'high', 'close']))
);

// adj_close: 135.43
// adj_high: null
// adj_low: null
// adj_open: null
// adj_volume: null
// close: 135.43
// date: "2022-06-15T00:00:00+0000"
// dividend: 0
// exchange: "XNAS"
// high: 137.34
// low: 132.16
// open: 134.29
// split_factor: 1
// symbol: "AAPL"
// volume: 91352700

const data = deriveCandleStickData(AAPL);
console.log(data);

export const StockData = () => {
  const options = {
    title: {
      text: 'My stock chart',
    },
    series: [
      {
        type: 'candlestick',
        data,
      },
    ],
  };
  return (
    <div id="StockData">
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  );
};
