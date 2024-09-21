import { ReactNode } from "react"

interface PanelProps {
  children?: ReactNode,
  style?: string
}

/**
 * This component renders components inside a panel with custom styling.
 * 
 * The styling is thin grey outline, white background, light shadow, and rounded corners.
 * 
 * @param children Optional (recommended) components that the panel renders
 * @param style Optional Tailwind css styles.
 * @returns Panel component
 */
const Panel: React.FC<PanelProps> = ({
  children,
  style,
}) => {
  const styles: string = "bg-white h-full rounded-lg outline outline-1 outline-gray-300 shadow-md shadow-neutral-200 " + style;
  return (
    <div className={styles}>
      {children}
    </div>
  )
}
export default Panel