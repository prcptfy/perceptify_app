"use client"

import React from 'react'
import './tooltip.css'

type props = {
    icon?: React.ReactNode,
    text?: string,
    tooltip: string,
}


const Tooltip: React.FC<props> = ({icon, text, tooltip}) => {
    return (
        <div className="tooltip">{icon || text}
            <span className="tooltiptext p-1 text-xs">{tooltip}</span>
        </div>
    )
}

export default Tooltip;