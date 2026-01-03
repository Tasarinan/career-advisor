"use client";

import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { Logo } from "./logo";
import { usePathname } from "next/navigation";
import { MobileNav } from "./mobile-nav";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  user: any;
}

interface NavItem {
  label: string;
  href: string;
}

interface DropdownMenu {
  label: string;
  items: NavItem[];
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Main navigation items for Career Advisor
  const mainNavItems: NavItem[] = [
    { label: "Home", href: "/" },
    { label: "Pricing", href: "/#pricing" },
  ];

  // Dropdown menus
  const dropdownMenus: DropdownMenu[] = [
    {
      label: "More",
      items: [
        { label: "About", href: "/about" },
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ];

  // Dashboard items - empty array as we don't want navigation items in dashboard
  const dashboardItems: NavItem[] = [];

  // Choose which navigation items to show
  const navItems = isDashboard ? dashboardItems : mainNavItems;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <Logo />
        </div>
        
        {/* Centered Navigation */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2" ref={dropdownRef}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          
          {/* Dropdown Menus */}
          {!isDashboard && dropdownMenus.map((menu) => (
            <div key={menu.label} className="relative">
              <button
                onClick={() => toggleDropdown(menu.label)}
                className="flex items-center gap-1 text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {menu.label}
                <ChevronDown className={`h-4 w-4 transition-transform ${openDropdown === menu.label ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === menu.label && (
                <div className="absolute top-full left-0 mt-2 w-40 rounded-md border bg-background shadow-lg py-1">
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              {isDashboard && (
                <span className="hidden sm:inline text-sm text-muted-foreground">
                  {user.email}
                </span>
              )}
              {!isDashboard && (
                <>
                  <Button asChild size="sm" variant="default">
                    <Link href="/profile">Profile</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                </>
              )}
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm">
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            <div className="hidden md:flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
          <MobileNav items={[...navItems, ...dropdownMenus.flatMap(m => m.items)]} user={user} isDashboard={isDashboard} />
        </div>
      </div>
    </header>
  );
}
