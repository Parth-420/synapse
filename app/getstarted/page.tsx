"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Search, Tag, Quote, FileText, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function GetStartedPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="fixed w-full z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16">
            <nav className="flex items-center justify-center px-8 py-3 rounded-full bg-[#111111]/80 backdrop-blur-md border border-[#333333]/50 mt-4">
              <div className="flex items-center gap-2 mr-6">
                <Brain className="h-5 w-5 text-purple-400" />
                <span className="font-bold">Synapse</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-sm font-medium text-white/70 hover:text-white">
                  Home
                </Link>
                <Link href="/#features" className="text-sm font-medium text-white/70 hover:text-white">
                  Features
                </Link>
                <Link href="https://github.com" className="text-sm font-medium text-white/70 hover:text-white">
                  Github
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24 bg-grid-pattern relative">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 py-16">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter glow-text">
                Get Started with <span className="text-purple-400">Synapse</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-white/70 md:text-xl">
                Your personal knowledge management system powered by AI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              <Card className="bg-[#111111] border-[#333333] text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    Store Knowledge
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Capture and organize your thoughts, ideas, and discoveries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-full">
                      <Quote className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="text-sm text-white/80">Save inspiring quotes</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <FileText className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="text-sm text-white/80">Save your notes</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <LinkIcon className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-sm text-white/80">Bookmark useful links</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#111111] border-[#333333] text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-purple-400" />
                    Retrieve Instantly
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Find exactly what you need when you need it
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-full">
                      <Search className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="text-sm text-white/80">Semantic search by meaning</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <Brain className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="text-sm text-white/80">AI-generated answers</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <Tag className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="text-sm text-white/80">Smart tagging system</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="w-full max-w-md">
              <Card className="bg-[#111111] border-[#333333] text-white overflow-hidden">
                <CardHeader className="text-center">
                  <CardTitle>Sign in to continue</CardTitle>
                  <CardDescription className="text-white/60">
                    Create your personal knowledge base in seconds
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-6">
                  <Button 
                    onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                    className="w-full max-w-xs bg-white text-black hover:bg-white/90 glow-button flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
                      <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                      <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                      <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                      <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                    </svg>
                    Sign in with Google
                  </Button>
                </CardContent>
                <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 h-1"></div>
              </Card>
            </div>

            <div className="text-center text-white/60 text-sm">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#222222] py-6 bg-black">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <span className="font-semibold">Synapse</span>
          </div>
          <p className="text-center text-sm text-white/50 md:text-left">
            &copy; {new Date().getFullYear()} Synapse. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}