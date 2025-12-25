
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants';
import { getFarmAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const FarmConsultant: React.FC<{ farmData: any }> = ({ farmData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Hello! I am your FMS AI consultant. How can I help you optimize your farm today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const advice = await getFarmAdvice(farmData, userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'bot', text: advice }]);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-40 group"
      >
        <Icons.Bot className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-slate-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          AI Consultant
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-6 bg-emerald-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Icons.Bot className="w-6 h-6" />
                <h3 className="font-bold text-lg">AI Farm Consultant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-500 p-1 rounded transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                    m.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200 shadow-sm'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-.5s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about FCR, disease symptoms..."
                  className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm"
                />
                <button 
                  onClick={handleSend}
                  className="bg-emerald-600 text-white p-2 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FarmConsultant;
