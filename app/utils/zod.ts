import { Genre } from "@prisma/client";
import { z, ZodObject, ZodString } from "zod";

export const formSchema: ZodObject<{
  title: z.ZodString;
  author: z.ZodString;
  genre: z.ZodEnum<[string, ...string[]]>;
  publication_date: z.ZodDate;
  ISBN: z.ZodEffects<ZodString, string, string>; 
}> = z.object({
  title: z.string().min(1, {
    message: "Title must be at least 1 character"
  }).max(100, {
    message: "Title can't exceed 100 characters"
  }),
  author: z.string().min(1, {
    message: "Author must be at least 1 character"
  }).max(40, {
    message: "Author can't exceed 40 characters"
  }),
  genre: z.enum(Object.values(Genre) as [string, ...string[]], {
    message: "Genre must be one of the provided genres"
  }),
  publication_date: z.date(),
  ISBN: z.string().refine((isbn: string) => {
    return isbn.length === 10 || isbn.length === 13;
  }, {
    message: "ISBN must be 10 or 13 characters"
  })
})

export const searchSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
  genre: z.nativeEnum(Genre).optional(),
  year: z.number().min(1000).max(9999).optional(),
});