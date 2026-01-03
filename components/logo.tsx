import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-3 group hover:opacity-90 transition-opacity"
    >
      <div className="relative">
        <svg
          className="w-10 h-10 text-blue-600 relative"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 21v-6m0 6l4-4m-4 4l-4-4" />
          <path d="M12 3v6m0-6l4 4m-4-4l-4 4" />
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
          <path d="M19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-slate-800 md:leading-tight leading-[18px]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Career</span> Advisor
        </span>
        <span className="text-xs text-slate-500">Your Path to Success</span>
      </div>
    </Link>
  );
}
