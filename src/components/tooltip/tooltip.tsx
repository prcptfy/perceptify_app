"use client"

import React from 'react'
import './tooltip.css'

type props = {
    icon: React.ReactNode,
    tooltip: string,
}


const Tooltip: React.FC<props> = ({icon, tooltip}) => {
    return (
        <div className="tooltip">{icon}
            <span className="tooltiptext p-1">{tooltip}</span>
        </div>
    )
}

export default Tooltip;