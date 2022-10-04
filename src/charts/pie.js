import React, { useEffect, useState } from 'react'
import { Chart as Chartjs } from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import axios from 'axios'

export default function ShowChart({ grabCoinClicked }) {
    const [apiData, setApiData] = useState([])
    const url = `https://api.coingecko.com/api/v3/coins/${grabCoinClicked}/market_chart?vs_currency=usd&days=30`
    console.log(url)

    async function GetData() {
        await axios.get(url).then(res => setApiData(res.data)).catch(err => console.log(err))
    }

    useEffect(() => {
        GetData()
    }, [])

    const priceData = apiData?.prices?.map(el => el[1])
    const volumeLabels = apiData?.total_volumes?.map(el => new Date(el[0]).getDate().toString()).map(el => el.length === 1 ? `0${el}` : el)

    const data = {
        labels: volumeLabels?.slice(0, 30),
        datasets: [
            {
                label: grabCoinClicked,
                data: priceData,
                backgroundColor: [
                    'rgba(96, 95, 94, 0.2)'
                ],
                PieTension: .5,
                borderColor: [
                    'rgb(251, 54, 64)',
                    'rgb(96, 95, 94)',
                    'rgb(29, 52, 97)',
                    'rgb(31, 72, 126)',
                    'rgb(36, 123, 160)',
                ],
                borderWidth: 5,
                fontStyle: "bold",
                fill: true,
                data: priceData?.slice(0, 15),
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
                radius: 5,
            },
        },
        scales: {
            x: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            }],
            y: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                },
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 5
                }
            }]
        }
    };
    return (
        <>
            <div className="Chart2">
                <Pie data={data} options={options} />
            </div>
        </>
    )
}
