import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Brain, Zap, CheckCircle, Play, BookOpen, UserCheck, Sparkles, ChevronDown, CheckCircle2, Star, Award, Shield, Heart, MessageSquare, Users, Smile, Clock, ListChecks, ThumbsUp, Activity, Target, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useInquiry } from '../components/ui/InquiryContext';
import { cn } from '../lib/utils';

interface EducationCardProps {
  key?: React.Key;
  tag: string;
  title: string;
  duration: string;
  method: string;
  students: string;
  details: string[];
}

function InteractiveEducationCard({ tag, title, duration, method, students, details }: EducationCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white rounded-[40px] overflow-hidden border border-gray-100 group shadow-sm hover:shadow-xl transition-all cursor-pointer select-none"
    >
      <div className="h-48 bg-gray-100 relative overflow-hidden">
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold shadow-sm z-10">{tag}</span>
        <div className="w-full h-full flex items-center justify-center text-gray-300 group-hover:scale-110 transition-transform duration-500">
          <Play size={40} className="group-hover:text-purple-600 transition-colors" />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors leading-tight">{title}</h3>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className="text-gray-300 group-hover:text-purple-600 ml-2 flex-shrink-0"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
        
        <div className="space-y-2 mb-8">
          <div className="flex justify-between items-center text-[11px] font-black text-gray-400 uppercase tracking-widest">
             <span>교육 기간: {duration}</span>
             <span className="text-purple-600">{students} 수강 중</span>
          </div>
          <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black text-slate-500 w-fit">
            방식: {method}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="curriculum"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-gray-50 space-y-3 mb-8">
                <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest">강의 주요 커리큘럼</p>
                {details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
                    <span className="text-xs font-bold text-gray-600 leading-tight">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className={cn(
            "w-full py-4 rounded-2xl font-black text-sm transition-all active:scale-95",
            isExpanded ? "bg-slate-100 text-slate-900" : "bg-slate-900 text-white hover:bg-brand shadow-xl shadow-slate-200"
          )}
        >
          {isExpanded ? '상세 정보 닫기' : '커리큘럼 및 상세내용 보기'}
        </button>
      </div>
    </motion.div>
  );
}

