import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setSyntheticLeadingComments } from 'typescript'

const Portfolio = ({ currency, symbol }) => {
    const [coins, setCoins] = useState([])

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

    function GetData() {
        axios.get(url).then(res => setCoins(res.data)).then(err => console.log(err))
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <>
            <Link to='/' className='GoHome'>Go Home</Link>
            <div className="PortfolioPage">
                <div className="PortfolioTitle">
                    <h1>Portfolio</h1>
                    <p className='PortfolioInfo'>My selection of currencies...</p>
                </div>
                <div className="PortfolioList">
                    {coins.map(coin => {
                        return (
                            <>
                                <div className="PortfolioCoinContainer">
                                    <div className="CoinDiv">
                                        <img src={coin.image} alt="" />
                                    </div>
                                    <div className="CoinDiv">
                                        <div>{coin.name} ({coin.symbol.toUpperCase()})</div>
                                    </div>
                                    <div className="CoinDiv">
                                        {symbol}{coin.current_price.toLocaleString()}
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Portfolio