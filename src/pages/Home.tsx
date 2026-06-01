import { ArrowRight, Search, Briefcase, Users, Brain, GraduationCap, TrendingUp, Star, MessageSquare, ChevronDown, CheckCircle2, Zap, Target, Rocket, Heart, Shield, Building, Sparkles, Calendar, Eye, BookOpen, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useInquiry } from '../components/ui/InquiryContext';
import { getPosts } from '../data/posts';
import { Post, CATEGORY_LABELS } from '../types';

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

const SECTION_1_VIDEOS = [
  {
    id: "v1-1",
    type: 'AI 리터러시 추천 영상',
    embedUrl: "https://www.youtube.com/embed/A85M4bY-mJg",
    watchUrl: "https://www.youtube.com/watch?v=A85M4bY-mJg",
    title: "5060을 위한 쉬운 챗GPT 스마트폰 실습 강좌",
    source: "KBS / 한국디지털강사협회",
    description: "스마트폰 하나로 챗GPT를 무작정 따라 하며 실생활의 비서로 만드는 가장 친절하고 직관적인 스마트 소양 입문 강의입니다.",
    tags: ["#AI리터러시", "#스마트폰강의", "#5060추천"]
  },
  {
    id: "v1-2",
    type: 'AI 어플 실생활 활용',
    embedUrl: "https://www.youtube.com/embed/rbe56iGZ2c0",
    watchUrl: "https://www.youtube.com/watch?v=rbe56iGZ2c0",
    title: "스마트폰으로 쉽게 시작하는 생성형 AI 어플 기초",
    source: "스마트배움터 정교실",
    description: "스마트폰 내에 탑재되어 있는 다양한 언어 번역 엔진과 유망 인공지능 요리 레시피 제작법을 직접 따라하며 배웁니다.",
    tags: ["#생성형AI", "#어플활용", "#디지털배움"]
  },
  {
    id: "v1-3",
    type: '디지털 튜터 소양 소식',
    embedUrl: "https://www.youtube.com/embed/F0SjG0B83y8",
    watchUrl: "https://www.youtube.com/watch?v=F0SjG0B83y8",
    title: "인공지능 시대를 준비하는 중장년 디지털 튜터 소양 교육",
    source: "EBS 평생배움터",
    description: "중장년층이 디지털 기술 소외를 해결하고 나이 드신 입소자나 손주에게 문화를 전달하는 교육 활동 튜터 코스 안내.",
    tags: ["#소양교육", "#중장년혁신", "#평생강사"]
  }
];

const SECTION_2_VIDEOS = [
  {
    id: "v2-1",
    type: '인생 2막 동기부여',
    embedUrl: "https://www.youtube.com/embed/83SNooY8yWc",
    watchUrl: "https://www.youtube.com/watch?v=83SNooY8yWc",
    title: "세바시: 은퇴 후 인생 2막을 멋지게 채우는 소통과 진로 설계",
    source: "세상을 바꾸는 시간 11분",
    description: "왕년의 임원 자부심을 내려놓고 정중하며 소통이 잘 되는 동료로서 환영받고 신뢰받는 삶을 가꾸어 주는 인스퍼레이션.",
    tags: ["#시니어성공학", "#세바시동기부여", "#인생2막"]
  },
  {
    id: "v2-2",
    type: '노후 평생 진로 설계',
    embedUrl: "https://www.youtube.com/embed/yWd3u6X9Rz8",
    watchUrl: "https://www.youtube.com/watch?v=yWd3u6X9Rz8",
    title: "EBS 평생설계: 은퇴 후 40년, 무엇을 어떻게 채우고 살아갈 것인가",
    source: "EBS 평생설계 보도국",
    description: "든든한 인생 건강 설계, 배움의 낙, 적절한 노동량을 조합하여 세대와 화합을 유도하고 존경받는 숲이 되는 중장년 자화상.",
    tags: ["#EBS특강", "#은퇴설계", "#노후인생"]
  },
  {
    id: "v2-3",
    type: '재취업 이직 매뉴얼',
    embedUrl: "https://www.youtube.com/embed/DndxbyyVMy8",
    watchUrl: "https://www.youtube.com/watch?v=DndxbyyVMy8",
    title: "중장년 재취업 이직 백서: 면접관을 사로잡는 시니어 대화법",
    source: "시니어 파트너쉽 아카데미",
    description: "현대 기술 소통 툴 협조 의지를 드러내어 어린 팀장들과 수평적으로 녹아드는 구체적 어필 화법과 지혜 마인드 멘토링.",
    tags: ["#면접소통", "#재취업성공", "#강점어필"]
  }
];

