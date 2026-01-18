export type ValidationStatus = 'Concept' | 'Prototype' | 'Alpha' | 'Beta';

export type SignalStrength = 'New' | 'Early Interest' | 'Promising' | 'Hot';

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
  role?: string; // e.g. "Founder", "Investor", "Maker"
}

export interface Idea {
  id: string;
  title: string;
  tagline: string;
  category: string;
  tags: string[];
  description: string; // The problem
  solution: string;
  businessModel: string;
  targetAudience: string;
  risks: string;
  validationGoals: string;
  
  // Validation Metrics
  upvotes: number;
  downvotes: number;
  views: number;
  subscribers: number; // Email captures
  
  comments: Comment[];
  
  createdAt: string;
  authorName: string;
  status: ValidationStatus;
}

export type SortOption = 'newest' | 'popular' | 'discussed';
