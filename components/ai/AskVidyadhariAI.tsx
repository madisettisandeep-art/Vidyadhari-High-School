'use client';

import { useState } from 'react';
import { HelpCircle, X, Send, User } from 'lucide-react';
import { queryVidyadhariAI } from '@/lib/ai/knowledgeBase';
import { buildWhatsAppUrl } from '@/lib/whatsapp/whatsappHelper';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  suggestedActions?: { label: string; action: 'visit' | 'apply' | 'whatsapp' | 'call' }[];
}

export default function AskVidyadhariAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Namaste! I am the Vidyadhari Information Desk assistant. I can answer questions regarding classes, admissions for 2026–2027, campus facilities, and walkthrough appointments based strictly on official school records.",
      suggestedActions: [
        { label: "What classes are available?", action: 'apply' },
        { label: "Where is the school located?", action: 'visit' },
        { label: "How to book a campus visit?", action: 'visit' }
      ]
    }
  ]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const response = queryVidyadhariAI(text);
      const aiMsg: Message = {
        sender: 'ai',
        text: response.reply,
        suggestedActions: response.suggestedActions
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleAction = (action: 'visit' | 'apply' | 'whatsapp' | 'call', label: string) => {
    if (action === 'visit') {
      const el = document.getElementById('campus-visit');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else if (action === 'apply') {
      const el = document.getElementById('admissions');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    } else if (action === 'whatsapp') {
      window.open(buildWhatsAppUrl(`Hello Admissions, I asked about: "${label}".`), '_blank');
      setIsOpen(false);
    } else if (action === 'call') {
      window.location.href = 'tel:+919100901966';
    }
  };

  return (
    <div className="fixed bottom-16 sm:bottom-20 lg:bottom-6 left-4 sm:left-6 z-40">
      {/* Expanded Chat Modal */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-2xl bg-white border-2 border-sky-200 shadow-2xl overflow-hidden animate-fade-in text-slate-800 flex flex-col h-[480px] max-h-[75vh]">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#002B66] via-[#003B8E] to-[#00A3E0] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                <HelpCircle className="w-4 h-4 text-sky-200" />
              </div>
              <div>
                <div className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Vidyadhari Information Desk</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-200 text-[#002B66] font-bold font-mono">
                    Official
                  </span>
                </div>
                <div className="text-[10px] text-sky-100 font-medium">
                  Verified school knowledge & guidance
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close dialog"
              className="p-1 rounded-full text-sky-100 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F8FAFC]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-sky-100 border border-[#00A3E0]/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-[#002B66]">
                    <HelpCircle className="w-3.5 h-3.5 text-[#00A3E0]" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#002B66] text-white rounded-br-none shadow-sm'
                      : 'bg-white border border-sky-100 text-slate-700 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Suggested quick actions */}
                  {msg.suggestedActions && (
                    <div className="mt-3 pt-2.5 border-t border-sky-100 flex flex-wrap gap-1.5">
                      {msg.suggestedActions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAction(act.action, act.label)}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#002B66] font-bold border border-sky-200 transition-colors text-left"
                        >
                          → {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-600">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-600 italic">
                <div className="w-2 h-2 rounded-full bg-[#00A3E0] animate-bounce" />
                <span>Checking school records...</span>
              </div>
            )}
          </div>

          {/* Chat input box */}
          <div className="p-3 bg-white border-t border-sky-100 flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(inputQuery);
              }}
              placeholder="Ask about admissions, campus, timings..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#F8FAFC] border border-sky-200 text-xs text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:bg-white focus:outline-none"
            />
            <button
              onClick={() => handleSend(inputQuery)}
              disabled={!inputQuery.trim()}
              aria-label="Submit query"
              className="p-2 rounded-xl bg-[#002B66] hover:bg-[#001D47] text-white font-bold disabled:opacity-30 transition-colors"
            >
              <Send className="w-4 h-4 text-[#00A3E0]" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button without AI star symbol */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask Vidyadhari Information Desk"
        className="group relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#002B66] text-[#002B66] shadow-xl hover:bg-sky-50 hover:scale-105 active:scale-95 transition-all"
      >
        <HelpCircle className="w-4 h-4 text-[#002B66]" />
        <span className="hidden sm:inline font-bold text-xs tracking-wide text-[#002B66]">
          ASK VIDYADHARI
        </span>
        <span className="sm:hidden font-bold text-[11px] tracking-wide text-[#002B66]">
          HELP DESK
        </span>
      </button>
    </div>
  );
}
