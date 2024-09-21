import { Genre } from '@prisma/client';

export type Book = {
  id: number,
  title: string,
  author: string,
  genre: Genre,
  publication_date: Date,
  ISBN: string
}

export type DisplayBook = {
  id: number,
  title: string,
  author: string,
  genre: Genre,
  publication_date: string,
  ISBN: string
}

export type SearchParams = {
  title?: string,
  author?: string,
  genre?: Genre,
  year?: number,
}