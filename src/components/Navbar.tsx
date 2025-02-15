"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserPlus, Building2 } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/invite",
      label: "Invite Visitors",
      icon: UserPlus,
    },
    {
      href: "/frontdesk",
      label: "Front Desk",
      icon: Building2,
    },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/90 backdrop-blur-lg rounded-full px-6 py-3 shadow-lg shadow-black/[0.03] ring-1 ring-black/[0.05]">
        <div className="flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative flex items-center gap-2 px-4 py-2 rounded-full
                  transition-all duration-200 ease-out
                  ${
                    isActive
                      ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }
                `}
              >
                <Icon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                />
                <span className="text-sm font-medium">{link.label}</span>
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
