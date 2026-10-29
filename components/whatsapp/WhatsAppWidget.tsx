'use client';

import { useState } from 'react';
import { MessageSquare, X, Send, GraduationCap, CalendarCheck, MapPin, UserCheck } from 'lucide-react';
import { WHATSAPP_FLOW_OPTIONS, buildWhatsAppUrl } from '@/lib/whatsapp/whatsappHelper';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState('');

  const handleSend = (text: string) => {
    const url = buildWhatsAppUrl(text);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomText('');
  };

  const getFlowIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-[#00A3E0]" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-4 h-4 text-[#002B66]" />;
      case 'MapPin':
        return <MapPin className="w-4 h-4 text-[#0284C7]" />;
      case 'UserCheck':
        return <UserCheck className="w-4 h-4 text-[#00A3E0]" />;
      default:
        return <MessageSquare className="w-4 h-4 text-[#00A3E0]" />;
    }
  };

  return (
    <div className="fixed bottom-16 sm:bottom-20 lg:bottom-6 right-4 sm:right-6 z-40">
      {/* Expanded WhatsApp Modal */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-3xl bg-white border-2 border-sky-200 shadow-2xl overflow-hidden animate-fade-in text-slate-800 flex flex-col h-[520px] max-h-[calc(100vh-6rem)]">
          {/* Header (Pinned) */}
          <div className="p-4 bg-gradient-to-r from-[#002B66] via-[#003B8E] to-[#00A3E0] text-white flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-base">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">Vidyadhari Admissions</div>
                <div className="text-[11px] text-sky-100 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • +91 91009 01966</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp dialog"
              className="p-1.5 rounded-full text-sky-100 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Middle Body with Guided Quick Flows (Scrollable) */}
          <div className="p-4 space-y-3 bg-white flex-1 overflow-y-auto min-h-0">
            <p className="text-xs text-slate-600 font-normal leading-relaxed">
              Welcome to Vidyadhari High School. Select a quick conversation topic or write your custom message below to chat directly with our admissions counselor:
            </p>

            <div className="space-y-2">
              {WHATSAPP_FLOW_OPTIONS.map((flow) => (
                <button
                  type="button"
                  key={flow.id}
                  onClick={() => handleSend(flow.defaultMessage)}
                  className="w-full p-2.5 rounded-xl bg-sky-50/70 hover:bg-sky-100 border border-sky-100 hover:border-[#00A3E0]/40 text-left transition-all flex items-start gap-3 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    {getFlowIcon(flow.iconName)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#002B66] group-hover:text-[#00A3E0] transition-colors">
                      {flow.title}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {flow.subtitle}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Dedicated Custom Query Input Pinned At Bottom (Always Accessible & Visible) */}
          <div className="p-3.5 bg-slate-50 border-t border-sky-100 flex-shrink-0 shadow-inner">
            <label htmlFor="whatsapp-custom-input" className="block text-[11px] font-bold text-[#002B66] mb-1.5 flex items-center justify-between">
              <span>Write your custom message:</span>
              <span className="text-[10px] text-slate-400 font-normal">Press Enter to send</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                id="whatsapp-custom-input"
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && customText.trim()) {
                    handleSend(customText);
                  }
                }}
                placeholder="Type your message here..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-sky-200 text-xs text-slate-800 placeholder-slate-400 focus:border-[#00A3E0] focus:ring-2 focus:ring-[#00A3E0]/20 focus:outline-none shadow-sm"
              />
              <button
                type="button"
                onClick={() => customText.trim() && handleSend(customText)}
                disabled={!customText.trim()}
                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md flex items-center gap-1.5 flex-shrink-0"
                aria-label="Send WhatsApp message"
              >
                <Send className="w-4 h-4" />
                <span className="text-xs font-bold hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Admissions on WhatsApp"
        className="group relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#002B66] to-[#00A3E0] text-white shadow-2xl shadow-[#002B66]/30 hover:scale-105 active:scale-95 transition-all"
      >
        <MessageSquare className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
        <span className="hidden sm:inline font-bold text-xs tracking-wide">
          CHAT WITH ADMISSIONS
        </span>
        <span className="sm:hidden font-bold text-[11px] tracking-wide">
          WHATSAPP
        </span>
        <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-sky-300" />
        </span>
      </button>
    </div>
  );
}
