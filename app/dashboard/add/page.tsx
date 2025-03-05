"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Brain, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
// import { ContentType } from "@/lib/types";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["quote", "link", "note"] as const),
  content: z.string().min(1, "Content is required"),
  source: z.string().optional(),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;
export default function AddContentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "note",
      content: "",
      source: "",
      tags: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    try {
      const tagsArray = values.tags 
        ? values.tags.split(",").map(tag => tag.trim()).filter(Boolean) 
        : [];
      
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          tags: tagsArray,
          userId: session?.user?.id || "user123", // Use authenticated user ID
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save entry");
      }
      
      toast({
        title: "Entry saved",
        description: "Your content has been added to your second brain.",
      });
      
      form.reset();
      router.refresh();
    } catch (error) {
      console.error("Error saving entry:", error);
      toast({
        title: "Error",
        description: "Failed to save your entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">Add Content</h1>
        <p className="text-white/60">
          Add new content to your second brain. It will be processed and made searchable.
        </p>
      </div>
      
      <Card className="bg-[#111111] border-[#333333] text-white">
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
          <CardDescription className="text-white/60">
            Fill out the form below to add a new entry to your knowledge base.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Give your entry a title" {...field} className="bg-[#0A0A0A] border-[#333333] text-white" />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      A descriptive title to help you find this later
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Content Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#0A0A0A] border-[#333333] text-white">
                          <SelectValue placeholder="Select a content type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#111111] border-[#333333] text-white">
                        <SelectItem value="quote" className="focus:bg-[#222222] focus:text-white">Quote</SelectItem>
                        <SelectItem value="link" className="focus:bg-[#222222] focus:text-white">Link</SelectItem>
                        <SelectItem value="note" className="focus:bg-[#222222] focus:text-white">Note</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-white/60">
                      The type of content you're adding
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter your content here..." 
                        className="min-h-[150px] bg-[#0A0A0A] border-[#333333] text-white" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      The main content you want to save
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Source (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Where did this come from?" {...field} className="bg-[#0A0A0A] border-[#333333] text-white" />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      The source of this content (e.g., book title, website URL)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Tags (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="productivity, ideas, research" {...field} className="bg-[#0A0A0A] border-[#333333] text-white" />
                    </FormControl>
                    <FormDescription className="text-white/60">
                      Comma-separated tags to help organize your content
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 glow-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Save to Second Brain
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-[#333333]">
        </CardFooter>
      </Card>
    </div>
  );
}