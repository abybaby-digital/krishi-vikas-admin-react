import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const ToolTipGlobal = ({ children, toolText }) => {
    return (
        <>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{toolText}</p>
                </TooltipContent>
            </Tooltip>
        </>
    )
}

export default ToolTipGlobal
