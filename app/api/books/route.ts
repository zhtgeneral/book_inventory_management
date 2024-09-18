import prisma from "@/app/libs/prisma";
import { Book } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { Genre as PrismaGenre }  from '@prisma/client';

/**
 * API endpoint that adds book to the collection of books.
 * 
 * If the data is invalid: Either the title length is > 100 or the author length is > 40, 
 * then throw a 400 error for Invalid Data
 * otherwise create book into database.
 * 
 * If database error occurs, throw a 500 error for internal error.
 * 
 * @param request The request of data. The format is expected to be type `Book`
 * @returns json of the newly added book or an error
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: Book = await request.json();
    const { id, title, author, genre, publication_date, ISBN } = body;
    if (title.length > 100 || author.length > 40) {
      return new NextResponse('Invalid Data', { status: 400 })
    }
    const book: Book = await prisma.inventory.create({
      data: {
        id: id,
        title: title,
        author: author,
        genre: genre as PrismaGenre,
        publication_date: publication_date,
        ISBN: ISBN
      }
    })
    return NextResponse.json(book);
  } catch (error: unknown) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

/**
 * Gets all the books from the database.
 * 
 * If database error occurs, throw a 500 error for internal error.
 * @returns the books stored in the database as an array of `Book[]`
 */
export async function GET(): Promise<NextResponse> {
  try {
    const books: Book[] = await prisma.inventory.findMany({});
    return NextResponse.json(books);
  } catch (error: unknown) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}