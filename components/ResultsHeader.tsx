import Hoverable from "@/components/Hoverable"
import { Button } from "@/components/ui/button"

import downloadBooks from '@/app/utils/downloadBooks'
import { CgExport } from "react-icons/cg"
import { Book } from "@prisma/client"

interface ResultsHeaderProps {
  books: Book[]
}

/**
 * This component is a header than renders a title and displays a button to export book data.
 * @param books the books to export 
 * @returns Results Header Component
 */
const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  books
}) => {
  return (
    <div className='flex justify-between items-center p-4'>
      <h2 className="text-lg font-bold outline-2 outline-neutral-500">Results</h2>
      <Hoverable message="Export all data as JSON">
        <Button onClick={() => downloadBooks(books)}>
          <div className='pr-2'>
            Export
          </div>
          <CgExport size={18}/>
        </Button>
      </Hoverable>
    </div>
  )
}
export default ResultsHeader