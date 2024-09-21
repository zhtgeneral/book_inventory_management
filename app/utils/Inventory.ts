import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { formSchema } from "@/app/utils/zod";
import { Book } from "@prisma/client";

/**
 * This is the interface from which the client interacts with the book inventory.
 * As such, the client does not know the implementation for any of these methods.
 * 
 * This class has 4 public methods:
 * 
 * `createBook` creates a book in the database.
 * 
 * `readBooks` reads all the books from the database.
 * 
 * `updateBook` updates a book from the database. TODO
 * 
 * `deleteBook` deletes a the books from the database. TODO
 */
export class Inventory {

  /**
  * Adds a book to inventory
  * 
  * If error occurs, it propogates and needs to be handled in the client.
  * 
  * @param book the book to be added to database.
  */
  public static async createBook(bookData: z.infer<typeof formSchema>): Promise<void> {
    await axios.post('/api/books', bookData);
  }

  /**
 * Fetches all books from database.
 * 
 * If error occurs, it propogates and needs to be handled in the client.
 * 
 * @param callback function that handles the newly obtained books
 */
  public static async readBooks(callback: Dispatch<SetStateAction<Book[]>>): Promise<void> {
    const response = await axios.get<Book[]>('/api/books');
    if (callback) callback(response.data);  
  }

/**
 * Updates a book in the database.
 * 
 * If error occurs, it propogates and needs to be handled in the client.
 * 
 * @param callback function that handles the newly obtained books
 */
  public static async updateBook(): Promise<void> {

  }

/**
 * Deletes a book in the database.
 * 
 * If error occurs, it propogates and needs to be handled in the client.
 * 
 * @param callback function that handles the newly obtained books
 */
  public static async deleteBook(): Promise<void> {

  }
}