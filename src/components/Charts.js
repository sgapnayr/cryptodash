import React from 'react'
import LineChart from '../charts/line'
import BarChart from '../charts/bar'

const Charts = () => {
    return (
        <>
            <div className="Charts">
                <div className="Chart">
                    <LineChart />
                </div>
                <div className="Chart">
                    <BarChart />
                </div>
            </div>
        </>
    )
}

export default Charts