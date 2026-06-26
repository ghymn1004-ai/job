import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, Sparkles, ChevronRight, Users, GraduationCap, 
  Building, FileText, Lock, AlertTriangle, ArrowRight, 
  Cpu, TrendingUp, CheckCircle, BarChart2, Clock, 
  MessageSquare, UserCheck, ShieldAlert
} from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export default function Proposal() {
  const { showToast } = useToast();
  
  // Tab states for Stakeholders
  const [activeTab, setActiveTab] = useState<'seeker' | 'director' | 'corporate' | 'parent'>('seeker');
  
  // Interactive Dashboard simulator states
  const [selectedPrompt, setSelectedPrompt] = useState<string>('50+ 은퇴자를 위한 스마트 디지털 교육 과정 제안');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<any>({
    logicDepth: 88,
    empathyRate: 95,
    adaptability: 92,
    promptScore: 90,
    recommendation: 'AI 교육 튜터 및 컨설턴트 최상위군 추천 가능'
  });

  // Countdown timer for Loss Aversion
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 25,
    seconds: 4
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lead Generation form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'individual_coach',
    terms: false
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handlePromptAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      let logic = 88;
      let empathy = 95;
      let adapt = 92;
      let prompt = 90;
      let rec = 'AI 교육 튜터 최고 등급';

      if (selectedPrompt.includes('자산')) {
        logic = 96; empathy = 89; adapt = 91; prompt = 93;
        rec = '금융 전문 AI 디지털 자산 코치 추천군';
      } else if (selectedPrompt.includes('기획') || selectedPrompt.includes('사업')) {
        logic = 94; empathy = 86; adapt = 95; prompt = 92;
        rec = '에듀테크 전문 AI 매칭 전략가군';
      } else if (selectedPrompt.includes('기초') || selectedPrompt.includes('소외')) {
        logic = 82; empathy = 98; adapt = 96; prompt = 88;
        rec = '디지털 포용성 AI 리터러시 수석 튜터군';
      }

      setAnalysisResult({
        logicDepth: logic,
        empathyRate: empathy,
        adaptability: adapt,
        promptScore: prompt,
        recommendation: rec
      });
      setIsAnalyzing(false);
      showToast('AI 가시성 검증 알고리즘 분석이 성공적으로 가동되었습니다.');
    }, 1200);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      showToast('모든 필수 정보를 입력해 주세요.');
      return;
    }
    if (!formData.terms) {
      showToast('개인정보 수집 및 활용 동의가 필요합니다.');
      return;
    }

    setIsSubmitted(true);
    showToast('백서 및 인프라 제안서가 입력하신 이메일로 즉시 발송되었습니다!');
  };

  const downloadMockPDF = () => {
    try {
      const content = `[이음JOB] 50+ 마케팅 백서 & AI 가시성 인프라 제안서\n\n` +
        `본 문서는 대한민국 50+ 인적 자원의 가치를 극대화하고, 단순 AI 활용을 넘어 "가시성 인프라(Visibility)"를 통해 대체 불가능한 인재로 성장시키는 비즈니스 설계서입니다.\n\n` +
        `■ 핵심 내용 요약:\n` +
        `1. AI를 지배하는 '디렉터' 마인드셋의 정립\n` +
        `2. '어떻게 질문하는가'를 성과 데이터로 정량화하는 AI 가시성 기술의 핵심 메커니즘\n` +
        `3. 이해관계자(50+ 구직자, 교육기관, 기업, 학부모)의 압도적인 성과 증명 기법\n` +
        `4. 디지털 도태 탈피와 신시장 생존 보장\n\n` +
        `수신: ${formData.name || '방문자'} 님\n` +
        `발행처: 이음JOB AI 연구센터 커리어 사업부\n` +
        `생성일: ${new Date().toLocaleDateString()}`;
        
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `[이음JOB]AI_가시성_인프라_제안서_요약본.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('제안서 요약본 파일이 로컬PC에 생성 및 다운로드되었습니다.');
    } catch (e) {
      showToast('다운로드 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28">
      
      {/* ⚠️ 손실 회피 (Loss Aversion) 긴장감 조성 탑 얼럿 배너 */}
      <div className="bg-gradient-to-r from-red-900 to-amber-950 text-white text-center py-4 px-4 font-black text-xs sm:text-sm shadow-inner relative overflow-hidden flex flex-wrap justify-center items-center gap-3 border-b border-red-800/40 z-10">
        <motion.div 
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center gap-1.5 text-amber-400"
        >
          <ShieldAlert size={16} />
          <span>[생존 주의보]</span>
        </motion.div>
        <p className="tracking-tight text-slate-200">
          인공지능 도입 지체에 따른 지역 독점 교육 권한 및 50+ 채용 가산 데이터 상용 인프라 0기 혜택 만료 임박
        </p>
        <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full border border-red-500/20 text-[11px] font-mono">
          <Clock size={12} className="text-red-400" />
          <span className="text-red-400 font-extrabold">마감까지</span>
          <span>{timeLeft.days}일 {timeLeft.hours}시간 {timeLeft.minutes}분 {timeLeft.seconds}초</span>
        </div>
      </div>

      {/* Hero Section */}
      <header className="bg-slate-900 text-white relative py-20 overflow-hidden">
        {/* Background Mesh Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-brand/20 via-slate-900 to-slate-950 opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-black tracking-widest uppercase mb-6"
          >
            <Sparkles size={12} />
            Exclusive Vision Report & Infrastructure Blueprint
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight max-w-5xl mx-auto mb-8"
          >
            AI를 단순히 사용하는 자와 <br />
            AI를 부리는 <span className="text-brand">‘디렉터(Director)’</span>의 <br className="sm:hidden" />
            몸값은 엄연히 달라집니다
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            아직도 단순 결과물 복사·붙여넣기 수준의 티칭과 포트폴리오를 고집하십니까? <br className="hidden md:block" />
            50+의 살아있는 지혜가 어떻게 질문을 타고 정밀 데이터로 구현되는지, <br />
            <strong>‘AI 가시성 인프라(AI Visibility)’</strong>의 철학적 당위성과 파급력을 직접 검증해 드립니다.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a 
              href="#lead-form" 
              className="px-8 py-4 bg-brand text-white font-black rounded-2xl hover:bg-brand-hover transition-all flex items-center gap-2 hover:scale-105 shadow-xl shadow-brand/20 active:scale-95"
            >
              <Download size={18} />
              백서 풀버전 PDF 무료 신청
            </a>
            <a 
              href="#dashboard-simulator" 
              className="px-8 py-4 bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-2xl hover:bg-slate-700 transition-all flex items-center gap-2"
            >
              <BarChart2 size={18} className="text-brand" />
              가시성 인프라 실시간 체험
            </a>
          </motion.div>
        </div>
      </header>

      {/* 1. 서론: 시대적 당위성과 철학 (Philosophy & Urgency) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-black text-brand uppercase tracking-widest block">PART 01 . PHILOSOPHY & URGENCY</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              시대적 당위성: AI 시대, <br className="md:hidden" />
              단순 도구 사용과 성과 가시화의 근본적 격차
            </h2>
            <div className="space-y-4 text-slate-600 font-medium leading-relaxed text-sm sm:text-base">
              <p>
                오늘날 인공지능(AI)은 모든 시장에 스며들었습니다. 하지만 대다수의 50+ 구직자들과 기성 교육기관들은 심각한 착각에 빠져 있습니다. AI가 알려준 정답을 단순히 보고서에 그대로 옮겨 넣는 것은 <strong>실력이 아닙니다.</strong> 그것은 언젠가 표절 논란으로 귀결되거나, 더 젊고 단가가 낮은 대체 인력으로 언제든지 치환될 수 있는 <span className="text-red-600 font-bold">도태의 지름길</span>입니다.
              </p>
              <p className="border-l-4 border-brand pl-4 py-2 bg-brand/5 rounded-r-xl">
                가장 큰 차별점은 바로 <strong>성과를 ‘눈으로 보여주는 것(Visibility)’</strong>에 있습니다. 질문의 수준이 어떻게 높아지는지, 어떠한 질문 과정을 통해 비즈니스의 사각지대를 타격하여 해법에 도달했는지 데이터로 추적하고 시각화하지 못한다면, 그것은 시장에서 아무런 비즈니스적 설득력을 가질 수 없습니다.
              </p>
              <p>
                이음JOB은 단순한 정보 인출 교육을 타파하고, 50+ 베테랑만이 구현할 수 있는 풍부한 현장 지혜를 프롬프트 엔지니어링 및 AI 에이전트와 완벽히 결합하여 그 사고 흐름을 기업에게 투명하게 ‘가시화’해 주는 독보적인 인프라를 제시합니다.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-8 bg-white border border-slate-200 rounded-[32px] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <AlertTriangle size={140} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="text-red-500" size={20} />
                아날로그 텍스트 포트폴리오의 냉혹한 결말
              </h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs flex-shrink-0">1</div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">표절과 지적 자산 복제의 한계</p>
                    <p className="text-xs text-slate-500 mt-1">인터넷 정보 짜깁기는 AI 필터링에 의해 0.5초 만에 표절 판정 및 신뢰도 즉시 상실.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start pb-4 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs flex-shrink-0">2</div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">성장 및 사고 도정의 증명 불가</p>
                    <p className="text-xs text-slate-500 mt-1">인사담당자는 단순 문서 결과가 아닌 후보자가 진짜 문제를 이해하고 소통하는지 알고 싶어 합니다.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs flex-shrink-0">3</div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">질 낮은 대량 살상용 자동 기계로 전락</p>
                    <p className="text-xs text-slate-500 mt-1">기존의 수작업 방식과 단순 기술 활용은 연봉 경쟁에서 급속히 헐값으로 밀려나는 손해를 낳습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. 이론적 배경 및 전략 (Theory & Strategy) - BEFORE & AFTER 대조 */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-brand uppercase tracking-widest block mb-3">PART 02 . THEORY & STRATEGY</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
              질문하는 능력이 <span className="text-brand">‘디렉터(Director)’</span>의 위상을 증명합니다
            </h2>
            <p className="text-slate-400 font-bold">
              '무엇을 외우는가'보다 '어떻게 질문하고, AI에게 올바르게 지시하는가'를 성향 데이터로 증명하는 최신 AI 가시성 검증 메커니즘을 경험해 보세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Before (기존 방식) */}
            <div className="p-8 bg-slate-950 border border-slate-800 rounded-[32px] flex flex-col justify-between relative group hover:border-red-500/30 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-950/40 text-red-400 flex items-center justify-center mb-6 border border-red-900/30 font-black">
                  BEFORE
                </div>
                <h3 className="text-xl font-black text-slate-100 mb-4 tracking-tight">
                  기존의 단순 결과물 생산 방식 (도태형 모델)
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  사용자는 ChatGPT 검색 창에 단순히 단발성 키워드 하나를 던지고, 생성된 한 장짜리 답변 텍스트를 기계적으로 보고서에 복사합니다. 이 과정에는 아무런 사유, 숙련도, 소통 능력 검증 정보가 담기지 않습니다.
                </p>
                
                <ul className="space-y-3">
                  {['사고력이 저하되는 수동적 환경', '본인이 정답의 원리를 몰라 검토 및 교정이 불가능함', '표절 탐지 소프트웨어 통과 불가능', '기성 세대의 전형적인 DX 소통 장벽 노출'].map((txt, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
                      {txt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-900 text-xs font-mono text-red-400/80 font-bold">
                생산 가치 : 최저단가 단순 파트타임 수준에 머무름
              </div>
            </div>

            {/* After (이음AI 방식) */}
            <div className="p-8 bg-slate-950 border border-brand/40 rounded-[32px] flex flex-col justify-between relative group hover:border-brand transition-all duration-300 shadow-2xl shadow-brand/10">
              <div className="absolute top-0 right-0 bg-brand text-white px-4 py-1 rounded-bl-2xl rounded-tr-[31px] text-[10px] font-black tracking-widest">
                RECOMMENDED
              </div>
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-6 border border-brand/20 font-black">
                  AFTER
                </div>
                <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                  이음JOB ‘AI 가시성 인프라’ 연동 방식 (생존형 디렉터 모델)
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  사용자의 질문 구성력, 다중 프롬프트 논리 연결성, 실시간 AI 에이전트 협동 루프를 추적하여 사용자의 강점을 다차원 평가 지표 데이터로 즉시 가시화합니다. 50+의 경력이 세련되게 검증된 매칭 리포트로 승화됩니다.
                </p>
                
                <ul className="space-y-3">
                  {['논리 깊이, 도덕적 태도, 세대 협업 소통 지수 추적', '프롬프트의 고유 저작권 및 튜터 자격 분석 데이터화', '구인 기업 담당자에게 "검증 평점 98점" 프로필로 노출', '체계적 디지털 적응력 및 교수법 완벽 실시간 입증'].map((txt, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-brand font-bold">
                      <CheckCircle size={14} className="text-brand flex-shrink-0" />
                      {txt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-900 text-xs font-mono text-brand font-bold flex justify-between items-center">
                <span>추천 포지션 : 기업 AI 기술 자문, 공공 교육 튜터 최우선 채용</span>
                <TrendingUp size={16} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. AI 가시성 인프라 실시간 대시보드 Mock-up (시각 자료) */}
      <section id="dashboard-simulator" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black text-brand uppercase tracking-widest block mb-3">EXCLUSIVE SIMULATOR</span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            AI 가시성 검증 시뮬레이터 (Interactive Dashboard)
          </h2>
          <p className="text-slate-500 font-medium text-sm sm:text-base mt-2">
            내가 작성하거나 가르칠 프롬프트 기획이 어떤 역량 데이터로 치환되는지, 이음JOB의 실시간 AI 가시성 검증 지표를 즉각 작동해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Input Box Panel */}
          <div className="lg:col-span-5 p-8 bg-white border border-slate-200 rounded-[32px] shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-wider mb-4">
                <Cpu size={16} className="text-brand" />
                Prompt / Task Input Panel
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">
                검증할 AI 프로젝트/프롬프트 주제 선택
              </h3>
              
              <div className="space-y-3 mb-6">
                {[
                  '50+ 은퇴자를 위한 스마트 디지털 교육 과정 제안',
                  '금융권 퇴직자 전용 AI 활용 자산 포트폴리오 분석 기획서',
                  '에듀테크 전문 AI 매칭 튜터 교육 4주 교안 프레임워크',
                  '정보취약 계층 스마트폰 기초 AI 음성 비서 사용 가이드'
                ].map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPrompt(promptText)}
                    className={`w-full text-left p-3.5 rounded-2xl text-xs font-black border transition-all ${
                      selectedPrompt === promptText
                        ? 'bg-brand/5 border-brand text-brand shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {promptText}
                  </button>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">선택된 기획 문구 요약</label>
                <textarea
                  value={selectedPrompt}
                  onChange={(e) => setSelectedPrompt(e.target.value)}
                  className="w-full bg-transparent border-none text-xs font-bold text-slate-700 focus:outline-none focus:ring-0 resize-none h-20"
                  placeholder="직접 기획 문구를 입력하여 실시간 테스트할 수도 있습니다..."
                />
              </div>
            </div>

            <button
              onClick={handlePromptAnalyze}
              disabled={isAnalyzing}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-brand transition-all flex items-center justify-center gap-2 hover:scale-[1.02] shadow-md disabled:bg-slate-300 disabled:scale-100"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>이음 AI 가시성 알고리즘 분석 중...</span>
                </>
              ) : (
                <>
                  <Cpu size={16} />
                  <span>실시간 데이터 가시화 가동하기</span>
                </>
              )}
            </button>
          </div>

          {/* Visualization Output Dashboard */}
          <div className="lg:col-span-7 bg-slate-900 text-white p-8 rounded-[32px] border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <BarChart2 size={120} className="text-brand" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                    AI Visibility Metric Engine (Active)
                  </span>
                </div>
                <span className="text-xs font-mono font-black text-brand bg-brand/10 px-3 py-1 rounded-full">
                  MATCH SCORE : 97.4%
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                
                {/* Metric 1 */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400">논리적 사고 깊이</span>
                    <span className="text-sm font-black text-brand">{analysisResult.logicDepth}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisResult.logicDepth}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-brand h-full"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 font-bold">프롬프트 다중 논리구조 및 컨텍스트 보정 능력 우수</p>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400">커뮤니케이션 공감 수치</span>
                    <span className="text-sm font-black text-amber-400">{analysisResult.empathyRate}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisResult.empathyRate}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-amber-400 h-full"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 font-bold">50+ 동료 세대의 지치지 않는 눈높이 친밀 배려</p>
                </div>

                {/* Metric 3 */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400">조직 및 기술 적응 지수</span>
                    <span className="text-sm font-black text-emerald-400">{analysisResult.adaptability}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisResult.adaptability}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-emerald-400 h-full"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 font-bold">수평적 대화 태도 및 AI 협동 리스크 최저 범주</p>
                </div>

                {/* Metric 4 */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-400">프롬프트 엔지니어링 수준</span>
                    <span className="text-sm font-black text-indigo-400">{analysisResult.promptScore}%</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${analysisResult.promptScore}%` }}
                      transition={{ duration: 0.8 }}
                      className="bg-indigo-400 h-full"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 font-bold">생성형 AI 제어, 프롬프트 지배구조 수립 가능</p>
                </div>

              </div>
            </div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-brand/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[10px] font-black text-brand uppercase tracking-widest block mb-1">RECOMMENDED CAREER PATHWAY</span>
                <p className="text-base font-black text-white">{analysisResult.recommendation}</p>
                <p className="text-xs text-slate-400 mt-0.5">이음AI 검증 센터가 발행하는 튜터 인증 마크를 구인기업에게 실시간 전송합니다.</p>
              </div>
              <button 
                onClick={downloadMockPDF}
                className="px-5 py-3 bg-brand text-white font-black rounded-xl text-xs hover:bg-brand-hover transition-all flex items-center gap-1.5 self-stretch sm:self-auto justify-center"
              >
                <Download size={14} />
                데이터 리포트 출력
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. 이해관계자별 필요성과 파급 효과 (Target Value Proposition) - TABS */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black text-brand uppercase tracking-widest block mb-3">PART 03 . VALUE PROPOSITION</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              이해관계자별 필수 생존 도구
            </h2>
            <p className="text-slate-500 font-bold mt-2">
              이 가시성 인프라는 각 이해관계자에게 단순한 선택을 넘어 "미동입 시 겪게 될 치명적인 기회손실"을 의미합니다.
            </p>
          </div>

          {/* Custom Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'seeker', label: '예비 코치 / 구직자', icon: Users, color: 'text-brand border-brand bg-brand/5' },
              { id: 'director', label: '교육기관 / 학원장', icon: GraduationCap, color: 'text-indigo-600 border-indigo-600 bg-indigo-50' },
              { id: 'corporate', label: '기업 / 지자체 관계자', icon: Building, color: 'text-emerald-600 border-emerald-600 bg-emerald-50' },
              { id: 'parent', label: '학부모 세대', icon: MessageSquare, color: 'text-amber-600 border-amber-600 bg-amber-50' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-black border transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? `${tab.color} shadow-sm`
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="bg-slate-50 p-8 sm:p-12 rounded-[40px] border border-slate-100 shadow-inner">
            <AnimatePresence mode="wait">
              {activeTab === 'seeker' && (
                <motion.div
                  key="seeker"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-black text-brand tracking-widest uppercase">Target 01 . Seeker & Coach</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      단순 스펙 경쟁에서 완전히 탈피하여, <br />
                      자신의 지혜와 AI 협업 역량을 직관적으로 증명하세요.
                    </h3>
                    <p className="text-slate-600 font-bold leading-relaxed text-sm sm:text-base">
                      기성 사회에서 나이와 은퇴 경력은 때때로 약점으로 간주되곤 합니다. 하지만 이음JOB의 가시성 인프라 안에서는 귀하가 일터에서 축적한 풍성한 문제 해결 노하우와 AI 제어 능력이 완벽히 조화되어 <strong>실시간 검증 데이터</strong>로 승화됩니다. 구인기업 담당자는 이력서 텍스트 몇 줄 대신, 귀하의 기막힌 디지털 교수법을 직접 눈으로 보며 두 번 생각하지 않고 영입을 결정합니다.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['대체 불가능한 AI 디렉터 브랜딩', '신체적 부담 없는 원격/출강 교수 일자리 확보', '동세대 신중년 시장에서의 압도적 경쟁력'].map((tag, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white text-brand border border-brand/20 text-xs font-black rounded-xl">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-5 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">미도입 시 마주할 냉혹한 현실 (Loss)</p>
                      <h4 className="text-base font-black text-slate-800 mb-4">단순 단순 일용직/행정 보조 격하</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-bold">
                        단순 엑셀 복사나 경비 등 50+의 수십 년 경력이 완전히 증발된 저임금 포지션에만 이력서가 겉돌게 되며, 최신 AI 툴 수용을 꺼리는 퇴행형 인물로 기업 채용 알고리즘에서 원천 탈락합니다.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-400">
                      <span>잠재 손실 : 평균 가동 임금 60% 이상 하락 위험</span>
                      <ShieldAlert size={16} className="text-red-500" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'director' && (
                <motion.div
                  key="director"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-black text-indigo-600 tracking-widest uppercase">Target 02 . Education Institutions</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      수강자 개개인의 AI 활용 및 사고 확장 흐름을 <br />
                      정밀하게 모니터링하고 가시화하는 강력한 교구.
                    </h3>
                    <p className="text-slate-600 font-bold leading-relaxed text-sm sm:text-base">
                      학생들이나 50+ 수강생이 과제를 할 때 ChatGPT 결과를 복사해 왔는지 걱정이십니까? 이음JOB의 'AI 가시성 모니터링 엔진'을 탑재하면 학습자의 질답 패턴과 생각의 깊이 변화가 실시간 인포그래픽 대시보드로 시각화됩니다. 이는 수강생 개별 맞춤 코칭을 가능하게 할 뿐만 아니라, 교육기관의 디지털 전환 신뢰도를 200% 폭발적으로 신장시킵니다.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['학생 사고 변화 흐름 실시간 데이터화', '강사 강의 평가 자동 스코어링', '정부 및 지자체 교육 바우처 사업 선점'].map((tag, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 text-xs font-black rounded-xl">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-5 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">미도입 시 마주할 냉혹한 현실 (Loss)</p>
                      <h4 className="text-base font-black text-slate-800 mb-4">단순 암기식/VOD 주입식 학원 도태</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-bold">
                        단순 코딩 실습이나 암기식 VOD 강의만 고집하는 기성 학원들은 학부모와 지자체의 교육 성과 추적 요구에 응대하지 못해 결국 수강생 이탈과 폐원 단계에 신속하게 진입하게 됩니다.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-400">
                      <span>잠재 손실 : 지역 독점 학원 평판도 폭락</span>
                      <ShieldAlert size={16} className="text-red-500" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'corporate' && (
                <motion.div
                  key="corporate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-black text-emerald-600 tracking-widest uppercase">Target 03 . Corporates & Governments</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      검증 사각지대 전면 타파, 실무 투입 즉시 <br />
                      현업 기여가 보장되는 상위 1% 인재 매칭망.
                    </h3>
                    <p className="text-slate-600 font-bold leading-relaxed text-sm sm:text-base">
                      일자리가 부족한 것이 아닙니다. 기업에 꼭 맞는 성실하고 기품 있는 어른 전문가가 없을 뿐입니다. 이음JOB의 AI 가시성 매칭 기술은 구직자의 AI 활용 수용 태도와 조직 적응 리스크 지수를 완전 계량화하여 기업에 제공합니다. 세대갈등 및 채용 실패로 인한 막대한 유무형의 조기 퇴사 손실 비용을 완벽히 제로 수준으로 수렴시킵니다.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['세대 갈등 및 수평 소통 리스크 사전 필터링', '인성, 책임감, 노련미 정량 수치 검증 완료', '디지털 격차 없는 스마트 리워크 체제 실현'].map((tag, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white text-emerald-600 border border-emerald-200 text-xs font-black rounded-xl">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-5 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">미도입 시 마주할 냉혹한 현실 (Loss)</p>
                      <h4 className="text-base font-black text-slate-800 mb-4">반복되는 채용 실패와 조직 피로도 누적</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-bold">
                        단순 이력서 텍스트만 보고 채용했다가 디지털 격차, 가식적 태도, 혹은 MZ 세대 팀원과의 부조화로 3개월도 못 가 퇴사해 나가는 불통 시니어 채용 실패 악순환으로 인해 인사 담당팀의 피로가 극에 달합니다.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-400">
                      <span>잠재 손실 : 인력 대체 당 평균 1,800만 원 매몰비용 발생</span>
                      <ShieldAlert size={16} className="text-red-500" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'parent' && (
                <motion.div
                  key="parent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  <div className="lg:col-span-7 space-y-6">
                    <span className="text-xs font-black text-amber-600 tracking-widest uppercase">Target 04 . Parent Generations</span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      자녀가 AI의 단순 스마트 소비자가 아닌, <br />
                      생각을 지배하는 ‘코치/설계자’로 성장하는 도정 추적.
                    </h3>
                    <p className="text-slate-600 font-bold leading-relaxed text-sm sm:text-base">
                      우리의 기성 50+ 세대의 소중한 자녀들 혹은 신세대 학생들이 단순히 인공지능을 게임하듯 소비하는 것에 만족하십니까? 이음JOB은 50+ 디지털 리터러시 튜터와의 매칭 및 AI 연계 학습 시스템을 통해 자녀가 논리적으로 사유하며 '기획가'의 면모를 다지는 과정을 부모에게 실시간 문자와 모바일 리포트로 전송해 줍니다. 교육 투자 비용에 대한 확고한 신뢰를 다지십시오.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {['비판적 사고 및 독창적 기획력 입증', '단순 게임형 소비에서 생산형 크리에이터 전향', '자녀-학부모-디지털 튜터 3방 소통망 연동'].map((tag, idx) => (
                        <span key={idx} className="px-4 py-2 bg-white text-amber-600 border border-amber-200 text-xs font-black rounded-xl">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-5 p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">미도입 시 마주할 냉혹한 현실 (Loss)</p>
                      <h4 className="text-base font-black text-slate-800 mb-4">단순 스마트폰 중독 및 뇌 건강 위협</h4>
                      <p className="text-xs text-slate-500 leading-relaxed font-bold">
                        AI 에이전트를 통한 생산적 활용을 교육받지 못한 채 스마트폰 단순 조회나 무작위 알고리즘 영상 소비에 노출된 자녀들은 시간이 흐를수록 정보 격차 및 수동적 인지로 뒤쳐지게 됩니다.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-black text-slate-400">
                      <span>잠재 손실 : 가치 지향적 고급 교육 투자 기회 영구 박탈</span>
                      <ShieldAlert size={16} className="text-red-500" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 5. PDF 백서 다운로드 마케팅 & DB 수집 (Lead Generation Form) */}
      <section id="lead-form" className="py-24 bg-slate-900 text-white relative">
        <div className="absolute inset-0 bg-slate-950 opacity-90"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-12">
            <span className="text-xs font-black text-brand uppercase tracking-widest block mb-3">EXCLUSIVE PDF WHITE-PAPER</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              이음JOB [50+ 마케팅 백서 & AI 가시성 인프라 제안서]
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 font-bold">
              무료로 풀버전 PDF 분석서를 즉시 송부해 드립니다. <br />
              대한민국 일자리 지형과 시니어 교육 비즈니스를 장악할 최고의 영업 핵심 비법이 지금 여기에 있습니다.
            </p>
          </div>

          {!isSubmitted ? (
            <motion.form 
              onSubmit={handleFormSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 sm:p-12 bg-slate-900/80 border border-slate-800 rounded-[40px] shadow-2xl space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    이름 (실명 필수) <span className="text-brand">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm font-bold text-white placeholder-slate-600 focus:outline-none focus:border-brand transition-colors"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    연락처 (휴대폰 번호) <span className="text-brand">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm font-bold text-white placeholder-slate-600 focus:outline-none focus:border-brand transition-colors"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  이메일 주소 <span className="text-brand">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm font-bold text-white placeholder-slate-600 focus:outline-none focus:border-brand transition-colors"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                  가장 큰 관심 분야 <span className="text-brand">*</span>
                </label>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm font-black text-slate-300 focus:outline-none focus:border-brand transition-all"
                >
                  <option value="individual_coach">예비 AI 교육 튜터 (개인 일자리 희망)</option>
                  <option value="academy_ceo">기성 학원장 / 교육기관 의사결정권자</option>
                  <option value="corporate_hr">기업 인사담당자 / 지자체 일자리 추진단</option>
                  <option value="parent_group">자녀의 생산적 AI 교육 연계를 희망하는 부모</option>
                </select>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  className="mt-1 bg-slate-950 border-slate-800 text-brand rounded focus:ring-brand"
                />
                <label htmlFor="terms" className="text-xs text-slate-400 font-bold leading-normal cursor-pointer select-none">
                  개인정보 수집 및 활용 방침에 명확히 동의하며, 이음JOB이 제공하는 50+ 취업/교육 트렌드 소식지 및 가상 PDF 자료 수신에 적극 승인합니다.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-4.5 bg-brand text-white font-black rounded-2xl hover:bg-brand-hover transition-all flex items-center justify-center gap-2 text-base hover:scale-[1.01] shadow-xl shadow-brand/20 active:scale-95"
              >
                <Download size={20} />
                <span>백서 풀버전 신청 및 즉시 다운로드</span>
              </button>
            </motion.form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-12 bg-slate-950 border border-brand rounded-[40px] shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-brand/20 text-brand flex items-center justify-center mx-auto border border-brand/40">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-black text-white">
                신청이 완벽하게 완료되었습니다!
              </h3>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl mx-auto">
                <strong className="text-white">{formData.name}</strong> 님, 감사합니다. <br />
                입력하신 이메일(<span className="text-brand font-bold">{formData.email}</span>)로 <strong>[이음JOB 마케팅 백서 풀버전.pdf]</strong> 다운로드 고유 링크 및 AI 가시성 연동 매뉴얼을 정성스럽게 발송해 드렸습니다.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={downloadMockPDF}
                  className="px-6 py-3.5 bg-brand text-white rounded-xl font-black text-sm hover:bg-brand-hover transition-all flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Download size={16} />
                  로컬 파일 즉시 다운로드 (TXT 요약본)
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3.5 bg-slate-800 text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all"
                >
                  처음으로 돌아가기
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* 6. 결론 및 행동 촉구 (Call to Action) */}
      <footer className="py-24 bg-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-slate-950 to-slate-950 opacity-90"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-xs font-black text-brand tracking-widest uppercase block">READY TO COMMENCE?</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              이음JOB의 AI 가시성 인프라, <br />
              이 시대의 선택이 아닌 ‘필수 생존 전략’입니다.
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-bold">
              우리는 기술에 끌려다니는 단순 노동자가 아닌, 수십 년 현장 지혜를 기반으로 AI를 조종하는 최고의 디렉터 군단을 구축합니다. 지금 승차하지 않는다면 다가올 미래 고용 전장에서 마주할 손실을 결코 감당할 수 없을 것입니다.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/ai-matching" 
                className="px-8 py-4 bg-brand text-white rounded-2xl font-black text-sm hover:bg-brand-hover transition-all flex items-center justify-center gap-2 hover:scale-105 shadow-xl shadow-brand/10"
              >
                AI 매칭 즉시 신청하기
                <ArrowRight size={16} />
              </a>
              <a 
                href="/education" 
                className="px-8 py-4 bg-slate-900 border border-slate-800 text-slate-300 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                50+ AI 직무 과정 탐색
              </a>
            </div>
          </motion.div>

        </div>
      </footer>

    </div>
  );
}
