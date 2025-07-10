import { cookies } from "next/headers";
import { registerSchema } from "@/lib/schemas/authSchema";
import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_API = process.env.BACKEND_API_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          errors: result.error.format(),
        },
        { status: 400 }
      );
    }

    const { data } = await axios.post(`${BACKEND_API}/api/auth/register`, body);
    const token = data?.token;

    if (!token) {
      return NextResponse.json(
        {
          message: "Token didnt received",
        },
        {
          status: 500,
        }
      );
    }

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      { message: "Registered with sucess" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in registered:", error?.response?.data || error);

    const backendMessage = error?.response?.data?.message;

    const safeMessage =
      backendMessage?.toLowerCase().includes("password") ||
      backendMessage?.toLowerCase().includes("invalid")
        ? "E-mail ou senha incorretos"
        : backendMessage || "Erro inesperado no servidor";

    return NextResponse.json(
      {
        message: safeMessage,
      },
      {
        status: 400,
      }
    );
  }
}
