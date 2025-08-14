'use client' // o sidebar do shadcn geralmente é client component

import { Building2, Home, Book, CircleUser, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { logout } from "@/lib/logout" // <-- a server action acima

type Item =
  | { title: string; url: string; icon: any; action?: undefined }
  | { title: string; icon: any; action: 'logout'; url?: undefined }

const items: Item[] = [
  { title: "Home", url: "/home", icon: Home },
  { title: "See books", url: "/books", icon: Book },
  { title: "See bookstores", url: "/bookstores", icon: Building2 },
  { title: "Profile", url: "/profile", icon: CircleUser },
  { title: "Logout", icon: LogOut, action: "logout" }, // <-- sem URL
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {"url" in item && item.url ? (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  ) : (
                    // Logout via <form action={logout}>
                    <form action={logout}>
                      <SidebarMenuButton asChild>
                        <button type="submit">
                          <item.icon />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </form>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
