"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Blog", href: "#bloglist" },
  { name: "Our Kidney", href: "/ourkidney" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setOpen(false);

    if (href.startsWith("#")) {
      if (pathname === "/") {
        const id = href.substring(1);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <div className="relative w-12 h-12">
              <Image
                src="/images/img.png"
                alt="Kidney Association Logo"
                fill
                sizes="48px"
                className="object-cover rounded-full border-2 border-lime-700 shadow"
              />
            </div>
            <span className="hidden sm:block text-base lg:text-lg xl:text-xl font-semibold text-lime-700 leading-tight tracking-tight uppercase">
              EKA
              <br />
              <span className="text-xs text-gray-500 normal-case">
                የኢትዮጵያ ኩላሊት ህመም ማህበር
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="relative text-sm font-medium text-gray-700 hover:text-lime-700 transition after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 hover:after:w-full after:bg-lime-700 after:duration-300"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/donate"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                router.push("/donate");
              }}
              className="ml-4 inline-block bg-lime-600 text-white text-sm font-semibold py-2 px-3 rounded-lg shadow hover:bg-lime-700 transition"
            >
              Donate
            </a>

            <a
              href="/registration"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                router.push("/registration");
              }}
              className="ml-4 inline-block bg-lime-600 text-white text-sm font-semibold py-2 px-3 rounded-lg shadow hover:bg-lime-700 transition"
            >
              Become a Member
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-lime-500 p-2 rounded"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[400px] p-6 shadow-lg" : "max-h-0 p-0"
        }`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-base font-medium text-gray-700 hover:text-lime-700 transition"
            >
              {link.name}
            </a>
          ))}

          <a
            href="/registration"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              router.push("/registration");
            }}
            className="inline-block bg-lime-600 text-white text-sm font-semibold py-2 px-6 rounded-full shadow hover:bg-lime-700 transition"
          >
            Become a Member
          </a>
        </div>
      </div>
    </nav>
  );
}
