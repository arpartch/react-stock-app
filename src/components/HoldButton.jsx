import React from 'react';
import Button from '@mui/material/Button';

export const HoldButton = ({ onClick }) => {
  
  return (
    <div id="HoldButton">
      <Button variant="text" onClick={onClick}>
        HoldButton
      </Button>
    </div>
  );
};
