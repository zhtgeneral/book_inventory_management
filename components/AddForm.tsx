'use client'

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
import Hoverable from '@/components/Hoverable';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction, useState } from "react"
import { formSchema } from "@/app/utils/zod"
import { z } from "zod"
import axios from "axios"
import { toast } from "sonner"
import getBooks from "@/app/utils/getBooks"
import { Genre } from "@prisma/client"
import { FaPlus } from "react-icons/fa";
import { Inventory } from "@/types"

interface AddFormProps {
  onSuccess: Dispatch<SetStateAction<Inventory[]>>
}

/**
 * This component is a form that handles adding books.
 * 
 * The form has inputs for title, author, genre, publication date and ISBN.
 * The inputs can be changed by the user.
 * 
 * If title > 100 characters, author > 40 characters, genre missing, or ISBN is invalid,
 * the front end validation should alert the user and prevent the form from being submit.
 * 
 * If the form submits successfully, the user should see a temporary success message in green on the form.
 * The books table should get refreshed so the user can see their newly added book. 
 * The inputs should be cleared on success.
 * 
 * If the validated form encounters an error in the backend, the user should be alert with an error.
 * 
 * @param onSuccess function that refreshes the books in the results table.
 * @returns Add Form Component
 */
const AddForm: React.FC<AddFormProps> = ({
  onSuccess
}) => {
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log('submitted: ', data);
      await axios.post('/api/books', data);
      handleSubmitSuccess();
    } catch {
      toast("An error occured");
    } finally {
      getBooks(onSuccess);
    }
  }
  const handleSubmitSuccess = () => {
    setSubmitSuccess(true);
    form.reset();
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };
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
  
  const genres = Object.values(Genre).filter(value => typeof value === 'string');

  return (
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
                    {genres.map((genre: Genre) => (
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
          <Hoverable message="Add a book to the database">
            <Button type="submit" className='flex'>
              <div className='pr-2'>
                Create book
              </div>
              <FaPlus />
            </Button>
          </Hoverable>
          <div className='text-green-500'>
            {submitSuccess && "Book has been added ✅"}
          </div>
        </div>
      </form>
    </Form>
  )
}
export default AddForm