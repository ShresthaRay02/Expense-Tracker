import React from 'react'
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor}) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '380px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie 
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index%colors.length]}/>
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend content={<CustomLegend/>}/>
        </PieChart>
      </ResponsiveContainer>
      {showTextAnchor && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          width: '200px',
          height: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          marginTop: '-10px'
        }}>
          <div style={{ 
            color: '#666', 
            fontSize: '16px', 
            fontWeight: '500',
            lineHeight: '1.2'
          }}>
            {label}
          </div>
          <div style={{ 
            color: '#333', 
            fontSize: '20px', 
            fontWeight: '600',
            lineHeight: '1.2'
          }}>
            {totalAmount}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomPieChart