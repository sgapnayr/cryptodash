import React from 'react'
import PieChart from '../charts/pie'
import BarChart from '../charts/bar'

const Charts = ({ grabCoinClicked }) => {
    return (
        <>
            <div className="Charts">
                <div className="Chart">
                    <div className="ChartTitle">
                        <p className='ChartInfo'>Price Data</p>
                        <h1>{grabCoinClicked.toUpperCase()}</h1>
                    </div>
                    <div className="ChartWrapper PieChart">
                        <PieChart grabCoinClicked={grabCoinClicked} />
                    </div>
                </div>
                <div className="Chart Chart2">
                    <div className="ChartTitle">
                        <p className='ChartInfo'>Market Cap</p>
                        <h1>{grabCoinClicked.toUpperCase()}</h1>
                    </div>
                    <div className="ChartWrapper BarChart">
                        <BarChart grabCoinClicked={grabCoinClicked} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Charts