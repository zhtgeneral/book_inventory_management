import { Genre } from '@prisma/client';

export type Inventory = {
  id: number,
  title: string,
  author: string,
  genre: Genre,
  publication_date: Date,
  ISBN: string
}