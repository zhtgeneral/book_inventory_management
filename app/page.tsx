'use client'

import { SetStateAction, useEffect, useState } from 'react';

import { Book, SearchParams } from '@/types';
import filterBooks from '@/app/utils/filterBooks';

import BooksDisplay from '@/components/BooksDisplay';
import Nav from '@/components/Nav';
import SearchForm from '@/components/SearchForm';
import AddForm from '@/components/AddForm';
import Panel from '@/components/Panel';
import ResultsHeader from '@/components/ResultsHeader';
import { Inventory } from '@/app/utils/Inventory';

/**
 * This is the home page.
 * 
 * It renders the panels to add a book, filter books, and display all books.
 * 
 * All 3 panels should be displayed correctly and each of their function should work:
 * 
 * The panel to add books should trigger an update when it succeeds.
 * The updates fetches the all books and causes the table to rerender the results in the table.
 * 
 * The panel to filter books should trigger an update to rerender the results in the table.
 * 
 * The panel to display books should update depending on the 2 other panels.
 * 
 * @returns Home page component
 */
export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  
  useEffect(() => {
    Inventory.readBooks(setBooks);
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
