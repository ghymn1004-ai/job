import { ArrowRight, Search, Briefcase, Users, Brain, GraduationCap, TrendingUp, Star, MessageSquare, ChevronDown, CheckCircle2, Zap, Target, Rocket, Heart, Shield, Building, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { useInquiry } from '../components/ui/InquiryContext';

interface FeatureCardProps {
  key?: React.Key;
  icon: any;
  title: string;
  desc: string;
  color: string;
  details: string[];
  path: string;
}

function InteractiveCard({ icon: Icon, title, desc, color, details, path }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "p-8 rounded-[32px] bg-white border border-slate-100 hover:shadow-2xl hover:border-brand/50 transition-all cursor-pointer group select-none relative overflow-hidden",
        isExpanded && "ring-2 ring-brand/10 border-brand shadow-xl"
      )}
    >
      <div className="flex items-center justify-between mb-8">
        <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg", color)}>
          <Icon size={32} />
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="text-slate-300 group-hover:text-brand transition-colors bg-slate-50 p-2 rounded-full"
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
      
      <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-brand transition-colors tracking-tight">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed font-bold mb-4 opacity-80">
        {desc}
      </p>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-8 mt-6 border-t border-slate-100 space-y-4">
              <p className="text-[10px] font-black text-brand uppercase tracking-[0.2em] mb-2">Detailed Services</p>
              {details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-brand" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 leading-normal">{detail}</span>
                </div>
              ))}
              <div className="pt-6">
                 <Link 
                   to={path}
                   onClick={(e) => {
                     e.stopPropagation();
                   }}
                   className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand transition-all shadow-xl shadow-slate-200"
                 >
                   자세히 알아보기 <ArrowRight size={14} />
                 </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const { openInquiry } = useInquiry();
  const [selectedInquiryType, setSelectedInquiryType] = useState<'corporate' | 'individual' | 'education'>('corporate');
  const [homeFormData, setHomeFormData] = useState({
    name: '',
    phone: ''
  });

  const handleHomeSubmit = () => {
    // We could potentionally sync this to InquiryModal's state via context or localStorage
    const saved = localStorage.getItem('inquiry_form_data');
    const existingData = saved ? JSON.parse(saved) : {};
    localStorage.setItem('inquiry_form_data', JSON.stringify({
      ...existingData,
      name: homeFormData.name || existingData.name,
      phone: homeFormData.phone || existingData.phone
    }));
    openInquiry(selectedInquiryType);
  };
  const features = [
    { 
      icon: Search, 
      title: '일자리찾기', 
      desc: '나를 알아보고 하고 싶은 일을 찾는 시작, 진정한 역할 회복을 돕습니다', 
      color: 'bg-emerald-50 text-emerald-600',
      path: '/jobs',
      details: [
        'AI 성향·경험 입체 분석 (나를 알아보기)',
        '내가 살아있음을 느끼는 "하고 싶은 일" 발굴',
        '인생 2막을 위한 나만의 강점 재발견',
        '사회적 존중과 보람이 있는 맞춤 일자리 신청',
        '단순 구직을 넘어선 경력의 재탄생'
      ]
    },
    { 
      icon: Brain, 
      title: 'AI매칭', 
      desc: '기업 문화와 소통 방식까지 고려한 정밀 연결 서비스', 
      color: 'bg-indigo-50 text-indigo-600',
      path: '/ai-matching',
      details: [
        '경험의 데이터화를 통한 정밀 적합도 분석',
        '조직 적응력 및 팀 성향 매칭 리포트',
        '젊은 세대와의 소통 스타일 분석 및 매칭',
        '안정감과 책임감을 자산으로 여기는 기업 연결',
        '실시간 최적 인재-기업 매칭 리포트'
      ]
    },
    { 
      icon: Users, 
      title: '인재찾기', 
      desc: '경험은 비용이 아니라 자산입니다. 기업의 가치를 높일 베테랑을 추천합니다', 
      color: 'bg-green-50 text-brand font-bold',
      path: '/talents',
      details: [
        '삶을 견뎌낸 지혜와 책임감을 갖춘 시니어 인재',
        '기업 실무 환경에 맞게 다듬어진 준비된 전문가',
        '조직 융합력이 검증된 세대 통합형 인재',
        '단기 프로젝트부터 장기 자문까지 유연한 매칭',
        '실무 역량과 인성이 검증된 프리미엄 인재관'
      ]
    },
    { 
      icon: GraduationCap, 
      title: 'AI직무교육', 
      desc: '직무 리터러시부터 실무 활용까지, 현장에서 인정받는 역량 강화 과정', 
      color: 'bg-amber-50 text-amber-600',
      path: '/education',
      details: [
        'AI 리터러시 (8주): 직무용 AI 기초 및 소통 역량',
        'AI 직무활용 (4주): 실무 성과 중심의 AI 도구 마스터',
        '시니어 인턴 과정: 기업 조직 적응 및 협업 태도 훈련',
        '현직 전문가의 1:1 직무 피드백 및 코칭',
        '교육 수료 즉시 기업 프리미엄 매칭 연결'
      ]
    },
  ];

  return (
    <div className="w-full bg-[#fcfcfc] min-h-screen">
      {/* Hero Section - Inflearn Style */}
      <section className="relative overflow-hidden bg-[#000a12] py-24 md:py-32">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 rounded-full text-brand text-xs font-black mb-8 uppercase tracking-widest">
                <Zap size={14} className="fill-brand" />
                Premium Senior Job Platform
              </div>
              <h1 className="text-5xl md:text-[68px] font-black leading-[1.1] mb-8 text-white tracking-tighter break-keep">
                시니어의 무한한 경험, <br /> 이음(iium)이 <br /> 세상과 다시 연결합니다. <br/><span className="text-brand text-2xl md:text-3xl block mt-6 opacity-90">AI로 여는 새로운 인생 2막</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-medium">
                이음(iium)은 단순한 구인 사이트가 아닙니다. <br className="hidden md:block" />
                하고 싶은 일을 먼저 찾고, 기업과 연결한 후, <br className="hidden md:block" />
                그 자리에 딱 맞도록 당신을 날카롭게 다듬어 드립니다.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
                <button 
                  onClick={() => openInquiry('individual')}
                  className="px-10 py-5 bg-brand text-white rounded-[16px] font-black text-xl hover:bg-brand-hover transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand/20 min-w-[200px]"
                >
                  👤 일자리찾기 신청
                </button>
                <button 
                  onClick={() => openInquiry('corporate')}
                  className="px-10 py-5 bg-slate-800 border border-slate-700 text-white rounded-[16px] font-black text-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2 min-w-[200px]"
                >
                  🏢 인재찾기 신청
                </button>
              </div>

              <div className="flex items-center gap-6 mt-12 pt-12 border-t border-white/10">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#000a12] bg-slate-800 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="text-slate-400 text-sm font-medium">
                  지금 <span className="text-white font-bold">1,200+</span> 명의 전문가가 매칭 대기 중입니다.
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-8 shadow-2xl max-w-[420px] ml-auto group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20">
                    <Brain size={20} />
                  </div>
                  <div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Matching Analysis</p>
                     <p className="text-white text-sm font-bold">실시간 인재 정밀 매칭</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {[
                    { label: '금융 전략 컨설팅', match: '98%', color: 'w-[98%]' },
                    { label: 'AI 리터러시 교육', match: '94%', color: 'w-[94%]' },
                    { label: '공공기관 자문', match: '89%', color: 'w-[89%]' },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400 font-medium">{item.label}</span>
                        <span className="text-brand font-black">{item.match}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: item.match }}
                          className="h-full bg-brand rounded-full shadow-[0_0_8px_rgba(255,107,0,0.5)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Successful Matching</p>
                      <p className="text-2xl font-black text-white">92.4%</p>
                    </div>
                    <Link to="/revenue" className="text-[10px] font-bold text-brand hover:underline">상세 분석 결과 보기 →</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Access Menu - "At a Glance" */}
      <section className="bg-white py-12 border-b border-slate-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-4 divide-x divide-slate-100">
            {features.map((item, i) => (
              <Link 
                key={i} 
                to={item.path}
                className="group px-8 flex flex-col items-center text-center space-y-3 hover:-translate-y-1 transition-transform"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm", item.color)}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-brand transition-colors">{item.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section id="services" className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="relative">
            <span className="text-brand font-black text-sm uppercase tracking-[0.3em] mb-4 block">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">시니어의 지혜를 <br /><span className="text-brand">새로운 가치</span>로 잇는 서비스</h2>
          </div>
          <div className="flex gap-4">
             <Link to="/ai-matching" className="group flex items-center gap-3 px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-700 font-bold hover:bg-white hover:border-brand/30 hover:shadow-xl transition-all">
              전체 서비스 보기
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div id="ai-matching-section">
            <InteractiveCard 
              icon={features[0].icon}
              title={features[0].title}
              desc={features[0].desc}
              color={features[0].color}
              details={features[0].details}
              path={features[0].path}
            />
          </div>
          <div id="jobs-section">
            <InteractiveCard 
              icon={features[1].icon}
              title={features[1].title}
              desc={features[1].desc}
              color={features[1].color}
              details={features[1].details}
              path={features[1].path}
            />
          </div>
          <div id="talents-section">
            <InteractiveCard 
              icon={features[2].icon}
              title={features[2].title}
              desc={features[2].desc}
              color={features[2].color}
              details={features[2].details}
              path={features[2].path}
            />
          </div>
          <div id="education-section">
            <InteractiveCard 
              icon={features[3].icon}
              title={features[3].title}
              desc={features[3].desc}
              color={features[3].color}
              details={features[3].details}
              path={features[3].path}
            />
          </div>
        </div>
      </section>

      {/* About Section - Brand Philosophy */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/40 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-brand font-black text-sm uppercase tracking-[0.4em] mb-6 block">iium Philosophy</span>
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-[1.1] break-keep">
                시니어의 가능성을 <br /> 
                다시 잇는 <br /> 
                <span className="text-brand">이음(iium) AI 교육 철학</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
                ‘iium’은 단순히 이름이 아닙니다. 대한민국 시니어의 지혜와 경험을 AI 기술과 이어주는 철학입니다. <br className="hidden md:block" />
                우리는 당신의 평생 경력을 존중하며, 시니어 전문가로서 다시 세상의 중심에 서도록 돕습니다.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand">
                    <Sparkles size={24} />
                  </div>
                  <h4 className="text-xl font-bold">Inspire</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    가능성을 깨우다. 우리는 사람 안에 남아 있는 가능성을 발견하고 "나는 아직 할 수 있다"는 자신감을 깨웁니다.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand">
                    <Zap size={24} />
                  </div>
                  <h4 className="text-xl font-bold">Integrate</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    경험과 미래를 연결하다. 시니어의 삶의 경험과 새로운 AI 기술을 연결하여 시니어의 무기를 실전에 맞게 다듬습니다.
                  </p>
                </div>
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 group text-brand font-black uppercase tracking-widest text-sm">
                iium 철학 더보기 <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full" />
               <div className="relative bg-white/5 border border-white/10 rounded-[48px] p-12 backdrop-blur-md">
                 <div className="space-y-10">
                   <div>
                     <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em] mb-2 block">Our Goal 01</span>
                     <h5 className="text-2xl font-bold text-white mb-2">지속 가능한 커리어</h5>
                     <p className="text-slate-400 text-sm leading-relaxed">단발성 일자리가 아닌 프로젝트 단위 혹은 자문 위원 등 시니어에 최적화된 형태의 업무를 제안합니다.</p>
                   </div>
                   <div>
                     <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em] mb-2 block">Our Goal 02</span>
                     <h5 className="text-2xl font-bold text-white mb-2">AI 역량 민주화</h5>
                     <p className="text-slate-400 text-sm leading-relaxed">디지털 격차를 해소하고 모든 시니어가 AI를 도구로서 자유롭게 사용할 수 있도록 실전 교육에 집중합니다.</p>
                   </div>
                   <div>
                     <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em] mb-2 block">Our Goal 03</span>
                     <h5 className="text-2xl font-bold text-white mb-2">신뢰의 연결 고리</h5>
                     <p className="text-slate-400 text-sm leading-relaxed">검증된 데이터와 투명한 매칭 알고리즘으로 기업과 시니어 사이의 신뢰할 수 있는 이음새가 됩니다.</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruitment Inquiry Section - "Quick Matching Inquiry" */}
      <section id="inquiry" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 rounded-[64px] p-8 md:p-16 border border-slate-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-3xl -translate-y-1/2 translate-x-1/2" />
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                 <span className="text-brand font-black text-sm uppercase tracking-[0.3em] mb-4 block">Quick Matching Inquiry</span>
                 <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-8">
                   가장 빠른 <br />
                   <span className="text-brand">인재 채용 & 교육 문의</span>
                 </h2>
                 <p className="text-slate-500 font-bold leading-relaxed mb-10 max-w-md">
                   지금 바로 간단한 정보만 남겨주세요. 
                   이음AI JOB의 AI 매칭 전문가가 24시간 이내에 최적의 솔루션을 제안해 드립니다.
                 </p>
                 
                 <div className="space-y-6">
                   {[
                     { step: '01', title: '정보 접수', desc: '기업명, 담당자 및 기본 요구사항 확인' },
                     { step: '02', title: 'AI 초기 분석', desc: '데이터 엔진을 통한 1차 인재 매칭 풀 가동' },
                     { step: '03', title: '전문가 상담', desc: '전담 매니저의 심층 상담 및 맞춤형 인재 추천' },
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4 items-start">
                       <span className="text-xl font-black text-brand bg-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0">
                         {item.step}
                       </span>
                       <div>
                         <h4 className="font-bold text-slate-900">{item.title}</h4>
                         <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative group">
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand text-white rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                    <Zap size={32} fill="white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">상담 및 신청 예약</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">기업/성함</label>
                        <input 
                          type="text"
                          placeholder="회사명 혹은 성함"
                          value={homeFormData.name}
                          onChange={(e) => setHomeFormData({ ...homeFormData, name: e.target.value })}
                          className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">연락처</label>
                        <input 
                          type="tel"
                          placeholder="010-0000-0000"
                          value={homeFormData.phone}
                          onChange={(e) => setHomeFormData({ ...homeFormData, phone: e.target.value })}
                          className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 text-slate-700 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand/20 transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">신청 유형</label>
                      <div className="flex flex-wrap gap-2">
                        <button 
                          onClick={() => setSelectedInquiryType('corporate')}
                          className={cn(
                            "px-4 py-2 border-2 rounded-lg text-[10px] font-black transition-all",
                            selectedInquiryType === 'corporate' ? "border-brand text-brand bg-brand/5 shadow-[0_0_15px_rgba(25,189,126,0.2)]" : "border-slate-100 text-slate-400 hover:border-brand/30 hover:text-brand"
                          )}
                        >
                          인재찾기
                        </button>
                        <button 
                          onClick={() => setSelectedInquiryType('individual')}
                          className={cn(
                            "px-4 py-2 border-2 rounded-lg text-[10px] font-black transition-all",
                            selectedInquiryType === 'individual' ? "border-brand text-brand bg-brand/5 shadow-[0_0_15px_rgba(25,189,126,0.2)]" : "border-slate-100 text-slate-400 hover:border-brand/30 hover:text-brand"
                          )}
                        >
                          일자리찾기
                        </button>
                        <button 
                          onClick={() => setSelectedInquiryType('education')}
                          className={cn(
                            "px-4 py-2 border-2 rounded-lg text-[10px] font-black transition-all",
                            selectedInquiryType === 'education' ? "border-brand text-brand bg-brand/5 shadow-[0_0_15px_rgba(25,189,126,0.2)]" : "border-slate-100 text-slate-400 hover:border-brand/30 hover:text-brand"
                          )}
                        >
                          AI직무교육
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={handleHomeSubmit}
                      className="w-full py-5 bg-brand text-white rounded-[20px] font-black text-lg shadow-xl shadow-brand/20 hover:bg-brand-hover transition-all flex items-center justify-center gap-2"
                    >
                      지금 바로 신청하기
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-bold italic">* 개인정보는 매칭 상담 및 신청 목적으로만 안전하게 보관됩니다.</p>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Pricing Summary Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand font-black text-sm uppercase tracking-[0.3em] mb-4 block">Pricing Policy</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">합리적인 비용으로 <br className="md:hidden" /> 시작하세요</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-slate-50 rounded-[40px] border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brand mb-8 shadow-sm">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">개인 (일반)</h3>
              <p className="text-4xl font-black text-slate-900 mb-2">9,900원</p>
              <p className="text-slate-400 text-sm font-bold mb-8">월 정기 구독</p>
              <ul className="space-y-3 text-left w-full mb-10">
                <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 size={16} className="text-brand" /> AI 기본 매칭 및 정보 열람
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 size={16} className="text-brand" /> 채용 상시 지원 권한
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 size={16} className="text-brand" /> 기초 교육 일부 수강
                </li>
              </ul>
              <Link to="/revenue" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-brand transition-all">자세히 보기</Link>
            </div>

            <div className="p-10 bg-white rounded-[40px] border-2 border-brand relative flex flex-col items-center text-center shadow-xl shadow-brand/5">
              <div className="absolute -top-4 px-6 py-2 bg-brand text-white text-[10px] font-black rounded-full uppercase tracking-widest">Premium Choice</div>
              <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-8">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">개인 (프리미엄)</h3>
              <p className="text-4xl font-black text-slate-900 mb-2">29,000원</p>
              <p className="text-slate-400 text-sm font-bold mb-8">월 정기 구독</p>
              <ul className="space-y-3 text-left w-full mb-10">
                <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 size={16} className="text-brand" /> AI 심층 매칭 및 코칭
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 size={16} className="text-brand" /> 프리미엄 교육 전체 수강
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <CheckCircle2 size={16} className="text-brand" /> 기업 우선 추천 리스트 포함
                </li>
              </ul>
              <button onClick={openInquiry} className="w-full py-4 bg-brand text-white rounded-2xl font-black text-sm hover:bg-brand-hover transition-all">구독 신청하기</button>
            </div>

            <div className="p-10 bg-slate-900 rounded-[40px] text-white flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-brand mb-8">
                <Building size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">기업 회원</h3>
              <p className="text-4xl font-black mb-2 flex flex-col items-center">별도 문의</p>
              <p className="text-slate-400 text-sm font-bold mb-8">99,000원 ~ 299,000원</p>
              <ul className="space-y-3 text-left w-full mb-10">
                <li className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <CheckCircle2 size={16} className="text-brand" /> 채용 공고 무제한 노출
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <CheckCircle2 size={16} className="text-brand" /> AI 검증 인재 추천 리포트
                </li>
                <li className="flex items-center gap-2 text-xs font-bold text-slate-300">
                  <CheckCircle2 size={16} className="text-brand" /> 교육 연계 맞춤 채용
                </li>
              </ul>
              <button onClick={openInquiry} className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-sm hover:bg-brand hover:text-white transition-all">상담 신청하기</button>
            </div>
          </div>
          <div className="mt-12 text-center">
             <Link to="/revenue" className="text-slate-400 font-bold hover:text-brand transition-colors text-sm underline underline-offset-4">상세 비용 산정 기준 확인하기 →</Link>
          </div>
        </div>
      </section>

      {/* Stories & Community Section */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-indigo-600 font-black text-sm uppercase tracking-[0.3em] mb-4 block">Community & Success</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight mb-8">
                먼저 경험한 <br />
                <span className="text-indigo-600">생생한 성공 스토리</span>
              </h2>
              <p className="text-slate-500 font-bold leading-relaxed mb-10 max-w-md">
                이음AI JOB을 통해 제2의 커리어를 시작한 시니어 전문가들과 
                최고의 인재를 만난 기업들의 활발한 소통 공간입니다.
              </p>
              
              <div className="space-y-6">
                {[
                  { title: '베스트 성공기', count: '124건', icon: <Star size={16} /> },
                  { title: '시니어 라운지', count: '2,490명 활동', icon: <Users size={16} /> },
                  { title: '실시간 커리어 톡', count: '진행 중', icon: <MessageSquare size={16} /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                        {item.icon}
                      </div>
                      <span className="font-black text-slate-900">{item.title}</span>
                    </div>
                    <span className="text-xs font-black text-brand bg-brand/10 px-3 py-1 rounded-full">{item.count}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link to="/stories-community" className="px-10 py-5 bg-slate-900 text-white rounded-[20px] font-black hover:bg-indigo-600 transition-all inline-block shadow-xl shadow-slate-200">
                  커뮤니티 입장하기
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 {
                   name: '박*수 (63세)',
                   tag: '은퇴 임원',
                   title: '금융 자문 위원 매칭',
                   img: 'https://i.pravatar.cc/150?img=12',
                   content: '현직 때보다 더 유연하게 일하며 사회적 가치를 느끼고 있습니다.'
                 },
                 {
                   name: '(주)퓨처테크',
                   tag: '스타트업',
                   title: '기술 고문 매칭',
                   img: 'https://i.pravatar.cc/150?img=33',
                   content: '대기업 30년 노하우를 가진 베테랑 덕분에 R&D 리스크를 혁신적으로 줄였습니다.'
                 }
               ].map((story, i) => (
                 <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl transition-all h-fit">
                    <div className="flex items-center gap-4 mb-6">
                       <img src={story.img} className="w-12 h-12 rounded-2xl object-cover" />
                       <div>
                          <p className="text-sm font-black text-slate-900">{story.name}</p>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{story.tag}</span>
                       </div>
                    </div>
                    <h4 className="text-brand font-black text-sm mb-4">"{story.title}"</h4>
                    <p className="text-slate-500 font-bold text-xs leading-relaxed italic">
                       {story.content}
                    </p>
                 </div>
               ))}
               <div className="sm:col-span-2 bg-indigo-600 p-8 rounded-[32px] text-white flex items-center justify-between group cursor-pointer transition-all hover:bg-indigo-700">
                  <div className="flex items-center gap-6">
                     <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Users size={28} />
                     </div>
                     <div>
                        <h4 className="text-lg font-black tracking-tight">이달의 베스트 소통왕</h4>
                        <p className="text-white/60 text-xs font-bold">인사이트를 공유한 우수 회원에게 혜택을 드립니다.</p>
                     </div>
                  </div>
                  <ArrowRight className="group-hover:translate-x-2 transition-all" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto px-10 py-24 bg-[#001f13] rounded-[64px] text-center text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,31,19,0.4)]">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-tight">
              “AI와 함께, <br /> 다시 세상의 주역이 되세요.”
            </h2>
            <p className="text-slate-300 text-lg md:text-xl mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
              시니어의 경험은 기업의 가장 큰 자산입니다. <br className="hidden md:block" />
              우리는 기술을 넘어, 당신의 가치가 다시 인정받도록 잇겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => openInquiry('education')}
                className="px-12 py-6 bg-brand text-white rounded-[24px] font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95 flex items-center gap-2"
              >
                인생 2막 교육 시작하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
