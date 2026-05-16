import { motion } from 'motion/react';
import { User, Briefcase, GraduationCap, Settings, Bell, Sparkles, Brain, ArrowRight, ShieldCheck, PieChart } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function MyPage() {
  const [userType, setUserType] = useState<'seeker' | 'employer'>('seeker');

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="bg-white p-8 md:p-12 rounded-[48px] border border-gray-100 shadow-sm mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative">
          <div className="w-32 h-32 bg-gray-100 rounded-[40px] border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
            <User size={64} className="text-gray-300" />
          </div>
          <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
            <Settings size={18} />
          </button>
        </div>

        <div className="flex-grow text-center md:text-left relative z-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">김철수 님</h1>
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold border",
              userType === 'seeker' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-green-50 text-green-600 border-green-100"
            )}>
              {userType === 'seeker' ? '시니어 파트너 (수급자)' : '기업 파트너 (공급자)'}
            </span>
          </div>
          <p className="text-gray-500 font-medium mb-6">금융 자산 관리 전문가 | 경력 25년 | 서울 강남구</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <button 
              onClick={() => setUserType(userType === 'seeker' ? 'employer' : 'seeker')}
              className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-bold tracking-tight hover:bg-gray-800 transition-colors"
            >
              전환: {userType === 'seeker' ? '공급자 모드' : '수급자 모드'}
            </button>
            <button className="px-6 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              프로필 공유
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="p-6 bg-blue-50 rounded-3xl text-center">
            <span className="block text-2xl font-black text-blue-600">85%</span>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">매칭률</span>
          </div>
          <div className="p-6 bg-purple-50 rounded-3xl text-center">
            <span className="block text-2xl font-black text-purple-600">12</span>
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">알림</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column: AI Highlights */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Brain className="text-blue-600" /> AI 추천 일자리
              </h2>
              <Link to="/ai-matching" className="text-sm font-bold text-blue-600 hover:underline">더 보기</Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="group p-8 bg-white border border-gray-100 rounded-[40px] hover:shadow-xl transition-all relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 -translate-y-1/2 translate-x-1/2 rounded-full" />
                   <div className="relative z-10">
                     <span className="inline-block px-2 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded mb-4">매칭률 {98-i*2}%</span>
                     <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors tracking-tight">시니어 자산 관리 파트장</h3>
                     <p className="text-gray-400 text-sm font-bold mb-6">금융계 대기업 H사</p>
                     
                     <div className="p-4 bg-gray-50 rounded-2xl mb-8">
                       <p className="text-xs text-gray-500 leading-relaxed italic">
                         {"\""}사용자의 전직 15년 센터장 경험이 해당 포지션 핵심 자격 요건과 최적 매칭되었습니다.{"\""}
                       </p>
                     </div>
                     <button className="w-full py-4 bg-gray-950 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all">
                       지원하기
                     </button>
                   </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <GraduationCap className="text-purple-600" /> 교육 이력 및 실적
            </h2>
            <div className="bg-white rounded-[40px] border border-gray-100 overflow-hidden shadow-sm">
              {[
                { title: 'AI 툴 활용 기초', date: '2026.04.12', status: '수료 완료' },
                { title: '디지털 자산관리 전문가', date: '2026.05.01', status: '진행 중 (80%)', active: true },
              ].map((course, i) => (
                <div key={i} className="p-8 border-b border-gray-50 last:border-0 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{course.title}</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{course.date}</p>
                  </div>
                  <span className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold",
                    course.active ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                  )}>
                    {course.status}
                  </span>
                </div>
              ))}
              <div className="p-8 bg-purple-50 text-center">
                 <p className="text-sm font-bold text-purple-600 mb-4">교육 수료 시 매칭 추천 점수가 평균 15% 상승합니다!</p>
                 <button className="px-6 py-2 bg-purple-600 text-white rounded-xl font-bold text-xs">교육 더 신청하기</button>
              </div>
            </div>
          </section>
        </div>

        {/* Right column: Status/Personal Info */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-gray-950 p-10 rounded-[48px] text-white">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Bell size={20} className="text-blue-500" /> 실시간 알림
              </h3>
              <div className="space-y-6">
                {[
                  { msg: 'H사에서 회원님의 프로필을 열람했습니다.', time: '10분 전' },
                  { msg: '맞춤 교육 과정이 새롭게 공개되었습니다.', time: '2시간 전' },
                  { msg: '매칭 성공률이 높은 일자리가 추가되었습니다.', time: 'Yesterday' },
                ].map((noti, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-bold leading-snug">{noti.msg}</p>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{noti.time}</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ShieldCheck size={20} className="text-green-600" /> 지원 현황
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-bold">지원 완료</span>
                  <span className="font-black text-gray-900">4</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500 font-bold">인터뷰 요청</span>
                   <span className="font-black text-blue-600">2</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                   <span className="text-gray-500 font-bold">서류 합격</span>
                   <span className="font-black text-green-600">1</span>
                </div>
              </div>
              <div className="mt-10 p-6 bg-gray-50 rounded-3xl text-center">
                 <PieChart className="mx-auto mb-4 text-gray-300" size={40} />
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                   커리어 리포트 <br /> 업데이트 예정
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
