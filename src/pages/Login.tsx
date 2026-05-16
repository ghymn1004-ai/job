import { motion } from 'motion/react';
import { User, Lock, ArrowRight, Github, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 md:p-12 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50"
      >
        <div className="text-center mb-10">
          <img src="https://ghymn1004-ai.github.io/seniorjob/images/logo.png" alt="이음(iium) Logo" className="h-16 mx-auto mb-6 object-contain" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter">다시 일하는 설렘, 이음(iium)</h1>
          <p className="text-slate-400 font-bold text-sm mt-2">당신의 가능성을 실전으로 잇습니다.</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="아이디 또는 이메일"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="password" 
              placeholder="비밀번호"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between my-6 px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-brand focus:ring-brand cursor-pointer" />
            <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700">로그인 유지</span>
          </label>
          <a href="#" className="text-xs font-bold text-slate-400 hover:text-brand transition-colors">비밀번호 찾기</a>
        </div>

        <Link 
          to="/mypage"
          className="w-full py-5 bg-brand text-white rounded-2xl font-black text-lg shadow-xl shadow-brand/20 hover:bg-brand-hover transition-all flex items-center justify-center gap-2 mb-10"
        >
          로그인 <ArrowRight size={20} />
        </Link>

        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">간편 로그인</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 py-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all font-bold text-sm text-slate-700 active:scale-95">
            <Mail size={18} className="text-yellow-500" /> 카카오
          </button>
          <button className="flex items-center justify-center gap-2 py-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all font-bold text-sm text-slate-700 active:scale-95">
            <div className="w-[18px] h-[18px] bg-[#03C75A] rounded-sm flex items-center justify-center text-[10px] text-white font-black">N</div> 네이버
          </button>
          <button className="flex items-center justify-center gap-2 py-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all font-bold text-sm text-slate-700 active:scale-95">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg> 구글
          </button>
          <button className="flex items-center justify-center gap-2 py-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-slate-100 transition-all font-bold text-sm text-slate-700 active:scale-95">
            <Github size={18} /> 깃허브
          </button>
        </div>

        <p className="mt-10 text-center text-sm font-bold text-slate-400">
          아직 회원이 아니신가요? 
          <a href="#" className="text-brand ml-2 hover:underline">회원가입 하기</a>
        </p>
      </motion.div>
    </div>
  );
}
