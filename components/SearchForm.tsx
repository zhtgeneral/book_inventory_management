import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Genre } from '@prisma/client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchSchema } from '@/app/utils/zod';
import { FaFilter } from "react-icons/fa6";
import Hoverable from '@/components/Hoverable';

export type SearchParams = z.infer<typeof searchSchema>;

type SearchFormProps = {
  onSearch: (data: SearchParams) => void;
};

/**
 * This component is a form that handles search data.
 * 
 * The form has a query for title, author, genre, and year. 
 * The user can change the query from the front end.
 * When the search form is submitted, it passes the search query into `onSearch`.
 * 
 * @param onSearch a function that decides how to handle the query
 * @returns Search Form Component
 */
const SearchForm: React.FC<SearchFormProps> = ({ 
  onSearch 
}) => {
  const { control, handleSubmit } = useForm<SearchParams>({
    resolver: zodResolver(searchSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSearch)} className="space-y-4 pt-2">
      <Controller
        name="title"
        control={control}
        render={({ field }) => 
          <Input {...field} placeholder="Title" />
        }
      />
      <Controller
        name="author"
        control={control}
        render={({ field }) => 
          <Input {...field} placeholder="Author" />
        }
      />
      <Controller
        name="genre"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Genre).map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        name="year"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="number"
            placeholder="Year"
            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
          />
        )}
      />
      <Hoverable message="Filter for books">
        <Button type="submit">
          <div className='pr-2'>
            Filter
          </div>
          <FaFilter />
        </Button>
      </Hoverable>
    </form>
  );
}
export default SearchForm