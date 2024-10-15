"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col bg-gray-100 min-w-[60px] rounded-xl px-6 py-6 h-screen fixed">
      <h2 className="text-xl font-bold mb-12">PopDop</h2>
      <div className="mb-6">
        <Link
          href="/"
          aria-label="Home"
          className={`block text-black hover:text-gray-500 transition-colors ${
            pathname === "/" ? "text-gray-500" : "text-black"
          }`}
        >
          Home
        </Link>
      </div>
      <div className="mb-6">
        <Link
          href="/population"
          aria-label="Population"
          className={`block text-black hover:text-gray-500 transition-colors ${
            pathname === "/population" ? "text-gray-500" : "text-black"
          }`}
        >
          Population
        </Link>
      </div>
      <div className="mb-6">
        <Link
          href="/about"
          aria-label="About"
          className={`block text-black hover:text-gray-500 transition-colors ${
            pathname === "/about" ? "text-gray-500" : "text-black"
          }`}
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
