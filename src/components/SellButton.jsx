import React from 'react';
import Button from '@mui/material/Button';

export const SellButton = ({ onClick, positions }) => {
  return (
    <div id="SellButton">
      <Button variant="text" onClick={onClick}>
        Sell {positions} Shares
      </Button>
    </div>
  );
};
