import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Charts from './Charts'

const CoinTable = ({ search, currency, symbol }) => {
    const [coins, setCoins] = useState([])
    const [isSorted, setIsSorted] = useState(null)

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

    function GetData() {
        axios.get(url)?.then(res => setCoins(res.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        GetData()
    }, [currency, symbol])

    const handlePriceChange = () => {
        switch (isSorted) {
            case true:
                setIsSorted(false)
                break;
            case false:
                setIsSorted(null)
                break;
            case null:
                setIsSorted(true)
                break;
            default:
                setIsSorted(null)
                break;
        }
    }

    const filteredCoinList = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase())).sort(!isSorted && isSorted !== false ? (a, b) => a.market_cap_rank - b.market_cap_rank : isSorted ? (a, b) => a.current_price - b.current_price : (b, a) => a.current_price - b.current_price)

    return (
        <>
            <Charts />
            <div className="CoinTable">
                <div className="CoinHeader">
                    <div className="Bold CoinDiv">#</div>
                    <div className="Bold CoinNameDiv">Name</div>
                    <div className="Bold CoinDiv"></div>
                    <div className="Bold CoinDiv Price" onClick={handlePriceChange}>Price {!isSorted && isSorted === false ? '↑' : isSorted ? '↓' : ' ↕'}</div>
                    <div className="Bold CoinDiv">1h</div>
                    <div className="Bold CoinDiv">24h</div>
                    <div className="Bold CoinDiv">Market Cap</div>
                    <div className="Bold CoinDiv">Volume</div>
                </div>
                <div className="CoinsList">
                    {filteredCoinList.map(coin => {
                        return (
                            <Link to={`/coin/${coin.id}`} coinId={coin.id} >
                                <>
                                    <div className="CoinContainer">
                                        <div className="CoinDiv">{coin?.market_cap_rank}</div>
                                        <div className="CoinDiv CoinNameDiv">
                                            <img src={coin?.image} alt="" />
                                            {coin?.name} ({coin?.symbol?.toUpperCase()})</div>
                                        <div className="CoinDiv"></div>
                                        <div className="CoinDiv PriceDiv">{symbol}{coin?.current_price.toLocaleString()}</div>
                                        <div className={coin?.price_change_percentage_24h
                                            > 0 ? 'CoinDiv red' : 'CoinDiv green'}>{coin?.price_change_percentage_24h.toFixed(2)
                                            }</div>
                                        <div className={coin?.price_change_percentage_24h
                                            > 0 ? 'CoinDiv red' : 'CoinDiv green'}>{coin?.market_cap_change_percentage_24h.toFixed(2)
                                            }</div>
                                        <div className="CoinDiv"><em>Chart</em></div>
                                        <div className="CoinDiv"><em>Chart</em></div>
                                    </div>
                                </>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default CoinTable