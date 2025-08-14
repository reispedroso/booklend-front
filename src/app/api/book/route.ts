import { NextResponse, NextRequest } from "next/server";
import { getBooks } from "@/lib/services/bookService";

export async function GET() {
  try {
    const books = await getBooks();
    return NextResponse.json(books);
  } catch (err) {
    return new NextResponse("Erro ao buscar livros", { status: 500 });
  }
}
