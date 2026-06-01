import { motion } from 'motion/react';
import { Search, Filter, MapPin, Clock, Star, Brain, ArrowRight, Sparkles, Briefcase, CheckCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useInquiry } from '../components/ui/InquiryContext';
import { useToast } from '../components/ui/Toast';

export default function Jobs() {
  const { openInquiry } = useInquiry();
  const { showToast } = useToast();
  const categories = ['전체', '정규직 채용', '합격 후기'];

  const handleSaveInterest = (jobTitle: string) => {
    showToast(`"${jobTitle}" 공고가 관심 목록에 저장되었습니다.`);
  };

  const jobList = [
    {
      title: 'AI 교육기관 전담 강사 및 멘토',
      company: '이음AI Lab 에듀케이션',
      location: '서울 강남구 (재택병행)',
      type: '교육/강사',
      pay: '시급 5~8만원 협의',
      desc: '시니어 대상 챗GPT 및 생성형 AI 활용 교육을 담당할 전문 강사를 모집합니다. 금융/공공 경력자 우대합니다.',
      aiReason: '사용자의 "교육 경력"과 "AI 수료 데이터"가 교육기관의 커리큘럼 방향성과 98% 일치합니다.',
      tag: 'AI 추천'
    },
    {
      title: '에듀테크 서비스 기획 및 사업개발',
      company: 'Edu-Future 테크',
      location: '서울 서초구',
      type: 'IT 기획',
      pay: '연봉 6,000만원 이상',
      desc: '학원 운영 자동화 솔루션 및 시니어 특화 교육 플랫폼 기획을 담당할 실무 전문가를 찾습니다.',
      aiReason: '과거 "솔루션 영업" 경력과 "디지털 전환 교육" 이수가 신사업 기획 역량으로 자동 매핑되었습니다.',
      tag: 'AI 추천'
    },
    {
      title: '대형 학원 운영 총괄 지점장',
      company: 'K-에듀 그룹',
      location: '서울 양천구',
      type: '학원 운영',
      pay: '월 600만원 + 인센티브',
      desc: '입시 및 성인 교육 학원 운영 전반을 관리할 시니어 지점장을 모집합니다. 팀 관리 및 노무 경험 필수입니다.',
      aiReason: '사용자의 "지점 관리 15년" 경력은 학원 운영 효율화에 즉시 투입 가능한 핵심 역량입니다.',
      tag: ''
    },
    {
      title: '교육 콘텐츠 기획 및 R&D 연구원',
      company: '미래인재연구소',
      location: '경기 성남시',
      type: '연구/기획',
      pay: '연봉 7,000만원 협의',
      desc: 'AI 기반 개인화 학습 알고리즘 설계 및 교육 콘텐츠 개발에 참여할 시니어 연구원을 모집합니다.',
      aiReason: '보유하신 "통계학 전공"과 "연구소 데이터 분석" 경력이 AI 알고리즘 고도화에 적합합니다.',
      tag: ''
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Search Header */}
      <div className="bg-[#000a12] rounded-[40px] p-12 text-white mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-black mb-6 tracking-tighter">시니어 전용 <span className="text-brand">일자리찾기</span></h1>
          <p className="text-slate-400 mb-8 font-medium leading-relaxed">이음AI JOB의 AI가 시니어분들의 축적된 경력을 정밀 분석하여 <br/>교육기관, 에듀테크, 공공기관 등 지혜가 필요한 최적의 커리어를 매칭합니다.</p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type="text"
                placeholder="관심 분야, 직무, 기업명을 검색하세요"
                className="w-full pl-14 pr-6 py-5 bg-white/5 border border-white/10 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-brand focus:bg-white/10 text-white font-bold transition-all"
              />
            </div>
            <button className="px-8 py-5 bg-brand text-white rounded-[20px] font-black hover:bg-brand-hover transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-xl shadow-brand/20">
              검색 필터
            </button>
            <button 
              onClick={() => openInquiry('individual')}
              className="px-10 py-5 bg-white text-slate-900 rounded-[20px] font-black hover:bg-brand hover:text-white transition-all flex items-center justify-center gap-2 active:scale-[0.98] border-2 border-brand"
            >
              📝 신청하기
            </button>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-3 mb-12 pb-2 no-scrollbar">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={cn(
              "px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all tracking-tight",
              cat === '전체' 
                ? "bg-brand text-white shadow-lg shadow-brand/20" 
                : "bg-white text-slate-500 border border-slate-100 hover:border-brand hover:text-brand"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Job Grid */}
      <section className="mb-20">
         <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">실시간 채용 공고</h2>
            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
               Total <span className="text-brand">1,402</span> Jobs
            </div>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobList.map((job, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -8 }}
                className="group bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden"
              >
                {job.tag === 'AI 추천' && (
                  <div className="absolute top-0 right-0 px-6 py-2 bg-brand text-white text-[11px] font-black rounded-bl-[24px] flex items-center gap-1.5 shadow-lg uppercase tracking-widest">
                    <Sparkles size={12} fill="white" />
                    AI Match
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-8">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-brand/5 group-hover:border-brand/20 transition-all">
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2 group-hover:text-brand transition-colors leading-tight tracking-tight text-slate-900">{job.title}</h3>
                      <p className="text-brand font-bold text-sm tracking-tight">{job.company}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5 mb-10">
                  <span className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 text-slate-500 text-[11px] font-black rounded-lg uppercase tracking-widest border border-slate-100">
                    <MapPin size={14} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 text-slate-500 text-[11px] font-black rounded-lg uppercase tracking-widest border border-slate-100">
                    <Clock size={14} /> {job.type}
                  </span>
                  <span className="flex items-center gap-1.5 px-3.5 py-2 bg-green-50 text-brand text-[11px] font-black rounded-lg uppercase tracking-widest border border-brand/20">
                    {job.pay}
                  </span>
                </div>

                <div className="space-y-4 mb-10">
                   <p className="text-sm text-slate-500 font-bold leading-relaxed">{job.desc}</p>
                   <ul className="grid grid-cols-2 gap-2">
                      {['성과 관리', '전략 수립', '실무 멘토링', '네트워크 활용'].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-400 italic">
                          <CheckCircle size={12} className="text-brand/50" />
                          {item}
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="p-6 bg-brand/5 rounded-[24px] border border-dashed border-brand/20 mb-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain size={16} className="text-brand" />
                    <span className="text-[11px] font-black text-brand uppercase tracking-widest">AI Matching Intelligence</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-bold">
                    {job.aiReason}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button className="flex-grow py-5 bg-slate-900 text-white rounded-[20px] font-black text-sm hover:bg-brand transition-all active:scale-95 shadow-xl shadow-slate-100">
                    필수 역량 및 공고 상세 확인
                  </button>
                  <button 
                    onClick={() => handleSaveInterest(job.title)}
                    className="px-8 border border-slate-200 rounded-[20px] hover:border-brand hover:text-brand text-slate-400 transition-all font-black text-sm active:scale-95 bg-white"
                  >
                    관심등록
                  </button>
                </div>
              </motion.div>
            ))}
         </div>
      </section>

      <div className="mt-20 flex justify-center">
        <button className="flex items-center gap-2 px-12 py-5 border-2 border-slate-100 rounded-2xl font-black text-slate-600 hover:border-brand hover:text-brand transition-all active:scale-95">
          더 많은 일자리 보기
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
