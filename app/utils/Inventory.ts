import { Book } from "@/types";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { formSchema } from "@/app/utils/zod";

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
 * Updates a in the database. This function is not needed for this app yet TODO.
 * 
 * If error occurs, it propogates and needs to be handled in the client.
 * 
 * @param callback function that handles the newly obtained books
 */
  public static async updateBook(): Promise<void> {

  }

/**
 * Deletes a book in the database. This function is not needed for this app yet TODO.
 * 
 * If error occurs, it propogates and needs to be handled in the client.
 * 
 * @param callback function that handles the newly obtained books
 */
  public static async deleteBook(): Promise<void> {

  }
}