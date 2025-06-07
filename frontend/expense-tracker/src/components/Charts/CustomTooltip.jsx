import React from 'react'

const CustomTooltip = ({active, payload, coordinate}) => {
  if (active && payload && payload.length){
    return (
        <div 
          className='bg-white shadow-md rounded-lg p-3 border border-gray-300'
          style={{
            position: 'absolute',
            left: coordinate?.x + 10 || 0,
            top: coordinate?.y - 50 || 0,
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            pointerEvents: 'none',
            minWidth: '140px'
          }}
        >
            <p className='text-sm font-semibold text-purple-800 mb-2'>{payload[0].name}</p>
            <p className='text-sm text-gray-600 flex justify-between items-center'>
                <span>Amount:</span>
                <span className='text-sm font-medium text-gray-900 ml-2'>${payload[0].value}</span>
            </p>
        </div>
    );
  }
  return null;
}

export default CustomTooltip