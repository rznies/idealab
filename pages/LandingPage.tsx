import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Beaker, Users, BarChart2, MessageSquare, Zap, Shield, CheckCircle2 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="animate-fade-in pb-20 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 px-4 text-center max-w-7xl mx-auto">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-sm font-medium mb-10 shadow-[0_2px_8px_rgba(251,191,36,0.15)] animate-slide-up">
          <span className="text-yellow-500">✨</span> v1.0 is live: Join the validation lab
        </div>

        {/* Headlines */}
        <h1 className="text-6xl md:text-8xl tracking-tight text-black leading-[0.95] mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <span className="font-sans font-bold block mb-2">Stop building in the dark.</span>
          <span className="font-serif italic font-medium block text-gray-900">Start validating with data.</span>
        </h1>

        {/* Subhead */}
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10 font-sans animate-slide-up" style={{ animationDelay: '200ms' }}>
          IdeaLab is the open notebook for startup experiments. Post your hypothesis, gather structured feedback, and measure real interest before writing a single line of code.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 animate-slide-up" style={{ animationDelay: '300ms' }}>
          <Link 
            to="/submit" 
            className="group px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 flex items-center gap-2 min-w-[200px] justify-center"
          >
            Start Experiment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            to="/feed" 
            className="px-8 py-4 bg-transparent text-gray-800 border border-gray-300 rounded-full font-medium text-lg hover:bg-gray-50 hover:border-gray-400 transition-all min-w-[200px] justify-center"
          >
            Explore Ideas
          </Link>
        </div>

        {/* Trust Strip */}
        <div className="animate-fade-in opacity-0 fill-mode-forwards" style={{ animationDelay: '500ms' }}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Trusted by Innovators</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                {/* TechCrunch-ish */}
                <div className="flex items-center gap-1 font-bold font-sans text-xl text-[#00A562] tracking-tighter">
                   <div className="bg-[#00A562] text-white px-1">TC</div> TechCrunch
                </div>
                
                {/* YC */}
                <div className="flex items-center gap-1 font-bold font-sans text-xl text-[#F26522]">
                   <div className="w-6 h-6 bg-[#F26522] text-white text-xs flex items-center justify-center font-mono">Y</div> Combinator
                </div>

                {/* Product Hunt */}
                <div className="flex items-center gap-1 font-bold font-sans text-xl text-[#DA552F]">
                   <div className="w-6 h-6 rounded-full bg-[#DA552F] text-white text-xs flex items-center justify-center font-serif italic">P</div> Product Hunt
                </div>
                
                {/* Sequoia */}
                <div className="text-lg font-serif uppercase tracking-widest text-gray-800 font-bold">
                    SEQUOIA CAPITAL
                </div>

                {/* Techstars */}
                <div className="flex items-center gap-1 font-bold font-mono text-lg text-black">
                   <span className="text-xl">★</span> techstars
                </div>
            </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-20 bg-white border-y border-lab-ink/5">
         <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-4xl font-bold font-sans mb-6">The Scientific Method<br/>for Startups</h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                     Don't rely on "mom tests" or polite feedback. IdeaLab gives you a framework to test demand with cold, hard data.
                  </p>
                  
                  <div className="space-y-6">
                     {[
                        { title: "Define Hypothesis", desc: "Clearly state the problem and solution.", icon: <Beaker size={20} className="text-blue-600"/> },
                        { title: "Gather Signals", desc: "Measure interest via email captures & upvotes.", icon: <BarChart2 size={20} className="text-purple-600"/> },
                        { title: "Iterate Fast", desc: "Pivot based on structured community feedback.", icon: <Zap size={20} className="text-yellow-500"/> }
                     ].map((item, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                           <div className="w-10 h-10 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                              {item.icon}
                           </div>
                           <div>
                              <h3 className="font-bold text-gray-900">{item.title}</h3>
                              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
               
               {/* Visual Mockup */}
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-lab-blue/10 to-purple-100 rounded-3xl transform rotate-3 scale-95 opacity-50 blur-xl"></div>
                  <div className="relative bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden">
                     <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                           <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                        </div>
                        <div className="text-xs font-mono text-gray-400">validation_report.pdf</div>
                     </div>
                     
                     <div className="space-y-6">
                        <div className="flex justify-between items-end">
                           <div>
                              <div className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">Total Interest</div>
                              <div className="text-4xl font-bold font-sans text-gray-900">1,248</div>
                           </div>
                           <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">+24%</div>
                        </div>
                        
                        <div className="space-y-2">
                           <div className="flex justify-between text-xs font-medium text-gray-500">
                              <span>Email Signups</span>
                              <span>892</span>
                           </div>
                           <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-lab-blue w-[70%] rounded-full"></div>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4">
                           <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <div className="text-xs text-gray-400 mb-1">Qualitative Feedback</div>
                              <div className="font-bold text-gray-700">45 Notes</div>
                           </div>
                           <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <div className="text-xs text-gray-400 mb-1">Risk Assessment</div>
                              <div className="font-bold text-gray-700">Low Risk</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-sans mb-4">Everything you need to validate</h2>
            <p className="text-gray-500">Focus on the problem, not the boilerplate.</p>
         </div>
         
         <div className="grid md:grid-cols-3 gap-8">
            {[
               { icon: <MessageSquare size={24}/>, title: "Structured Critique", desc: "Community members provide specific feedback on risks, business models, and go-to-market." },
               { icon: <Shield size={24}/>, title: "Intellectual Safety", desc: "Ideas are timestamped. Execution matters more than the idea itself. Build in public safely." },
               { icon: <Users size={24}/>, title: "Early Adopters", desc: "Direct access to product-loving users who want to try the next big thing first." }
            ].map((card, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-gray-300 hover:shadow-lab transition-all group">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                     {card.icon}
                  </div>
                  <h3 className="text-xl font-bold font-sans mb-3">{card.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Pricing / Call to Action */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
         <div className="bg-black text-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-800 to-black opacity-50"></div>
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6">Ready to launch?</h2>
               <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                  Join thousands of makers who saved months of time by validating first.
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/submit" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors">
                     Start Your Project
                  </Link>
                  <Link to="/feed" className="bg-transparent border border-gray-700 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-colors">
                     Browse Experiments
                  </Link>
               </div>
               <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest font-mono">Free for individuals • No credit card</p>
            </div>
         </div>
      </section>

    </div>
  );
};

export default LandingPage;