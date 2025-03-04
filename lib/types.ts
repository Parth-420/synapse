export type ContentType = 'quote' | 'link' | 'note';

export interface Entry {
  
  userId: string;
  type: ContentType;
  content: string;
  title?: string;
  source?: string;
  tags?: string[];
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResult {
  entry: Entry;
  score: number;
}

export interface SearchResponse {
  results: SearchResult[];
  answer: string;
}