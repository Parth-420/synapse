"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Quote, FileText, Link as LinkIcon, StickyNote, Calendar } from "lucide-react";
import { useSession } from "next-auth/react";
import { Entry } from "@/lib/types";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    total: 0,
    quotes: 0,
    notes: 0,
    links: 0
  });
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchStats() {
      try {
        
        const userId = session?.user?.id || "";
        const response = await fetch(`/api/stats?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [session]);

  useEffect(() => {
    async function fetchEntries() {
      try {
        
        const userId = session?.user?.id || "";
        const response = await fetch(`/api/entries?userId=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      } finally {
        setIsLoadingEntries(false);
      }
    }

    fetchEntries();
  }, [session]);

  // Function to get the appropriate icon for each content type
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'quote':
        return <Quote className="h-4 w-4 text-purple-400" />;
      case 'note':
        return <FileText className="h-4 w-4 text-blue-400" />;
      case 'link':
        return <LinkIcon className="h-4 w-4 text-green-400" />;
      default:
        return <StickyNote className="h-4 w-4 text-yellow-400" />;
    }
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Function to get popular tags
  const getPopularTags = () => {
    const tagCounts: Record<string, number> = {};
    
    entries.forEach(entry => {
      if (entry.tags && entry.tags.length > 0) {
        entry.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });
    
    // Convert to array and sort by count
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  };

  const popularTags = getPopularTags();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-white/60">
          Welcome to your second brain. Manage and explore your knowledge base.
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-[#111111] border border-[#333333]">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#222222] data-[state=active]:text-white">Overview</TabsTrigger>
          <TabsTrigger value="recent" className="data-[state=active]:bg-[#222222] data-[state=active]:text-white">Recent Entries</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-[#111111] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                <Brain className="h-4 w-4  text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.total}</div>
                <p className="text-xs text-white/60">
                  Items in your knowledge base
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#111111] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quotes</CardTitle>
                <Quote className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.quotes}</div>
                <p className="text-xs text-white/60">
                  Saved quotes
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#111111] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notes</CardTitle>
                <FileText className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.notes}</div>
                <p className="text-xs text-white/60">
                  Notes
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#111111] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Links</CardTitle>
                <LinkIcon className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isLoading ? "..." : stats.links}</div>
                <p className="text-xs text-white/60">
                  Saved links
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-[#111111] border-[#333333] text-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold tracking-tight">Recent Activity</CardTitle>
                <CardDescription className="text-white/60 text-[13px]">
                  Your recent interactions with your knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingEntries ? (
                  <div className="flex items-center justify-center h-[200px] text-white/40">
                    Loading recent activity...
                  </div>
                ) : entries.length === 0 ? (
                  <div className="flex items-center justify-center h-[200px] text-white/40">
                    No recent activity to display
                  </div>
                ) : (
                  <div className="space-y-4">
                    {entries.slice(0, 3).map((entry, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                        <div className="bg-[#222222] p-2.5 rounded-full shrink-0">
                          {getContentTypeIcon(entry.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center gap-2">
                            <span className="font-semibold text-[15px] leading-none text-white/90 truncate font-inter">{entry.title}</span>
                            <span className="text-[12px] leading-none text-white/50 font-medium shrink-0 tabular-nums">{formatDate(entry.createdAt.toString())}</span>
                          </div>
                          <p className="text-[14px] leading-relaxed text-white/70 mt-2 line-clamp-1 font-normal font-inter">{entry.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3 bg-[#111111] border-[#333333] text-white">
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
                <CardDescription className="text-white/60">
                  Most used tags in your knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingEntries ? (
                  <div className="flex items-center justify-center h-[200px] text-white/40">
                    Loading tags...
                  </div>
                ) : popularTags.length === 0 ? (
                  <div className="flex items-center justify-center h-[200px] text-white/40">
                    No tags to display
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((item, index) => (
                      <div key={index} className="bg-[#222222] px-3 py-2 rounded-lg flex items-center gap-2">
                        <span className="text-sm">{item.tag}</span>
                        <span className="bg-[#333333] text-xs px-2 py-0.5 rounded-full">{item.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <Card className="bg-[#111111] border-[#333333] text-white">
            <CardHeader>
              <CardTitle>Recent Entries</CardTitle>
              <CardDescription className="text-white/60">
                Your most recently added knowledge items
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingEntries ? (
                <div className="flex items-center justify-center h-[300px] text-white/40">
                  Loading entries...
                </div>
              ) : entries.length === 0 ? (
                <div className="flex items-center justify-center h-[300px] text-white/40">
                  No entries yet. Start adding content to your second brain!
                </div>
              ) : (
                <div className="space-y-4">
                  {entries.slice(0, 5).map((entry, index) => (
                    <div key={index} className="border border-[#333333] rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getContentTypeIcon(entry.type)}
                          <span className="font-medium">{entry.title}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Calendar className="h-3 w-3" />
                          {formatDate(entry.createdAt.toString())}
                        </div>
                      </div>
                      <p className="text-sm text-white/80 line-clamp-2">{entry.content}</p>
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {entry.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="bg-[#222222] text-xs px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}