import { Genre } from '@prisma/client';

export type SearchParams = {
  title?: string,
  author?: string,
  genre?: Genre,
  year?: number,
}