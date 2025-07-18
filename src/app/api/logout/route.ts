import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  cookieStore.delete("token");

  if (!token) {
    NextResponse.redirect("/login");
  }
  else {
    console.log(token)
  }
}
