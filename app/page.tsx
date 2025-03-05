import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Brain, Search, BookOpen, Tag, Quote, FileText, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
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
                <Link href="/" className="text-sm font-medium text-white/90 hover:text-white">
                  Home
                </Link>
                <a href="#features" className="text-sm font-medium text-white/70 hover:text-white">
                  Features
                </a>
                <Link href="https://github.com/Parth-420/synapse" className="text-sm font-medium text-white/70 hover:text-white">
                  Github
                </Link>
              </div>
              <div className="ml-6">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="text-sm bg-transparent border-[#333333] hover:bg-[#333333]/50">
                    Dashboard
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Grid Background */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid-pattern">
          {/* GitHub button */}
          <div className="absolute top-32 z-10 flex justify-center w-full">
            <a 
              href="https://github.com/Parth-420/synapse" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111]/80 backdrop-blur-md border border-[#333333]/50 hover:bg-[#222222]/80 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <span className="text-sm">Star us on Github</span>
            </a>
          </div>
          
          <div className="absolute inset-0 hero-gradient"></div>
          
          <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8 mt-16">
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter glow-text">
               Wake Up Your <span className="text-purple-400">Second Brain</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-xl text-white/70 md:text-2xl">
              Store, connect, and retrieve your personal knowledge. Have natural conversations with your stored knowledge. Never lose an important thought, quote, or link again.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/dashboard/add">
                <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90 glow-button">
                  <Brain className="h-4 w-4" />
                  Start Adding Content
                </Button>
              </Link>
              <Link href="/dashboard/chat">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent border-[#333333] hover:bg-[#333333]/50 glow-button">
                  <Brain className="h-4 w-4" />
                  Chat with Brain
                </Button>
              </Link>
            </div>
            
            <div className="pt-6 text-sm text-white/60">
              No account setup required. Start building your second brain in seconds.
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-400" />
                <span className="text-white/80">AI-Powered Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-400" />
                <span className="text-white/80">Natural Conversations</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-purple-400" />
                <span className="text-white/80">Smart Memory</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 md:py-32 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold">What We Offer</h2>
            </div>
            
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="feature-card rounded-xl p-8">
                <div className="feature-icon">
                  <Brain className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Universal Storage</h3>
                <p className="text-white/70">
                  Save any type of content including quotes, text snippets, links, notes, and more in your personal knowledge base.
                </p>
              </div>
              
              <div className="feature-card rounded-xl p-8">
                <div className="feature-icon">
                  <Search className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Semantic Search</h3>
                <p className="text-white/70">
                  Find what you're looking for with AI-powered vector search that understands meaning, not just keywords.
                </p>
              </div>
              
              <div className="feature-card rounded-xl p-8">
                <div className="feature-icon">
                  <Quote className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Generated Answers</h3>
                <p className="text-white/70">
                  Get concise answers based on your stored knowledge, generated by advanced AI that understands your content.
                </p>
              </div>
              
              <div className="feature-card rounded-xl p-8">
                <div className="feature-icon">
                  <Tag className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Tagging</h3>
                <p className="text-white/70">
                  Organize your knowledge with tags to create connections between related pieces of information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Types Section */}
        <section className="w-full py-24 md:py-32 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-8">
                  Store Everything That Matters
                </h2>
                
                <div className="space-y-4">
                  <div className="notification-card rounded-lg p-4 flex items-center gap-3">
                    <div className="bg-purple-500/20 p-2 rounded-full">
                      <Quote className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Inspiring Quote</span>
                        <span className="text-xs text-white/50">10m ago</span>
                      </div>
                      <div className="text-sm text-white/60">"The best way to predict the future is to invent it."</div>
                    </div>
                  </div>
                  
                  <div className="notification-card rounded-lg p-4 flex items-center gap-3">
                    <div className="bg-blue-500/20 p-2 rounded-full">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Code Snippet</span>
                        <span className="text-xs text-white/50">2h ago</span>
                      </div>
                      <div className="text-sm text-white/60">const brain = new SecondBrain();</div>
                    </div>
                  </div>
                  
                  <div className="notification-card rounded-lg p-4 flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-400">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Useful Link</span>
                        <span className="text-xs text-white/50">1d ago</span>
                      </div>
                      <div className="text-sm text-white/60">https://example.com/great-article</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30"></div>
                  <div className="relative bg-black rounded-lg overflow-hidden border border-[#333333]">
                    <img 
                      src="https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                      alt="Knowledge Base" 
                      className="w-full h-auto rounded-lg opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-24 md:py-32 bg-[#0A0A0A]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-[700px] text-white/70 md:text-xl">
                Everything you need to know about your second brain
              </p>
            </div>
            
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-[#333333]">
                  <AccordionTrigger className="text-white hover:text-white/90">What is a second brain?</AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    A second brain is a digital system that helps you store, organize, and retrieve your knowledge and ideas. 
                    It's like an extension of your mind that never forgets and can be searched instantly.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-[#333333]">
                  <AccordionTrigger className="text-white hover:text-white/90">How does semantic search work?</AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    Semantic search uses AI to understand the meaning behind your query, not just matching keywords. 
                    When you add content to Synapse, we create a vector embedding that captures its meaning. 
                    When you search, we find content with similar meaning to your query, even if it doesn't contain the exact words.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-[#333333]">
                  <AccordionTrigger className="text-white hover:text-white/90">Is my data private and secure?</AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    Yes, your data is completely private. We use industry-standard encryption and security practices. 
                    Your personal knowledge base is only accessible to you, and we never use your data for training AI models or share it with third parties.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-[#333333]">
                  <AccordionTrigger className="text-white hover:text-white/90">What types of content can I store?</AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    You can store quotes, text snippets, links, notes, and more. Synapse is designed to be flexible, 
                    so you can save any type of textual information that's important to you.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5" className="border-[#333333]">
                  <AccordionTrigger className="text-white hover:text-white/90">How do I get started?</AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    Simply click the "Start Adding Content" button, and you'll be guided through the process of creating your first entry. 
                    Once you've added some content, you can start searching and getting AI-generated answers based on your knowledge base.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 md:py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute inset-0 hero-gradient"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8 text-center">
              <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl glow-text">
                Ready to enhance your second brain?
              </h2>
              <p className="mx-auto max-w-[700px] text-white/70 md:text-xl">
                Start storing and retrieving your knowledge more effectively today.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 bg-white text-black hover:bg-white/90 glow-button">
                  <Brain className="h-4 w-4" />
                  Get Started — It's Free
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#222222] py-8 bg-black">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <span className="font-semibold">Synapse</span>
          </div>
          <p className="text-center text-sm text-white/50 md:text-left">
            &copy; {new Date().getFullYear()} Synapse. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/Parth-420/synapse" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/80 transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://x.com/parthh_07" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/80 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/parth-gupta-0b8417166/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white/80 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <div className="hidden md:block border-l border-[#333333] h-5 mx-2"></div>
            <Link href="#" className="text-sm text-white/50 hover:text-white/80">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-white/50 hover:text-white/80">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}