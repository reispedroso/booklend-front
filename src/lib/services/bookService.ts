import { Book } from "@/types/dtos/book";
import axios from "axios";

const BACKEND_API = process.env.BACKEND_API_URL;

export const getBooks = async (): Promise<Book[]> => {
    const response = await axios.get(`${BACKEND_API}/api/book/`)
    return response.data;
}