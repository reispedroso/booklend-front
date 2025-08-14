import { Book } from "@/types/dtos/book";
import { getBooks } from "@/lib/services/bookService";
import Link from "next/link";
import Image from "next/image";

export default async function BooksPage() {
  const books: Book[] = await getBooks();

  return (
    <div className="container mx-auto p-4">
      {books.length === 0 ? (
        <p>Nenhum livro encontrado</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <div key={book.id} className="border rounded-lg shadow-sm overflow-hidden">
              {/* Imagem da capa */}
              {book.coverImageUrl && (
                <Image
                  src={book.coverImageUrl}
                  alt={book.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
              )}

              {/* Conteúdo */}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{book.title}</h2>
                {/* <p className="text-gray-600">{book.authorId}</p> */}
                <p className="mt-2">{book.description?.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
