import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { UserRead } from "@/types/dtos --refine/user";

const BACKEND_API = process.env.BACKEND_API_URL;

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return redirect("/login");
  }

  const res = await axios.get(`${BACKEND_API}/api/auth/me`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

const user: UserRead = res.data;

  return (
   <div id="profile-container" className="mt-5">
    <h1 className="text-2xl">Nome: {user.firstName}</h1>
   </div>
  );
}
