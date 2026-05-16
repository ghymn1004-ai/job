import { Mail, Phone, MapPin, User, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] text-[#495057] py-16 px-10 text-[12px] border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="https://ghymn1004-ai.github.io/seniorjob/images/logo.png" alt="이음(iium) Logo" className="h-14 w-auto object-contain" />
            </div>
            <p className="text-slate-500 leading-relaxed font-medium">
              시니어 전문가를 위한 <br />
              No.1 AI 커리어 매칭 플랫폼
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="text-[#343a40] font-bold mb-4 text-[13px]">고객지원</h4>
            <ul className="space-y-2 text-slate-500 font-medium">
              <li><Link to="/ai-policy" className="hover:text-brand transition-colors flex items-center gap-1.5"><ShieldCheck size={14} className="text-brand" /> 매칭 운영정책</Link></li>
              <li><a href="#" className="hover:text-brand transition-colors">공지사항</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">자주 묻는 질문</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">서비스 이용 가이드</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-[#343a40] font-bold mb-4 text-[13px]">이용약관</h4>
            <ul className="space-y-2 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-brand transition-colors">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">이용약관</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">쿠키정책</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-[#343a40] font-bold mb-4 text-[13px]">Contact Info</h4>
            <div className="space-y-4 text-slate-500 font-medium pt-1">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-brand group-hover:border-brand/30 transition-colors">
                  <User size={14} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[#495057] font-bold">김지숙</span>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-brand group-hover:border-brand/30 transition-colors">
                  <Mail size={14} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[#495057] font-bold">ghymn1004@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-brand group-hover:border-brand/30 transition-colors">
                  <Phone size={14} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[#495057] font-bold">010-6245-2675</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 font-medium">
          <div>© 2026 이음(iium) All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#495057]">Blog</a>
            <a href="#" className="hover:text-[#495057]">Instagram</a>
            <a href="#" className="hover:text-[#495057]">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
