import { Inventory } from "@/types"
import { useState } from "react";
import { format } from 'date-fns';

interface BooksDisplayProps {
  books: Inventory[]
}

/**
 * This is the component that renders all the books. 
 * 
 * The table has 5 columns: Title, Author, Genre, Publication Date, ISBN.
 * Each columns displays the correct info about the book formatted correctly.
 * If the entry name is too long, it gets cut off with 3 dots.
 * 
 * When the display becomes narrow, the table shows a horizontal scroll bar so the user
 * can see all the entries.
 * 
 * When the number of books exceeds the height of the screen, the table should continue to 
 * display the rows without a vertical scroll bar.
 * 
 * @param books All the books from the database
 * @returns A component that renders all the books.
 */
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