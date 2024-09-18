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


import CustomDatePicker from '@/components/DatePicker';

import { Genre } from '@prisma/client';

export default function Home() {
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
    } catch (error: unknown) {
      console.log('error from front end', error);
    }
  }
  const genres = Object.values(Genre).filter(value => typeof value === 'string');
  
  return (
    <div className='h-screen flex-col bg-neutral-100'>
      <div className='flex font-bold text-lg justify-center items-center text-center h-[60px] border-neutral-200 border-b-2'>
          Book Inventory Management App
      </div>
      <div className='flex items-center justify-center p-4 md:px-10'>
        <div className='flex h-full gap-x-4 w-full lg:w-[70%]'>
          <div className="w-2/5 h-full space-y-4">
            <div className='bg-white p-6 rounded-xl'>
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
                            <SelectTrigger className="w-[180px]">
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
                  <div className='pt-2'>
                    <Button type="submit">Create book</Button>
                  </div>
                </form>
              </Form>
            </div>

            <div className='bg-white p-4 rounded-xl'>
              <h2 className="text-lg font-bold mb-2">Filter</h2>
              Filter
            </div>

          </div>
          <div className="w-3/5 p-4 bg-white h-full rounded-xl">
            <h2 className="text-lg font-bold mb-2">Results</h2>
            <div>
              results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
