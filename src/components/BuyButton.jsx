import React from 'react';
import Button from '@mui/material/Button';

export const BuyButton = ({ onClick, availableShares }) => {
  return (
    <div id="BuyButton">
      <Button variant="text" onClick={onClick}>
        Buy {availableShares} Shares
      </Button>
    </div>
  );
};
