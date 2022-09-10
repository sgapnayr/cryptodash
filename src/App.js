import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar'
import Charts from './components/Charts';
import CoinTable from './components/CoinTable';
import Coin from './components/Coin';
import Portfolio from './components/Portfolio';

function App() {
  const [search, setSearch] = useState('')
  const [currency, setCurrency] = useState('usd')
  const [symbol, setSymbol] = useState('$')
  const [isToggled, setIsToggled] = useState(true)

  const handleToggle = () => {
    setIsToggled(!isToggled)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

  const handleSetSymbol = (currency) => {
    if (currency === 'usd') {
      setSymbol('$')
    } else if (currency === 'eur') {
      setSymbol('€')
    } else if (currency === 'jpy') {
      setSymbol('¥')
    } else if (currency === 'eth') {
      setSymbol('Ξ')
    } if (currency === 'btc') {
      setSymbol('₿')
    }
  }

  const handleSetCurrency = (e) => {
    const { value } = e.target
    setCurrency(value.toLowerCase())
    handleSetSymbol(value.toLowerCase())
  }

  return (
    <div className={isToggled ? 'App' : 'App DayMode'}>
      <NavBar handleChange={handleChange} handleSetCurrency={handleSetCurrency} search={search} handleToggle={handleToggle} isToggled={isToggled} handleClearSearch={handleClearSearch} />
      <Routes>
        <Route path='/' element={<CoinTable search={search} currency={currency} symbol={symbol} />} />
        <Route path='/coin/:coinId' element={<Coin handleClearSearch={handleClearSearch} symbol={symbol} currency={currency} />} />
        <Route path='/portfolio' element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
