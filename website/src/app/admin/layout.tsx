import Link from "next/link";
import Image from "next/image";
import LogoutButton from "./_components/LogoutButton";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/leads", label: "Leads", icon: "📋" },
  { href: "/admin/content", label: "Nội dung", icon: "✏️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-navy-900 flex flex-col shrink-0">
        <div className="p-5 border-b border-navy-700">
          <Image
            src="/images/logo-anha.jpg"
            alt="An Hà"
            width={110}
            height={44}
            className="h-10 w-auto brightness-0 invert"
          />
          <p className="text-white/40 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:text-white hover:bg-navy-700 transition-colors text-sm font-medium"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-navy-700">
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
