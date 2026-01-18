import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Idea } from '../types';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const SubmitIdea: React.FC = () => {
  const navigate = useNavigate();
  const { addIdea } = useStore();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState<Partial<Idea>>({
    title: '',
    tagline: '',
    category: 'SaaS',
    tags: [],
    description: '',
    solution: '',
    businessModel: '',
    targetAudience: '',
    risks: '',
    validationGoals: '',
  });
  
  const [tagInput, setTagInput] = useState('');

  const handleChange = (field: keyof Idea, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput) {
        e.preventDefault();
        setFormData(prev => ({ ...prev, tags: [...(prev.tags || []), tagInput] }));
        setTagInput('');
    }
  };

  const handleSubmit = () => {
    const newIdea: Idea = {
        ...formData as Idea,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        authorName: 'Anonymous Maker', // Mock
        upvotes: 0,
        downvotes: 0,
        views: 0,
        subscribers: 0,
        comments: [],
        status: 'Concept'
    };
    addIdea(newIdea);
    navigate('/');
  };

  const isStep1Valid = formData.title && formData.tagline;
  const isStep2Valid = formData.description && formData.solution;
  const isStep3Valid = formData.validationGoals;

  return (
    <div className="max-w-4xl mx-auto py-8 animate-slide-up">
        
        {/* Progress */}
        <div className="flex justify-between mb-8 px-4">
            {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s ? 'bg-lab-blue text-white' : 'bg-gray-200 text-gray-500'}`}>
                        {step > s ? <Check size={16} /> : s}
                    </div>
                    <span className={`text-sm font-medium hidden md:block ${step >= s ? 'text-lab-blue' : 'text-gray-400'}`}>
                        {s === 1 ? 'Concept' : s === 2 ? 'Details' : 'Validation'}
                    </span>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Form Side */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-lab-ink/10">
                
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold font-sans">The Hook</h2>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Project Title</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none"
                                placeholder="e.g. Uber for Cats"
                                value={formData.title}
                                onChange={e => handleChange('title', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">One-liner (Tagline)</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none"
                                placeholder="What is it in 10 words?"
                                value={formData.tagline}
                                onChange={e => handleChange('tagline', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                            <select 
                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none bg-white"
                                value={formData.category}
                                onChange={e => handleChange('category', e.target.value)}
                            >
                                <option value="SaaS">SaaS</option>
                                <option value="Consumer">Consumer App</option>
                                <option value="Hardware">Hardware</option>
                                <option value="Marketplace">Marketplace</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Tags (Press Enter)</label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags?.map(t => (
                                    <span key={t} className="bg-gray-100 px-2 py-1 rounded text-xs flex items-center gap-1">{t}</span>
                                ))}
                            </div>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none"
                                placeholder="Add a tag..."
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold font-sans">The Meat</h2>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">The Problem</label>
                            <textarea 
                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none h-32"
                                placeholder="What pain point are you solving?"
                                value={formData.description}
                                onChange={e => handleChange('description', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">The Solution</label>
                            <textarea 
                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none h-32"
                                placeholder="How does it work?"
                                value={formData.solution}
                                onChange={e => handleChange('solution', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                 {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold font-sans">The Business</h2>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Business Model</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none"
                                placeholder="Subscription? Ads? One-time?"
                                value={formData.businessModel}
                                onChange={e => handleChange('businessModel', e.target.value)}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Target Audience</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none"
                                placeholder="Who is this for?"
                                value={formData.targetAudience}
                                onChange={e => handleChange('targetAudience', e.target.value)}
                            />
                        </div>
                         <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Biggest Risk</label>
                            <input 
                                type="text" 
                                className="w-full border border-gray-300 rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none"
                                placeholder="Why might this fail?"
                                value={formData.risks}
                                onChange={e => handleChange('risks', e.target.value)}
                            />
                        </div>
                        <div className="bg-lab-yellow/10 p-4 rounded-lg border border-lab-yellow/50">
                            <label className="block text-sm font-bold text-gray-900 mb-1">Validation Goal</label>
                            <p className="text-xs text-gray-600 mb-2">What is the ONE thing you want to learn from posting this?</p>
                            <input 
                                type="text" 
                                className="w-full border border-lab-yellow rounded p-3 focus:ring-2 focus:ring-lab-blue outline-none bg-white"
                                placeholder="e.g. Are people willing to pay $10?"
                                value={formData.validationGoals}
                                onChange={e => handleChange('validationGoals', e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                    {step > 1 ? (
                         <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 text-gray-500 font-medium hover:text-black">
                            <ChevronLeft size={20} /> Back
                        </button>
                    ) : <div></div>}
                    
                    {step < 3 ? (
                        <button 
                            disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                            onClick={() => setStep(s => s + 1)} 
                            className="bg-lab-ink text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-lab-blue disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next <ChevronRight size={20} />
                        </button>
                    ) : (
                         <button 
                            disabled={!isStep3Valid}
                            onClick={handleSubmit} 
                            className="bg-lab-blue text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-600 shadow-lg shadow-blue-500/30 disabled:opacity-50 transition-all"
                        >
                            Launch Experiment
                        </button>
                    )}
                </div>
            </div>

            {/* Preview Side */}
            <div className="hidden md:block sticky top-24">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Live Preview</h3>
                <div className="opacity-90 pointer-events-none transform scale-95 origin-top-left">
                     {/* We Mock the card here visually */}
                     <div className="bg-white border border-lab-ink/10 rounded-xl p-5 shadow-lab flex flex-col relative overflow-hidden min-h-[300px]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-lab-grid" />
                         <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-sm bg-gray-100 text-gray-500">New</span>
                            <span className="text-[10px] font-mono text-gray-500 border px-2 py-1 rounded-sm">{formData.category || 'Category'}</span>
                        </div>
                        <h3 className="text-xl font-bold font-sans leading-tight mb-1">{formData.title || 'Untitled Project'}</h3>
                        <p className="text-sm font-medium text-gray-500 mb-3 font-serif italic">{formData.tagline || 'Your tagline goes here...'}</p>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-grow border-l-2 border-gray-100 pl-3">
                            {formData.description || 'Describe the problem you are solving...'}
                        </p>
                     </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default SubmitIdea;