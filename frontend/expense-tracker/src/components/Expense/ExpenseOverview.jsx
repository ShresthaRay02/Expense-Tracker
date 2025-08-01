import React, { useState, useEffect } from 'react'
import {LuPlus} from 'react-icons/lu'
import { prepareExpenseLineChartData } from '../../utils/helper'
import CustomLineChart from '../Charts/CustomLineChart'

const ExpenseOverview = ({transactions, onExpenseIncome}) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => {};
    }, [transactions]);

  return <div className='card'>
    <div className='flex items-center justify-between'>
        <div className = ''>
            <h5 className='text-lg'>Expense Overview</h5>
            <p className='text-sm text-gray-400 mt-0.5'>
                Track your spending trends over time and again insights into where your money goes
            </p>
        </div>

        <button className='flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-700 whitespace-nowrap bg-purple-100 border border-purple-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-400' onClick={onExpenseIncome}>
            <LuPlus className='text-lg'/>
            Add Expense
        </button>    
    </div>

    <div className='mt-10'>
        <CustomLineChart data={chartData}/>
    </div>
    </div>
}

export default ExpenseOverview