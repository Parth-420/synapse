# Synapse

Synapse is a Second Brain is a personal knowledge management tool that enables you to store, organize, and retrieve diverse content using semantic search and AI-generated answers. Built with Next.js and TypeScript, it provides an intuitive interface for capturing your thoughts, discoveries, and references in one centralized location.



## Features

- **Multiple Content Types**: Store notes, quotes, links, code snippets, diary entries, and more
- **Semantic Search**: Find information based on meaning, not just keywords
- **AI-Powered Answers**: Get intelligent responses based on your stored knowledge
- **Tag System**: Organize content with customizable tags
- **Source Attribution**: Track where your information comes from
- **Responsive Design**: Access your knowledge base from any device
- **User Authentication**: Secure your personal information
- **Vector Search**: Utilize advanced search capabilities with MongoDB Atlas

## Architecture

Second Brain follows a modern web application architecture:

- **Frontend**: Next.js with TypeScript and React components
- **Backend**: Next.js API routes 
- **Database**: MongoDB Atlas with Vector Search capability
- **Authentication**: NextAuth.js for user management
- **AI Integration**: Gemini API for embeddings and answer generation
 #  File Structure

```
synapse/

├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout component
│   ├── page.tsx              # Home page
│   ├── globals.css           # Global styles
│   │
│   ├── api/                  # API routes (backend)
│   │   ├── auth/             # Authentication endpoints
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts  # NextAuth.js configuration
│   │   │
│   │   ├── entries/          # Entry management endpoints
│   │   │   ├── route.ts      # GET (list) and POST (create) entries
│   │   │   
│   │   │
│   │   ├── search/           # Search endpoints
│   │   │   └── route.ts      # Vector search implementation
│   │   │
│   │   └── stats/            # Analytics endpoints
│   │       └── route.ts      # Usage statistics
│   │
│   ├── dashboard/            # Dashboard pages
│   │   ├── page.tsx          # Main dashboard
│   │   |
│   │.  |
│   └── get-started/          # Onboarding
│       └── page.tsx         
│
├── components/               # Reusable UI components
│   ├── ui/                   # Basic UI elements
│   |
│.  |
├── hooks/                    # Custom React hooks
│   
│
└── lib/                      # Utility libraries and services
    ├── gemini.ts             # Gemini API client for embeddings and answers
    ├── mongodb.ts            # MongoDB connection and helpers
    ├── types.ts              # TypeScript type definitions
    └── utils.ts              # General utility functions
```

### Data Model


Each document in MongoDB contains:

```typescript
interface Entry {
  userId: string;
  type: 'note' | 'quote' | 'link' | 'code' | 'diary' | string;
  title: string;
  content: string;
  source?: string;
  tags: string[];
  embedding: number[]; // 768-dimensional vector
  createdAt: Date;
  updatedAt: Date;
}
```

### Search Process

1. User submits a query
2. System applies text-based filters (if specified)
3. Vector search is performed using the query embedding
4. Relevant documents are retrieved
5. Context from documents is sent to Gemini LLM with the original query
6. AI generates a comprehensive answer based on the knowledge base

## Installation

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- MongoDB Atlas account
- Gemini API key

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/parth-420/synapse.git
   cd synapse
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables (see section below)

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# MongoDB
MONGODB_URI=your_mongodb_atlas_connection_string
MONGODB_DB=second_brain

# Gemini API
GEMINI_API_KEY=your_gemini_api_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_random_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

```

## Usage

### Storing Content

1. Navigate to the "Add Entry" page
2. Select the content type (note, quote, link, etc.)
3. Fill in the required fields:
   - Title: A descriptive name for your entry
   - Content: The main body of your entry
   - Source (optional): Where this information came from
   - Tags: Keywords to categorize your entry
4. Click "Save Entry" to store in your knowledge base

The system automatically generates an embedding for your content using the Gemini API.

### Querying Your Knowledge Base

1. Navigate to the "Search" page
2. Enter your query in natural language
3. (Optional) Apply filters like content type or tags
4. View the AI-generated answer based on your stored knowledge
5. Browse through the source entries that informed the answer


## Vector Search Configuration

Second Brain uses MongoDB Atlas Vector Search with the following configuration:

```json
{
  "name": "vector_search_index",
  "definition": {
    "mappings": {
      "dynamic": true,
      "fields": {
        "embedding": {
          "type": "knnVector",
          "dimensions": 768,
          "similarity": "cosine"
        },
        "userId": {
          "type": "string"
        },
        "type": {
          "type": "string"
        },
        "tags": {
          "type": "string"
        },
        "content": {
          "type": "string"
        }
      }
    }
  }
}
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster
2. Set up Vector Search index using the configuration provided above
3. Whitelist your deployment IP addresses in the MongoDB Atlas dashboard
4. Create a database user with read/write permissions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