const SECTION_3_VIDEOS = [
  {
    id: "v3-1",
    type: '안전 건강 식단 처방',
    embedUrl: "https://www.youtube.com/embed/gL_kPscFfcc",
    watchUrl: "https://www.youtube.com/watch?v=gL_kPscFfcc",
    title: "의사 추천: 50대 이후 매일 섭취하면 활력이 뛰는 필수 건강 음식",
    source: "생로병사의 비밀 관절식단",
    description: "염증 부종을 저지하고 피를 정맥 순환해 주며 노안과 근신경계 노화에 탁월하게 작용하는 가성비 최고 5대 자연 식재료 요법.",
    tags: ["#영양식사", "#중장년식단", "#의학박사권장"]
  },
  {
    id: "v3-2",
    type: '건강 장수 3대 보충제',
    embedUrl: "https://www.youtube.com/embed/Y0b6910Sshg",
    watchUrl: "https://www.youtube.com/watch?v=Y0b6910Sshg",
    title: "중장년 필수 3대 핵심 건강식품 영양제 종류와 올바른 복용 시점",
    source: "식품의학 영양 포럼",
    description: "연골 형성 식이유황(MSM), 황반변성 예방 지아잔틴 복합, 장 면역과 활력을 살리는 유익균 효소의 안전한 식후 융합 가이드.",
    tags: ["#필수영양제", "#MSM올바른법", "#황반보호식품"]
  },
  {
    id: "v3-3",
    type: '저충격 실비 스트레칭',
    embedUrl: "https://www.youtube.com/embed/S_8nB0rWia4",
    watchUrl: "https://www.youtube.com/watch?v=S_8nB0rWia4",
    title: "국민건강보험공단 추천: 관절 무리 없는 시니어 맞춤 유산소 체조",
    source: "국민건강보험공단 권장강좌",
    description: "어깨 연화 부위와 무릎 뼈 마찰 연화 통증 걱정 없이 안방에서 혈액을 힘차게 요동치게 가꿀 수 있는 정식 실외/실내 전신 홈트.",
    tags: ["#국보공단추천", "#실버체조", "#관절보호"]
  }
];

