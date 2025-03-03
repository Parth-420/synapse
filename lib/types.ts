export type ContentType = 'quote' | 'snippet' | 'link' | 'note';

export interface Entry {
  _id?: string;
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