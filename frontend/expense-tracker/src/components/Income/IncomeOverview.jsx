import React from 'react'
import {LuPlus} from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'
import { prepareIncomeBarChartData } from '../../utils/helper'
import { useState, useEffect } from 'react'

const IncomeOverview = ({transactions, onAddIncome}) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);
  return (
  <div className='card'>
    <div className = 'flex items-center justify-between'>
      <div className = ''>
        <h5 className ='text-lg'>Income Overview</h5>
        <p className='text-xs text-gray-400 mt-0.5'>
          Track your earnings over time and analyze your income trends
        </p>
      </div>

      <button className = 'flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-700 whitespace-nowrap bg-purple-100 border border-purple-300 rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-200' onClick = {onAddIncome}>
        <LuPlus className='text-lg'/>
        Add Income
      </button>
    </div>

    <div className='mt-10'>
      <CustomBarChart
        data={chartData}/>
    </div>
  </div>
  );
};

    


export default IncomeOverview