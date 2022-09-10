import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Toggle from './Toggle/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function NavBar({ handleChange, handleSetCurrency, handleClearSearch, search, handleToggle, isToggled }) {
    const [isActive, setIsActive] = useState(true)

    const handleIsActive = (e) => {
        e.currentTarget.classList.toggle('isActive')
        setIsActive(!isActive)
    }

    const pathname = window.location.pathname

    return (
        <>
            <div className="NavBar">
                <div className="LeftSide NavBarSpacing">
                    <div className="LeftSideBox">
                        <Link to='/' >
                            <div onClick={handleIsActive} className={pathname === '/' ? 'isActive Button' : 'Button'}>Coin</div>
                        </Link>
                        <Link to='/portfolio' >
                            <div onClick={handleIsActive} className={pathname === '/portfolio' ? 'Button isActive' : 'Button'}>Portfolio</div>
                        </Link>
                    </div>
                </div>
                <div className="RightSide NavBarSpacing">
                    <div className="SearchBar">
                        <div className="MagnifyGlass">
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        <input type="text" onChange={handleChange} placeholder='Search Crypto Here...' value={search} />
                        <div className="ClearInput" onClick={handleClearSearch}>X</div>
                    </div>
                    <div className="CurrencyComponent">
                        <select name="" id="" className='selector' onChange={handleSetCurrency}>
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                            <option value="jpy">JPY</option>
                            <option value="eth">ETH</option>
                            <option value="btc">BTC</option>
                        </select>
                    </div>
                    <div className="ToggleComponent">
                        <div className="Toggle" onClick={handleToggle}><Toggle isToggled={isToggled} /></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar