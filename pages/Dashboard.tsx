import React from 'react';
import { useStore } from '../store';
import IdeaCard from '../components/IdeaCard';
import { BarChart2, MessageSquare, Zap } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { ideas } = useStore();
    // Simulate current user owning first 2 ideas
    const myIdeas = ideas.slice(0, 2); 

    const totalViews = myIdeas.reduce((acc, curr) => acc + curr.views, 0);
    const totalSubs = myIdeas.reduce((acc, curr) => acc + curr.subscribers, 0);

    return (
        <div className="space-y-8 animate-fade-in">
            <h1 className="text-3xl font-bold font-sans">My Lab</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-lab-ink/5 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <BarChart2 />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Total Views</p>
                        <p className="text-2xl font-mono font-bold">{totalViews.toLocaleString()}</p>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-xl border border-lab-ink/5 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                        <Zap />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Total Subscribers</p>
                        <p className="text-2xl font-mono font-bold">{totalSubs}</p>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-xl border border-lab-ink/5 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                        <MessageSquare />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase font-bold">Pending Feedback</p>
                        <p className="text-2xl font-mono font-bold">5</p>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold font-sans mt-8 border-b pb-2">Active Experiments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myIdeas.map(idea => (
                    <IdeaCard key={idea.id} idea={idea} />
                ))}
                 <div className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 p-8 min-h-[200px] hover:border-lab-blue hover:text-lab-blue transition-colors cursor-pointer group">
                    <span className="font-bold group-hover:scale-105 transition-transform">Start New Experiment</span>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;