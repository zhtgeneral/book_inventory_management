import { SearchParams } from "@/types/searchParams";
import { Book } from "@prisma/client";
import { useMemo } from "react";

/**
 * Function that returns the book after a search.
 * 
 * Whenever `books` of `searchParams` gets changed, this will trigger the books to be filtered again.
 * 
 * @param books the books to search from
 * @param searchParams the parameters used to search
 * @returns the books that meet the search criteria
 */
export default function FilterBooks(books: Book[], searchParams: SearchParams) {
  return useMemo(() => {
    return books.filter((book: Book) => {
      const matchesTitle = !searchParams.title || book.title.toLowerCase().includes(searchParams.title.toLowerCase());
      const matchesAuthor = !searchParams.author || book.author.toLowerCase().includes(searchParams.author.toLowerCase());
      const matchesGenre = !searchParams.genre || book.genre === searchParams.genre;
      const matchesYear = !searchParams.year || new Date(book.publication_date).getFullYear() === searchParams.year;
      
      return matchesTitle && matchesAuthor && matchesGenre && matchesYear;
    });
  }, [books, searchParams]);
}

