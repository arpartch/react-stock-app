import React from 'react';
import * as R from 'ramda';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';

export const StockData = ({ data = [] }) => {
  const options = {
    title: {
      text: 'AAPL stock chart',
    },
    chart: {
      height: '65%',
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
      <Style>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={'stockChart'}
          options={options}
        />
      </Style>
    </div>
  );
};

const Style = styled.div`
position: relative;
`;
