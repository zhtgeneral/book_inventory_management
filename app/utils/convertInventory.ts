import { DisplayInventory, Inventory } from "@/types";

export default function convertInventory(book: Inventory): DisplayInventory {
  const displayInventory = {
    id: book.id,
    title: book.title,
    author: book.author,
    genre: book.genre,
    publication_date: book.publication_date.toString(),
    ISBN: book.ISBN
  }
  return displayInventory;
}