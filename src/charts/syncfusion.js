import React from 'react';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, LineSeries, DateTime, Legend, Tooltip } from '@syncfusion/ej2-react-charts';

const LineChart = () => {

    return (
        <ChartComponent
            id="line-chart"
            height="420px"
            primaryXAxis={'LinePrimaryXAxis'}
            primaryYAxis={'LinePrimaryYAxis'}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={'#33373E'}
            legendSettings={{ background: 'white' }}
        >
            <Inject services={[LineSeries, DateTime, Legend, Tooltip]} />
            <SeriesCollectionDirective>

            </SeriesCollectionDirective>
        </ChartComponent>
    );
};

export default LineChart;