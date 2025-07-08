"use client";

import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  X,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-cyan-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4 text-lime-600">
            Ethiopian Kidney Association
          </h3>
          <p className="max-w-md text-white/90">
            Dedicated to kidney health awareness, prevention, and patient
            support across Ethiopia.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4 text-lime-600">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <a href="#home" className="hover:text-lime-600 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-lime-600 transition">
                About Us
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-lime-600 transition">
                Services
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-lime-600 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info & Social */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4 text-lime-600">
            Contact Us
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Mail size={20} className="text-white" />
              <a
                href="mailto:info@ethiopiankidney.org"
                className="hover:text-lime-600 transition"
              >
                info@ethiopiankidney.org
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-white" />
              <a
                href="tel:+251911234567"
                className="hover:text-lime-600 transition"
              >
                +251911671212 | +251919396547
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin size={20} className="text-white" />
              Addis Ababa, Ethiopia
            </li>
          </ul>

          <div className="flex mt-8 space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-lime-600 transition"
            >
              <Facebook size={28} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="hover:text-lime-600 transition"
            >
              <X size={28} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-lime-600 transition"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-lime-600 transition"
            >
              <Linkedin size={28} />
            </a>
          </div>
        </div>
      </div>

      <hr className="border-white/30 my-8 mx-auto max-w-7xl" />

      <div className="text-center text-white/80 text-sm select-none">
        &copy; {new Date().getFullYear()} Ethiopian Kidney Association. All
        rights reserved.
      </div>

      <div className="mt-2 text-center text-white/70 text-xs font-medium tracking-wide select-none">
        Designed & Developed by{" "}
        <span>
          {" "}
          <a
            href="https://degantechnologies.com"
            target="_blank"
            rel="noreferrer"
            className="underline text-lime-600 hover:text-white"
          >
            Degan Technologies
          </a>
        </span>
      </div>
    </footer>
  );
}
