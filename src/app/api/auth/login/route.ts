import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_API = process.env.BACKEND_API_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Credenciais ausentes" },
        { status: 400 }
      );
    }

    const { data } = await axios.post(`${BACKEND_API}/api/auth/login`, body);

    const token = data?.token;

    if (!token) {
      return NextResponse.json(
        { message: "Token não recebido" },
        { status: 500 }
      );
    }

    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      { message: "Login realizado com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
  console.error("Erro no login:", error?.response?.data || error);

  const backendMessage = error?.response?.data?.message;

  const safeMessage =
    backendMessage?.toLowerCase().includes("password") ||
    backendMessage?.toLowerCase().includes("invalid")
      ? "E-mail ou senha incorretos"
      : backendMessage || "Erro inesperado no servidor";

  return NextResponse.json({ message: safeMessage }, { status: 400 });
}
}
