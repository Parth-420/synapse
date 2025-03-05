"use client";

import { useState, useEffect } from "react";
import { Brain, Quote, FileText, Link as LinkIcon, StickyNote, Calendar, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Entry } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export default function ViewPage() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.id) {
      fetchEntries();
    }
  }, [session]);

  const fetchEntries = async () => {
    try {
      if (!session?.user?.id) {
        throw new Error("No user ID found");
      }

      const response = await fetch(`/api/entries?userId=${session.user.id}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch entries");
      }
      
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast({
        title: "Error",
        description: "Failed to load entries. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEntries = entries.filter(entry => {
    const searchLower = searchQuery.toLowerCase();
    return (
      entry.title?.toLowerCase().includes(searchLower) ||
      entry.content.toLowerCase().includes(searchLower) ||
      entry.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  const getEntriesByType = (type: string) => {
    return filteredEntries.filter(entry => entry.type === type);
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case "quote":
        return <Quote className="h-5 w-5 text-purple-400" />;
      case "link":
        return <LinkIcon className="h-5 w-5 text-green-400" />;
      case "note":
        return <StickyNote className="h-5 w-5 text-yellow-400" />;
      default:
        return <Brain className="h-5 w-5 text-purple-400" />;
    }
  };

  const EntryCard = ({ entry }: { entry: Entry }) => (
    <Card className="bg-[#111111] border-[#333333] hover:border-[#444444] transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {getIconForType(entry.type)}
              <h3 className="font-medium text-lg text-white">{entry.title}</h3>
            </div>
            <div className="text-white/70 line-clamp-3" 
              dangerouslySetInnerHTML={{ __html: entry.content }} 
            />
            {entry.tags && entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {entry.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 rounded-full bg-[#222222] text-white/60 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center text-white/40 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {format(new Date(entry.createdAt), "MMM d, yyyy")}
            </div>
            {entry.source && (
              <div className="text-white/40 text-sm truncate max-w-[200px]">
                {entry.source}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">View Entries</h1>
        <p className="text-white/60">
          Browse and search through your knowledge base
        </p>
      </div>

      <div className="flex items-center gap-4 bg-[#111111] border border-[#333333] rounded-lg p-4">
        <Search className="h-5 w-5 text-white/40" />
        <Input
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none text-white placeholder:text-white/40 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-[#111111] border border-[#333333]">
          <TabsTrigger value="all" className="data-[state=active]:bg-[#222222] data-[state=active]:text-white">
            All Entries
          </TabsTrigger>
          <TabsTrigger value="notes" className="data-[state=active]:bg-[#222222] data-[state=active]:text-white">
            Notes
          </TabsTrigger>
          <TabsTrigger value="quotes" className="data-[state=active]:bg-[#222222] data-[state=active]:text-white">
            Quotes
          </TabsTrigger>
          <TabsTrigger value="links" className="data-[state=active]:bg-[#222222] data-[state=active]:text-white">
            Links
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {isLoading ? (
            <div className="text-center text-white/60 py-12">Loading entries...</div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center text-white/60 py-12">
              {searchQuery ? "No entries found matching your search" : "No entries yet"}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredEntries.map((entry) => (
                <EntryCard key={entry.createdAt.toString()} entry={entry} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          {getEntriesByType("note").map((entry) => (
            <EntryCard key={entry.createdAt.toString()} entry={entry} />
          ))}
        </TabsContent>

        <TabsContent value="quotes" className="space-y-4">
          {getEntriesByType("quote").map((entry) => (
            <EntryCard key={entry.createdAt.toString()} entry={entry} />
          ))}
        </TabsContent>

        <TabsContent value="snippets" className="space-y-4">
          {getEntriesByType("snippet").map((entry) => (
            <EntryCard key={entry.createdAt.toString()} entry={entry} />
          ))}
        </TabsContent>

        <TabsContent value="links" className="space-y-4">
          {getEntriesByType("link").map((entry) => (
            <EntryCard key={entry.createdAt.toString()} entry={entry} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
