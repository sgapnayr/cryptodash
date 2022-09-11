import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Charts from './Charts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { ListBarParent, ListBarChild, ListBarParent2, ListBarChild2, ListWrapper } from './Styled.Components.js'
import CoinPageChart from '../charts/CoinPageChart'

const CoinTable = ({ search, currency, symbol, grabCoinClicked }) => {
    const [coins, setCoins] = useState([])
    const [isSorted, setIsSorted] = useState(null)
    const [clicked, setClicked] = useState(false)

    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

    function GetData() {
        axios.get(url)?.then(res => setCoins(res.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        GetData()
    }, [currency, symbol, grabCoinClicked])

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

    const handleClickHeart = (e) => {
        e.currentTarget.classList.toggle('isClicked')
        console.log(e)
    }

    const filteredCoinList = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase())).sort(!isSorted && isSorted !== false ? (a, b) => a.market_cap_rank - b.market_cap_rank : isSorted ? (a, b) => a.current_price - b.current_price : (b, a) => a.current_price - b.current_price)

    return (
        <>
            <Charts grabCoinClicked={grabCoinClicked} />
            <div className="CoinTable">
                <div className="CoinHeader">
                    <div className="Bold CoinDiv">
                        <div className="FavIcon"></div>
                        #
                    </div>
                    <div className="Bold CoinNameDiv">Name</div>
                    <div className="Bold CoinDiv"></div>
                    <div className="Bold CoinDiv Price" onClick={handlePriceChange}>Price {!isSorted && isSorted === false ? '↑' : isSorted ? '↓' : ' ↕'}</div>
                    <div className="Bold CoinDiv">1h</div>
                    <div className="Bold CoinDiv">24h</div>
                    <div className="Bold CoinDiv">Market Cap</div>
                    <div className="Bold CoinDiv">Volume</div>
                </div>
                <div className="CoinsList">
                    {filteredCoinList.map((coin, i) => {
                        return (
                            <>
                                <div className="CoinContainer" key={coin}>
                                    <div className="CoinDiv">
                                        <div className="FavIcon" onClick={handleClickHeart}>
                                            <div className={clicked ? 'isClicked Heart' : 'Heart'} >
                                                <FontAwesomeIcon icon={faHeart} />
                                            </div>
                                        </div>{coin?.market_cap_rank}</div>
                                    <Link to={`/coin/${coin.id}`} coinId={coin.id} >
                                        <div className="CoinDiv CoinNameDiv">
                                            <img src={coin?.image} alt="" />
                                            {coin?.name} ({coin?.symbol?.toUpperCase()})</div>
                                    </Link>
                                    <div className="CoinDiv"></div>
                                    <div className="CoinDiv PriceDiv">{symbol}{coin?.current_price.toLocaleString()}</div>
                                    <div className={coin?.price_change_percentage_24h
                                        < 0 ? 'CoinDiv red' : 'CoinDiv green'}>{coin?.price_change_percentage_24h.toFixed(2)
                                        }%</div>
                                    <div className={coin?.price_change_percentage_24h
                                        < 0 ? 'CoinDiv red' : 'CoinDiv green'}>{coin?.market_cap_change_percentage_24h.toFixed(2)
                                        }%</div>
                                    <div className="CoinDiv">
                                        <ListWrapper>
                                            <div key={i} style={i % 1 === 0 ? { color: 'rgb(251, 54, 64)' } : {}}>
                                                <div key={i} style={i % 2 === 1 ? { color: 'rgb(96, 95, 94)' } : {}}>
                                                    <div key={i} style={i % 3 === 1 ? { color: 'rgb(29, 52, 97)' } : {}}>
                                                        <div key={i} style={i % 4 === 1 ? { color: 'rgb(31, 72, 126)' } : {}}>
                                                            <div key={i} style={i % 5 === 1 ? { color: 'rgb(36, 123, 160)' } : {}}>
                                                                <div className="ListBarDiv">
                                                                    <p className='ListBarInfo'>{symbol}{coin.market_cap > 1000000 && coin.market_cap < 1000000000 ? coin.market_cap.toString().charAt(0) + '.' + coin.market_cap.toString().charAt(1) + 'M' : coin.market_cap > 1000000000 ? coin.market_cap.toString().charAt(0) + '.' + coin.market_cap.toString().charAt(1) + 'B' : ''}</p>
                                                                    <p className='ListBarInfo'>{symbol}{coin.market_cap_change_24h < 1000000 ? 'N/A' : coin.market_cap_change_24h > 1000000 && coin.market_cap_change_24h < 1000000000 ? coin.market_cap_change_24h.toString().charAt(0) + '.' + coin.market_cap_change_24h.toString().charAt(1) + 'M' : coin.market_cap_change_24h > 1000000000 ? coin.market_cap_change_24h.toString().charAt(0) + '.' + coin.market_cap_change_24h.toString().charAt(1) + 'B' : ''}</p>
                                                                </div>
                                                                <ListBarParent>
                                                                    <div key={i} style={i % 1 === 0 ? { backgroundColor: 'rgb(251, 54, 64)' } : {}}>
                                                                        <div key={i} style={i % 2 === 1 ? { backgroundColor: 'rgb(96, 95, 94)' } : {}}>
                                                                            <div key={i} style={i % 3 === 1 ? { backgroundColor: 'rgb(29, 52, 97)' } : {}}>
                                                                                <div key={i} style={i % 4 === 1 ? { backgroundColor: 'rgb(31, 72, 126)' } : {}}>
                                                                                    <div key={i} style={i % 5 === 1 ? { backgroundColor: 'rgb(36, 123, 160)' } : {}}>
                                                                                        <ListBarChild marketCap24h={coin.market_cap_change_24h} marketCap={coin.market_cap}>
                                                                                        </ListBarChild>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </ListBarParent>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListWrapper>
                                    </div>
                                    <div className="CoinDiv">
                                        <ListWrapper>
                                            <div key={i} style={i % 1 === 0 ? { color: 'rgb(251, 54, 64)' } : {}}>
                                                <div key={i} style={i % 2 === 1 ? { color: 'rgb(96, 95, 94)' } : {}}>
                                                    <div key={i} style={i % 3 === 1 ? { color: 'rgb(29, 52, 97)' } : {}}>
                                                        <div key={i} style={i % 4 === 1 ? { color: 'rgb(31, 72, 126)' } : {}}>
                                                            <div key={i} style={i % 5 === 1 ? { color: 'rgb(36, 123, 160)' } : {}}>
                                                                <div className="ListBarDiv">
                                                                    <p className='ListBarInfo'>{symbol}{coin.total_volume < 1000000 ? 'N/A' : coin.total_volume > 1000000 && coin.total_volume < 1000000000 ? coin.total_volume.toString().charAt(0) + '.' + coin.total_volume.toString().charAt(1) + 'M' : coin.total_volume > 1000000000 ? coin.total_volume.toString().charAt(0) + '.' + coin.total_volume.toString().charAt(1) + 'B' : ''}</p>
                                                                    <p className='ListBarInfo'>{symbol}{coin.circulating_supply < 1000000 ? 'N/A' : coin.circulating_supply > 1000000 && coin.circulating_supply < 1000000000 ? coin.circulating_supply.toString().charAt(0) + '.' + coin.circulating_supply.toString().charAt(1) + 'M' : coin.circulating_supply > 1000000000 ? coin.circulating_supply.toString().charAt(0) + '.' + coin.circulating_supply.toString().charAt(1) + 'B' : ''}</p>
                                                                </div>
                                                                <ListBarParent2>
                                                                    <div key={i} style={i % 1 === 0 ? { backgroundColor: 'rgb(251, 54, 64)' } : {}}>
                                                                        <div key={i} style={i % 2 === 1 ? { backgroundColor: 'rgb(96, 95, 94)' } : {}}>
                                                                            <div key={i} style={i % 3 === 1 ? { backgroundColor: 'rgb(29, 52, 97)' } : {}}>
                                                                                <div key={i} style={i % 4 === 1 ? { backgroundColor: 'rgb(31, 72, 126)' } : {}}>
                                                                                    <div key={i} style={i % 5 === 1 ? { backgroundColor: 'rgb(36, 123, 160)' } : {}}>
                                                                                        <ListBarChild2 totalVolume={coin.total_volume} totalSupply={coin.circulating_supply}

                                                                                        ></ListBarChild2>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </ListBarParent2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListWrapper>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div >
        </>
    )
}

export default CoinTable