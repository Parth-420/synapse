"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  message: z.string().min(1, "Please enter a message"),
});

type FormValues = z.infer<typeof formSchema>;

const suggestedPrompts = [
  "Your last vacation",
  "A special birthday",
  "A funny moment",
  "Your favorite place",
];

export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const { toast } = useToast();
  const { data: session } = useSession();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    
    try {
      // Get the user ID from the session
      const userId = session?.user?.id;
      
      if (!userId) {
        toast({
          title: "Authentication Error",
          description: "You must be logged in to use this feature.",
          variant: "destructive",
        });
        return;
      }
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(values.message)}&userId=${userId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        
        if (errorData.error === 'Vector search not supported') {
          toast({
            title: "Vector Search Error",
            description: errorData.message || "Your MongoDB Atlas configuration does not support vector search.",
            variant: "destructive",
          });
        } else {
          throw new Error(errorData.error || "Failed to get response");
        }
        return;
      }
      
      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        { text: values.message, isUser: true },
        { text: data.answer, isUser: false }
      ]);
      
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handlePromptClick = (prompt: string) => {
    form.setValue("message", prompt);
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <Card className="bg-[#111111] border-[#333333] text-white flex flex-col h-full">
        <CardHeader className="text-center border-b border-[#222222] py-8">
          <h1 className="text-3xl font-bold mb-2">Talk to Synapse</h1>
          <p className="text-white/60">
            Prompt to search your notes,quotes,links and take yourself down the memory lane
          </p>
          
          <div className="mt-6">
            <h2 className="text-sm font-medium mb-3">Ask about:</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedPrompts.map((prompt) => (
                <Button
                  key={prompt}
                  variant="outline"
                  className="bg-[#222222] hover:bg-[#333333] border-none text-white/80"
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] rounded-lg p-4",
                  message.isUser 
                    ? "bg-purple-500/20 ml-auto" 
                    : "bg-[#222222] mr-auto"
                )}
              >
                <p className="text-white/90">{message.text}</p>
              </div>
            ))}
            {messages.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-white/40">
                Start a conversation by typing a message or selecting a prompt
              </div>
            )}
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Type your message..."
                          className="bg-[#0A0A0A] border-[#333333] text-white pr-24 py-6"
                          {...field}
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <span className="text-xs text-white/40">
                            {field.value.length}/100
                          </span>
                          <Button 
                            type="submit" 
                            size="icon"
                            className="bg-purple-500 hover:bg-purple-600"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Send className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
