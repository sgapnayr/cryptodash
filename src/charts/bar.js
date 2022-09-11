
import React, { useEffect, useState } from 'react'
import { Chart as Chartjs } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import axios from 'axios'

export default function ShowChart({ grabCoinClicked }) {
    const [apiData, setApiData] = useState([])
    const url = `https://api.coingecko.com/api/v3/coins/${grabCoinClicked}/market_chart?vs_currency=usd&days=30`

    async function GetData() {
        await axios.get(url).then(res => setApiData(res.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        GetData()
    }, [])

    const priceData = apiData?.market_caps?.map(el => el[1])
    const volumeLabels = apiData?.total_volumes?.map(el => new Date(el[0]).getDate().toString()).map(el => el.length === 1 ? `0${el}` : el)

    const data = {
        labels: volumeLabels?.slice(0, 8),
        datasets: [
            {
                label: grabCoinClicked,
                data: priceData,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 3,
                fontStyle: "bold",
                fill: false,
                data: priceData?.slice(0, 300),
            }]
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            layout: {
                padding: 1,
            },
            responsive: true,
            maintainAspectRatio: false,
        },
        elements: {
            point: {
                radius: 2,
            },
        },
        scales: {
            y: {
                grid: {
                    display: false,
                    drawTicks: false,
                },
                ticks: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    display: false,
                },
            },
        },
    };
    return (
        <>
            <div className="Chart2">
                <Bar data={data} options={options} />
            </div>
        </>
    )
}
