import { Inventory, SearchParams } from "@/types";
import { useMemo } from "react";

/**
 * Function that returns the book after a search.
 * 
 * @param books the books to search from
 * @param searchParams the parameters used to search
 * @returns the books that meet the search criteria
 */
export default function FilterBooks(books: Inventory[], searchParams: SearchParams) {
  return useMemo(() => {
    return books.filter((book: Inventory) => {
      const matchesTitle = !searchParams.title || book.title.toLowerCase().includes(searchParams.title.toLowerCase());
      const matchesAuthor = !searchParams.author || book.author.toLowerCase().includes(searchParams.author.toLowerCase());
      const matchesGenre = !searchParams.genre || book.genre === searchParams.genre;
      const matchesYear = !searchParams.year || new Date(book.publication_date).getFullYear() === searchParams.year;
      
      return matchesTitle && matchesAuthor && matchesGenre && matchesYear;
    });
  }, [books, searchParams]);
}

