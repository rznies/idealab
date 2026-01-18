import React, { useState } from 'react';
import { useStore } from '../store';
import IdeaCard from '../components/IdeaCard';
import { Filter, Search } from 'lucide-react';
import { CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const { ideas } = useStore();
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('popular');

  const filteredIdeas = ideas
    .filter(idea => {
      const matchesCategory = filterCategory ? idea.category === filterCategory : true;
      const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            idea.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            idea.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'popular') {
        const scoreA = a.upvotes - a.downvotes;
        const scoreB = b.upvotes - b.downvotes;
        return scoreB - scoreA;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="relative border-b border-lab-ink/10 pb-8 mb-10">
        <h1 className="text-4xl md:text-6xl font-sans font-bold text-lab-ink mb-4 tracking-tight">
          Don't hoard ideas.<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lab-blue to-purple-600">Validate them.</span>
        </h1>
        <p className="text-xl text-lab-pencil max-w-2xl font-serif leading-relaxed">
           Open business plans, real feedback, and validation signals. The lab is open for experiments.
        </p>
        
        {/* Decorative Quote */}
        <div className="hidden lg:block absolute right-0 bottom-8 max-w-xs text-right opacity-60">
             <p className="font-mono text-xs text-lab-pencil italic border-r-2 border-lab-yellow pr-4">
                 "Ideas won't keep; something must be done about them." <br/> — Alfred N. Whitehead
             </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center sticky top-20 z-40 bg-lab-bg/95 backdrop-blur py-2">
        <div className="flex flex-wrap gap-2">
           <button 
              onClick={() => setFilterCategory(null)}
              className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${!filterCategory ? 'bg-lab-ink text-white border-lab-ink' : 'bg-white text-lab-pencil border-lab-ink/20 hover:border-lab-ink'}`}
           >
              All
           </button>
           {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilterCategory(cat === filterCategory ? null : cat)}
                className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${filterCategory === cat ? 'bg-lab-ink text-white border-lab-ink' : 'bg-white text-lab-pencil border-lab-ink/20 hover:border-lab-ink'}`}
              >
                {cat}
              </button>
           ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
             <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search tags..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-3 py-1.5 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-lab-blue w-full md:w-48"
                />
             </div>
             <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border border-gray-200 rounded-md py-1.5 px-2 bg-white focus:outline-none focus:ring-2 focus:ring-lab-blue cursor-pointer"
             >
                 <option value="popular">Most Popular</option>
                 <option value="newest">Newest</option>
             </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIdeas.map((idea, idx) => (
            <div key={idea.id} style={{ animationDelay: `${idx * 50}ms` }} className="animate-slide-up">
                 <IdeaCard idea={idea} />
            </div>
        ))}
        
        {filteredIdeas.length === 0 && (
            <div className="col-span-full py-20 text-center">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                    <Filter className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">No ideas found</h3>
                <p className="text-gray-500">Adjust your filters or be the first to submit one.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Home;