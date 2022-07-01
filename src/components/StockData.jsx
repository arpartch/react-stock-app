import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useQuery } from 'react-query';
import axios from 'axios';
import yahooStockAPI from 'yahoo-stock-api';

const url =
  'http://api.marketstack.com/v1/eod?access_key=93b017b6b17fcc0404263e330e600263&symbols=AAPL';
const serviceGet = async function getData() {
  const actualData = await fetch(url).then((response) => response.json());
};

export const StockData = () => {
  const queryBundle = useQuery('stockData', serviceGet);
  console.log(queryBundle);

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
