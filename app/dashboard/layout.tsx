import { ReactNode } from 'react';
import Link from 'next/link';
import { Brain, Plus, Search, LayoutDashboard, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-[#222222] bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-400" />
            <Link href="/" className="font-bold">
              Synapse
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Link href="/dashboard/add">
                <Button variant="ghost" size="sm" className="gap-1 text-white/80 hover:text-white hover:bg-[#222222]">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add</span>
                </Button>
              </Link>
              <Link href="/dashboard/search">
                <Button variant="ghost" size="sm" className="gap-1 text-white/80 hover:text-white hover:bg-[#222222]">
                  <Search className="h-4 w-4" />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-[200px] flex-col border-r border-[#222222] px-4 py-6 md:flex bg-black">
          <nav className="grid gap-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-[#222222]">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/add">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-[#222222]">
                <Plus className="h-4 w-4" />
                Add Content
              </Button>
            </Link>
            <Link href="/dashboard/search">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-[#222222]">
                <Search className="h-4 w-4" />
                Search
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-[#222222]">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-[#0A0A0A]">{children}</main>
      </div>
    </div>
  );
}