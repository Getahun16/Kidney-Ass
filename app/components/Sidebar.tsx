"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Menu,
  X,
  Building2,
  Mail,
  UserCheck,
  ImageIcon,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Partners", href: "/admin/partners", icon: Building2 },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Registrations", href: "/admin/registrations", icon: UserCheck },
  { name: "Slides", href: "/admin/slides", icon: ImageIcon },
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="h-full flex flex-col">
      <div className="flex justify-between items-center px-4 py-4 border-b border-lime-700">
        {!collapsed && <h2 className="text-xl font-bold">Admin</h2>}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white focus:outline-none"
          aria-label="Toggle sidebar collapse"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="px-2 py-6 space-y-2 flex-1 overflow-y-auto">
        {links.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition ${
                active ? "bg-lime-800 font-semibold" : "hover:bg-lime-700"
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span>{name}</span>}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-lime-300 hover:text-white hover:bg-lime-700 transition ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
}
