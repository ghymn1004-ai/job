import { motion } from 'motion/react';
import { Filter, UserCheck, Zap, Brain, MessageSquare, Download, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import React from 'react';
import { useInquiry } from '../components/ui/InquiryContext';
import { useToast } from '../components/ui/Toast';

const talents = [
  { 
    name: '이*훈', 
    role: '교육기관 운영 및 전략 전문가', 
    exp: 28, 
    score: 98, 
    desc: '대형 학원 체인 3곳 오퍼레이션 총괄 및 교재 기획 경력을 보유하고 있습니다. AI 에코시스템 구축 및 시니어 강사 멘토링에 특화되어 있습니다.', 
    strength: ['학원 경영', '커리큘럼 설계'], 
    reason: '귀사의 "에듀테크 신사업 본부장" 공고 요건과 98% 일치' 
  },
  { 
    name: '박*자', 
    role: 'AI 기반 디지털 컨설턴트', 
    exp: 25, 
    score: 95, 
    desc: '금융 지점장 출신으로 최근 AI 직무 교육을 수료하였습니다. 디지털 자산관리 교육 및 맞춤형 AI 비즈니스 컨설팅이 가능합니다.', 
    strength: ['금융 지식', 'AI 툴 활용'], 
    reason: '수료한 "AI 교육 데이터"가 인구통계학적 매칭 점수에 반영됨' 
  },
  { 
    name: '정*호', 
    role: '에듀테크 Full-Stack 기획자', 
    exp: 22, 
    score: 92, 
    desc: 'IT 대기업 출신으로 이러닝 플랫폼 구축 경력이 풍부합니다. 교육 플랫폼의 AI 엔진 도입을 위한 기획 및 개발 리딩이 가능합니다.', 
    strength: ['플랫폼 기획', '개발 리딩'], 
    reason: '최근 교육 플랫폼 개발 프로젝트 성공 사례와 유사도가 높음' 
  },
  { 
    name: '최*희', 
    role: '시니어 특화 전문 강사', 
    exp: 18, 
    score: 89, 
    desc: '공공기관 및 기업 교육 전문 강사로 1,000회 이상의 강의 경력을 보유하고 있습니다. 시니어의 눈높이에 맞춘 AI 리터러시 교육에 강점이 있습니다.', 
    strength: ['강의 스킬', '콘텐츠 제작'], 
    reason: '시니어 맞춤형 강의 진행 데이터 상위 1% 기록' 
  }
];

export default function Talents() {
  const { openInquiry } = useInquiry();
  const { showToast } = useToast();

  const handleDownloadReport = () => {
    showToast('전문가 전체 이력 리서치 보고서를 생성 중입니다...', 'info');
    
    setTimeout(() => {
      try {
        const content = `[이음 AI JOB] 전문가 리서치 리포트\n\n대상: 시니어 전문가 8,590명\n생성일: ${new Date().toLocaleDateString()}\n\n본 리포트는 기업용 상세 인재 분석 데이터가 포함되어 있습니다.`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'iium_talent_report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('보고서 다운로드가 완료되었습니다.', 'success');
      } catch (error) {
        showToast('다운로드 중 오류가 발생했습니다.', 'error');
      }
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 text-brand rounded-full text-[10px] font-black mb-6 uppercase tracking-widest shadow-sm"
          >
            <Sparkles size={14} />
            Enterprise Talent Network
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tighter leading-tight">검증된 <span className="text-brand">시니어 전문가</span> <br/>검색하세요</h1>
          <p className="text-slate-500 font-bold leading-relaxed">
            이음AI JOB의 AI매칭 엔진이 기업의 인재상을 분석하여 <br className="hidden md:block" />
            수십 년간 축적된 지혜와 실무력을 갖춘 '시니어 베테랑'을 실시간 추천합니다.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => openInquiry('corporate')}
            className="px-12 py-5 bg-brand text-white rounded-[24px] font-black text-lg hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-95"
          >
            📝 지금 바로 신청하기
          </button>
          <button className="px-10 py-5 border-2 border-slate-200 rounded-[24px] font-black text-lg text-slate-600 hover:bg-slate-50 transition-all bg-white active:scale-95">
            🔍 인재 상세 검색 필터
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* sidebar filter */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm sticky top-24">
            <h3 className="text-xl font-black mb-8 text-slate-900 border-b border-slate-100 pb-4">상세 필터</h3>
            
            <div className="space-y-8">
              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">경력 분야</label>
                <div className="space-y-3">
                  {['AI추천 인재', '직무별 인재', '경력별 인재', '지역별 인재', '교육 수료 인재', '즉시 근무 가능 인재', '프로젝트 가능 인재', '프리미엄 인재관'].map((field) => (
                    <label key={field} className="flex items-center gap-3 text-sm font-bold text-slate-700 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-300 text-brand focus:ring-brand transition-all accent-brand" />
                      <span className="group-hover:text-brand transition-colors uppercase tracking-tight">{field}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">AI 키워드</label>
                <div className="flex flex-wrap gap-2">
                  {['시니어 강사', '학원 경영', 'ED-Tech', 'AI 기획'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg border border-slate-200 uppercase tracking-tight">#{tag}</span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">경력 연차</label>
                <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand" />
                <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2">
                  <span>10년</span>
                  <span>40년+</span>
                </div>
              </div>

              <button className="w-full py-5 bg-brand text-white rounded-[20px] font-black text-sm uppercase tracking-widest hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-95">
                AI 필터 적용
              </button>
            </div>
          </div>
        </div>

        {/* Talent List */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between mb-4 px-2">
             <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">분야별 추천 전문가</h3>
                <span className="text-xs font-bold text-slate-400 tracking-tight">8,590+ Candidates Available</span>
             </div>
          </div>
          {talents.map((talent, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              className="group bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 bg-slate-50 rounded-3xl overflow-hidden group-hover:scale-105 transition-transform flex items-center justify-center border border-slate-100">
                    <UserCheck size={64} className="text-slate-200" />
                  </div>
                  <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-brand border-4 border-white text-white font-black text-xs rounded-xl shadow-lg uppercase">
                    {talent.score}% Match
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight">{talent.name} <span className="text-slate-400 text-lg font-medium inline-block ml-1">| {talent.role}</span></h3>
                    <span className="px-3 py-1 bg-green-50 text-brand text-[10px] font-black rounded-lg uppercase tracking-widest border border-brand/10">베테랑 경력 {talent.exp}년</span>
                  </div>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 font-bold line-clamp-3">
                    {talent.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
                    <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-100">
                      <div className="flex items-center gap-2 mb-3 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <Zap size={14} className="text-brand fill-brand" /> 핵심 보유 역량 (Verified)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {talent.strength.map(s => (
                          <span key={s} className="text-[10px] font-black py-1.5 px-3 bg-white rounded-xl border border-slate-200 text-slate-600 shadow-sm">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 bg-brand/5 rounded-[24px] border border-brand/10">
                      <div className="flex items-center gap-2 mb-3 text-[11px] font-black text-brand uppercase tracking-widest">
                        <Brain size={14} /> AI Matching Insight
                      </div>
                      <p className="text-xs text-slate-700 font-bold leading-relaxed italic">
                        "{talent.reason}"
                      </p>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50/50 rounded-[24px] mb-10 border border-slate-100/50">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Detailed Performance Indicators</p>
                     <div className="grid grid-cols-3 gap-8">
                        <div>
                           <span className="block text-xs font-bold text-slate-400 mb-1">리더십 지수</span>
                           <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-brand w-[85%]" />
                           </div>
                        </div>
                        <div>
                           <span className="block text-xs font-bold text-slate-400 mb-1">디지털 숙련도</span>
                           <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 w-[90%]" />
                           </div>
                        </div>
                        <div>
                           <span className="block text-xs font-bold text-slate-400 mb-1">협업 성향</span>
                           <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 w-[95%]" />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button className="flex-grow md:flex-none px-10 py-5 bg-slate-900 text-white rounded-[20px] font-black text-sm tracking-tight hover:bg-brand transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-100 active:scale-95">
                      <MessageSquare size={18} /> 인터뷰/채용 제안하기
                    </button>
                    <button 
                      onClick={handleDownloadReport}
                      className="px-10 py-5 border border-slate-200 rounded-[20px] font-black text-sm text-slate-600 hover:border-brand hover:text-brand transition-all active:scale-95 flex items-center justify-center gap-2 bg-white"
                    >
                       <Download size={18} /> 전체 이력 리서치
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
