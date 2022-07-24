import * as R from 'ramda';
import { useReducer } from 'react';

const handleBuyShares = (state, action) => {
  console.log('buyingShares');
  // buyingPower 1000 => 0
  // positions 0 => 10
  // sharePrice 100 => 100
  const sharePrice = R.prop('sharePrice', state);
  const buyingPower = R.prop('buyingPower', state);
  const positions = R.prop('positions', state);
  const availableShares = R.divide(buyingPower, sharePrice);
  const cost = R.multiply(availableShares, sharePrice);
  // sharePrice: 100
  // buyingPower: 1000
  // availableShares: 10
  // cost: 1000
  const newBuyingPower = R.subtract(buyingPower, cost);
  const newPositions = R.add(positions, availableShares);
  return R.pipe(
    R.assoc('buyingPower', newBuyingPower),
    R.assoc('positions', newPositions)
  )(state);
};

const handleSellShares = (state, action) => {
  // buyingPower 0 => 1000
  // positions 10 => 0
  // sharePrice 100 => 100
  const sharePrice = R.prop('sharePrice', state);
  const buyingPower = R.prop('buyingPower', state);
  const positions = R.prop('positions', state);
  const sellingPower = R.multiply(positions, sharePrice);
  // sharePrice: 100
  // buyingPower: 0
  // positions: 10
  // sellingPower: 1000
  const newBuyingPower = R.add(buyingPower, sellingPower);
  const newPositions = R.subtract(positions, positions);

  return R.pipe(
    R.assoc('buyingPower', newBuyingPower),
    R.assoc('positions', newPositions)
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

const initialState = { buyingPower: 1000, positions: 0, sharePrice: 100 };

export const useDataAccess = () => {
  const stateControl = useReducer(stateReducer, initialState);
  const [state, dispatch] = stateControl;
  const sharePrice = R.prop('sharePrice', state);
  const buyingPower = R.prop('buyingPower', state);
  const positions = R.prop('positions', state);
  const availableShares = R.divide(buyingPower, sharePrice);
  const buyShares = () => {
    console.log('buyShares');
    dispatch({ type: 'BUY_SHARES' });
  };
  const sellShares = () => {
    dispatch({ type: 'SELL_SHARES' });
  };
  const buyControl = [availableShares, buyShares];
  const sellControl = [positions, sellShares];
  return { stateControl, buyControl, sellControl };
};
