import React from 'react';
import * as R from 'ramda';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import AAPL from './StubData/APPL.js';

const deriveCandleStickData = R.identity;

const data = deriveCandleStickData(AAPL);

export const StockData = () => {
  const options = {
    title: {
      text: 'My stock chart',
    },
    series: [
      {
        type: 'candlestick',
        data: [
          [1593610200000, 91.28, 91.84, 90.98, 91.03],
          [1593696600000, 91.96, 92.62, 90.91, 91.03],
          [1593696800000, 91.96, 92.62, 90.91, 91.03],
        ],
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
