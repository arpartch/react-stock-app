import * as R from 'ramda';
import { useReducer } from 'react';

const handleBuyShares = (state, action) => {
  console.log('buyingShares');
  return state;
};

const isBuyShares = R.pipe(
  (state, action) => R.prop('type', action),
  R.equals('BUY_SHARES')
);

const stateReducer = (state, action) => {
  return R.cond([
    [isBuyShares, handleBuyShares],
    [R.T, (state) => state],
  ])(state, action);
};

const initialState = { buyingPower: 1000, positions: 5, sharePrice: 100 };

export const useDataAccess = () => {
  const stateControl = useReducer(stateReducer, initialState);
  const [state, dispatch] = stateControl;
  const sharePrice = R.prop('sharePrice', state);
  const buyingPower = R.prop('buyingPower', state);
  const availableShares = R.divide(buyingPower, sharePrice);
  const buyShares = () => {
    console.log('buyShares');
    dispatch({ type: 'BUY_SHARES' });
  };
  const buyControl = [availableShares, buyShares];
  return { stateControl, buyControl };
};
