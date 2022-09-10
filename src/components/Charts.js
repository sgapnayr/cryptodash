import React from 'react'
import PieChart from '../charts/pie'
import BarChart from '../charts/bar'

const Charts = () => {
    return (
        <>
            <div className="Charts">
                <div className="Chart">
                    <div className="ChartTitle">
                        <p className='ChartInfo'>Price Data</p>
                        <h1>Bitcoin</h1>
                    </div>
                    <div className="ChartWrapper PieChart">
                        <PieChart />
                    </div>
                </div>
                <div className="Chart Chart2">
                    <div className="ChartTitle">
                        <p className='ChartInfo'>Market Cap</p>
                        <h1>Bitcoin</h1>
                    </div>
                    <div className="ChartWrapper BarChart">
                        <BarChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Charts