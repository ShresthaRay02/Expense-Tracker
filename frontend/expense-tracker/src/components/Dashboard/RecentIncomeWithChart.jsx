import React, { useState, useEffect } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'
import { addThousandsSeperator } from '../../utils/helper';

const COLORS = ['#875CF5','#FA2C37','#FF6900','#4f39f6']

const RecentIncomeWithChart = ({data, totalIncome}) => {
    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        console.log('Raw income data:', data);
        
        if (!data || data.length === 0) {
            // If no data, show total income as a single slice
            setChartData([{
                name: 'Total Income',
                amount: totalIncome || 0
            }]);
            return;
        }

        // Filter for income transactions and group by source
        const incomeTransactions = data.filter(item => item.type === 'income');
        console.log('Income transactions:', incomeTransactions);

        if (incomeTransactions.length === 0) {
            setChartData([{
                name: 'Total Income',
                amount: totalIncome || 0
            }]);
            return;
        }

        // Group income by source
        const incomeBySource = incomeTransactions.reduce((acc, item) => {
            const source = item?.source || 'Unknown Source';
            if (!acc[source]) {
                acc[source] = 0;
            }
            acc[source] += item?.amount || 0;
            return acc;
        }, {});

        // Convert to array format for chart
        const dataArr = Object.entries(incomeBySource).map(([source, amount]) => ({
            name: source,
            amount: amount
        }));

        console.log('Processed chart data:', dataArr);
        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();
        return () => {};
    }, [data, totalIncome]);

    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${addThousandsSeperator(totalIncome)}`}
                showTextAnchor={true}
                colors={COLORS}
            />
        </div>
    )
}

export default RecentIncomeWithChart