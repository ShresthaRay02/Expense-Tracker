import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from 'moment';
import TransactionsInfoCard from '../Cards/TransactionsInfoCard';

const RecentIncome = ({transactions, onSeeMore}) => {
  console.log('RecentIncome - Raw transactions:', transactions);
  console.log('RecentIncome - Transactions type:', typeof transactions);
  console.log('RecentIncome - Is Array?', Array.isArray(transactions));
  
  // No need to filter since these are already income transactions
  const incomeTransactions = transactions || [];
  console.log('RecentIncome - Income transactions:', incomeTransactions);
  
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income</h5>

            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className='text-base'/>
            </button>
        </div>

        <div className='mt-6'>
            {incomeTransactions.length === 0 ? (
                <p className='text-gray-500 text-center py-4'>No income transactions found</p>
            ) : (
                incomeTransactions.map((item)=>(
                    <TransactionsInfoCard 
                        key = {item._id}
                        title = {item.source}
                        icon = {item.icon}
                        date = {moment(item.date).format('Do MMM YYYY')}
                        amount = {item.amount}
                        type = 'income'
                        hideDeleteBtn
                    />
                ))
            )}
        </div>
    </div>
  )
}

export default RecentIncome