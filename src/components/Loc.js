import React from 'react';
export function Loc({ value }) {
    const colors = ['#3b3', '#380', '#fa0', '#f60', '#f00'];
    const color = colors[Math.min(~~(value / 200), colors.length - 1)];
    return <span style={{color}}>{value} loc</span>;
}