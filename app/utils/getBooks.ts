import { Inventory } from "@/types";
import axios from "axios";
import { SetStateAction } from "react";

/**
 * Fetches all books from database.
 * 
 * If error occurs, handle the error here. Errors can't make it into client.
 * @param callback function that handles the newly obtained books
 */
export default async function getBooks(callback: (value: SetStateAction<Inventory[]>) => void) {
  try {
    const response = await axios.get<Inventory[]>('/api/books');
    if (callback) 
      callback(response.data);  
  } catch (error: unknown) {
    console.log(error)
  }
};