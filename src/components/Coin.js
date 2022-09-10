import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const Coin = ({ handleClearSearch, symbol, currency }) => {
    const [coin, setCoin] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const params = useParams()
    const coinClicked = params.coinId

    const url = `https://api.coingecko.com/api/v3/coins/${coinClicked}`

    function GetData() {
        axios.get(url).then(res => setCoin(res.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        GetData()
        handleClearSearch()
    }, [coinClicked, symbol])

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <Link to='/' className='GoHome'>Go Home</Link>
            <div className="CoinPage">
                <div className="TopDiv">
                    <div className="CoinImage Hover">
                        <div className="CoinMarketRank">
                            #{coin?.market_cap_rank}
                        </div>
                        <img src={coin?.image?.large} alt="..." className='CoinImageImage' />
                        <div className='CoinName'>{coin.name} ({coin?.symbol?.toUpperCase()})</div>
                    </div>
                    <div className="CoinPrice Hover">
                        <h2>
                            {symbol} {coin?.market_data?.current_price.usd.toLocaleString()}
                        </h2>
                        <p className='green'>
                            ATH: {symbol} {coin?.market_data?.ath.usd.toLocaleString()}
                        </p>
                        <p>
                            {/* {coin?.market_data?.ath_date.usd} */}
                        </p>
                        <p className='red'>
                            ATL: {symbol} {coin?.market_data?.atl.usd.toLocaleString()}
                        </p>
                        <p>
                            {/* {coin?.market_data?.atl_date.usd} */}
                        </p>
                    </div>
                    <div className="CoinStats Hover">
                        <div className="CoinStatsContainer">
                            <h4>
                                Market Cap
                            </h4>
                            <p className='CoinStatInfo'>
                                {symbol}{coin?.market_data?.market_cap?.usd?.toLocaleString()}
                            </p>
                            <h4>
                                Volume
                            </h4>
                            <p className='CoinStatInfo'>
                                {symbol}{coin?.market_data?.total_volume?.usd?.toLocaleString()}
                            </p>
                            <h4>
                                Circ. Supply
                            </h4>
                            <p className='CoinStatInfo'>
                                {coin?.market_data?.circulating_supply?.toLocaleString()} {coin?.symbol?.toUpperCase()}
                            </p>
                            <h4>
                                Total Supply
                            </h4>
                            <p className='CoinStatInfo'>
                                {coin?.market_data?.total_supply?.toLocaleString()} {coin?.symbol?.toUpperCase()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="BottomDiv">
                    <div className="CoinDescription Hover" onClick={handleOpen}>
                        <div className='CoinDescriptionHeader'>
                            <h4>Coin Description</h4>
                        </div>
                        <div className="Description">
                            {coin?.description?.en.length <= 400 && coin?.description?.en.length != 0 ? coin?.description?.en : coin?.description?.en.length === 0 ? 'There is no description for this currency.' : isOpen ? coin?.description?.en : coin?.description?.en.slice(0, 400) + ' ...'}
                        </div>
                        {coin?.description?.en.length >= 400 ? <button onClick={handleOpen}>{isOpen ? 'Show Less' : 'Show More'}</button> : ''}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Coin