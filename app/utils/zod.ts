import { Genre } from "@prisma/client";
import { z, ZodObject } from "zod";

export const formSchema: ZodObject<{
  title: z.ZodString;
  author: z.ZodString;
  genre: z.ZodEnum<[string, ...string[]]>;
  publication_date: z.ZodDate;
  ISBN: z.ZodString;
}> = z.object({
  title: z.string().max(100, {
    message: "Title can't exceed 100 characters"
  }),
  author: z.string().max(40, {
    message: "Author can't exceed 40 characters"
  }),
  genre: z.enum(Object.values(Genre) as [string, ...string[]], {
    message: "Expected one of the provided genres"
  }),
  publication_date: z.date(),
  ISBN: z.string()
})