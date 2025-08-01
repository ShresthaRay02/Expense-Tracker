import React, { useEffect } from 'react'
import { useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomBarChart from '../Charts/CustomBarChart';

const Last30DaysExpenses = ({data = []}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            const result = prepareExpenseBarChartData(data);
            setChartData(result);
        } else {
            setChartData([]);
        }
    }, [data]);

    return (
        <div className='card col-span-1'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 30 Days Expenses</h5>
            </div>

            {chartData.length > 0 ? (
                <CustomBarChart data={chartData} />
            ) : (
                <div className="flex items-center justify-center h-48">
                    <p className="text-gray-500">No expense data available</p>
                </div>
            )}
        </div>
    );
};

export default Last30DaysExpenses;

