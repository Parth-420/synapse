"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, Loader2, Quote, FileText, Link as LinkIcon, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ContentType, SearchResult } from "@/lib/types";

const formSchema = z.object({
  query: z.string().min(1, "Please enter a search query"),
});

type FormValues = z.infer<typeof formSchema>;

const contentTypeIcons = {
  quote: <Quote className="h-4 w-4 text-purple-400" />,
  snippet: <FileText className="h-4 w-4 text-blue-400" />,
  link: <LinkIcon className="h-4 w-4 text-green-400" />,
  note: <StickyNote className="h-4 w-4 text-yellow-400" />,
};

export default function SearchPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [answer, setAnswer] = useState<string>("");
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSearching(true);
    setResults([]);
    setAnswer("");
    
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(values.query)}&userId=user123`);
      
      if (!response.ok) {
        throw new Error("Search failed");
      }
      
      const data = await response.json();
      setResults(data.results);
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error searching:", error);
      toast({
        title: "Error",
        description: "Failed to perform search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Search Your Brain</h1>
        <p className="text-white/60">
          Ask questions or search for content in your personal knowledge base.
        </p>
      </div>
      
      <Card className="bg-[#111111] border-[#333333] text-white">
        <CardHeader>
          <CardTitle>Semantic Search</CardTitle>
          <CardDescription className="text-white/60">
            Search by meaning, not just keywords. Ask questions in natural language.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input 
                          placeholder="What was that quote about creativity?" 
                          className="flex-1 bg-[#0A0A0A] border-[#333333] text-white" 
                          {...field} 
                        />
                        <Button type="submit" disabled={isSearching} className="bg-white text-black hover:bg-white/90 glow-button">
                          {isSearching ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Search className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {isSearching && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
        </div>
      )}
      
      {answer && !isSearching && (
        <Card className="bg-[#111111] border-[#333333] text-white">
          <CardHeader>
            <CardTitle>AI Answer</CardTitle>
            <CardDescription className="text-white/60">
              Generated from your personal knowledge base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose dark:prose-invert max-w-none text-white">
              <p>{answer}</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {results.length > 0 && !isSearching && (
        <Card className="bg-[#111111] border-[#333333] text-white">
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
            <CardDescription className="text-white/60">
              Found {results.length} relevant items in your second brain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#222222] p-1.5 rounded-md">
                      {contentTypeIcons[result.entry.type as ContentType]}
                    </div>
                    <h3 className="font-medium text-white">{result.entry.title}</h3>
                    <div className="ml-auto text-xs text-white/60">
                      {new Date(result.entry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-white/70 line-clamp-2">
                    {result.entry.content}
                  </p>
                  {result.entry.source && (
                    <p className="text-xs text-white/60">
                      Source: {result.entry.source}
                    </p>
                  )}
                  {index < results.length - 1 && <Separator className="my-2 bg-[#333333]" />}
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-[#333333] px-6 py-4">
            <p className="text-xs text-white/60">
              Results are ranked by semantic relevance to your query
            </p>
          </CardFooter>
        </Card>
      )}
      
      {!isSearching && results.length === 0 && !answer && form.formState.isSubmitted && (
        <Card className="bg-[#111111] border-[#333333] text-white">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-white/60 mb-2">No results found</p>
            <p className="text-sm text-white/40">
              Try a different query or add more content to your second brain
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}