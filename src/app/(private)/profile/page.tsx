import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { UserRead } from "@/types/dtos/user";

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
    <div
      id="container"
      className="w-full h-screen flex justify-center p-4"
    >
      <div
        id="user-info"
        className="w-full h-auto flex items-center  rounded-2xl flex-col p-4"
      >
        <div id="pfp" className="w-14 h-14 bg-blue-500 rounded-full">
          {/* profile pic */}
        </div>
        <div id="info" className="flex flex-col items-center">
          <p className="font-semibold text-lg">
            {user.firstName} {user.lastName}
          </p>
          <p className="font-medium text-gray-800">{user.email}</p>
          <p className="font-medium text-gray-800">{user.username}</p>
        </div>
      </div>
    </div>
  );
}
