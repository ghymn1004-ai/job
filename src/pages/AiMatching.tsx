import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Search, CheckCircle, Sparkles, Zap, ArrowRight, UserCheck, Building, GraduationCap, ChevronDown, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface MatchingItemProps {
  key?: React.Key;
  item: number;
  activeTab: 'seeker' | 'employer';
}

function InteractiveMatchingItem({ item, activeTab }: MatchingItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const seekerDetails = [
    '해당 기업의 실버 친화적 조직 문화 지수: 9.2/10',
    '예상 직무 자율성: 매우 높음 (주 3일 재택 협의 가능)',
    '시니어 전문가 온보딩 프로그램 운영 중',
    '최근 12개월 내 시니어 채용 성공 사례 5건'
  ];

  const employerDetails = [
    '전문 역량 검증: S사 25년 마케팅 실적 데이터 확인됨',
    '조직 융화도: 멘토링 스타일의 소통 방식 선호',
    '디지털 도구 숙련도: AI 협업 툴(ClickUp, Notion) 활용 가능',
    '희망 근무 조건: 유연 근무제 선호 (월 80시간 기준)'
  ];

  const details = activeTab === 'seeker' ? seekerDetails : employerDetails;

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "group bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand/30 transition-all cursor-pointer select-none overflow-hidden",
        isExpanded && "ring-2 ring-brand/10 border-brand shadow-xl"
      )}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-200 group-hover:bg-brand/5 group-hover:border-brand/20 transition-all">
            {activeTab === 'seeker' ? <Building className="text-slate-400 group-hover:text-brand transition-colors" /> : <UserCheck className="text-slate-400 group-hover:text-brand transition-colors" />}
          </div>
          <div>
            <h4 className="text-xl font-extrabold text-slate-900 group-hover:text-brand transition-all">
              {activeTab === 'seeker' ? (item === 1 ? 'H 금융지주 시니어 PB' : (item === 2 ? 'Global S사 마케팅 자문' : 'K 건설 테크니컬 어드바이저')) : (item === 1 ? '홍길동 (금융 자문 전문가)' : (item === 2 ? '이영희 (전략 기획 전문가)' : '박상우 (기술 경영 고문)'))}
            </h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{activeTab === 'seeker' ? '서울 강남구' : '경력 25년+'}</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">연봉 협의 가능</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-5 py-2.5 bg-green-50 rounded-full border border-brand/20">
            <span className="text-brand font-black text-lg italic tracking-tighter">{95 - item * 3}%</span>
            <span className="text-[10px] font-bold text-brand ml-1 uppercase">Match</span>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-slate-300 group-hover:text-brand"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-200 group-hover:bg-white transition-colors">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <Brain size={14} className="text-brand" />
            AI Analysis Result
          </div>
          <p className="text-slate-600 text-sm leading-relaxed font-bold">
            {activeTab === 'seeker' 
              ? "경력 기반의 핵심 역량인 'VIP 자산관리'와 해당 기업의 인재상이 완벽하게 일치하며, 최근 해당 직무의 성공 사례와 92% 동일한 패턴을 보입니다." 
              : "시니어님의 '제조 공정 혁신' 성공 사례가 현재 당사 신사업의 R&D 요구 사항과 매우 높은 상관관계를 보이고 있어 추천되었습니다."}
          </p>
        </div>
        <div className="p-6 bg-slate-50 rounded-[24px] border border-slate-200 group-hover:bg-white transition-colors">
          <div className="flex items-center gap-2 mb-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            <GraduationCap size={14} className="text-brand" />
            Skills Matrix
          </div>
          <div className="flex flex-wrap gap-2">
            {['Strategic Planning', 'Risk Mgmt', 'Leadership'].map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 text-[10px] font-black rounded-xl uppercase shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mb-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
               <p className="text-[10px] font-black text-brand uppercase tracking-widest">AI 심층 분석 데이터 (Deep Insight)</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {details.map((detail, idx) => (
                   <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50/50">
                     <CheckCircle2 size={16} className="text-brand mt-0.5 flex-shrink-0" />
                     <span className="text-xs font-bold text-slate-600 leading-snug">{detail}</span>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4">
        <button className="flex-grow py-5 bg-slate-900 text-white rounded-[20px] font-black text-sm tracking-tight hover:bg-brand transition-all flex items-center justify-center gap-2 group-hover:shadow-2xl group-hover:shadow-slate-200 active:scale-95">
          {activeTab === 'seeker' ? '매칭 제안 확인 및 교육 신청' : '인재 상세정보 및 맞춤 교육 설계'}
          <ArrowRight size={18} />
        </button>
        <button className="px-8 border border-slate-200 rounded-[20px] hover:bg-slate-50 transition-all flex items-center justify-center text-slate-400 hover:text-brand hover:border-brand/20 active:scale-95 shadow-sm">
          <Sparkles size={22} className="text-brand/50 group-hover:text-brand" />
        </button>
      </div>
    </motion.div>
  );
}

export default function AiMatching() {
  const [activeTab, setActiveTab] = useState<'seeker' | 'employer'>('seeker');

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 text-brand rounded-full text-[10px] font-black mb-6 uppercase tracking-widest shadow-sm"
          >
            <Sparkles size={14} />
            AI Dynamic Matching Engine
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tighter leading-tight">AI매칭</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed">
            단순한 키워드 검색을 넘어서는 이음JOB만의 독보적인 기술. <br/>
            경력 데이터와 기업 비전을 분석하여 정밀 매칭하고, <br className="hidden md:block" />
            연결 직후 해당 기업의 실무에 최적화된 맞춤 교육을 지원합니다.
          </p>
        </div>

        {/* Tab Switch */}
        <div className="flex justify-center mb-16">
          <div className="p-2 bg-slate-100 rounded-[24px] flex border border-slate-200">
            <button
              onClick={() => setActiveTab('seeker')}
              className={cn(
                "flex items-center gap-2 px-10 py-4 rounded-[18px] font-black text-sm transition-all",
                activeTab === 'seeker' ? "bg-white text-brand shadow-xl" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <UserCheck size={20} />
              일자리찾기 매칭
            </button>
            <button
              onClick={() => setActiveTab('employer')}
              className={cn(
                "flex items-center gap-2 px-10 py-4 rounded-[18px] font-black text-sm transition-all",
                activeTab === 'employer' ? "bg-white text-brand shadow-xl" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Building size={20} />
              인재찾기 매칭
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Input/Status */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-sm sticky top-24 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-xl font-black mb-8 text-slate-900 border-b border-slate-100 pb-4">실시간 분석 데이터</h3>
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    {activeTab === 'seeker' ? '경력 및 핵심 역량 요약' : '채용 직무 및 요구 사항 요약'}
                  </label>
                  <textarea
                    className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[24px] focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand min-h-[220px] text-sm font-bold transition-all leading-relaxed shadow-inner placeholder:text-slate-300"
                    placeholder={activeTab === 'seeker' ? "주요 경력사항을 입력하면 AI가 매칭률을 계산합니다." : "채용 공고 내용을 입력하면 적합한 인재를 즉시 추천합니다."}
                  />
                </div>
                <button className="w-full py-5 bg-brand text-white rounded-[20px] font-black text-sm flex items-center justify-center gap-2 hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-95">
                  <Zap size={20} fill="white" />
                  AI 분석 실행하기
                </button>
              </div>
              
              <div className="mt-10 pt-10 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Engine status</span>
                  <span className="text-xs font-black text-brand flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-brand rounded-full animate-ping" />
                    CONNECTED
                  </span>
                </div>
                <div className="flex gap-1.5 h-2">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className={cn("flex-1 bg-slate-100 rounded-full", i < 4 && "bg-brand/20")} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-8 space-y-8">
            <div className="p-10 bg-white border border-slate-100 rounded-[40px] shadow-sm mb-12">
               <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-brand/10 text-brand rounded-2xl flex items-center justify-center">
                     <Zap size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">AI 심층 분석 항목</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: '핵심 경력 분석', desc: '과거 업무 경험의 깊이와 전문성을 입체적으로 분석하여 직무 적합도를 도출합니다.' },
                    { title: '성향 및 강점 분석', desc: '개인의 업무 성향과 고유한 강점을 파악하여 최적의 조직 문화를 매핑합니다.' },
                    { title: '커뮤니케이션 스타일', desc: '조직 내 협업 및 소통 방식을 분석하여 팀 구성 시 시너지를 예측합니다.' },
                    { title: '학습 태도 및 적응력', desc: '새로운 기술(AI 등)에 대한 학습 의지와 변화하는 환경에 대한 적응력을 검증합니다.' },
                    { title: '조직 적응력 예측', desc: '기업의 문화와 후보자의 가치관을 비교하여 장기근속 가능성을 분석합니다.' },
                    { title: '성장 가능성 진단', desc: '현재 역량을 넘어 제2의 커리어에서 보여줄 수 있는 잠재적 기여도를 평가합니다.' }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                       <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                         <CheckCircle2 size={16} className="text-brand" />
                         {item.title}
                       </h4>
                       <p className="text-xs text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">AI 추천 매치</h3>
                <span className="px-3 py-1 bg-brand text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-brand/20">Top 3</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest">
                <span className="w-2 h-2 bg-brand rounded-full animate-pulse shadow-lg shadow-brand/20" />
                Live Analysis
              </div>
            </div>

            <p className="text-slate-500 font-bold mb-6">항목을 클릭하여 <span className="text-brand">AI 심층 분석 데이터</span>를 확인하세요.</p>

            <div className="space-y-8">
              {[1, 2, 3].map((item) => (
                <InteractiveMatchingItem key={item} item={item} activeTab={activeTab} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