const CourseSection = ({ tab, levels }: { tab: string, levels: any[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {levels.filter(lvl => lvl.tab === tab).map((lvl, i) => (
        <InteractiveEducationCard
          key={lvl.level}
          tag={lvl.tag}
          title={lvl.title}
          duration={lvl.tab === 'literacy' ? '8주' : '4주'}
          method={lvl.method}
          students={lvl.level === 'LEVEL 3' ? '1,240명' : (lvl.level === 'LEVEL 4' ? '850명' : '420명')}
          details={lvl.details}
        />
      ))}
    </div>
  );
};

const steps = [
  { title: '두려움 해소', desc: 'AI를 도구로 인식하고 거부감을 없애는 첫 단계', icon: Brain },
  { title: '자신감 회복', desc: '반복 실습을 통해 디지털 도구 사용의 자신감 획득', icon: Sparkles },
  { title: '실무 역량 강화', desc: '실행 가능한 AI 활용 능력을 직무에 맞게 훈련', icon: Zap },
  { title: '직무 매칭', desc: '검증된 역량을 기반으로 최적의 일자리 연결', icon: UserCheck },
];

const curriculumLevels = [
  {
    level: 'LEVEL 1',
    tab: 'literacy',
    method: 'VOD 전용',
    title: '직무 AI 리터러시 기초',
    subtitle: '“AI를 업무 도구로 이해하기”',
    target: 'AI를 처음 접하는 시니어, 직무 복귀를 준비하는 분',
    details: [
      'AI 기초 원리 및 직무 변화 이해',
      '직무용 ChatGPT 프롬프트 엔지니어링 입문',
      '업무 효율을 위한 AI 정보 검색 및 분석',
      '디지털 협업 도구 기초 (슬랙, 노션 등)',
      '직업 윤리 및 AI 보안 가이드'
    ],
    icon: '🌱',
    color: 'bg-emerald-50 text-emerald-600',
    tag: '8주과정'
  },
  {
    level: 'LEVEL 2',
    tab: 'literacy',
    method: 'VOD 전용',
    title: '직무 AI 리터러시 심화',
    subtitle: '“데이터로 소통하고 협업하기”',
    target: 'AI를 통해 실질적인 업무 효율을 높이고 싶은 분',
    details: [
      'AI 기반 비즈니스 문서 작성 (보고서, 기획서)',
      '데이터 분석 AI 및 시각화 도구 활용',
      'AI 협업 에티켓 및 세대 간 디지털 소통',
      'AI 이미지 및 미디어 제작 기초 (기업 홍보/운영)',
      '직무별 AI 활용 사례 연구 및 실습'
    ],
    icon: '🛠️',
    color: 'bg-blue-50 text-blue-600',
    tag: '8주과정'
  },
  {
    level: 'LEVEL 3',
    tab: 'utilization',
    method: '온라인/줌(Zoom) 실무',
    title: '실전 AI 직무 활용',
    subtitle: '“AI와 함께 성과를 창출하는 인재”',
    target: '현업 복귀를 위해 직무 전문성을 AI로 극대화하려는 분',
    details: [
      '직무 자동화: AI 활용 반복 업무 최소화',
      '상담/서비스: AI 챗봇 및 고객 데이터 분석 실무',
      '운영/관리: AI 기반 일정 및 프로젝트 매니지먼트',
      '콘텐츠 특화: 직무별 마케팅 및 브랜드 운영 실습',
      'AI 비서 연동 및 업무 대시보드 구축'
    ],
    icon: '💼',
    color: 'bg-indigo-50 text-indigo-600',
    tag: '4주과정'
  },
  {
    level: 'LEVEL 4',
    tab: 'utilization',
    method: '온라인/줌(Zoom) 실무',
    title: 'AI 협력 프로젝트 실무',
    subtitle: '“조직 내 AI 협업 가속화”',
    target: '조직 내 협업과 디지털 소통 능력을 실전 프로젝트로 검증하려는 분',
    details: [
      'AI 기반 실시간 협업 시스템 구축 및 운영',
      '디지털 워크스테이션 설계 (노션, 먼데이닷컴 연동)',
      'AI 윤리 및 사내 보안 가이드라인 준수 실습',
      '부서 간 데이터 공유 및 AI 자동 보고 체계',
      '팀 단위 AI 문제 해결 시뮬레이션 프로젝트'
    ],
    icon: '🤝',
    color: 'bg-rose-50 text-rose-600',
    tag: '4주과정'
  },
  {
    level: 'LEVEL 5',
    tab: 'utilization',
    method: '병행',
    title: 'AI 전문 직무 마스터',
    subtitle: '“기업이 즉시 투입 가능한 전문가”',
    target: 'AI 기반 전문 직무로의 완벽한 전환 및 현업 투입을 준비하는 분',
    details: [
      'AI 행정지원 사내 전문가 (PMO 보조)',
      'AI 고객 경험(CX) 및 소통 관리 시스템 운영',
      'AI 콘텐츠 전략 및 브랜드 커뮤니티 관리',
      'AI 교육보조(디지털 튜터) 자격 과정',
      '기업 매칭용 실무 포트폴리오 최종 완성'
    ],
    icon: '🚀',
    color: 'bg-amber-50 text-amber-600',
    tag: '4주과정'
  }
];

const seniorInternSections = [
  {
    title: '업무 태도 교육',
    subtitle: '“신뢰받는 태도 만들기”',
    icon: Clock,
    details: [
      '출근 태도: 시간 약속, 일정 관리, 결근/지각 대응',
      '업무 책임감: 성실한 처리, 보고 누락 방지, 확인 습관',
      '업무 우선순위: 중요한 일 구분, 팀 일정 존중',
      '조직 매너: 인사 습관, 기본 예절, 정중한 표현'
    ]
  },
  {
    title: '조직 적응 교육',
    subtitle: '“과거 방식보다 현재 조직 이해하기”',
    icon: Users,
    details: [
      '조직문화 이해: 수평적 문화와 세대 차이 이해',
      '경험 공유 매너: “내가 예전엔…” 줄이기, 현재 방식 존중',
      '지시와 협업: 질문하는 법, 피드백 수용 방식',
      '조직 내 거리감: 사생활 존중, 친절과 거리의 균형'
    ]
  },
  {
    title: '세대 간 소통 교육',
    subtitle: '“젊은 세대와 자연스럽게 협업하기”',
    icon: MessageSquare,
    details: [
      '경청 훈련: 판단보다 이해 중심의 듣기 훈련',
      '표현 방식: 부드러운 말투, 감정적 표현 조절',
      '디지털 소통: 메신저/단체방 예절, 짧고 명확한 전달',
      '갈등 대응: 감정 조절 및 비난보다 해결 중심 소통'
    ]
  },
  {
    title: '협업 태도 교육',
    subtitle: '“혼자 잘하는 것보다 함께 잘하기”',
    icon: Heart,
    details: [
      '팀워크 이해: 역할 존중 및 도움 요청/주기',
      '보고·공유: 중간 공유 및 문제 발생 시 즉각 보고',
      '피드백 수용: 방어적 반응 줄이기, 수정 요청 수용',
      '상생 협업: 함께 성과를 내는 팀 플레이어 자세'
    ]
  },
  {
    title: '서비스 마인드 교육',
    subtitle: '“존중받고 싶다면 먼저 존중하기”',
    icon: Smile,
    details: [
      '고객 응대: 친절한 말투와 표정 관리 기본 예절',
      '공감 능력: 상대 입장에서 생각하기 및 불편함 읽기',
      '문제 상황 대응: 차분한 해결, 책임 회피하지 않기',
      '프로페셔널리즘: 서비스 전문가로서의 품위 유지'
    ]
  },
  {
    title: '자기관리 교육',
    subtitle: '“오래 일할 수 있는 사람 되기”',
    icon: Activity,
    details: [
      '감정 관리: 스트레스 조절 및 부정적 반응 줄이기',
      '건강 관리: 체력 유지 및 업무 리듬 만들기',
      '워라밸: 지속 가능한 근무를 위한 균형 잡기',
      '자아 존중: 자신의 가치를 믿고 자부심 갖기'
    ]
  },
  {
    title: '시니어 강점 재발견',
    subtitle: '“나이의 약점보다 경험의 가치 보기”',
    icon: Target,
    details: [
      '시니어만의 무기: 책임감, 끈기, 풍부한 공감 능력',
      '위기 대응: 인생 경험을 통한 유연한 상황 대처',
      '안정감: 조직에 신뢰를 주는 묵직한 태도',
      '인간관계 노하우: 갈등 중재 및 관계 유지 경험'
    ]
  }
];

export default function AiEducation() {
  const { openInquiry } = useInquiry();
  const [activeTab, setActiveTab ] = useState<'literacy' | 'utilization' | 'intern'>('literacy');
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'literacy' || hash === 'utilization' || hash === 'intern') {
      setActiveTab(hash as any);
    }
  }, [location.hash]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-white mb-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-linear-to-l from-white/5 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-brand/10 blur-3xl rounded-full" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1 bg-brand/20 border border-brand/30 rounded-full text-xs font-black mb-6 tracking-[0.3em] uppercase text-brand">iium AI Career Education</span>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
            {activeTab === 'intern' 
              ? <>다시 일하는 사람의 <br /><span className="text-brand">태도를 준비하는 과정</span></>
              : <>사람의 가능성을 다시 잇는 <br /><span className="text-brand">이음(iium) AI 교육</span></>
            }
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-12 font-bold leading-relaxed">
            {activeTab === 'intern'
              ? "이음(iium)의 시니어 인턴 교육은 기술교육이 아닙니다. 기업이 진짜 원하는 조직 적응력과 소통 능력을 다시 정비하는 과정입니다."
              : "이음(iium)의 AI 교육은 단순한 지식 전달이 아닙니다. 사람의 가능성을 발견하고, 경험을 미래 기술과 연결하여 의미 있는 성장을 만듭니다."
            }
          </p>
          <div className="flex justify-center gap-4">
             <button 
               onClick={() => openInquiry('education')}
               className="px-10 py-5 bg-brand text-white rounded-[24px] font-black text-lg hover:bg-brand-hover hover:scale-105 transition-all shadow-xl shadow-brand/20"
             >
                {activeTab === 'intern' ? '시니어 인턴 교육 신청' : 'AI 교육 과정 신청'}
             </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-20 bg-slate-100 p-2 rounded-[32px] max-w-2xl mx-auto font-black">
        <button 
          onClick={() => setActiveTab('literacy')}
          className={cn(
            "flex-grow px-8 py-4 rounded-3xl transition-all",
            activeTab === 'literacy' ? "bg-white text-brand shadow-md" : "text-slate-500 hover:text-slate-800"
          )}
        >
          AI 리터러시 (8주)
        </button>
        <button 
          onClick={() => setActiveTab('utilization')}
          className={cn(
            "flex-grow px-8 py-4 rounded-3xl transition-all",
            activeTab === 'utilization' ? "bg-white text-brand shadow-md" : "text-slate-500 hover:text-slate-800"
          )}
        >
          AI 직무활용 (4주)
        </button>
        <button 
          onClick={() => setActiveTab('intern')}
          className={cn(
            "flex-grow px-8 py-4 rounded-3xl transition-all",
            activeTab === 'intern' ? "bg-white text-brand shadow-md" : "text-slate-500 hover:text-slate-800"
          )}
        >
          시니어인턴교육 (4주)
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab !== 'intern' ? (
          <motion.div 
            key="ai-education"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* iium Education Philosophy */}
            <section className="mb-32">
               <div className="text-center mb-16">
                  <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                    {activeTab === 'literacy' ? 'AI 리터러시 (8주) 핵심 철학' : 'AI 직무활용 (4주) 실전 철학'}
                  </h2>
                  <p className="text-brand font-black text-xl italic mb-4">“가능성을 발견하고, 경험을 연결하며, 사람을 이어 의미 있는 성장을 만든다”</p>
                  <p className="text-slate-400 text-sm font-bold">Inspire · Integrate · Unite · Meaning</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  {[
                    { title: '실무 기초', icon: Star },
                    { title: '실무 연결', icon: Zap },
                    { title: '자신감 회복', icon: Heart },
                    { title: '소통 능력', icon: MessageSquare },
                    { title: '기능 교육 탈피', icon: Shield },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 p-8 rounded-[32px] text-center border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand shadow-sm group-hover:scale-110 transition-transform">
                        <item.icon size={24} />
                      </div>
                      <p className="font-black text-slate-800 tracking-tight">{item.title}</p>
                    </div>
                  ))}
               </div>
            </section>

            {/* Curriculum Levels Filtering */}
            <section className="mb-32">
                <div className="flex justify-between items-end mb-16">
                  <div>
                    <span className="text-brand font-black text-sm uppercase tracking-[0.3em] mb-4 block">Education Levels</span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">이음(iium) AI 교육체계</h2>
                  </div>
                  <p className="text-slate-400 font-bold hidden md:block">
                    {activeTab === 'literacy' ? '직무 기초부터 데이터 분석까지 실전 리터러시' : '현업 복기 및 직무 성과 창출을 위한 핵심 활용 기술'}
                  </p>
               </div>
               
               <CourseSection tab={activeTab} levels={curriculumLevels} />
            </section>

            {activeTab === 'utilization' && (
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="mb-32 p-12 bg-indigo-900 rounded-[60px] text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
                <div className="relative z-10">
                  <div className="text-center mb-16">
                    <h3 className="text-3xl font-black mb-4">활용교육 수료 후: AI 매칭 연결</h3>
                    <p className="text-indigo-200 font-bold">교육으로 끝내지 않습니다. 검증된 실무 역량을 바탕으로 최종 연결까지 책임집니다.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { step: 'STEP 3', title: 'AI Match 추천', desc: '직무 적합도 90% 이상의 기업을 AI 스코어링을 통해 최우선 매칭합니다.', icon: Award },
                      { step: 'STEP 4', title: '인터뷰 및 검증', desc: '온라인 및 기업 인터뷰를 통해 실무 역량과 조직 적합성을 현장에서 검증합니다.', icon: Users },
                      { step: 'STEP 5', title: '최종 연결 및 안착', desc: '채용 확정 후 시니어 인턴 과정을 통해 초기 조직 적응을 집중 지원합니다.', icon: Star }
                    ].map((s, i) => (
                      <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                        <span className="text-xs font-black text-brand mb-2 block">{s.step}</span>
                        <h4 className="text-xl font-black mb-4 flex items-center gap-2">
                           <s.icon size={20} className="text-brand" />
                           {s.title}
                        </h4>
                        <p className="text-sm font-bold text-indigo-100/70 leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="intern-education"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Intern Philosophy */}
            <section className="mb-32 text-center">
               <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">시니어 인턴 교육 핵심 목표</h2>
               <p className="text-brand font-black text-xl italic mb-10">“경험 많은 사람이 아니라, 함께 일하고 싶은 사람이 되는 것”</p>
               <div className="flex flex-wrap justify-center gap-6">
                  {['함께 일할 수 있는 태도', '소통 능력', '조직 적응력', '책임감', '배려와 협업'].map((item, i) => (
                    <span key={i} className="px-6 py-3 bg-white border border-brand/20 text-brand font-black rounded-2xl shadow-sm">
                      {item}
                    </span>
                  ))}
               </div>
            </section>

            {/* Intern Modules */}
            <section className="mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {seniorInternSections.map((sec, i) => (
                 <div key={i} className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                    <div className="w-14 h-14 bg-slate-50 text-brand rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                       <sec.icon size={28} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">{sec.title}</h3>
                    <p className="text-brand font-bold text-xs mb-6 italic">{sec.subtitle}</p>
                    <ul className="space-y-3">
                       {sec.details.map((detail, j) => (
                          <li key={j} className="flex items-start gap-3">
                             <div className="mt-1.5 w-1.5 h-1.5 bg-brand/30 rounded-full flex-shrink-0" />
                             <span className="text-slate-500 font-bold text-sm leading-relaxed">{detail}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
               ))}
               <div className="bg-slate-900 p-10 rounded-[48px] text-white flex flex-col justify-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-20">
                     <Target size={80} />
                  </div>
                  <h3 className="text-2xl font-black mb-6 relative z-10">기업이 원하는 <br />시니어 인재상</h3>
                  <ul className="space-y-3 relative z-10">
                     {['함께 일하기 편한 사람', '책임감 있는 사람', '감정 기복이 적은 사람', '배우려는 태도의 사람', '조직 분위기를 돕는 사람'].map((p, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-300">
                           <CheckCircle2 size={14} className="text-brand" /> {p}
                        </li>
                     ))}
                  </ul>
               </div>
            </section>

            {/* Before / After */}
            <section className="mb-32 py-16 bg-slate-50 rounded-[64px] border border-slate-100 px-6">
               <div className="max-w-4xl mx-auto">
                  <h2 className="text-center text-3xl font-black text-slate-900 mb-12">교육 수료 후의 변화</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div className="space-y-6">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest text-center">Before</p>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-slate-300">
                           <p className="font-bold text-slate-400 italic">“내 방식이 항상 맞다”</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-slate-300">
                           <p className="font-bold text-slate-400 italic">“요즘 애들은 이해할 수 없다”</p>
                        </div>
                        <div className="bg-white p-6 rounded-3xl shadow-sm border-l-4 border-slate-300">
                           <p className="font-bold text-slate-400 italic">“나는 원래 이렇게 일했다”</p>
                        </div>
                     </div>
                     <div className="hidden md:flex justify-center">
                        <ArrowRight size={40} className="text-brand animate-pulse" />
                     </div>
                     <div className="space-y-6">
                        <p className="text-xs font-black text-brand uppercase tracking-widest text-center">After</p>
                        <div className="bg-brand/5 p-6 rounded-3xl shadow-sm border-l-4 border-brand">
                           <p className="font-bold text-slate-900 italic">“함께 일하는 방법을 완벽히 이해한다”</p>
                        </div>
                        <div className="bg-brand/5 p-6 rounded-3xl shadow-sm border-l-4 border-brand">
                           <p className="font-bold text-slate-900 italic">“조직문화에 맞춰 유연하게 협업한다”</p>
                        </div>
                        <div className="bg-brand/5 p-6 rounded-3xl shadow-sm border-l-4 border-brand">
                           <p className="font-bold text-slate-900 italic">“배우며 성장하는 성숙한 전문가가 된다”</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Differentiation (Shared for both) */}
      <section className="mb-32 py-24 bg-slate-900 rounded-[80px] text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
         <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">이음(iium)만의 차별화 포인트</h2>
               <p className="text-slate-400 font-bold">기존의 단순 기술 교육과는 철학부터 다릅니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { 
                   title: '“속도”보다 “적응”', 
                   desc: '빠르게 배우는 것이 목표가 아닙니다. 두려움을 해소하고 실제 업무에 연결될 때까지 자신감을 회복하는 데 집중합니다.',
                   points: ['두려움 해소', '자신감 회복', '반복 실습', '업무 연결']
                 },
                 { 
                   title: '“기술”보다 “역할”', 
                   desc: 'AI 시대에도 시니어만의 강점(공감, 책임감, 신뢰)은 더욱 중요합니다. 기술을 통해 그 강점을 더 빛나게 만듭니다.',
                   points: ['공감 능력', '책임감', '신뢰 형성', '관계 유지']
                 },
                 { 
                   title: '교육 후 바로 “연결”', 
                   desc: '단순히 가르치고 끝내지 않습니다. 교육부터 평가, 그리고 실제 기업 연결까지 원스톱 프로세스를 제공합니다.',
                   points: ['실습/평가', 'AI 매칭', '기업 연계', '사후 관리']
                 },
               ].map((item, i) => (
                 <div key={i} className="space-y-8">
                    <div className="border-l-4 border-brand pl-6">
                       <h3 className="text-2xl font-black mb-4">{item.title}</h3>
                       <p className="text-slate-400 text-sm font-bold leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {item.points.map((p, j) => (
                         <span key={j} className="text-[10px] font-black px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 uppercase tracking-widest text-brand">
                           {p}
                         </span>
                       ))}
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Education Delivery */}
      <section className="mb-32">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">교육 운영 방식 및 결과물</h2>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-50 p-12 rounded-[48px] border border-slate-100">
               <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                  <Play size={20} className="text-brand" /> 교육 방식
               </h3>
               <div className="space-y-6">
                  {[
                    { label: 'VOD 전용', value: '기초 이론 및 리터러시 기본 과정' },
                    { label: '온라인/줌(Zoom) 실무', value: '실전 프롬프트 및 도구 활용 라이브' },
                    { label: '병행 과정', value: '이론(VOD) + 실전(줌) + 1:1 코칭 결합' },
                    { label: '역량 평가', value: 'AI 자동 분석 및 맞춤형 피드백' },
                    { label: '직무 코칭', value: '전문가 1:1 피드백 및 직무 설계' },
                    { label: '최종 연결', value: '이음(iium) 엔진을 통한 기업 매칭' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-bottom border-slate-200">
                       <span className="text-slate-400 font-black text-sm uppercase tracking-widest">{row.label}</span>
                       <span className="text-slate-900 font-bold">{row.value}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="bg-brand/5 p-12 rounded-[48px] border border-brand/10">
               <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                  <CheckCircle size={20} className="text-brand" /> 수료 후 결과물
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    'AI 직무 역량 리포트',
                    '디지털 활용 공식 인증',
                    '실습 포트폴리오 완본',
                    'AI 성향 분석 상용 데이터',
                    '기업 추천 우선순위 데이터',
                    '시니어 전문가 네트워크 참여'
                  ].map((res, i) => (
                    <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                       <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                          <CheckCircle2 size={16} />
                       </div>
                       <span className="text-sm font-bold text-slate-800 leading-tight">{res}</span>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Target and Final CTA (Shared) */}
      <section className="mb-32">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">대상별 추천 학습 경로</h2>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-3xl overflow-hidden shadow-xl">
               <thead>
                  <tr className="bg-slate-900 text-white">
                     <th className="px-8 py-6 text-left font-black">수강 대상</th>
                     <th className="px-8 py-6 text-left font-black">추천 핵심 과정</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                  {[
                    { target: '은퇴 후 재취업을 희망하는 분', course: 'AI 기초 이해 + 행정지원 실무 (Level 1, 3, 5)' },
                    { target: '경력이 단절되어 다시 시작하려는 분', course: 'AI 활용 실생활 + 고객응대 실무 (Level 2, 3)' },
                    { target: '강사/교사 출신으로 교육을 전달하고 싶은 분', course: 'AI 교육보조 및 실전 인턴 과정 (Level 5)' },
                    { target: '상담 및 서비스 경험이 풍부한 분', course: 'AI 고객상담 및 조직 적응 훈련 (Level 3, 5)' },
                    { target: '사무직 출신으로 디지털 전환이 필요한 분', course: 'AI 문서 자동화 및 협업 태도 교육 (Level 3, 4)' },
                    { target: '자영업/홍보 경험을 살리고 싶은 분', course: 'AI 콘텐츠 제작 및 서비스 마인드 (Level 2, 3, 5)' },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                       <td className="px-8 py-6 font-black text-slate-800 tracking-tight">{row.target}</td>
                       <td className="px-8 py-6 font-bold text-brand">{row.course}</td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </section>

      {/* Recommended Names Strategy */}
      <section className="mb-32 p-12 bg-white rounded-[48px] border border-slate-100 shadow-sm text-center">
         <h2 className="text-2xl font-black mb-8 tracking-tight">시니어를 위한 새로운 가치 선언</h2>
         <div className="flex flex-wrap justify-center gap-3">
            {['시니어 리스타트 인턴', '인생2막 직무적응', '조직적응 아카데미', '시니어 협업 과정', '이음 시니어 인턴십', '리워크(Re:Work)'].map((name, i) => (
               <span key={i} className="px-5 py-2 bg-slate-50 text-slate-600 rounded-full text-xs font-black border border-slate-200">
                  {name}
               </span>
            ))}
         </div>
      </section>

      {/* CTA Final */}
      <section className="text-center py-24 bg-linear-to-b from-white to-slate-50 rounded-[80px] border border-slate-100 shadow-sm relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand/50 to-indigo-500/50" />
         <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-tight">
            “AI와 함께, <br />
            <span className="text-brand">다시 세상의 주역</span>이 되세요.”
          </h2>
         <p className="text-xl font-bold text-slate-500 mb-12 max-w-2xl mx-auto italic leading-relaxed">
           시니어의 경험은 기업의 가장 큰 자산입니다. <br />
           우리는 기술을 넘어, 당신의 가치가 다시 인정받도록 잇겠습니다.
         </p>
         <button 
           onClick={() => openInquiry('education')}
           className="px-16 py-7 bg-brand text-white rounded-[32px] font-black text-2xl hover:bg-brand-hover hover:scale-105 transition-all shadow-2xl shadow-brand/40"
         >
            인생 2막 교육 시작하기
         </button>
      </section>
    </div>
  );
}

