import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container relative flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0 py-16">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-center justify-center lg:hidden">
              <Logo />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