export default function Home() {
  const { openInquiry } = useInquiry();
  const navigate = useNavigate();
  const [selectedInquiryType, setSelectedInquiryType] = useState<'corporate' | 'individual' | 'education'>('corporate');
  const [homeFormData, setHomeFormData] = useState({
    name: '',
    phone: ''
  });
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  // Section view modes: 'recommended' uses the auto-rotated stream, 'all' displays full catalog grid
  const [section1ViewMode, setSection1ViewMode] = useState<'recommended' | 'all'>('recommended');
  const [section2ViewMode, setSection2ViewMode] = useState<'recommended' | 'all'>('recommended');
  const [section3ViewMode, setSection3ViewMode] = useState<'recommended' | 'all'>('recommended');

  // Interactive multiple video controllers
  const [sec1VideoIdx, setSec1VideoIdx] = useState(0);
  const [sec2VideoIdx, setSec2VideoIdx] = useState(0);
  const [sec3VideoIdx, setSec3VideoIdx] = useState(0);

  const [sec1PlayInline, setSec1PlayInline] = useState(false);
  const [sec2PlayInline, setSec2PlayInline] = useState(false);
  const [sec3PlayInline, setSec3PlayInline] = useState(false);

  // Playback Help guides for geographical errors/iframe blocks
  const [sec1TroubleOpen, setSec1TroubleOpen] = useState(false);
  const [sec2TroubleOpen, setSec2TroubleOpen] = useState(false);
  const [sec3TroubleOpen, setSec3TroubleOpen] = useState(false);

  const [rotationSeed, setRotationSeed] = useState<number>(() => {
    const today = new Date();
    return today.getDate() + today.getMonth();
  });

  useEffect(() => {
    // published 포스트 로드
    const activePosts = getPosts().filter(p => p.isPublished);
    setPosts(activePosts);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationSeed(prev => prev + 1);
    }, 18000); // 18 seconds auto rotation
    return () => clearInterval(interval);
  }, []);

  // Helper to obtain unique posts for rotation
  const getRotatedPosts = (categories: string[], count = 3) => {
    const filtered = posts.filter(p => categories.includes(p.category));
    if (filtered.length === 0) return [];
    
    const rotated: Post[] = [];
    for (let i = 0; i < filtered.length; i++) {
      const idx = (rotationSeed + i) % filtered.length;
      if (!rotated.some(p => p.id === filtered[idx].id)) {
        rotated.push(filtered[idx]);
      }
      if (rotated.length === count) break;
    }
    
    // Fallback if we don't have enough elements yet (though we should)
    while (rotated.length < count && filtered.length > rotated.length) {
      for (const item of filtered) {
        if (!rotated.some(p => p.id === item.id)) {
          rotated.push(item);
        }
        if (rotated.length === count) break;
      }
    }
    return rotated;
  };

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
          <div id="jobs-section">
            <InteractiveCard 
              icon={features[0].icon}
              title={features[0].title}
              desc={features[0].desc}
              color={features[0].color}
              details={features[0].details}
              path={features[0].path}
            />
          </div>
          <div id="ai-matching-section">
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

      {/* Blog & Health Posts Column Section - Requirements 1, 2, 3 */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-t border-slate-100">
        
        {/* Section 1: AI 리터러시 & 직무 활용 칼럼 */}
        <div className="mb-24" id="section-ai">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 pb-6 border-b border-slate-100">
            <div className="flex-grow">
              <span className="text-brand font-black text-xs uppercase tracking-[0.3em] mb-3 block">
                iium AI Literacy & Job Column
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                AI 리터러시 & 직무 활용 칼럼
              </h2>
              <p className="text-slate-500 font-bold mt-2 text-xs md:text-sm">
                생성형 AI 소양과 중장년 직무 혁신을 위한 리포트를 기반으로 실시간 최신 정보로 자동 교체되는 고품격 칼럼방입니다.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2.5 items-center shrink-0">
              <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setSection1ViewMode('recommended')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                    section1ViewMode === 'recommended' 
                      ? "bg-white text-slate-900 shadow-xs border border-slate-100" 
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  🔥 HOT 추천
                </button>
                <button
                  onClick={() => setSection1ViewMode('all')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1",
                    section1ViewMode === 'all' 
                      ? "bg-white text-brand shadow-xs border border-slate-100" 
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  📚 전체 목록 ({posts.filter(p => ['literacy', 'utilization'].includes(p.category)).length}개)
                </button>
              </div>

              {section1ViewMode === 'recommended' && (
                <button
                  onClick={() => setRotationSeed(prev => prev + 1)}
                  className="px-4 py-3 bg-slate-55 hover:bg-brand/10 hover:text-brand rounded-2xl text-slate-600 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  title="클릭 시 수동으로 다른 HOT 칼럼 주제를 교체 체험해 볼 수 있습니다."
                >
                  새 주제 추천 🔄
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left posts list - columns stretch dynamically depending on view mode */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(section1ViewMode === 'recommended' 
                  ? getRotatedPosts(['literacy', 'utilization'], 3) 
                  : posts.filter(p => ['literacy', 'utilization'].includes(p.category))
                ).map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="flex flex-col h-full bg-white rounded-[32px] border border-slate-100 shadow-xs hover:shadow-xl hover:border-brand/30 transition-all overflow-hidden cursor-pointer group"
                  >
                    <div className="h-44 bg-slate-150 relative overflow-hidden shrink-0">
                      <img src={post.coverImage} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-brand text-white rounded-lg text-[10px] font-black tracking-wider">
                        {CATEGORY_LABELS[post.category]}
                      </span>
                      <span className="absolute top-4 right-4 px-2 py-0.5 bg-slate-900/70 backdrop-blur-xs text-white rounded text-[9px] font-black tracking-wide">
                        조회 {post.views}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div className="space-y-3">
                        <h3 className="text-sm font-black text-slate-900 group-hover:text-brand line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-bold line-clamp-4 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-50 mt-6 flex items-center justify-between text-[10px] font-black text-slate-400 shrink-0">
                        <span>by {post.author}</span>
                        <span className="text-brand flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">상세 보기 →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Video Column: Interactive Multi-Video selection */}
            <div className="lg:col-span-1">
              <div className="flex flex-col h-full bg-white rounded-[32px] border border-slate-100 shadow-xs hover:shadow-xl hover:border-brand/30 transition-all overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
                  <span className="text-emerald-600 font-black text-[10px] uppercase tracking-wider block">AI 리터러시 추천 영상</span>
                  <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-sm">영상관 📺</span>
                </div>
                <div className="p-5 flex flex-col justify-between h-full space-y-4">
                  {/* Embedded video category selector tabs */}
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">🎬 주제 선택 ({SECTION_1_VIDEOS.length}개 비디오)</p>
                    <div className="flex flex-col gap-1">
                      {SECTION_1_VIDEOS.map((vid, idx) => (
                        <button
                          key={vid.id}
                          onClick={() => {
                            setSec1VideoIdx(idx);
                            setSec1PlayInline(false);
                          }}
                          className={cn(
                            "w-full text-left py-1.5 px-2.5 rounded-lg text-[10px] font-black truncate transition-all cursor-pointer border",
                            sec1VideoIdx === idx 
                              ? "bg-slate-900 text-white border-slate-900" 
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-transparent"
                          )}
                        >
                          {idx + 1}. {vid.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-150 shadow-inner relative group/player">
                    {!sec1PlayInline ? (
                      <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/20">
                        {/* Background Graphic Pattern instead of broken empty box */}
                        <div className="absolute inset-0 z-0 bg-slate-950 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-indigo-950/40" />
                          <div className="w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-pulse" />
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 space-y-2 opacity-90">
                            <span className="text-[9px] font-black text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-2 py-0.5 rounded-sm">
                              {SECTION_1_VIDEOS[sec1VideoIdx].source} • 추천 강의
                            </span>
                            <p className="text-white text-[11px] font-extrabold px-3 leading-snug line-clamp-2">
                              {SECTION_1_VIDEOS[sec1VideoIdx].title}
                            </p>
                          </div>
                        </div>

                        {/* Pulsing glassy center Play button */}
                        <button 
                          onClick={() => setSec1PlayInline(true)}
                          className="absolute inset-0 m-auto w-12 h-12 bg-red-650 hover:bg-red-600 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 transition-all z-10 border border-red-500 cursor-pointer hover:scale-110"
                          title="화면에서 바로 재생하기"
                        >
                          <span className="ml-0.5 text-base text-white">▶</span>
                        </button>

                        <div className="z-10 flex justify-between items-center text-[8px] font-black text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                            공식 추천
                          </span>
                          <span>고화질 지원</span>
                        </div>

                        <div className="z-10 flex gap-1 justify-end mt-auto">
                          <button
                            onClick={() => setSec1PlayInline(true)}
                            className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white rounded text-[8px] font-black transition-all border border-white/15 backdrop-blur-xs cursor-pointer"
                          >
                            이 화면에서 감상 시도 📟
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <iframe 
                          src={SECTION_1_VIDEOS[sec1VideoIdx].embedUrl} 
                          title={SECTION_1_VIDEOS[sec1VideoIdx].title}
                          className="w-full h-full border-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button 
                          onClick={() => setSec1PlayInline(false)}
                          className="absolute top-2 right-2 px-2 py-1 bg-slate-900/90 hover:bg-slate-900 text-white rounded text-[8px] font-black tracking-wider transition-all border border-slate-700/50 z-20 cursor-pointer"
                        >
                          ✖ 안내 화면으로
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[9px] font-black tracking-wide mb-1.5">
                      {SECTION_1_VIDEOS[sec1VideoIdx].source}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-2">
                      {SECTION_1_VIDEOS[sec1VideoIdx].title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 leading-relaxed">
                      {SECTION_1_VIDEOS[sec1VideoIdx].description}
                    </p>

                    <div className="mt-3 flex flex-col gap-1.5">
                      <a 
                        href={SECTION_1_VIDEOS[sec1VideoIdx].watchUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-xl border border-emerald-100 transition-all w-full justify-center shadow-xs"
                      >
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        YouTube 공식 앱에서 직접 보기 ↗
                      </a>

                      <button
                        onClick={() => setSec1TroubleOpen(p => !p)}
                        className="w-full py-1.5 text-[9px] font-black text-slate-400 hover:text-slate-600 border border-slate-100 hover:border-slate-200 rounded-lg text-center transition-all cursor-pointer"
                      >
                        {sec1TroubleOpen ? "⚙️ 대처 가이드 숨기기" : "⚙️ 영상이 차단되거나 안 나오나요?"}
                      </button>

                      {sec1TroubleOpen && (
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-bold text-slate-500 leading-normal space-y-1.5">
                          <p className="font-black text-slate-800 text-[10px]">💡 끊김 및 재생 차단 해결 가이드</p>
                          <p>1. 일부 브라우저 확장앱(애드블록 등)이나 사내 망 보안 설정 및 모바일 iFrame 수신제한 정책으로 인해 영상이 흰 화면 혹은 차단될 수 있습니다.</p>
                          <p>2. 이럴 땐 위의 <span className="text-emerald-600 font-extrabold">"YouTube 공식 앱에서 직접 보기 ↗"</span> 버튼을 터치하여 브라우저 새 탭에서 즉시 정식 시청하실 수 있습니다.</p>
                          <p className="font-black text-slate-700 mt-2 text-[9px] border-t border-slate-100 pt-1.5">🔗 여전히 안 나오시나요? 대체 추천 강의 주소:</p>
                          <ul className="list-disc list-inside space-y-1 text-slate-500 font-medium">
                            <li><a href="https://www.youtube.com/results?search_query=스마트폰+기초+강의+5060" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">유튜브 "시니어 스마트폰 기초" 영상 검색 ↗</a></li>
                            <li><a href="https://www.youtube.com/results?search_query=중장년+챗gpt+사용법" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">유튜브 "중장년 챗GPT 교육" 영상 검색 ↗</a></li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 text-[9px] font-black text-slate-400 shrink-0">
                    {SECTION_1_VIDEOS[sec1VideoIdx].tags.map(t => (
                      <span key={t} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: 시니어 성공학 & 인생 2막 칼럼 */}
        <div className="mb-24" id="section-career">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 pb-6 border-b border-slate-100">
            <div className="flex-grow">
              <span className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
                iium Senior Success & Life Transition
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                시니어 성공학 & 인생 2막 칼럼
              </h2>
              <p className="text-slate-500 font-bold mt-2 text-xs md:text-sm">
                풍부한 현업 지혜를 바탕으로 인생의 새로운 가치와 성공 로드맵을 이어가는 시니어들의 성공 스토리입니다.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2.5 items-center shrink-0">
              <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setSection2ViewMode('recommended')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                    section2ViewMode === 'recommended' 
                      ? "bg-white text-slate-900 shadow-xs border border-slate-100" 
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  🔥 HOT 추천
                </button>
                <button
                  onClick={() => setSection2ViewMode('all')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1",
                    section2ViewMode === 'all' 
                      ? "bg-white text-indigo-600 shadow-xs border border-slate-100" 
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  📚 전체 목록 ({posts.filter(p => p.category === 'senior').length}개)
                </button>
              </div>

              {section2ViewMode === 'recommended' && (
                <button
                  onClick={() => setRotationSeed(prev => prev + 1)}
                  className="px-4 py-3 bg-slate-55 hover:bg-brand/10 hover:text-brand rounded-2xl text-slate-600 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  title="클릭 시 수동으로 다른 HOT 칼럼 주제를 교체 체험해 볼 수 있습니다."
                >
                  새 주제 추천 🔄
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left posts list - columns stretch dynamically depending on view mode */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(section2ViewMode === 'recommended' 
                  ? getRotatedPosts(['senior'], 3) 
                  : posts.filter(p => p.category === 'senior')
                ).map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="flex flex-col h-full bg-white rounded-[32px] border border-slate-100 shadow-xs hover:shadow-xl hover:border-brand/30 transition-all overflow-hidden cursor-pointer group"
                  >
                    <div className="h-44 bg-slate-150 relative overflow-hidden shrink-0">
                      <img src={post.coverImage} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white rounded-lg text-[10px] font-black tracking-wider">
                        {CATEGORY_LABELS[post.category]}
                      </span>
                      <span className="absolute top-4 right-4 px-2 py-0.5 bg-slate-900/70 backdrop-blur-xs text-white rounded text-[9px] font-black tracking-wide">
                        조회 {post.views}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div className="space-y-3">
                        <h3 className="text-sm font-black text-slate-900 group-hover:text-brand line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-bold line-clamp-4 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-50 mt-6 flex items-center justify-between text-[10px] font-black text-slate-400 shrink-0">
                        <span>by {post.author}</span>
                        <span className="text-indigo-600 flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">상세 보기 →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Video Column: Dynamic Custom Career Videos */}
            <div className="lg:col-span-1">
              <div className="flex flex-col h-full bg-white rounded-[32px] border border-slate-100 shadow-xs hover:shadow-xl hover:border-brand/30 transition-all overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
                  <span className="text-indigo-600 font-black text-[10px] uppercase tracking-wider block">인생 2막 동기부여 영상</span>
                  <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-sm">멘토링 ⚡</span>
                </div>
                <div className="p-5 flex flex-col justify-between h-full space-y-4">
                  {/* Embedded video category selector tabs */}
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">🎬 주제 선택 ({SECTION_2_VIDEOS.length}개 비디오)</p>
                    <div className="flex flex-col gap-1">
                      {SECTION_2_VIDEOS.map((vid, idx) => (
                        <button
                          key={vid.id}
                          onClick={() => {
                            setSec2VideoIdx(idx);
                            setSec2PlayInline(false);
                          }}
                          className={cn(
                            "w-full text-left py-1.5 px-2.5 rounded-lg text-[10px] font-black truncate transition-all cursor-pointer border",
                            sec2VideoIdx === idx 
                              ? "bg-slate-900 text-white border-slate-900" 
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-transparent"
                          )}
                        >
                          {idx + 1}. {vid.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-150 shadow-inner relative group/player">
                    {!sec2PlayInline ? (
                      <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/20">
                        {/* Background Graphic Pattern instead of broken empty box */}
                        <div className="absolute inset-0 z-0 bg-slate-950 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-emerald-950/40" />
                          <div className="w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl animate-pulse" />
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 space-y-2 opacity-90">
                            <span className="text-[9px] font-black text-indigo-400 bg-indigo-950/70 border border-indigo-800/40 px-2 py-0.5 rounded-sm">
                              {SECTION_2_VIDEOS[sec2VideoIdx].source} • 추천 강연
                            </span>
                            <p className="text-white text-[11px] font-extrabold px-3 leading-snug line-clamp-2">
                              {SECTION_2_VIDEOS[sec2VideoIdx].title}
                            </p>
                          </div>
                        </div>

                        {/* Pulsing glassy center Play button */}
                        <button 
                          onClick={() => setSec2PlayInline(true)}
                          className="absolute inset-0 m-auto w-12 h-12 bg-red-650 hover:bg-red-600 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 transition-all z-10 border border-red-500 cursor-pointer hover:scale-110"
                          title="화면에서 바로 재생하기"
                        >
                          <span className="ml-0.5 text-base text-white">▶</span>
                        </button>

                        <div className="z-10 flex justify-between items-center text-[8px] font-black text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                            공식 추천
                          </span>
                          <span>고화질 지원</span>
                        </div>

                        <div className="z-10 flex gap-1 justify-end mt-auto">
                          <button
                            onClick={() => setSec2PlayInline(true)}
                            className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white rounded text-[8px] font-black transition-all border border-white/15 backdrop-blur-xs cursor-pointer"
                          >
                            이 화면에서 감상 시도 📟
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <iframe 
                          src={SECTION_2_VIDEOS[sec2VideoIdx].embedUrl} 
                          title={SECTION_2_VIDEOS[sec2VideoIdx].title}
                          className="w-full h-full border-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button 
                          onClick={() => setSec2PlayInline(false)}
                          className="absolute top-2 right-2 px-2 py-1 bg-slate-900/90 hover:bg-slate-900 text-white rounded text-[8px] font-black tracking-wider transition-all border border-slate-700/50 z-20 cursor-pointer"
                        >
                          ✖ 안내 화면으로
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-[9px] font-black tracking-wide mb-1.5">
                      {SECTION_2_VIDEOS[sec2VideoIdx].source}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-2">
                      {SECTION_2_VIDEOS[sec2VideoIdx].title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 leading-relaxed">
                      {SECTION_2_VIDEOS[sec2VideoIdx].description}
                    </p>

                    <div className="mt-3 flex flex-col gap-1.5">
                      <a 
                        href={SECTION_2_VIDEOS[sec2VideoIdx].watchUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-[11px] font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl border border-indigo-100 transition-all w-full justify-center shadow-xs"
                      >
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        YouTube 공식 앱에서 직접 보기 ↗
                      </a>

                      <button
                        onClick={() => setSec2TroubleOpen(p => !p)}
                        className="w-full py-1.5 text-[9px] font-black text-slate-400 hover:text-slate-600 border border-slate-100 hover:border-slate-200 rounded-lg text-center transition-all cursor-pointer"
                      >
                        {sec2TroubleOpen ? "⚙️ 대처 가이드 숨기기" : "⚙️ 영상이 차단되거나 안 나오나요?"}
                      </button>

                      {sec2TroubleOpen && (
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-bold text-slate-500 leading-normal space-y-1.5">
                          <p className="font-black text-slate-800 text-[10px]">💡 끊김 및 재생 차단 해결 가이드</p>
                          <p>1. 일부 브라우저 확장앱(애드블록 등)이나 사내 망 보안 설정 및 모바일 iFrame 수신제한 정책으로 인해 영상이 흰 화면 혹은 차단될 수 있습니다.</p>
                          <p>2. 이럴 땐 위의 <span className="text-indigo-600 font-extrabold">"YouTube 공식 앱에서 직접 보기 ↗"</span> 버튼을 터치하여 브라우저 새 탭에서 즉시 정식 시청하실 수 있습니다.</p>
                          <p className="font-black text-slate-700 mt-2 text-[9px] border-t border-slate-100 pt-1.5">🔗 여전히 안 나오시나요? 대체 추천 강의 주소:</p>
                          <ul className="list-disc list-inside space-y-1 text-slate-500 font-medium">
                            <li><a href="https://www.youtube.com/results?search_query=은퇴+후+인생+2막+진로+설계" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">유튜브 "인생 2막 은퇴 설계" 영상 검색 ↗</a></li>
                            <li><a href="https://www.youtube.com/results?search_query=시니어+재취업+성공+노하우" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">유튜브 "시니어 재취업 성공" 영상 검색 ↗</a></li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 text-[9px] font-black text-slate-400 shrink-0">
                    {SECTION_2_VIDEOS[sec2VideoIdx].tags.map(t => (
                      <span key={t} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: 이음 건강생활 칼럼 */}
        <div className="mb-16" id="section-health">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6 pb-6 border-b border-slate-100">
            <div className="flex-grow">
              <span className="text-rose-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
                iium Healthy Life Columns
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight">
                건강 수명 플래너: 건강 칼럼
              </h2>
              <p className="text-slate-500 font-bold mt-2 text-xs md:text-sm">
                사회 활동의 든든한 밑거름이 될 뇌 장수 건강 요법부터 무리 없는 관절 케어, 음식 및 식품 추천까지 담아냈습니다.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2.5 items-center shrink-0">
              <div className="flex gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setSection3ViewMode('recommended')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer",
                    section3ViewMode === 'recommended' 
                      ? "bg-white text-slate-900 shadow-xs border border-slate-100" 
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  🔥 HOT 추천
                </button>
                <button
                  onClick={() => setSection3ViewMode('all')}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1",
                    section3ViewMode === 'all' 
                      ? "bg-white text-rose-600 shadow-xs border border-slate-100" 
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  📚 전체 목록 ({posts.filter(p => p.category === 'health').length}개)
                </button>
              </div>

              {section3ViewMode === 'recommended' && (
                <button
                  onClick={() => setRotationSeed(prev => prev + 1)}
                  className="px-4 py-3 bg-slate-55 hover:bg-brand/10 hover:text-brand rounded-2xl text-slate-600 font-black text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  title="클릭 시 수동으로 다른 HOT 칼럼 주제를 교체 체험해 볼 수 있습니다."
                >
                  새 주제 추천 🔄
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left posts list - columns stretch dynamically depending on view mode */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(section3ViewMode === 'recommended' 
                  ? getRotatedPosts(['health'], 3) 
                  : posts.filter(p => p.category === 'health')
                ).map((post) => (
                  <div 
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className="flex flex-col h-full bg-white rounded-[32px] border border-slate-100 shadow-xs hover:shadow-xl hover:border-brand/30 transition-all overflow-hidden cursor-pointer group"
                  >
                    <div className="h-44 bg-slate-150 relative overflow-hidden shrink-0">
                      <img src={post.coverImage} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" referrerPolicy="no-referrer" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-rose-600 text-white rounded-lg text-[10px] font-black tracking-wider">
                        {CATEGORY_LABELS[post.category]}
                      </span>
                      <span className="absolute top-4 right-4 px-2 py-0.5 bg-slate-900/70 backdrop-blur-xs text-white rounded text-[9px] font-black tracking-wide">
                        조회 {post.views}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div className="space-y-3">
                        <h3 className="text-sm font-black text-slate-900 group-hover:text-brand line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-bold line-clamp-4 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-50 mt-6 flex items-center justify-between text-[10px] font-black text-slate-400 shrink-0">
                        <span>by {post.author}</span>
                        <span className="text-rose-600 flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">상세 보기 →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Video Column: Dynamic Custom Health Videos */}
            <div className="lg:col-span-1">
              <div className="flex flex-col h-full bg-white rounded-[32px] border border-slate-100 shadow-xs hover:shadow-xl hover:border-brand/30 transition-all overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center shrink-0">
                  <span className="text-rose-600 font-black text-[10px] uppercase tracking-wider block">건강 음식 및 기능식품 특강</span>
                  <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-2 py-0.5 rounded-sm">식단 운동 🧘</span>
                </div>
                <div className="p-5 flex flex-col justify-between h-full space-y-4">
                  {/* Embedded video category selector tabs */}
                  <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">🎬 주제 선택 ({SECTION_3_VIDEOS.length}개 비디오)</p>
                    <div className="flex flex-col gap-1">
                      {SECTION_3_VIDEOS.map((vid, idx) => (
                        <button
                          key={vid.id}
                          onClick={() => {
                            setSec3VideoIdx(idx);
                            setSec3PlayInline(false);
                          }}
                          className={cn(
                            "w-full text-left py-1.5 px-2.5 rounded-lg text-[10px] font-black truncate transition-all cursor-pointer border",
                            sec3VideoIdx === idx 
                              ? "bg-slate-900 text-white border-slate-900" 
                              : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-transparent"
                          )}
                        >
                          {idx + 1}. {vid.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Video Player */}
                  <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-150 shadow-inner relative group/player">
                    {!sec3PlayInline ? (
                      <div className="relative w-full h-full flex flex-col justify-between p-4 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-950/20">
                        {/* Background Graphic Pattern instead of broken empty box */}
                        <div className="absolute inset-0 z-0 bg-slate-950 flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-rose-950/40 via-slate-900 to-indigo-950/40" />
                          <div className="w-24 h-24 bg-rose-500/10 rounded-full blur-2xl animate-pulse" />
                          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 space-y-2 opacity-90">
                            <span className="text-[9px] font-black text-rose-400 bg-rose-950/70 border border-rose-800/40 px-2 py-0.5 rounded-sm">
                              {SECTION_3_VIDEOS[sec3VideoIdx].source} • 추천 특강
                            </span>
                            <p className="text-white text-[11px] font-extrabold px-3 leading-snug line-clamp-2">
                              {SECTION_3_VIDEOS[sec3VideoIdx].title}
                            </p>
                          </div>
                        </div>

                        {/* Pulsing glassy center Play button */}
                        <button 
                          onClick={() => setSec3PlayInline(true)}
                          className="absolute inset-0 m-auto w-12 h-12 bg-red-650 hover:bg-red-600 active:scale-95 text-white rounded-full flex items-center justify-center shadow-lg shadow-red-600/30 transition-all z-10 border border-red-500 cursor-pointer hover:scale-110"
                          title="화면에서 바로 재생하기"
                        >
                          <span className="ml-0.5 text-base text-white">▶</span>
                        </button>

                        <div className="z-10 flex justify-between items-center text-[8px] font-black text-slate-400">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                            공식 추천
                          </span>
                          <span>고화질 지원</span>
                        </div>

                        <div className="z-10 flex gap-1 justify-end mt-auto">
                          <button
                            onClick={() => setSec3PlayInline(true)}
                            className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white rounded text-[8px] font-black transition-all border border-white/15 backdrop-blur-xs cursor-pointer"
                          >
                            이 화면에서 감상 시도 📟
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <iframe 
                          src={SECTION_3_VIDEOS[sec3VideoIdx].embedUrl} 
                          title={SECTION_3_VIDEOS[sec3VideoIdx].title}
                          className="w-full h-full border-none"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button 
                          onClick={() => setSec3PlayInline(false)}
                          className="absolute top-2 right-2 px-2 py-1 bg-slate-900/90 hover:bg-slate-900 text-white rounded text-[8px] font-black tracking-wider transition-all border border-slate-700/50 z-20 cursor-pointer"
                        >
                          ✖ 안내 화면으로
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="inline-block px-2 py-0.5 bg-rose-50 text-rose-600 rounded-md text-[9px] font-black tracking-wide mb-1.5">
                      {SECTION_3_VIDEOS[sec3VideoIdx].source}
                    </span>
                    <h4 className="font-extrabold text-slate-900 text-xs leading-snug line-clamp-2">
                      {SECTION_3_VIDEOS[sec3VideoIdx].title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 leading-relaxed">
                      {SECTION_3_VIDEOS[sec3VideoIdx].description}
                    </p>

                    <div className="mt-3 flex flex-col gap-1.5">
                      <a 
                        href={SECTION_3_VIDEOS[sec3VideoIdx].watchUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-1.5 text-[11px] font-black text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl border border-rose-100 transition-all w-full justify-center shadow-xs"
                      >
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        YouTube 공식 앱에서 직접 보기 ↗
                      </a>

                      <button
                        onClick={() => setSec3TroubleOpen(p => !p)}
                        className="w-full py-1.5 text-[9px] font-black text-slate-400 hover:text-slate-600 border border-slate-100 hover:border-slate-200 rounded-lg text-center transition-all cursor-pointer"
                      >
                        {sec3TroubleOpen ? "⚙️ 대처 가이드 숨기기" : "⚙️ 영상이 차단되거나 안 나오나요?"}
                      </button>

                      {sec3TroubleOpen && (
                        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-[9px] font-bold text-slate-500 leading-normal space-y-1.5">
                          <p className="font-black text-slate-800 text-[10px]">💡 끊김 및 재생 차단 해결 가이드</p>
                          <p>1. 일부 브라우저 확장앱(애드블록 등)이나 사내 망 보안 설정 및 모바일 iFrame 수신제한 정책으로 인해 영상이 흰 화면 혹은 차단될 수 있습니다.</p>
                          <p>2. 이럴 땐 위의 <span className="text-rose-600 font-extrabold">"YouTube 공식 앱에서 직접 보기 ↗"</span> 버튼을 터치하여 브라우저 새 탭에서 즉시 정식 시청하실 수 있습니다.</p>
                          <p className="font-black text-slate-700 mt-2 text-[9px] border-t border-slate-100 pt-1.5">🔗 여전히 안 나오시나요? 대체 추천 강의 주소:</p>
                          <ul className="list-disc list-inside space-y-1 text-slate-500 font-medium">
                            <li><a href="https://www.youtube.com/results?search_query=시니어+관절+건강+운동+홈트" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">유튜브 "시니어 홈트 및 스트레칭" 영상 검색 ↗</a></li>
                            <li><a href="https://www.youtube.com/results?search_query=50대+장수+건강+식재료+의사추천" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">유튜브 "중장년 음식 영양 정보" 영상 검색 ↗</a></li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 text-[9px] font-black text-slate-400 shrink-0">
                    {SECTION_3_VIDEOS[sec3VideoIdx].tags.map(t => (
                      <span key={t} className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Naver Blog Link Banner - Requirement 3 */}
        <a 
          href="https://blog.naver.com/feltexperience" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-20 rounded-[44px] w-full min-h-[200px] shadow-2xl hover:shadow-emerald-950/20 transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-950 to-blue-950 flex flex-col md:flex-row justify-between items-center p-8 md:p-12 hover:scale-[1.01] active:scale-[0.99] border border-emerald-900/30 block group cursor-pointer"
        >
          {/* Subtle overlay shapes for premium depth */}
          <div className="absolute inset-0 bg-slate-950/20 pointer-events-none transition-colors group-hover:bg-slate-950/10" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          {/* Left Side Content representing 이음AI brand and 펠트경험 mentoring */}
          <div className="space-y-3.5 z-10 text-left max-w-2xl relative">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full text-[10px] font-black tracking-widest uppercase">
                이음AI 공식 채널 • BLOG
              </span>
              <span className="text-[11px] font-black text-blue-400">iium AI Partner</span>
            </div>
            
            <h3 className="text-xl md:text-3xl font-black text-white tracking-tight leading-snug">
              시니어 성공 매뉴얼 • 이음AI의 <br className="md:hidden" />
              공식 네이버 블로그 <span className="text-emerald-400 font-extrabold decoration-emerald-400/30 decoration-2 underline underline-offset-4">"펠트경험"</span>
            </h3>
            
            <p className="text-xs md:text-sm font-bold text-slate-300 leading-relaxed max-w-xl">
              정밀 매칭 비법부터 인공지능(AI) 트렌드 실습 가이드까지, 백만 시니어의 든든한 등대인 '펠트경험'에서 이음AI만의 특화 칼럼과 깊이 있는 소식을 지금 만나보세요!
            </p>
          </div>
          
          {/* Right Side Naver Button with Arrow icon */}
          <div className="z-10 mt-6 md:mt-0 shrink-0 relative">
            <span className="px-8 py-4.5 bg-[#03cf5d] hover:bg-[#02b34f] text-white rounded-[20px] font-black text-sm md:text-base flex items-center gap-2.5 shadow-xl shadow-[#03cf5d]/20 transition-all duration-200 group-hover:scale-105 group-hover:shadow-[#03cf5d]/35">
              공식 네이버 블로그 "펠트경험" 방문하기
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5" />
            </span>
          </div>
        </a>

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

      {/* Blog Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[85vh] flex flex-col z-[110]"
            >
              {/* Header Cover */}
              <div className="h-56 bg-slate-100 relative shrink-0">
                <img 
                  src={selectedPost.coverImage} 
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/85 transition-colors rounded-full flex items-center justify-center text-white cursor-pointer z-50 hover:scale-105 active:scale-95"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-8 overflow-y-auto flex-grow space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-full text-[10px] font-black mb-3">
                    {CATEGORY_LABELS[selectedPost.category]}
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    {selectedPost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-[11px] font-black text-slate-400 mt-3 pb-4 border-b border-slate-100">
                    <span>작성자: {selectedPost.author}</span>
                    <span>•</span>
                    <span>날짜: {selectedPost.createdAt}</span>
                    <span>•</span>
                    <span>조회: {selectedPost.views}회</span>
                  </div>
                </div>

                <div className="text-slate-600 font-medium text-sm md:text-[15px] leading-relaxed space-y-4">
                  {selectedPost.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.trim().startsWith('##')) {
                      return <h3 key={index} className="text-base font-black text-slate-900 mt-6 mb-3">{paragraph.replace('##', '').trim()}</h3>;
                    }
                    if (paragraph.trim().startsWith('*') || paragraph.trim().startsWith('-')) {
                      return (
                        <ul key={index} className="list-disc pl-5 space-y-1.5 mt-2">
                          {paragraph.split('\n').map((li, liIdx) => (
                            <li key={liIdx} className="text-slate-600 font-bold">{li.replace(/^[\s*-]+/, '').trim()}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.trim().startsWith('>')) {
                      return (
                        <div key={index} className="p-4 bg-slate-50 border-l-4 border-brand rounded-r-2xl font-bold italic text-slate-700 text-xs my-4">
                          {paragraph.replace(/^>\s*/, '').trim()}
                        </div>
                      );
                    }
                    return <p key={index} className="whitespace-pre-line font-bold text-slate-600 leading-normal">{paragraph.trim()}</p>;
                  })}
                </div>
              </div>

              {/* Footer Button */}
              <div className="p-6 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center shrink-0">
                <button 
                  onClick={() => {
                    const query = selectedPost.category;
                    setSelectedPost(null);
                    navigate(`/education?tab=${query}`);
                  }}
                  className="px-5 py-3.5 bg-brand/10 text-brand rounded-2xl text-[11px] font-black hover:bg-brand/20 transition-all flex items-center gap-2"
                >
                  <BookOpen size={13} /> AI교육 과정 보러가기
                </button>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-[11px] font-black hover:bg-slate-800 transition-all"
                >
                  창 닫기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
