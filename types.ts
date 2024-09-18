import { Genre } from '@prisma/client';

export type Book = {
  id: number,
  title: string,
  author: string,
  genre: Genre,
  publication_date: Date,
  ISBN: string
}