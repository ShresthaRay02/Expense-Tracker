import React from 'react'
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from "recharts";
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor}) => {
  console.log('PieChart received data:', data);
  console.log('PieChart received colors:', colors);

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
            {data.map((entry, index) => {
              const color = colors[index % colors.length];
              console.log(`Slice ${index} (${entry.name}) using color:`, color);
              return <Cell key={`cell-${index}`} fill={color}/>;
            })}
          </Pie>
          <Tooltip content={<CustomTooltip/>}/>
          <Legend 
            content={<CustomLegend/>}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
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
          gap: '8px',
          zIndex: 1
        }}>
          <div style={{ 
            color: '#666', 
            fontSize: '16px', 
            fontWeight: '500',
            lineHeight: '1.2',
            backgroundColor: 'white',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            {label}
          </div>
          <div style={{ 
            color: '#333', 
            fontSize: '20px', 
            fontWeight: '600',
            lineHeight: '1.2',
            backgroundColor: 'white',
            padding: '4px 8px',
            borderRadius: '4px'
          }}>
            {totalAmount}
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomPieChart