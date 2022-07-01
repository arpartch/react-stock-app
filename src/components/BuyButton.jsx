import React from 'react';
import Button from '@mui/material/Button';

export const BuyButton = ({ onClick }) => {
  return (
    <div id="BuyButton">
      <Button variant="text" onClick={onClick}>
        BuyButton
      </Button>
    </div>
  );
};
