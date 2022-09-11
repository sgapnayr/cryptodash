import React, { useState } from 'react'

const Portfolio = () => {
    const [list, setList] = useState([])

    return (
        <>
            <div className="PortfolioPage">
                <div className="PortfolioList"></div>
            </div>
        </>
    )
}

export default Portfolio