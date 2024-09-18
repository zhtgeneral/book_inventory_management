import prisma from "@/app/libs/prisma";
import { Book } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { Genre as PrismaGenre }  from '@prisma/client';


export async function POST(request: NextRequest) {
  try {
    const body: Book = await request.json();
    const { id, title, author, genre, publication_date, ISBN } = body;
    if (title.length > 100 || author.length > 40) {
      return new NextResponse('Invalid Data', { status: 400 })
    }
    const book: Book = await prisma.book.create({
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