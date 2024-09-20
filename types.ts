import { Genre } from '@prisma/client';

export type Inventory = {
  id: number,
  title: string,
  author: string,
  genre: Genre,
  publication_date: Date,
  ISBN: string
}

export type DisplayInventory = {
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