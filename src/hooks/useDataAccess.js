import * as R from 'ramda';
import { useReducer } from 'react';
import AAPL from '../StubData/AAPL.js';

const handleBuyShares = (state, action) => {
  console.log('buyingShares');
  // buyingPower 1000 => 0
  // positions 0 => 10
  // sharePrice 100 => 100
  const sharePrice = R.prop('sharePrice', state);
  const buyingPower = R.prop('buyingPower', state);
  const positions = R.prop('positions', state);
  const currentIndex = R.prop('currentIndex', state);
  const data = R.prop('data', state);
  console.log({ data });
  const availableShares = Math.floor(R.divide(buyingPower, sharePrice));
  const cost = R.multiply(availableShares, sharePrice);
  // sharePrice: 100
  // buyingPower: 1000
  // availableShares: 10
  // cost: 1000
  const newBuyingPower = R.subtract(buyingPower, cost);
  const newPositions = R.add(positions, availableShares);
  const newCurrentIndex = R.inc(currentIndex);
  const newSharePrice = R.pipe(R.nth(newCurrentIndex), R.last)(data);
  return R.pipe(
    R.assoc('buyingPower', newBuyingPower),
    R.assoc('positions', newPositions),
    R.assoc('currentIndex', newCurrentIndex),
    R.assoc('sharePrice', newSharePrice)
  )(state);
};

const handleSellShares = (state, action) => {
  // buyingPower 0 => 1000
  // positions 10 => 0
  // sharePrice 100 => 100
  const sharePrice = R.prop('sharePrice', state);
  const buyingPower = R.prop('buyingPower', state);
  const positions = R.prop('positions', state);
  const currentIndex = R.prop('currentIndex', state);
  const data = R.prop('data', state);
  const sellingPower = R.multiply(positions, sharePrice);
  // sharePrice: 100
  // buyingPower: 0
  // positions: 10
  // sellingPower: 1000
  const newBuyingPower = R.add(buyingPower, sellingPower);
  const newPositions = R.subtract(positions, positions);
  const newCurrentIndex = R.inc(currentIndex);
  const newSharePrice = R.pipe(R.nth(newCurrentIndex), R.last)(data);
  return R.pipe(
    R.assoc('buyingPower', newBuyingPower),
    R.assoc('positions', newPositions),
    R.assoc('currentIndex', newCurrentIndex),
    R.assoc('sharePrice', newSharePrice)
  )(state);
};

const isBuyShares = R.pipe(
  (state, action) => R.prop('type', action),
  R.equals('BUY_SHARES')
);

const isSellShares = R.pipe(
  (state, action) => R.prop('type', action),
  R.equals('SELL_SHARES')
);

const stateReducer = (state, action) => {
  return R.cond([
    [isBuyShares, handleBuyShares],
    [isSellShares, handleSellShares],
    [R.T, (state) => state],
  ])(state, action);
};

const deriveCandleStickData = R.pipe(
  R.prop('data'),
  R.map(R.props(['date', 'open', 'low', 'high', 'close']))
);

const data = deriveCandleStickData(AAPL);

const initialState = {
  buyingPower: 1000,
  positions: 0,
  sharePrice: 135.43,
  data,
  currentIndex: 10,
};

export const useDataAccess = () => {
  const stateControl = useReducer(stateReducer, initialState);
  const [state, dispatch] = stateControl;
  const sharePrice = R.prop('sharePrice', state);
  const buyingPower = R.prop('buyingPower', state);
  const positions = R.prop('positions', state);
  const currentIndex = R.prop('currentIndex', state);
  const availableShares = Math.floor(R.divide(buyingPower, sharePrice));
  const buyShares = () => {
    console.log('buyShares');
    dispatch({ type: 'BUY_SHARES' });
  };
  const sellShares = () => {
    dispatch({ type: 'SELL_SHARES' });
  };
  const buyControl = [availableShares, buyShares];
  const sellControl = [positions, sellShares];
  const visibleDataControl = [R.slice(0, currentIndex)(data)];
  return { stateControl, buyControl, sellControl, visibleDataControl };
};
