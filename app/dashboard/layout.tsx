'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Brain, Plus, Search, LayoutDashboard, Edit, LogOut, User,Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession, signOut } from 'next-auth/react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  
  // Get user initials for avatar fallback
  const getInitials = (name: string | null | undefined) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-[#222222] bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-14 items-center px-4">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 text-white/80 hover:text-white hover:bg-[#222222]">
                    <Avatar className="h-6 w-6 border border-purple-500/50">
                      <AvatarImage src={session?.user?.image || ''} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xs font-medium">
                        {getInitials(session?.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">{session?.user?.name || 'User'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={6} className="w-[200px] bg-[#111111] border-[#333333] text-white p-1.5">
                  <DropdownMenuItem className="flex items-center px-2 py-1.5 focus:bg-[#222222] focus:text-white cursor-pointer rounded-sm text-white/80 hover:text-white">
                    <User className="mr-2 h-4 w-4" />
                    <span className="font-medium text-[13px]">View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center px-2 py-1.5 focus:bg-[#222222] focus:text-white cursor-pointer text-red-400 hover:text-red-400 font-medium rounded-sm mt-0.5"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span className="text-[13px]">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
            <Link href="/dashboard/write">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-[#222222]">
                <Edit className="h-4 w-4" />
                Write
              </Button>
            </Link>
            <Link href="/dashboard/chat">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-[#222222]">
                <Search className="h-4 w-4" />
                Chat
              </Button>
            </Link>
            <Link href="/dashboard/view">
              <Button variant="ghost" className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-[#222222]">
                <Eye className="h-4 w-4" />
                View
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-[#0A0A0A]">{children}</main>
      </div>
    </div>
  );
}