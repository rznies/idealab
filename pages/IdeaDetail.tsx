import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ArrowBigUp, ArrowBigDown, Share2, Mail, AlertTriangle, Target, Lightbulb, Users, DollarSign, Send } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const IdeaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ideas, voteIdea, userVotes, addComment, subscribeToIdea } = useStore();
  
  const [email, setEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const idea = ideas.find(i => i.id === id);

  if (!idea) {
    return <div className="p-8 text-center">Idea not found. <button onClick={() => navigate('/')} className="text-lab-blue underline">Go Back</button></div>;
  }

  const vote = userVotes[idea.id];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
        subscribeToIdea(idea.id, email);
        setIsSubscribed(true);
        setEmail('');
    }
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if(commentText.trim()) {
        addComment(idea.id, {
            id: Date.now().toString(),
            author: 'You',
            text: commentText,
            createdAt: new Date().toISOString()
        });
        setCommentText('');
    }
  };

  const chartData = [
    { name: 'Up', value: idea.upvotes, color: '#3B82F6' },
    { name: 'Down', value: idea.downvotes, color: '#FB7185' },
    { name: 'Interest', value: idea.subscribers, color: '#FACC15' },
  ];

  return (
    <div className="max-w-5xl mx-auto animate-fade-in pb-20">
      
      {/* Header / Hero */}
      <header className="mb-8 border-b-2 border-lab-ink/5 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
                <div className="flex gap-2 mb-4">
                    {idea.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-mono uppercase border border-gray-200">{tag}</span>
                    ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-sans text-lab-ink mb-3">{idea.title}</h1>
                <p className="text-xl font-serif italic text-lab-pencil">{idea.tagline}</p>
                
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                    <span>by <span className="text-lab-ink font-medium">{idea.authorName}</span></span>
                    <span>•</span>
                    <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="bg-blue-50 text-blue-600 px-2 rounded-full font-bold text-xs py-0.5">{idea.status}</span>
                </div>
            </div>

            {/* Voting & Key Stats Panel */}
            <div className="bg-white p-4 rounded-xl shadow-lab border border-lab-ink/10 flex flex-col items-center min-w-[140px]">
                 <div className="flex items-center gap-2 mb-2">
                     <button onClick={() => voteIdea(idea.id, 'up')} className={`p-2 rounded-lg transition-colors ${vote === 'up' ? 'bg-lab-blue text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                         <ArrowBigUp size={28} fill={vote === 'up' ? 'currentColor' : 'none'} />
                     </button>
                     <div className="text-2xl font-bold font-mono">{idea.upvotes - idea.downvotes}</div>
                     <button onClick={() => voteIdea(idea.id, 'down')} className={`p-2 rounded-lg transition-colors ${vote === 'down' ? 'bg-lab-coral text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                         <ArrowBigDown size={28} fill={vote === 'down' ? 'currentColor' : 'none'} />
                     </button>
                 </div>
                 <div className="text-xs text-gray-400 uppercase font-bold tracking-widest mt-1">Net Signal</div>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
            
            {/* Business Plan Cards */}
            <section className="bg-white p-6 md:p-8 rounded-xl border border-lab-ink/5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-lab-blue"></div>
                <div className="flex items-center gap-2 mb-4 text-lab-blue font-bold uppercase tracking-wider text-sm">
                    <AlertTriangle size={16} /> The Problem
                </div>
                <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line font-serif">{idea.description}</p>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-xl border border-lab-ink/5 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-lab-yellow"></div>
                <div className="flex items-center gap-2 mb-4 text-yellow-600 font-bold uppercase tracking-wider text-sm">
                    <Lightbulb size={16} /> The Solution
                </div>
                <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-line font-serif">{idea.solution}</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-lab-bg border border-lab-ink/10 p-5 rounded-lg">
                    <div className="flex items-center gap-2 mb-3 text-gray-500 font-bold uppercase text-xs">
                        <Users size={14} /> Target Audience
                    </div>
                    <p className="text-gray-700 text-sm">{idea.targetAudience}</p>
                </div>
                <div className="bg-lab-bg border border-lab-ink/10 p-5 rounded-lg">
                     <div className="flex items-center gap-2 mb-3 text-gray-500 font-bold uppercase text-xs">
                        <DollarSign size={14} /> Business Model
                    </div>
                    <p className="text-gray-700 text-sm">{idea.businessModel}</p>
                </div>
            </div>

            <section className="border border-dashed border-red-200 bg-red-50/50 p-6 rounded-xl">
                 <h3 className="text-red-800 font-bold mb-2 text-sm uppercase">Risks & Unknowns</h3>
                 <p className="text-red-900/80">{idea.risks}</p>
            </section>
            
            {/* Feedback Section */}
            <section className="mt-12 pt-12 border-t border-lab-ink/10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">Lab Notes <span className="text-gray-400 text-lg font-normal">({idea.comments.length})</span></h2>
                
                <div className="space-y-6 mb-8">
                    {idea.comments.map(comment => (
                        <div key={comment.id} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
                                {comment.author.charAt(0)}
                            </div>
                            <div className="bg-white p-4 rounded-lg rounded-tl-none border border-gray-100 shadow-sm flex-grow">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-sm">{comment.author}</span>
                                    <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                {comment.role && <span className="text-[10px] bg-gray-100 px-1 rounded uppercase tracking-wide text-gray-500 mb-2 inline-block">{comment.role}</span>}
                                <p className="text-gray-700 text-sm">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <form onSubmit={handleComment} className="relative">
                    <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Leave a structured critique or question..."
                        className="w-full bg-white border border-gray-300 rounded-lg p-4 pr-12 focus:ring-2 focus:ring-lab-blue focus:border-transparent min-h-[100px]"
                    />
                    <button type="submit" className="absolute bottom-3 right-3 p-2 bg-lab-ink text-white rounded-md hover:bg-lab-blue transition-colors disabled:opacity-50" disabled={!commentText.trim()}>
                        <Send size={16} />
                    </button>
                </form>
            </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            
            {/* Validation Goals */}
            <div className="bg-lab-ink text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><Target className="text-lab-yellow"/> Validation Goal</h3>
                    <p className="text-gray-300 text-sm italic border-l-2 border-lab-yellow pl-3 mb-6">
                        "{idea.validationGoals}"
                    </p>
                    
                    {!isSubscribed ? (
                        <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                            <p className="text-xs font-bold uppercase tracking-widest text-lab-yellow mb-2">Get Updates / Beta Access</p>
                            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                                <input 
                                    type="email" 
                                    placeholder="email@example.com"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black/20 border border-white/20 rounded px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-lab-yellow" 
                                />
                                <button type="submit" className="bg-lab-yellow text-lab-ink font-bold text-sm py-2 rounded hover:bg-white transition-colors">
                                    I'm Interested
                                </button>
                            </form>
                        </div>
                    ) : (
                         <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-lg text-center">
                            <span className="text-green-400 font-bold text-sm">You're on the list!</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Signal Chart */}
            <div className="bg-white p-6 rounded-xl border border-lab-ink/10 shadow-sm">
                <h4 className="font-bold text-sm text-gray-500 uppercase mb-4">Signal Distribution</h4>
                <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

             <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 text-center">
                <button className="flex items-center justify-center gap-2 text-gray-600 hover:text-lab-blue w-full">
                    <Share2 size={16} /> <span className="font-bold text-sm">Share Idea</span>
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};

export default IdeaDetail;