import { DisplayBook, Book } from "@/types";

export default function convertBook(book: Book): DisplayBook {
  const displayBook = {
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    publication_date: book.publication_date.toString(),
    ISBN: book.ISBN
  }
  return displayBook;
}