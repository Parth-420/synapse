"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, 
  Link as LinkIcon, Save, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Tiptap imports
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function WritePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Write your thoughts, moments, or memories here... Feel free to pour your heart out—only you can unlock these words.',
      }),
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      form.setValue("content", html, { shouldValidate: true });
    },
  });

  // Set focus to the editor when the component mounts
  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        editor.commands.focus();
      }, 100);
    }
  }, [editor]);

  const setLink = () => {
    if (!editor) return;
    
    if (linkUrl) {
      // Check if the URL has a protocol, if not add https://
      const url = linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`;
      
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
      
      setLinkUrl('');
      setShowLinkInput(false);
    } else if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
    } else {
      setShowLinkInput(true);
    }
  };

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    
    try {
      // For development, using a fixed user ID
      const userId = "dev-user-123";
      
      const response = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: values.title,
          type: "note",
          content: values.content,
          userId: userId,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to save entry");
      }
      
      toast({
        title: "Entry saved",
        description: "Your content has been added to your second brain.",
      });
      
      // Reset form and editor
      form.reset();
      if (editor) {
        editor.commands.clearContent();
      }
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
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <Card className="bg-[#111111] border-[#333333] text-white flex flex-col h-full">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-[#222222]">
          <div className="flex items-center gap-2 flex-1">
            <Select 
              defaultValue="paragraph"
              onValueChange={(value) => {
                if (!editor) return;
                
                if (value === 'paragraph') {
                  editor.chain().focus().setParagraph().run();
                } else if (value.startsWith('heading')) {
                  const level = parseInt(value.replace('heading', '')) as 1 | 2 | 3;
                  editor.chain().focus().toggleHeading({ level }).run();
                }
              }}
            >
              <SelectTrigger className="w-[120px] h-8 bg-[#0A0A0A] border-[#333333] text-white">
                <SelectValue placeholder="Normal" />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border-[#333333] text-white">
                <SelectItem value="paragraph">Normal</SelectItem>
                <SelectItem value="heading1">Heading 1</SelectItem>
                <SelectItem value="heading2">Heading 2</SelectItem>
                <SelectItem value="heading3">Heading 3</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center border-l border-[#333333] pl-2 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-8 w-8 p-0",
                  editor?.isActive('bold') && "bg-[#333333]"
                )}
                onClick={() => editor?.chain().focus().toggleBold().run()}
                type="button"
                disabled={!editor}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-8 w-8 p-0",
                  editor?.isActive('italic') && "bg-[#333333]"
                )}
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                type="button"
                disabled={!editor}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-8 w-8 p-0",
                  editor?.isActive('underline') && "bg-[#333333]"
                )}
                onClick={() => editor?.chain().focus().toggleUnderline().run()}
                type="button"
                disabled={!editor}
              >
                <UnderlineIcon className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center border-l border-[#333333] pl-2 ml-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-8 w-8 p-0",
                  editor?.isActive('bulletList') && "bg-[#333333]"
                )}
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                type="button"
                disabled={!editor}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "h-8 w-8 p-0",
                  editor?.isActive('orderedList') && "bg-[#333333]"
                )}
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                type="button"
                disabled={!editor}
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center border-l border-[#333333] pl-2 ml-2">
              {showLinkInput ? (
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Enter URL"
                    className="h-8 bg-[#0A0A0A] border-[#333333] text-white mr-2 w-40"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setLink();
                      }
                    }}
                  />
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={setLink}
                    className="h-8"
                  >
                    Add
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowLinkInput(false)}
                    className="h-8"
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "h-8 w-8 p-0",
                    editor?.isActive('link') && "bg-[#333333]"
                  )}
                  onClick={setLink}
                  type="button"
                  disabled={!editor}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          <Button 
            onClick={form.handleSubmit(onSubmit)}
            className="bg-white text-black hover:bg-white/90 ml-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save
              </>
            )}
          </Button>
        </CardHeader>
        
        <CardContent className="p-0 flex-1 flex flex-col">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Title..." 
                        className="text-2xl font-medium bg-transparent border-0 border-b border-[#222222] rounded-none px-6 py-4 focus-visible:ring-0 focus-visible:ring-offset-0" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <div className="h-full">
                        {editor && (
                          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                            <div className="flex bg-[#111111] border border-[#333333] rounded-md shadow-md">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={cn(
                                  "h-8 w-8 p-0",
                                  editor.isActive('bold') && "bg-[#333333]"
                                )}
                                onClick={() => editor.chain().focus().toggleBold().run()}
                              >
                                <Bold className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={cn(
                                  "h-8 w-8 p-0",
                                  editor.isActive('italic') && "bg-[#333333]"
                                )}
                                onClick={() => editor.chain().focus().toggleItalic().run()}
                              >
                                <Italic className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className={cn(
                                  "h-8 w-8 p-0",
                                  editor.isActive('link') && "bg-[#333333]"
                                )}
                                onClick={setLink}
                              >
                                <LinkIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </BubbleMenu>
                        )}
                        <EditorContent 
                          editor={editor} 
                          className="h-[calc(100vh-16rem)] px-6 py-4 focus:outline-none overflow-auto prose prose-invert max-w-none"
                        />
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
    </div>
  );
}