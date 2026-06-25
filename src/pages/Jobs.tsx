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
      title: '[대표핵심] 디지털 배움터 AI 교육 튜터 (AI 리터러시 전담 강사)',
      company: '이음AI Lab 에듀케이션',
      location: '서울 강남구 (재택/출강 병행)',
      type: 'AI 교육/강사',
      pay: '시급 5~8만원 협의 (최고 수준 대우)',
      desc: '50+ 세대 및 정보 취약 계층을 대상으로 챗GPT, 생성형 AI 도구, 스마트 라이프 활용법을 눈높이에 맞추어 밀착 지도하는 전문 튜터를 영입합니다.',
      aiReason: '귀하의 뛰어난 공감 중심 소통 역량과 "이음AI 튜터 아카데미" 교육 이수 이력이 디지털 배움터 교육 방향과 99% 완벽히 일치합니다.',
      tag: 'AI 추천'
    },
    {
      title: '평생교육원 AI 스마트폰·태블릿 활용 교육 전담 튜터',
      company: '공공 평생학습 네트워크',
      location: '서울/인천/경기 전역 (근거리 우선)',
      type: 'AI 교육/강사',
      pay: '시급 4~6만원 보장',
      desc: '50+ 동료 세대의 디지털 격차를 해결하기 위해 키오스크 주문, 대중교통 예약 앱, 보이스피싱 예방 AI 비서 등 실전 디지털 생존기를 천천히 코칭하는 일자리입니다.',
      aiReason: '차분하고 연륜이 깊은 50+ 전문가만의 따뜻한 교수법이 해당 튜터 채용 기준에 최적으로 부합합니다.',
      tag: 'AI 추천'
    },
    {
      title: '50+ 맞춤 챗GPT 작문 & 디지털 비서 교육 인턴십 튜터',
      company: '마포 스마트 시티넷',
      location: '서울 마포구',
      type: '교육 및 운영 지원',
      pay: '월 320만원 (협의)',
      desc: '50+/신중년 복지 센터에서 50+ 회원들을 위한 챗GPT 시 쓰기, 프롬프트 생성, 행정 지원 AI 툴 활용 교육 실무를 서포트하고 관리하는 직무입니다.',
      aiReason: '보유하신 15년 이상의 행정 관리 경력과 이음의 50+ 맞춤 튜터 마인드 교육이 최상의 시너지를 발휘합니다.',
      tag: ''
    },
    {
      title: '생성형 AI 비즈니스 문서 자동화 튜터 및 파트너 강사',
      company: '비즈테크 HR 아카데미',
      location: '경기 판교 (원격 근무 가능)',
      type: '전문 컨설팅/교육',
      pay: '연봉 5,000만원 이상 (파트타임 가용)',
      desc: '퇴직 후 재취업 또는 창업을 희망하는 신중년 세대에게 챗GPT를 활용한 기획서 자동 요약 및 PPT 작성 꿀팁을 밀착 코칭해 주는 테크니컬 강사입니다.',
      aiReason: '풍부한 오피스 실무 경력에 이음AI 튜터 실무 연수 과정이 결합되어 맞춤형 전문가로 자동 추천되었습니다.',
      tag: ''
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Search Header */}
      <div className="bg-[#000a12] rounded-[40px] p-12 text-white mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-black mb-6 tracking-tighter">50+ 전용 <span className="text-brand">AI 교육 튜터 & 일자리</span></h1>
          <p className="text-slate-400 mb-8 font-medium leading-relaxed">이음AI JOB의 정밀 엔진이 50+ 세대의 축적된 경험을 분석하여, <br/>시대가 가장 간절히 원하는 디지털 리더인 \'AI 교육 튜터\' 및 최적의 맞춤 커리어를 매칭해 드립니다.</p>
          
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
                      {['AI 리터러시', '눈높이 교수법', '친화적 소통', '디지털 기기 코칭'].map((item, i) => (
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
