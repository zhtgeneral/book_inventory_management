import { Inventory } from "@/types";

/**
 * Downloads the books on the client so the user can access them.
 * 
 * @param books the books to download
 */
export default function downloadBooks(books: Inventory[])  {
  const jsonString = JSON.stringify(books, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'books_inventory.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};