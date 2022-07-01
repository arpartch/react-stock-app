import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useQuery } from 'react-query';
import axios from 'axios';
import yahooStockAPI from 'yahoo-stock-api';

// const url =
//   'https://yfapi.net/v8/finance/chart/AAPL?range=1d&region=US&interval=5m&lang=en';
const serviceGet = async () => {
  const startDate = new Date('08/21/2020');
  const endDate = new Date('08/26/2020');
  return await yahooStockAPI.getHistoricalPrices(
    startDate,
    endDate,
    'AAPL',
    '1d'
  );
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
