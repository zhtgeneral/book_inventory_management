'use client'

import { formSchema } from '@/app/utils/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"


import CustomDatePicker from '@/components/DatePicker';

import { Genre } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Inventory } from '@/types';
import BooksDisplay from '@/components/BooksDisplay';

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

  const fetchBooks = async () => {
    try {
      const response = await axios.get<Inventory[]>('/api/books');
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching books:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      publication_date: new Date(),
      ISBN: ""
    },
  })
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('submitted: ', data);
    try {
      await axios.post('/api/books', data);
      handleSubmitSuccess();
    } catch (error: unknown) {
      console.log('error from front end', error);
      toast("An error occured");
    }
  }
  const handleSubmitSuccess = () => {
    setSubmitSuccess(true);
    form.reset();
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  const downloadBooks = () => {
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
  
  const genres = Object.values(Genre).filter(value => typeof value === 'string');

  return (
    <div className='h-screen flex-col bg-neutral-100'>
      <div className='flex font-bold text-lg justify-center items-center text-center h-[60px] border-neutral-200 border-b bg-white shadow-sm shadow-neutral-200'>
          Book Inventory Management App
      </div>
      <div className='flex items-center justify-center p-4 md:px-10'>
        <div className='flex h-full gap-x-4 w-full lg:w-[80%]'>
          <div className="w-2/5 h-full space-y-4">
            <div className='bg-white p-6 rounded-lg border border-neutral-300 shadow-md shadow-neutral-200'>
              <div className='text-lg font-bold'>
                Add book to inventory
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder='enter title' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input placeholder='enter author name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                    <FormItem>
                      <div className='flex flex-col items-start space-y-2'>
                        <FormLabel>Genre</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="w-[140px] md:w-[180px]">
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                            <SelectContent>
                              {genres.map((genre) => (
                                <SelectItem key={genre} value={genre}>
                                  {genre}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publication_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Publication Date</FormLabel>
                        <FormControl>
                          <CustomDatePicker
                            onChange={field.onChange}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ISBN"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ISBN</FormLabel>
                        <FormControl>
                          <Input placeholder='enter ISBN' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='pt-2 flex items-center gap-x-4'>
                    <Button type="submit">Create book</Button>
                    <div className='text-green-500'>
                      {submitSuccess && "Book has been added ✅"}
                    </div>
                  </div>
                </form>
              </Form>
            </div>

            <div className='bg-white p-4 rounded-lg border border-neutral-300 shadow-md shadow-neutral-200'>
              <h2 className="text-lg font-bold mb-2">Filter</h2>
              Filter
            </div>

          </div>
          <div className="w-3/5 bg-white h-full rounded-lg outline outline-1 outline-gray-300 shadow-md shadow-neutral-200">
            <div className='flex justify-between items-center p-4'>
              <h2 className="text-lg font-bold outline-2 outline-neutral-500">Results</h2>
              <Button onClick={downloadBooks}>
                Export
              </Button>
            </div>
            
            <div className="w-full border-b border-gray-300" />
            <div>
              <BooksDisplay books={books}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
