import React from 'react';
import * as R from 'ramda';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

export const StockData = ({ data = [] }) => {
  const options = {
    title: {
      text: 'AAPL stock chart',
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
