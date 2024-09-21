'use client'

import { SetStateAction, useEffect, useState } from 'react';

import { Inventory, SearchParams } from '@/types';
import getBooks from '@/app/utils/getBooks';
import filterBooks from '@/app/utils/filterBooks';

import BooksDisplay from '@/components/BooksDisplay';
import Nav from '@/components/Nav';
import SearchForm from '@/components/SearchForm';
import AddForm from '@/components/AddForm';
import Panel from '@/components/Panel';
import ResultsHeader from '@/components/ResultsHeader';

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
    <main className='h-screen flex-col bg-neutral-100'>
      <Nav />
      <div className='flex items-center justify-center p-4 md:px-10'>
        <div className='flex h-full gap-x-4 w-full lg:w-[80%]'>
          <div className="w-2/5 h-full space-y-4">
            <Panel style="p-6">
              <h2 className='text-lg font-bold'>Add book to inventory</h2>
              <AddForm onSuccess={setBooks}/>
            </Panel>
            <Panel style="p-6">
              <h2 className="text-lg font-bold">Filter</h2>
              <SearchForm onSearch={handleSearch}/>
            </Panel>
          </div>
          <div className='w-3/5 h-full'>
            <Panel style="p-0">
              <ResultsHeader books={books}/>
              <BooksDisplay books={filteredBooks}/>
            </Panel>
          </div>
        </div>
      </div>
    </main>
  )
}
