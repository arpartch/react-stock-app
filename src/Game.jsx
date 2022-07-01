import React from 'react';
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
} from './components';
import style from 'styled-components';

export const Game = () => {
  return (
    <Style>
      <StockData />
      <BuyButton />
      <BuyingPower />
      <Goal />
      <Header />
      <Positions />
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
"BuyingPower Gains RandoButton" minmax(50px, 1fr) 
"Header Header Header" minmax(80px, 1fr)
"Positions Positions Positions" minmax(80px, 1fr) 
"Goal Goal Goal" minmax(80px, 1fr)

 / minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
#StockData{grid-area: StockData; background-color: red}; 
#BuyButton{grid-area: BuyButton; background-color: blue}};
#SellButton{grid-area: SellButton; background-color: pink}};
#BuyingPower{grid-area: BuyingPower; background-color: yellow}};
#RandoButton{grid-area: RandoButton; background-color: green}};
#Header{grid-area: Header; background-color: purple}};
#Positions{grid-area: Positions; background-color: aqua}};
#Goal{grid-area: Goal; background-color: hotpink}};
#Gains{grid-area: Gains; background-color: lightblue}};
>div {outline: 1px solid black}
`;
