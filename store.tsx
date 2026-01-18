import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Idea, Comment } from './types';
import { MOCK_IDEAS } from './constants';

interface StoreContextType {
  ideas: Idea[];
  addIdea: (idea: Idea) => void;
  voteIdea: (id: string, type: 'up' | 'down') => void;
  addComment: (ideaId: string, comment: Comment) => void;
  subscribeToIdea: (ideaId: string, email: string) => void;
  userVotes: Record<string, 'up' | 'down' | null>; // id -> vote type
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ideas, setIdeas] = useState<Idea[]>(MOCK_IDEAS);
  const [userVotes, setUserVotes] = useState<Record<string, 'up' | 'down' | null>>({});

  const addIdea = (newIdea: Idea) => {
    setIdeas((prev) => [newIdea, ...prev]);
  };

  const voteIdea = (id: string, type: 'up' | 'down') => {
    const currentVote = userVotes[id];
    
    // Toggle logic
    if (currentVote === type) {
      // Remove vote
      setUserVotes((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      setIdeas((prev) => prev.map(idea => {
        if (idea.id === id) {
          return {
            ...idea,
            upvotes: type === 'up' ? idea.upvotes - 1 : idea.upvotes,
            downvotes: type === 'down' ? idea.downvotes - 1 : idea.downvotes
          };
        }
        return idea;
      }));
    } else {
      // Change or Add vote
      setUserVotes((prev) => ({ ...prev, [id]: type }));
      setIdeas((prev) => prev.map(idea => {
        if (idea.id === id) {
          let newUp = idea.upvotes;
          let newDown = idea.downvotes;

          // If switching from one to other, decrement the old one
          if (currentVote === 'up') newUp--;
          if (currentVote === 'down') newDown--;

          // Increment new one
          if (type === 'up') newUp++;
          if (type === 'down') newDown++;

          return { ...idea, upvotes: newUp, downvotes: newDown };
        }
        return idea;
      }));
    }
  };

  const addComment = (ideaId: string, comment: Comment) => {
    setIdeas((prev) => prev.map(idea => {
      if (idea.id === ideaId) {
        return { ...idea, comments: [...idea.comments, comment] };
      }
      return idea;
    }));
  };

  const subscribeToIdea = (ideaId: string, email: string) => {
     setIdeas((prev) => prev.map(idea => {
      if (idea.id === ideaId) {
        return { ...idea, subscribers: idea.subscribers + 1 };
      }
      return idea;
    }));
  };

  return (
    <StoreContext.Provider value={{ ideas, addIdea, voteIdea, addComment, subscribeToIdea, userVotes }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};