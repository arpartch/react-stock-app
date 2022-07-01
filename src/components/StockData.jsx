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

const data = deriveCandleStickData(AAPL);
console.log(data);

export const StockData = ({ index = 10 }) => {
  const options = {
    title: {
      text: 'AAPL stock chart',
    },
    series: [
      {
        type: 'candlestick',
        data: R.slice(0, index, data),
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
