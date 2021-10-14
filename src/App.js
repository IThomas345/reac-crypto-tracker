import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import axios from 'axios';

import './App.css';
import Coin from './Coin';
import animationData from './lotties/57735-crypto-coins.json'

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()));

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false')
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      }).catch(error => {
        console.log(error);
      })
  })

  return (
    <div className="coin-app">
      <Lottie
        options={defaultOptions}
        height="30%"
        width="30%"
        speed={0.4}
      />
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>

        <form>
          <input type="text" placeholder="Search" className="coin-input"
            onChange={handleChange}
          />
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        )
      })}
    </div>
  );
}

export default App;
