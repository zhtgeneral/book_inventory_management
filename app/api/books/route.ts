import { Book, Genre } from "@/types";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const body: Book = await request.json();
    const { title, author } = body;
    if (title.length > 100 || author.length > 40) {
      return new NextResponse('Invalid Data', { status: 400 })
    }
    const book: Book = {
      id: 0,
      title: '',
      author: '',
      genre: Genre.Romance,
      publication_date: '',
      isbn: ''
    }

    return NextResponse.json(book);
  } catch (error: unknown) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}