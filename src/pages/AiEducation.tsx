import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Brain, Zap, CheckCircle, Play, BookOpen, UserCheck, Sparkles, ChevronDown, CheckCircle2, Star, Award, Shield } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface EducationCardProps {
  key?: React.Key;
  tag: string;
  title: string;
  duration: string;
  students: string;
  details: string[];
}

function InteractiveEducationCard({ tag, title, duration, students, details }: EducationCardProps) {
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
        <div className="flex justify-between items-center text-sm font-bold text-gray-500 mb-8">
           <span>교육 기간: {duration}</span>
           <span className="text-purple-600">{students} 수강 중</span>
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
          className="w-full py-4 bg-gray-950 text-white rounded-2xl font-bold hover:bg-purple-600 transition-colors active:scale-95 transition-all"
        >
          {isExpanded ? '강의 상세 계획서 보기' : '커리큘럼 확인하기'}
        </button>
      </div>
    </motion.div>
  );
}

export default function AiEducation() {
  const steps = [
    { title: '나를 다시 발견하기', desc: 'AI 분석으로 성향과 경험을 입체적으로 진단', icon: Brain },
    { title: '하고 싶은 일 매칭', desc: '기업 문화와 소통 방식이 맞는 최적의 곳 연결', icon: Sparkles },
    { title: '실무 역량 다듬기', desc: '현장에서 다시 빛나도록 필요한 역할 보강 교육', icon: BookOpen },
    { title: '자신감 있게 투입', desc: '세상이 다시 인정한 전문가로 현장에 복귀', icon: CheckCircle },
  ];

  const courses: EducationCardProps[] = [
    { 
      tag: 'Track 01', 
      title: '매칭 기업 전용 : AI 교육 콘텐츠 개발 트랙', 
      duration: '4주 집중', 
      students: '450+',
      details: [
        '해당 기업 맞춤형 AI 학습 교재 제작 기술',
        '기업 표준 AI 기반 평가지표 자동 생성 실습',
        '채용 예정 기업의 DX 전략 및 툴 적응 트레이닝',
        '현장 투입 즉시 활용 가능한 실무 대시보드 설계'
      ]
    },
    { 
      tag: 'Track 02', 
      title: '매칭 기업 전용 : AI 실무 매니징 과정', 
      duration: '2주 집중', 
      students: '620+',
      details: [
        '매칭된 조직의 전용 AI 비서 및 업무 자동화 구축',
        '실제 업무 데이터 기반 고객 관리 자동화 실습',
        '해당 기업의 표준 협업 툴(Slack, Notion 등) 숙달',
        '현장 리더십 및 조직 문화 사전 적응 세션'
      ]
    },
    { 
      tag: 'Track 03', 
      title: '매칭 기업 전용 : 시니어 AI 리터러시 강사', 
      duration: '4주 집중', 
      students: '1,100+',
      details: [
        '파견 예정 기관 맞춤형 AI 교수법 및 소통 전략',
        '실전 출강 환경과 동일한 AI 서비스 시뮬레이션',
        '기관별 전용 교육 커리큘럼 사전 분석 및 교수안 제작',
        '현장 실무 역량 최종 검증 및 우수 수료자 즉시 투입'
      ]
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="bg-[#000a12] rounded-[60px] p-12 md:p-20 text-white mb-24 relative overflow-hidden shadow-2xl shadow-brand/20">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-linear-to-l from-white/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-brand/10 blur-3xl rounded-full" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div>
            <span className="inline-block px-4 py-1 bg-brand/20 border border-brand/30 rounded-full text-xs font-black mb-6 tracking-widest uppercase text-brand">E-UM AI Lab AI직무교육</span>
            <h1 className="text-4xl md:text-5xl font-black mb-8 leading-[1.05] tracking-tighter">"기술보다 중요한 건 <br /> <span className="text-brand">당신의 역할 회복입니다.</span>"</h1>
            <p className="text-slate-400 text-lg mb-12 max-w-md font-bold leading-relaxed">
              이음JOB의 교육은 단순히 코딩이나 스펙을 가르치지 않습니다. <br className="hidden md:block" />
              현장에서 다시 자신감을 갖고 전문가로 인정받을 수 있도록 <br className="hidden md:block" />
              당신의 가치를 날카롭게 다듬는 과정입니다.
            </p>
            <div className="flex gap-4">
              <button className="px-10 py-5 bg-brand text-white rounded-[20px] font-black text-lg hover:bg-brand-hover hover:scale-105 transition-all shadow-xl shadow-brand/20">
                AI직무교육 신청하기
              </button>
              <button className="w-16 h-16 flex items-center justify-center rounded-[20px] bg-white/10 border border-white/20 hover:bg-white/20 transition-all group">
                <Play className="fill-white group-hover:scale-110 transition-transform" size={24} />
              </button>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md p-8 rounded-[32px] border border-white/10"
              >
                <div className="w-12 h-12 bg-white/10 rounded-2xl mb-6 flex items-center justify-center">
                  <Star className="text-brand" size={20} />
                </div>
                <div className="h-5 w-3/4 bg-white/10 rounded-lg mb-3" />
                <div className="h-3 w-1/2 bg-white/5 rounded-lg" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { title: '매칭-교육 연계 시스템', desc: 'AI 매칭 성공 후 필요한 역량만 핀포인트로 교육', icon: Brain, bg: 'bg-indigo-50', color: 'text-indigo-600' },
          { title: '기업 실무 검증 완료', desc: '해당 기업 환경에서 실습 과제를 수행하여 검증 완료', icon: Zap, bg: 'bg-amber-50', color: 'text-amber-600' },
          { title: '즉시 투입 파견 모델', desc: '교육 수료와 동시에 검증된 인재를 현장에 파견', icon: UserCheck, bg: 'bg-green-50', color: 'text-brand' },
        ].map((item, i) => (
          <div key={i} className="p-12 rounded-[40px] bg-white border border-slate-100 hover:shadow-2xl hover:border-brand/30 transition-all group">
            <div className={cn("w-16 h-16 rounded-[20px] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform", item.bg, item.color)}>
              <item.icon size={32} />
            </div>
            <h3 className="text-2xl font-black mb-6 text-slate-900 tracking-tight">{item.title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Modules */}
      <section className="mb-24">
         <div className="text-center mb-16">
            <span className="text-brand font-black text-sm uppercase tracking-[0.3em] mb-4 block">Detailed Modules</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">단계별 교육 커리큘럼</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                title: '시니어 인턴 과정 (현장 적응)',
                modules: ['조직문화의 이해 및 보고 방법', '협업 툴 활용 및 업무 흐름 파악', 'AI 리터러시 및 실무 체험'],
                icon: '🏢'
              },
              {
                title: '소통 및 태도 과정 (신뢰 형성)',
                modules: ['젊은 세대와의 공감 대화법', '감정 조절 및 경청 훈련', '책임감 및 일정 관리 노하우'],
                icon: '💬'
              },
              {
                title: 'AI 활용 실무 과정 (AI 업무보조)',
                modules: ['ChatGPT 활용 문서 및 자료 정리', '고객 응대 및 일정 관리 자동화', 'AI 기반 아이디어 도출 및 요약'],
                icon: '🤖'
              },
              {
                title: '역할 기반 직무교육',
                modules: ['상담 및 행정 지원 전문가', '커뮤니티 운영 및 고객 관리', 'AI 리터러시 교육 보조 및 콘텐츠 검수'],
                icon: '💼'
              }
            ].map((phase, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                 <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl">{phase.icon}</span>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{phase.title}</h3>
                 </div>
                 <ul className="space-y-4">
                    {phase.modules.map((m, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                         <div className="w-1.5 h-1.5 bg-brand rounded-full" />
                         {m}
                      </li>
                    ))}
                 </ul>
              </div>
            ))}
         </div>
      </section>

      {/* Certification Details */}
      <section className="bg-slate-900 rounded-[64px] p-12 md:p-24 mb-24 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            <div>
               <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
                  이음AI Lab <br /> <span className="text-brand">공식 인증 수료증</span>
               </h2>
               <p className="text-slate-400 font-bold mb-10 leading-relaxed">
                  본 교육 과정을 성공적으로 수료하신 분들께는 이음AI Lab이 보증하는 
                  블록체인 기반의 디지털 수료증과 인증 배지를 부여합니다. 
                  이 인증은 시니어 전문가로서의 AI 실효 능력을 기업들에 증명하는 강력한 수단이 됩니다.
               </p>
               <div className="flex gap-4">
                  <div className="flex flex-col items-center gap-2 p-6 bg-white/5 rounded-3xl border border-white/10">
                     <Award className="text-brand" size={32} />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Global Standard</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-6 bg-white/5 rounded-3xl border border-white/10">
                     <Shield className="text-brand" size={32} />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Verified Badge</span>
                  </div>
               </div>
            </div>
            <div className="relative">
               <div className="bg-white/10 backdrop-blur-md p-2 rounded-[32px] border border-white/20 transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="bg-white rounded-[24px] p-12">
                     <div className="flex justify-between items-start mb-12">
                        <img src="https://ghymn1004-ai.github.io/seniorjob/images/logo.png" className="h-10 opacity-30" />
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Serial No. 2026-AI-0128</span>
                     </div>
                     <h4 className="text-3xl font-black text-slate-900 mb-8 tracking-tighter">CERTIFICATE OF COMPLETION</h4>
                     <div className="space-y-4 mb-12">
                        <p className="text-sm font-bold text-slate-400">Awarded to</p>
                        <p className="text-4xl font-black text-slate-900 border-b-2 border-slate-100 pb-2">CHUL-SU PARK</p>
                     </div>
                     <p className="text-xs text-slate-400 font-bold leading-relaxed">
                        Successfully completed the "AI Master Class for Senior Leaders" <br />
                        and demonstrated exceptional mastery in generative AI and DX strategy.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Curriculum Path */}
      <section className="mb-24">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center text-slate-900 tracking-tighter shadow-sm pb-4">AI 커리어 패스 리포트</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-10 bg-white border border-slate-100 shadow-sm rounded-[32px] group hover:border-brand/50 hover:shadow-2xl transition-all text-center"
            >
              <div className="text-[72px] font-black text-slate-50 absolute top-4 left-1/2 -translate-x-1/2 -z-10 group-hover:text-green-50 transition-colors pointer-events-none italic">
                0{i + 1}
              </div>
              <div className="w-14 h-14 bg-green-50 text-brand rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <step.icon size={24} />
              </div>
              <h4 className="text-xl font-bold mb-4 text-slate-900 tracking-tight">{step.title}</h4>
              <p className="text-slate-500 text-sm font-bold leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Hot Courses */}
      <section>
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tighter">추천 교육 과정</h2>
            <p className="text-slate-500 font-bold">아이콘을 클릭하여 상세 커리큘럼을 직접 확인해 보세요.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <InteractiveEducationCard 
              key={i} 
              tag={course.tag}
              title={course.title}
              duration={course.duration}
              students={course.students}
              details={course.details}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

