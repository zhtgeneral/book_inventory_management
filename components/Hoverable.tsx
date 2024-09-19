import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import React, { ReactNode } from "react"

interface HoverableProps {
  children?: ReactNode,
  message?: string
}

const Hoverable: React.FC<HoverableProps> = ({
  children,
  message
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {children}  
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default Hoverable

