export enum Genre {
  Romance,
  Mystery,
  Fantasy,
  SciFi,
  Thrillers,
  Horror,
  YoungAdult,
  Children,
  Religious,
  Inspirational,
  Memoir
}

export type Book = {
  id: number,
  title: string,
  author: string,
  genre: Genre,
  publication_date: string,
  isbn: string
}