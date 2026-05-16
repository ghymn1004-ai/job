import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Search, CheckCircle, Sparkles, Zap, ArrowRight, UserCheck, Building, GraduationCap, ChevronDown, CheckCircle2, Target, Award, Users, MessageSquare, ShieldCheck, BookOpen, ListChecks, Briefcase } from 'lucide-react';
import { cn } from '../lib/utils';
import { useInquiry } from '../components/ui/InquiryContext';

interface MatchingItemProps {
  key?: React.Key;
  item: number;
  activeTab: 'seeker' | 'employer';
}

function InteractiveMatchingItem({ item, activeTab }: MatchingItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const scores = [
    { label: '직무전문성 / 실무역량', value: 92 + (3-item), weight: '50%' },
    { label: '경력 숙련도', value: 88 + (3-item), weight: '20%' },
    { label: '조직적응 / 업무태도', value: 85 + (item), weight: '15%' },
    { label: '소통 / 협업능력', value: 86 - (item), weight: '10%' },
    { label: '성장 / 지속가능성', value: 88 + (item), weight: '5%' },
  ];

  const trustScores = [
    { label: 'Platinum', score: 98, color: 'text-indigo-600 bg-indigo-50' },
    { label: 'Gold', score: 88, color: 'text-brand bg-brand/5' },
    { label: 'Gold', score: 85, color: 'text-brand bg-brand/5' },
  ];

  const currentTrust = trustScores[item-1] || trustScores[0];

  const seekerDetails = [
    '직무 경력: 유관 분야 15년 이상의 숙련된 실무 역량 확인',
    '실무 수행: 최근 DX 전환 프로젝트 리딩 경험 보유',
    '조직적응: 수평적 커뮤니케이션 및 젊은 세대 협업 선호',
    '장기근속: 시니어 전문가를 위한 조직 적응 인턴십 이수 가능'
  ];

  const employerDetails = [
    '기업 환경: 시니어의 전문성을 존중하는 조직 문화 보장',
    '직무 매칭: 과거 경력을 100% 활용 가능한 핵심 포지션',
    '협업 환경: AI 인프라 구축 완료로 효율적 업무 지원',
    '장기근속: 시니어 전문가를 위한 전용 복리후생 운영'
  ];

  const analysisTags = [
    { label: '직무 적합도', value: '92%' },
    { label: '조직 적응도', value: '85%' },
    { label: '장기근속 가능성', value: '88%' }
  ];

  const details = activeTab === 'seeker' ? seekerDetails : employerDetails;

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "group bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-brand/30 transition-all cursor-pointer select-none overflow-hidden",
        isExpanded && "ring-2 ring-brand/10 border-brand shadow-2xl"
      )}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 group-hover:bg-brand/5 group-hover:border-brand/20 transition-all">
            {activeTab === 'seeker' ? <Building size={32} className="text-slate-400 group-hover:text-brand transition-colors" /> : <UserCheck size={32} className="text-slate-400 group-hover:text-brand transition-colors" />}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest flex items-center gap-1", currentTrust.color)}>
                <ShieldCheck size={10} />
                {currentTrust.label} Grade
              </span>
              <h4 className="text-2xl font-black text-slate-900 group-hover:text-brand transition-all">
                {activeTab === 'seeker' ? (item === 1 ? 'H 금융지주 시니어 PB' : (item === 2 ? 'Global S사 마케팅 자문' : 'K 건설 테크니컬 어드바이저')) : (item === 1 ? '홍길동 (금융 자문 전문가)' : (item === 2 ? '이영희 (전략 기획 전문가)' : '박상우 (기술 경영 고문)'))}
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400 text-xs font-bold">{activeTab === 'seeker' ? '서울 강남구' : '경력 25년+'}</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              <span className="text-slate-400 text-xs font-bold">실무 위주 매칭</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
             <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-brand tracking-tighter italic">{activeTab === 'seeker' ? (96 - item * 4) : (92 - item * 3)}%</span>
                <span className="text-xs font-black text-brand/60 uppercase">Match Score</span>
             </div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">AI Match Score</p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-brand group-hover:bg-brand/5"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-12">
           <div className="flex flex-wrap gap-4">
              {scores.map((s, i) => (
                <div key={i} className="flex-grow min-w-[120px] p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</span>
                    <span className="text-[10px] font-black text-brand">{s.weight}</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-slate-900">{s.value}</span>
                    <span className="text-[10px] font-bold text-slate-400">/ 100</span>
                  </div>
                  <div className="w-full h-1 bg-slate-200 rounded-full mt-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: isExpanded ? `${s.value}%` : '30%' }}
                      className="h-full bg-brand"
                    />
                  </div>
                </div>
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
            <div className="mb-10 pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-10">
               <div>
                  <div className="flex items-center gap-2 mb-6 text-[11px] font-black text-brand uppercase tracking-[0.2em]">
                    <Sparkles size={14} /> AI Deep Analysis
                  </div>
                  <p className="text-slate-600 font-bold leading-relaxed text-sm">
                    {activeTab === 'seeker' 
                      ? "지원자의 전문성과 실무 경험은 기업의 요구사항과 92% 일치합니다. 특히 위기 대응 능력과 조직 안정성에서 높은 가중치를 받았으며, 단순 업무를 넘어 팀의 중심을 잡아줄 수 있는 베테랑 인재로 평가되었습니다." 
                      : "해당 지원자는 동일 직무 15년 이상의 경력을 보유하여 즉시 투입이 가능합니다. AI 분석 결과, 과거 프로젝트 성과가 당사의 현재 과제 해결에 직접적인 도움이 될 것으로 예측되며, 조직 적응 리스크가 매우 낮습니다."}
                  </p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="col-span-full mb-2 flex flex-wrap gap-2">
                    {analysisTags.map(tag => (
                      <span key={tag.label} className="px-3 py-1.5 bg-brand/10 text-brand text-[10px] font-black rounded-lg border border-brand/20">
                        {tag.label} <span className="ml-1 text-slate-800">{tag.value}</span>
                      </span>
                    ))}
                 </div>
                 {details.map((detail, idx) => (
                   <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
                     <CheckCircle2 size={18} className="text-brand mt-0.5 flex-shrink-0" />
                     <span className="text-xs font-bold text-slate-600 leading-snug">{detail}</span>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4">
        <button className="flex-grow py-5 bg-slate-900 text-white rounded-3xl font-black text-sm tracking-tight hover:bg-brand transition-all flex items-center justify-center gap-2 group-hover:shadow-xl active:scale-95">
          {activeTab === 'seeker' ? '기업 매칭 제안 수락하기' : '인재 매칭 제안 및 면접 요청'}
          <ArrowRight size={18} />
        </button>
        <button className="px-10 border border-slate-200 rounded-3xl hover:bg-slate-50 transition-all flex items-center justify-center text-slate-400 hover:text-brand hover:border-brand/20 active:scale-95">
          <Sparkles size={22} className="text-brand/50 group-hover:text-brand" />
        </button>
      </div>
    </motion.div>
  );
}

const MatchingReport = ({ activeTab, onClose }: { activeTab: 'seeker' | 'employer', onClose: () => void }) => {
  const pillars = [
    { name: '직무전문성', score: 94, desc: '유사 직무 15년 이상의 고숙련 실무 역량 확인', color: 'text-emerald-500', icon: Briefcase },
    { name: '경력숙련도', score: 88, desc: '복합 위기 상황 대응 및 팀 리딩 경험 탁월', color: 'text-blue-500', icon: Award },
    { name: '조직적응', score: 85, desc: '수평적 소통 가능 및 신기술 수용 태도 양호', color: 'text-amber-500', icon: Users },
    { name: '소통협업', score: 90, desc: '다양한 세대와의 협업 및 중재 능력 검증', color: 'text-rose-500', icon: MessageSquare },
    { name: '지속가능성', score: 92, desc: '장기 근속 의지 및 자기관리 데이터 우수', color: 'text-indigo-500', icon: Sparkles },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-2 border-brand/10 rounded-[48px] shadow-2xl p-8 md:p-12 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-12 opacity-[0.03]">
        <Brain size={240} className="text-brand" />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12 border-b border-slate-50 pb-12 relative z-10">
        <div>
          <div className="flex items-center gap-2 px-3 py-1 bg-brand text-white rounded-lg text-[10px] font-black uppercase tracking-widest mb-4 w-fit">
            AI Analysis Final Report
          </div>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-4">
            {activeTab === 'seeker' ? 'AI 추천 정밀 매칭 결과지 (Sample)' : 'AI 추천 맞춤 인재 리포트 (Sample)'}
          </h3>
          <p className="text-slate-500 font-bold max-w-xl">
            {activeTab === 'seeker' 
              ? '작성하신 신청서를 바탕으로 5대 역량을 분석한 결과, 귀하에게 최적화된 일자리 매칭 결과입니다.' 
              : '등록하신 인재 요구사항을 바탕으로 5대 역량이 가장 부합하는 최우선순위 인재 리포트입니다.'}
          </p>
        </div>
        <div className="text-center p-6 bg-slate-50 rounded-3xl border border-slate-100 min-w-[200px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Match Score</p>
          <div className="flex items-baseline justify-center gap-1">
             <p className="text-5xl font-black text-brand italic tracking-tighter">92.4</p>
             <span className="text-xl font-black text-brand/40">%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16 relative z-10">
        {pillars.map((p, i) => (
          <div key={i} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 group hover:bg-white transition-all text-center md:text-left">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-4 shadow-sm mx-auto md:mx-0", p.color.replace('text-', 'bg-').replace('500', '100'))}>
              <p.icon size={20} className={p.color} />
            </div>
            <p className="text-[11px] font-black text-slate-400 mb-1">{p.name}</p>
            <div className="flex justify-center md:justify-start items-baseline gap-1 mb-3">
              <span className="text-2xl font-black text-slate-900">{p.score}</span>
              <span className="text-[10px] font-bold text-slate-400">/ 100</span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold leading-tight line-clamp-2 md:line-clamp-none">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
        <div className="p-8 md:p-10 bg-brand/5 border border-brand/10 rounded-[40px]">
          <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Target size={22} className="text-brand" /> 
            {activeTab === 'seeker' ? 'AI가 추천하는 일' : 'AI가 추천하는 인재'}
          </h4>
          <div className="space-y-6">
             <div className="p-6 bg-white rounded-3xl shadow-sm border border-brand/5">
                <p className="text-xs font-black text-brand uppercase tracking-widest mb-2">Best Matching Recommendation</p>
                <p className="text-xl font-black text-slate-900 mb-4">
                  {activeTab === 'seeker' ? '(주)미래이음 DX 사업본부 - 실무지원팀' : '인재: 김영수 (경력 22년, DX 리딩 전문가)'}
                </p>
                <ul className="space-y-3">
                   { [
                     activeTab === 'seeker' ? '직무유관성: 귀하의 행정/조직관리 역량 100% 발휘 가능' : '직무숙련도: 요구하신 DX 전환 프로젝트 즉시 리딩 가능',
                     activeTab === 'seeker' ? '문화적합성: 수평적 조직문화로 유연한 소통 가능 환경' : '문화 수용도: 피드백 수용 및 젊은 세대와 협업 태도 검증',
                     activeTab === 'seeker' ? '근무안정성: 시니어 전문가 우대 및 장기 근속 보장 제도' : '장기 근속: 인생2막을 향한 확고한 의지 및 안정적 근태',
                     activeTab === 'seeker' ? '추천사유: 신청서에 작성하신 협업 강점이 기업 문화와 95% 일치' : '추천사유: 기업 요구사항 중 "조직 적응력" 지표에서 탐색군 중 1위'
                   ].map((text, idx) => (
                     <li key={idx} className="flex items-start gap-2 text-sm font-bold text-slate-600 leading-relaxed">
                        <CheckCircle2 size={16} className="text-brand mt-0.5 flex-shrink-0" />
                        {text}
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>

        <div className="p-8 md:p-10 bg-slate-50 border border-slate-100 rounded-[40px]">
          <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
            <Sparkles size={22} className="text-brand" /> 매칭 이후 과정 (Next Steps)
          </h4>
          <div className="space-y-4">
            {[
              { step: 'STEP 1', title: '매칭 결과 검토 및 매니저 조율', desc: '본 매칭 리포트를 확인하신 후 수락하시면 전담 매니저가 양측의 소통을 중개합니다.' },
              { step: 'STEP 2', title: '상호 인터뷰 및 채용 합의', desc: '기업 담당자와 지원자가 직접 연락하여 실무 역량과 조직 문화를 최종 확인합니다.' },
              { step: 'STEP 3', title: 'AI직무교육 (리터러시 & 직무)', desc: '채용 확정 전후, 직무에 필요한 AI 리터러시(8주) 및 실무 직무교육(4주)을 맞춤형으로 진행합니다.' },
              { step: 'STEP 4', title: '최종 현장 배치 및 안착 지원', desc: '교육을 마친 시니어 전문가가 기업에 최종 투입되며, 현장 안착을 위해 밀착 지원합니다.' },
              { step: 'Outcome', title: '지속 성장 및 사후 관리', desc: '정기적인 유선 체크 및 추가적인 디지털 역량 강화 바우처를 지속 제공합니다.' }
            ].map((s, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100">
                <span className="text-[10px] font-black text-brand bg-brand/5 px-2 py-1 rounded h-fit whitespace-nowrap">{s.step}</span>
                <div>
                   <p className="text-sm font-black text-slate-800 mb-1">{s.title}</p>
                   <p className="text-[11px] font-bold text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 border-t border-slate-50 pt-10 relative z-10">
        <button 
          onClick={onClose}
          className="w-full md:w-auto px-12 py-5 bg-slate-900 text-white rounded-[24px] font-black text-lg hover:bg-brand transition-all shadow-xl active:scale-95"
        >
          확인 완료 (닫기)
        </button>
        <button 
          className="w-full md:w-auto px-12 py-5 bg-brand text-white rounded-[24px] font-black text-lg hover:bg-brand-hover transition-all shadow-xl shadow-brand/20 active:scale-95 flex items-center justify-center gap-2"
        >
          {activeTab === 'seeker' ? '인터뷰 제안받기 신청' : '인재 채용 인터뷰 요청'}
          <ArrowRight size={20} />
        </button>
      </div>
    </motion.div>
  );
};

const evaluationTiers = [
  { title: '직무전문성 / 실무역량', weight: '50%', desc: '실제로 일을 잘할 수 있는가? 동일 유사 직무 경험과 성과 분석', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { title: '경력 숙련도', weight: '20%', desc: '베테랑으로서 안정적인가? 근속 안정성 및 위기 관리 경험', icon: Award, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { title: '조직적응 / 업무태도', weight: '15%', desc: '조직 충돌은 없는가? 피드백 수용 및 새로운 방식 수용도', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
  { title: '소통 / 협업능력', weight: '10%', desc: '함께 일할 수 있는가? 경청 태도 및 팀워크 스타일 분석', icon: MessageSquare, color: 'text-rose-600', bg: 'bg-rose-50' },
  { title: '성장 / 지속가능성', weight: '5%', desc: '계속 배우며 일할 수 있는가? 학습 의지 및 자기관리 리듬', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const seekerApplication = [
  { label: '이력/경력 입력', icon: BookOpen },
  { label: 'AI매칭 신청', icon: Zap },
  { label: '자기소개 작성', icon: MessageSquare },
  { label: '직무 성향 분석', icon: Brain },
];

const employerApplication = [
  { label: '채용조건 입력', icon: ListChecks },
  { label: '직무 요구사항 등록', icon: Target },
  { label: '조직문화 체크', icon: Users },
  { label: '필요 역량 등록', icon: Award },
];

export default function AiMatching() {
  const [activeTab, setActiveTab] = useState<'seeker' | 'employer'>('seeker');
  const [isMatching, setIsMatching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);
  const { openInquiry } = useInquiry();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Use a small delay to ensure page is loaded and layout is stable
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]); // Only trigger on hash change

  const handleStartMatch = () => {
    if (isMatching) return;
    setIsMatching(true);
    setShowResults(false);
    setShowFullReport(false);
    
    const timer = setTimeout(() => {
      setIsMatching(false);
      setShowResults(true);
      const element = document.getElementById('matching-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 2000);
    return () => clearTimeout(timer);
  };

  const applicationItems = activeTab === 'seeker' ? seekerApplication : employerApplication;

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 text-brand rounded-full text-[10px] font-black mb-6 uppercase tracking-[0.3em] shadow-sm"
          >
            <Sparkles size={14} />
            이음(iium) 매칭 패러다임
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 tracking-tighter leading-tight">
            실력 있는 사람 중에서, <br />
            <span className="text-brand">함께 오래 갈 수 있는 사람</span>을 찾다
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold text-lg leading-relaxed">
            “경험은 경쟁력이고, 태도는 지속 가능성입니다.” <br />
            단순 인성 검사가 아닙니다. 검증된 실무 역량을 1순위로, <br className="hidden md:block" />
            지속 가능한 태도를 2순위로 분석하는 실무형 인재 매칭 엔진입니다.
          </p>
        </div>

        {/* Priority Weights */}
        <section id="criteria" className="mb-32 scroll-mt-24">
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {evaluationTiers.map((tier, i) => (
                <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-xl transition-all group text-center">
                   <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:scale-110", tier.bg, tier.color)}>
                      <tier.icon size={24} />
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weight</p>
                   <p className={cn("text-3xl font-black mb-4 italic", tier.color)}>{tier.weight}</p>
                   <h4 className="text-sm font-black text-slate-900 mb-2">{tier.title}</h4>
                   <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{tier.desc}</p>
                </div>
              ))}
           </div>
        </section>

        {/* Tab Switch & Dynamic Action Button */}
        <div className="flex flex-col items-center gap-10 mb-16">
          <div className="p-2 bg-slate-100 rounded-[32px] flex border border-slate-200">
            <button
              onClick={() => setActiveTab('seeker')}
              className={cn(
                "flex items-center gap-2 px-10 py-5 rounded-[24px] font-black text-sm transition-all",
                activeTab === 'seeker' ? "bg-white text-brand shadow-xl" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <UserCheck size={20} />
              내가 원하는 일 (구직자용)
            </button>
            <button
              onClick={() => setActiveTab('employer')}
              className={cn(
                "flex items-center gap-2 px-10 py-5 rounded-[24px] font-black text-sm transition-all",
                activeTab === 'employer' ? "bg-white text-brand shadow-xl" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Building size={20} />
              회사가 원하는 인재 (기업용)
            </button>
          </div>

          <div className="max-w-md w-full">
            {activeTab === 'seeker' ? (
              <button 
                onClick={() => openInquiry('individual')}
                className="w-full flex items-center justify-center gap-3 px-12 py-6 bg-brand text-white rounded-[24px] font-black text-xl hover:bg-brand-hover shadow-2xl shadow-brand/20 transition-all active:scale-95 group"
              >
                <BookOpen size={24} />
                일자리찾기 신청서 작성
              </button>
            ) : (
              <button 
                onClick={() => openInquiry('corporate')}
                className="w-full flex items-center justify-center gap-3 px-12 py-6 bg-slate-900 text-white rounded-[24px] font-black text-xl hover:bg-slate-800 shadow-2xl shadow-slate-900/20 transition-all active:scale-95 group"
              >
                <Target size={24} />
                인재찾기 신청서 작성
              </button>
            )}
            <p className="text-center mt-4 text-slate-500 font-bold text-sm">
              * 5가지 분석 항목이 포함된 정밀 신청서를 작성하면 AI 매칭이 시작됩니다.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Input/Status */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm sticky top-24 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-6">
                <h3 className="text-xl font-black text-slate-900">분석 프로세스 안내</h3>
                <span className="text-[10px] font-black px-2 py-1 bg-slate-900 text-white rounded-md uppercase tracking-widest italic shadow-sm">AI Engine v2.0</span>
              </div>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                  {applicationItems.map((item, i) => (
                    <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center text-center gap-2 transition-all">
                       <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-brand shadow-sm">
                          <item.icon size={16} />
                       </div>
                       <span className="text-[11px] font-black text-slate-600 tracking-tighter">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[32px]">
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">
                    {activeTab === 'seeker' ? '데이터 수집 및 분석 단계' : '기업 요구사항 매칭 단계'}
                  </label>
                  <p className="text-xs font-bold text-slate-600 leading-relaxed">
                    {activeTab === 'seeker' 
                      ? "신청서에 작성하신 '5대 핵심 역량' 데이터를 기반으로 AI가 귀하의 실무 숙련도와 조직 적합성을 다각도로 분석합니다."
                      : "기업이 등록한 직무 요구사항과 조직 문화를 바탕으로 최적의 시니어 전문가 후보군을 1차 필터링합니다."}
                  </p>
                </div>
                <button 
                  onClick={handleStartMatch}
                  disabled={isMatching}
                  className={cn(
                    "w-full py-6 rounded-3xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-xl active:scale-95",
                    isMatching ? "bg-slate-100 text-slate-400 cursor-not-allowed" : "bg-brand text-white hover:bg-brand-hover shadow-brand/20"
                  )}
                >
                  {isMatching ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-300 border-t-brand rounded-full animate-spin" />
                      매칭 프로세스 분석 중...
                    </>
                  ) : (
                    <>
                      <Zap size={20} fill="white" />
                      매칭 리포트 샘플 보기
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-12 pt-10 border-t border-slate-50">
                <div className="flex items-center justify-between mb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <span>Matching Analytics</span>
                   <span className="text-brand">Live</span>
                </div>
                <div className="space-y-4">
                   <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                      <span className="text-xs font-bold text-slate-600">오늘 진행된 매칭</span>
                      <span className="text-sm font-black text-slate-900">1,284건</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-8 space-y-10">
            {/* Matching Process */}
            <div className="p-12 bg-slate-900 rounded-[64px] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-3xl rounded-full" />
               <h3 className="text-2xl font-black mb-12 tracking-tight">이음(iium) 매칭 프로세스</h3>
               <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  {[
                    { step: '01', title: '직무 분석', desc: '기업의 실무 환경과 요구사항을 철저히 분석' },
                    { step: '02', title: '역량 추출', desc: '단순 스펙이 아닌 현장 해결 능력 위주 추출' },
                    { step: '03', title: '지원자 비교', desc: '경력 일치도와 조직 적합성 동시 시뮬레이션' },
                    { step: '04', title: '최종 추천', desc: '검증된 실무형 인재 최종 Match Score 산출' }
                  ].map((s, i) => (
                    <div key={i} className="relative">
                       <span className="text-4xl font-black text-white/10 mb-4 block italic">{s.step}</span>
                       <h4 className="text-lg font-black mb-2 text-brand">{s.title}</h4>
                       <p className="text-xs text-slate-400 font-bold leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
               </div>
            </div>

            <div id="matching-section" className="scroll-mt-24">
              {showResults && !showFullReport && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-12 p-10 bg-brand rounded-[48px] text-white relative overflow-hidden shadow-2xl shadow-brand/20"
                >
                  <div className="absolute top-0 right-0 p-10 opacity-10">
                    <Brain size={120} />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] font-black px-2 py-1 bg-white/20 rounded-md backdrop-blur-sm">STEP 2. AI 분석 완료</span>
                        <h4 className="text-2xl font-black italic">역량 매칭 리포트가 생성되었습니다</h4>
                      </div>
                      <p className="text-brand-50/80 font-bold mb-0 leading-relaxed max-w-xl">
                        입력하신 5대 핵심 영역 분석 결과, 최적의 매칭 스코어가 산출되었습니다.
                        지금 바로 상세 역량 분석 결과지와 추천 대상을 확인해 보세요.
                      </p>
                    </div>
                    <button 
                      onClick={() => setShowFullReport(true)}
                      className="px-8 py-4 bg-white text-brand rounded-2xl font-black text-sm hover:bg-slate-50 transition-all shadow-xl shadow-brand/40 active:scale-95 flex items-center gap-2"
                    >
                      상세 매칭 결과지 보기
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {showFullReport && (
                <div className="mb-20">
                  <MatchingReport activeTab={activeTab} onClose={() => setShowFullReport(false)} />
                </div>
              )}
            </div>

            <div id="scoring" className="flex items-center justify-between scroll-mt-24 mb-12">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                {showResults ? 'TOP3, AI 추천 매칭' : '추천 매칭 대기 중'}
              </h3>
              <div className="flex items-center gap-2 text-sm font-black text-slate-400 uppercase tracking-widest">
                <span className={cn("w-2 h-2 rounded-full", showResults ? "bg-brand animate-ping" : "bg-slate-200")} />
                Matching Score Base
              </div>
            </div>

            <div className="space-y-8 min-h-[400px]">
              {showResults ? (
                [1, 2, 3].map((item) => (
                  <InteractiveMatchingItem key={item} item={item} activeTab={activeTab} />
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center py-32 border-2 border-dashed border-slate-100 rounded-[64px] bg-slate-50/50">
                   <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-6 text-slate-200">
                      <Zap size={40} />
                   </div>
                   <p className="text-slate-400 font-black text-xl mb-2">매칭을 시작해 주세요</p>
                   <p className="text-slate-300 font-bold text-sm">AI가 5대 영역을 분석하여 최적의 인재를 찾아드립니다.</p>
                </div>
              )}
            </div>

            {/* Comparison */}
            <section className="mt-20 py-16 bg-white border border-slate-100 rounded-[48px] px-10">
               <h3 className="text-2xl font-black text-slate-900 mb-12 text-center">왜 이음(iium)의 매칭인가요?</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">일반 플랫폼</p>
                     {[
                       '단순 키워드 기반 검색',
                       '스펙 위주의 필터링',
                       '경력의 깊이 측정 불가',
                       '조직 적응 리스크 미고려'
                     ].map((t, i) => (
                       <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl text-slate-400 font-bold text-sm">
                          <CheckCircle2 size={16} /> {t}
                       </div>
                     ))}
                  </div>
                  <div className="space-y-6">
                     <p className="text-xs font-black text-brand uppercase tracking-widest text-center">이음(iium)</p>
                     {[
                       '실무 가능성 입체 분석',
                       '현장 해결 경험 중심 분석',
                       '조직 적응/갈등 리스크 분석',
                       '장기 근무 가능성 정밀 예측'
                     ].map((t, i) => (
                       <div key={i} className="flex items-center gap-3 p-4 bg-brand/5 border border-brand/20 rounded-2xl text-slate-900 font-bold text-sm">
                          <CheckCircle2 size={16} className="text-brand" /> {t}
                       </div>
                     ))}
                  </div>
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}


