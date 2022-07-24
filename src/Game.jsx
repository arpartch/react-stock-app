import React, { useState } from 'react';
import * as R from 'ramda';
import {
  BuyButton,
  StockData,
  BuyingPower,
  Goal,
  Header,
  Positions,
  RandoButton,
  SellButton,
  StockData,
  GainLoss,
  HoldButton,
} from './components';
import { useDataAccess } from './hooks/useDataAccess.js';
import style from 'styled-components';
import AAPL from './StubData/AAPL.js';

const holdingLens = R.lensProp('holding');

const sharesLens = R.lensProp('shares');

// Get data out of the obj
// Use props to get the keys in the correct order
// Convert date to ms time stamp
const deriveCandleStickData = R.pipe(
  R.prop('data'),
  R.map(R.props(['date', 'open', 'low', 'high', 'close']))
);

const data = deriveCandleStickData(AAPL);

export const Game = () => {
  const { stateControl, buyControl } = useDataAccess();
  const [availableShares, buyShares] = buyControl;
  const [index, setIndex] = useState(10);
  const visibleData = R.slice(0, index)(data);
  const latestPrice = R.last(R.last(visibleData));
  const [position, setPosition] = useState({ holding: 1000, shares: 0 });
  const { shares } = position;
  const { holding } = position;

  const handleBuy = () => {
    const sharesToBuy = Math.round(R.divide(1000, latestPrice));
    const cashSpent = R.multiply(sharesToBuy, latestPrice);
    setPosition(
      R.pipe(
        R.over(holdingLens, R.subtract(R.__, cashSpent)),
        R.over(sharesLens, R.add(sharesToBuy))
      )
    );
  };

  const handleHold = () => {
    return setIndex(R.inc);
  };
  return (
    <Style>
      <StockData data={visibleData} />
      <BuyButton onClick={buyShares} availableShares={availableShares} />
      <HoldButton onClick={handleHold} />
      <BuyingPower holding={holding} />
      <Goal />
      <Header />
      <Positions position={shares} />
      <RandoButton />
      <SellButton />
      <GainLoss />
    </Style>
  );
};

const Style = style.section`
display: grid;
width: 100%;
height: 100vh;
grid-template: 
"StockData StockData BuyButton" minmax(50px, 1fr)
"StockData StockData SellButton" minmax(50px, 1fr)
"BuyingPower Gains HoldButton" minmax(50px, 1fr) 
"Header Header Header" minmax(80px, 1fr)
"Positions Positions Positions" minmax(80px, 1fr) 
"Goal Goal Goal" minmax(80px, 1fr)

 / minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
#StockData{grid-area: StockData; background-color: green}; 
#BuyButton{grid-area: BuyButton; background-color: blue}};
#HoldButton{grid-area: HoldButton; background-color: red}
#SellButton{grid-area: SellButton; background-color: pink}};
#BuyingPower{grid-area: BuyingPower; background-color: yellow}};
#RandoButton{grid-area: RandoButton; background-color: green}};
#Header{grid-area: Header; background-color: purple}};
#Positions{grid-area: Positions; background-color: aqua}};
#Goal{grid-area: Goal; background-color: hotpink}};
#Gains{grid-area: Gains; background-color: lightblue}};
>div {outline: 1px solid black}
`;
