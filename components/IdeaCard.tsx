import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowBigUp, ArrowBigDown, MessageSquare, Activity, Zap } from 'lucide-react';
import { Idea, SignalStrength } from '../types';
import { useStore } from '../store';

interface IdeaCardProps {
  idea: Idea;
}

const getSignalStrength = (idea: Idea): SignalStrength => {
  const score = idea.upvotes - idea.downvotes + (idea.subscribers * 2);
  if (score > 1000) return 'Hot';
  if (score > 200) return 'Promising';
  if (score > 50) return 'Early Interest';
  return 'New';
};

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const { voteIdea, userVotes } = useStore();
  const signal = getSignalStrength(idea);
  const vote = userVotes[idea.id];

  const handleVote = (e: React.MouseEvent, type: 'up' | 'down') => {
    e.preventDefault(); // Prevent navigation
    voteIdea(idea.id, type);
  };

  const signalColors = {
    'Hot': 'bg-lab-coral text-white',
    'Promising': 'bg-lab-yellow text-lab-ink',
    'Early Interest': 'bg-lab-blue/10 text-lab-blue',
    'New': 'bg-gray-100 text-gray-500',
  };

  return (
    <Link to={`/idea/${idea.id}`} className="block h-full">
      <div className="group h-full bg-lab-card border border-lab-ink/10 rounded-xl p-5 shadow-sm hover:shadow-lab hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-lab-grid group-hover:bg-lab-blue transition-colors" />

        <div className="flex justify-between items-start mb-3">
            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-sm ${signalColors[signal]}`}>
              {signal}
            </span>
            <span className="text-[10px] font-mono text-lab-pencil border border-lab-ink/10 px-2 py-1 rounded-sm">
                {idea.category}
            </span>
        </div>

        <h3 className="text-xl font-bold font-sans leading-tight mb-1 group-hover:text-lab-blue transition-colors">
          {idea.title}
        </h3>
        <p className="text-sm font-medium text-lab-pencil mb-3 font-serif italic">
          {idea.tagline}
        </p>

        <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow">
            <span className="font-semibold text-xs uppercase text-gray-400 mr-2">Problem:</span>
            {idea.description}
        </p>

        {/* Validation Bar */}
        <div className="mt-auto pt-4 border-t border-dashed border-lab-ink/10 flex items-center justify-between">
            <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1 border border-gray-100">
                <button 
                    onClick={(e) => handleVote(e, 'up')}
                    className={`p-1 rounded hover:bg-white hover:shadow-sm transition-all ${vote === 'up' ? 'text-lab-blue bg-white shadow-sm' : 'text-gray-400'}`}
                >
                    <ArrowBigUp size={20} fill={vote === 'up' ? 'currentColor' : 'none'} />
                </button>
                <span className={`text-sm font-bold w-6 text-center ${vote === 'up' ? 'text-lab-blue' : vote === 'down' ? 'text-lab-coral' : 'text-gray-600'}`}>
                    {idea.upvotes - idea.downvotes}
                </span>
                 <button 
                    onClick={(e) => handleVote(e, 'down')}
                    className={`p-1 rounded hover:bg-white hover:shadow-sm transition-all ${vote === 'down' ? 'text-lab-coral bg-white shadow-sm' : 'text-gray-400'}`}
                >
                    <ArrowBigDown size={20} fill={vote === 'down' ? 'currentColor' : 'none'} />
                </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
                 <div className="flex items-center gap-1">
                    <Zap size={14} className={idea.subscribers > 0 ? "text-lab-yellow fill-lab-yellow" : ""} />
                    <span>{idea.subscribers}</span>
                </div>
                <div className="flex items-center gap-1">
                    <MessageSquare size={14} />
                    <span>{idea.comments.length}</span>
                </div>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default IdeaCard;