import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, BrainCircuit, ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

import { useInquiry } from '../ui/InquiryContext';

export const navItems = [
  { 
    name: '일자리찾기', 
    path: '/jobs'
  },
  { 
    name: '인재찾기', 
    path: '/talents'
  },
  { 
    name: 'AI매칭', 
    path: '/ai-matching'
  },
  { 
    name: 'AI직무교육', 
    path: '/education'
  },
  { 
    name: '회사소개', 
    path: '/about'
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const location = useLocation();
  const { openInquiry } = useInquiry();

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    setExpandedItem(null);
  };

  const toggleExpand = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group" onClick={() => handleNavClick('/')}>
              <img src="https://ghymn1004-ai.github.io/seniorjob/images/logo.png" alt="이음(iium) Logo" className="h-[52px] w-auto object-contain" />
              <div className="hidden sm:block border-l border-slate-200 pl-3">
                <p className="text-[10px] font-black text-brand leading-none mb-0.5 tracking-tighter">시니어 전용</p>
                <p className="text-[8px] font-bold text-slate-400 leading-none">PREMIUM PLATFORM</p>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <div key={item.path} className="relative group/nav py-5">
                <Link
                  to={item.path}
                  className={cn(
                    "text-[14px] font-bold transition-all px-3 py-2 flex items-center gap-1 rounded-lg",
                    location.pathname === item.path 
                      ? "text-brand bg-brand/5" 
                      : "text-slate-700 hover:text-brand hover:bg-slate-50"
                  )}
                >
                  {item.name}
                </Link>
              </div>
            ))}
            
            <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>

            <div className="relative group">
              <button
                className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-bold hover:bg-brand-hover transition-all active:scale-95 shadow-lg shadow-brand/10 flex items-center gap-1.5"
              >
                JOB 문의하기
                <ChevronDown size={14} />
              </button>
              <div className="absolute top-full right-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50 overflow-hidden outline outline-1 outline-slate-100">
                <button 
                  onClick={() => openInquiry('individual')}
                  className="w-full text-left px-5 py-3 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-brand transition-colors flex items-center justify-between"
                >
                  일자리찾기 <ArrowRight size={12} className="opacity-0 group-hover:opacity-100" />
                </button>
                <button 
                  onClick={() => openInquiry('corporate')}
                  className="w-full text-left px-5 py-3 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-brand transition-colors flex items-center justify-between"
                >
                  인재찾기 <ArrowRight size={12} className="opacity-0 group-hover:opacity-100" />
                </button>
                <button 
                  onClick={() => openInquiry('ai-match')}
                  className="w-full text-left px-5 py-3 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-brand transition-colors flex items-center justify-between border-t border-slate-50"
                >
                  AI매칭 <ArrowRight size={12} className="opacity-0 group-hover:opacity-100" />
                </button>
                <button 
                  onClick={() => openInquiry('education')}
                  className="w-full text-left px-5 py-3 text-[13px] font-bold text-slate-700 hover:bg-slate-50 hover:text-brand transition-colors flex items-center justify-between border-t border-slate-50"
                >
                  AI직무교육 <ArrowRight size={12} className="opacity-0 group-hover:opacity-100" />
                </button>
              </div>
            </div>
            
            <Link
              to="/login"
              className="px-4 py-2 text-slate-700 hover:text-brand font-bold text-sm transition-all flex items-center gap-1.5 border border-slate-100 rounded-xl hover:border-brand/20 hover:bg-brand/5 active:scale-95"
            >
              <User size={16} />
              로그인
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={cn(
        "md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-100 transition-all duration-300 overflow-y-auto",
        isOpen ? "max-h-[calc(100vh-64px)] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-4 py-8 space-y-6">
          <div className="space-y-4">
            {navItems.map((item) => (
              <div key={item.path} className="border-b border-slate-50 pb-2">
                <div className="flex items-center justify-between">
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block text-xl font-black py-2",
                      location.pathname === item.path ? "text-brand" : "text-slate-900"
                    )}
                  >
                    {item.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-4">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-2 flex items-center gap-2">
               <ArrowRight size={12} className="text-brand" /> 빠른 문의 신청
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => { openInquiry('individual'); setIsOpen(false); }}
                className="flex items-center justify-between px-4 py-4 bg-slate-50 text-slate-700 rounded-2xl text-[14px] font-black border border-slate-100"
              >
                일자리 <ArrowRight size={14} className="text-slate-300" />
              </button>
              <button 
                onClick={() => { openInquiry('corporate'); setIsOpen(false); }}
                className="flex items-center justify-between px-4 py-4 bg-slate-50 text-slate-700 rounded-2xl text-[14px] font-black border border-slate-100"
              >
                인재 <ArrowRight size={14} className="text-slate-300" />
              </button>
              <button 
                onClick={() => { openInquiry('ai-match'); setIsOpen(false); }}
                className="flex items-center justify-between px-4 py-4 bg-slate-50 text-slate-700 rounded-2xl text-[14px] font-black border border-slate-100"
              >
                AI매칭 <ArrowRight size={14} className="text-slate-300" />
              </button>
              <button 
                onClick={() => { openInquiry('education'); setIsOpen(false); }}
                className="flex items-center justify-between px-4 py-4 bg-slate-50 text-slate-700 rounded-2xl text-[14px] font-black border border-slate-100"
              >
                AI교육 <ArrowRight size={14} className="text-slate-300" />
              </button>
            </div>
          </div>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 w-full justify-center px-4 py-5 bg-slate-900 text-white rounded-3xl text-lg font-black shadow-2xl shadow-slate-300 active:scale-[0.98] transition-all"
          >
            <User size={20} />
            로그인하기
          </Link>
        </div>
      </div>
    </nav>
  );
}
