'use client'

import { SetStateAction, useEffect, useState } from 'react';
import { CgExport } from "react-icons/cg";

import { Inventory, SearchParams } from '@/types';
import getBooks from '@/app/utils/getBooks';
import downloadBooks from '@/app/utils/downloadBooks'
import filterBooks from '@/app/utils/filterBooks';

import { Button } from "@/components/ui/button"
import BooksDisplay from '@/components/BooksDisplay';
import Hoverable from '@/components/Hoverable';
import Nav from '@/components/Nav';
import SearchForm from '@/components/SearchForm';
import AddForm from '@/components/AddForm';

/**
 * This is the home page
 * It renders the components to add a book, filter books, and display all books.
 * The button to download all books as JSON or CSV should be visible TODO.
 * 
 * When a book is submitted successfully, the user should see green text in the form 
 * telling them submit was successful. If this action fails, a popup alerts the user 
 * this action failed.
 *
 * To submit the info for a book, the title is required to be <= 100 characters, the author <= 40 character
 * the genre a valid genre, the date to be non-null, and a valid ISBN code.
 * 
 * To filer book, the user can select to filer by title, author, genre, or date.
 * 
 * @returns Home page component
 */
export default function Home() {
  const [books, setBooks] = useState<Inventory[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  
  useEffect(() => {
    getBooks(setBooks);
  }, []);

  const filteredBooks = filterBooks(books, searchParams);
  const handleSearch = (data: SetStateAction<SearchParams>) => {
    setSearchParams(data);
  };
  
  return (
    <div className='h-screen flex-col bg-neutral-100'>
      <Nav />
      <div className='flex items-center justify-center p-4 md:px-10'>
        <div className='flex h-full gap-x-4 w-full lg:w-[80%]'>
          <div className="w-2/5 h-full space-y-4">
            <div className='bg-white p-6 rounded-lg border border-neutral-300 shadow-md shadow-neutral-200'>
              <h2 className='text-lg font-bold'>Add book to inventory</h2>
              <AddForm onSuccess={setBooks}/>
            </div>

            <div className='bg-white p-4 rounded-lg border border-neutral-300 shadow-md shadow-neutral-200'>
              <h2 className="text-lg font-bold mb-2">Filter</h2>
              <SearchForm onSearch={handleSearch}/>
            </div>

          </div>
          <div className="w-3/5 bg-white h-full rounded-lg outline outline-1 outline-gray-300 shadow-md shadow-neutral-200">
            <div className='flex justify-between items-center p-4'>
              <h2 className="text-lg font-bold outline-2 outline-neutral-500">Results</h2>
              <Hoverable message="Export all data as JSON">
                <Button onClick={() => downloadBooks(books)}>
                  <div className='pr-2'>
                    Export
                  </div>
                  <CgExport size={18}/>
                </Button>
              </Hoverable>
            </div>
            
            <div className="w-full border-b border-gray-300" />
            <BooksDisplay books={filteredBooks}/>
          </div>
        </div>
      </div>
    </div>
  )
}
