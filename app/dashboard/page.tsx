import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Quote, FileText, Link as LinkIcon, StickyNote } from "lucide-react";

export default function DashboardPage() {
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
                <div className="text-2xl font-bold">0</div>
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
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-white/60">
                  Saved quotes
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#111111] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Snippets</CardTitle>
                <FileText className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-white/60">
                  Text snippets
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#111111] border-[#333333] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Links</CardTitle>
                <LinkIcon className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-white/60">
                  Saved links
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-[#111111] border-[#333333] text-white">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription className="text-white/60">
                  Your recent interactions with your knowledge base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-[200px] text-white/40">
                  No recent activity to display
                </div>
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
                <div className="flex items-center justify-center h-[200px] text-white/40">
                  No tags to display
                </div>
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
              <div className="flex items-center justify-center h-[300px] text-white/40">
                No entries yet. Start adding content to your second brain!
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}