import { Inventory } from "@/types"
import { useState } from "react";
import { format } from 'date-fns';

interface BooksDisplayProps {
  books: Inventory[]
}

const BooksDisplay: React.FC<BooksDisplayProps> = ({
  books
}) => {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const handleRowClick = (bookId: number) => {
    setSelectedBookId(bookId === selectedBookId ? null : bookId);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">        
        <div className="flex gap-2 font-bold  p-2">
          <div className="w-[25%]">Title</div>
          <div className="w-[20%]">Author</div>
          <div className="w-[15%]">Genre</div>
          <div className="w-[20%]">Publication Date</div>
          <div className="w-[10%]">ISBN</div>
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
          {books.map((book) => (
            <div
              key={book.id}
              className={`flex gap-2 p-2 hover:bg-neutral-50 transition`}
              onClick={() => handleRowClick(book.id)}
            >
              <div className="truncate w-[25%]">{book.title}</div>
              <div className="truncate w-[20%]">{book.author}</div>
              <div className="w-[15%]" >{book.genre}</div>
              <div className="w-[20%]">{format(new Date(book.publication_date), 'yyyy-MM-dd')}</div>
              <div className="w-[15%]">{book.ISBN}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default BooksDisplay