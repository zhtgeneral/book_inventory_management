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

/**
 * This is from ShadCN UI.
 * 
 * This component allows other components to display a message when hovered.
 * 
 * @param message the message that appears when component is hovered over
 * @returns Hoverable component
 */
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

