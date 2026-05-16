import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Clock, AlertTriangle, Star, CheckCircle2, Award, Users, Scale, AlertCircle, Building } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AiPolicy() {
  const steps = [
    {
      step: 'STEP 1',
      title: '신청 접수',
      items: [
        { type: '개인', content: '이력/경력 입력, AI매칭 신청, 자기소개 작성, 직무 성향 분석' },
        { type: '기업', content: '채용조건 입력, 직무 요구사항 등록, 조직문화 체크, 필요 역량 등록' }
      ],
      icon: CheckCircle2,
      color: 'bg-brand/5 border-brand/20 text-brand'
    },
    {
      step: 'STEP 2',
      title: 'AI 분석',
      items: [
        { type: '5대 영역', content: '직무전문성, 경력 숙련도, 조직적응/업무태도, 소통/협업능력, 성장/지속가능성' }
      ],
      icon: Zap,
      color: 'bg-indigo-50 border-indigo-100 text-indigo-600'
    },
    {
      step: 'STEP 3',
      title: 'AI Match 추천',
      items: [
        { type: 'Score', content: '직무 적합도, 조직 적응도, 장기근속 가능성을 종합하여 AI Match Score 산출' }
      ],
      icon: Award,
      color: 'bg-emerald-50 border-emerald-100 text-emerald-600'
    },
    {
      step: 'STEP 4',
      title: '인터뷰 및 검증',
      items: [
        { type: '검증', content: '온라인/전화 인터뷰, 직무 및 태도 검증, 기업 심층 인터뷰' }
      ],
      icon: Users,
      color: 'bg-amber-50 border-amber-100 text-amber-600'
    },
    {
      step: 'STEP 5',
      title: '최종 연결',
      items: [
        { type: '지원', content: '채용 확정, 시니어 인턴 과정 운영, 초기 조직 적응 지원' }
      ],
      icon: Star,
      color: 'bg-rose-50 border-rose-100 text-rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 px-4 md:py-32">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 text-brand rounded-full text-[10px] font-black mb-6 uppercase tracking-[0.3em]"
          >
            <ShieldCheck size={14} />
            E-UM JOB Ethics & Policy
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 text-slate-900 tracking-tighter">
            “신뢰 있는 연결이 <span className="text-brand">오래 갑니다</span>”
          </h1>
          <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto leading-relaxed">
            이음JOB은 단순 지원 플랫폼이 아닙니다.  <br className="hidden md:block" />
            서로의 시간과 신뢰를 기반으로 연결되는 <br className="hidden md:block" />
            <span className="text-slate-800">“책임 있는 매칭 플랫폼”</span>을 지향합니다.
          </p>
        </div>

        {/* Process Flow */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1.5 h-8 bg-brand rounded-full" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI 매칭 프로세스</h2>
          </div>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group flex flex-col md:flex-row gap-6 p-8 bg-white border border-slate-100 rounded-[40px] hover:shadow-2xl transition-all"
              >
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 border", s.color)}>
                  <s.icon size={28} />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-black text-brand/50 uppercase tracking-widest">{s.step}</span>
                    <h3 className="text-xl font-black text-slate-900">{s.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {s.items.map((item, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">{item.type}</span>
                        <p className="text-[13px] font-bold text-slate-600 leading-relaxed">{item.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Deadlines Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32">
          <section className="p-10 bg-slate-900 rounded-[48px] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="flex items-center gap-3 mb-8">
              <Clock className="text-brand" size={24} />
              <h3 className="text-2xl font-black">개인 응답 기한 Policy</h3>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                <p className="text-brand font-black text-sm mb-2">72시간 이내 필수 응답</p>
                <p className="text-xs text-slate-400 font-bold leading-relaxed">AI 매칭 제안 수령 후 72시간 내 수락/보류/거절을 선택해야 합니다.</p>
              </div>
              <div className="space-y-4">
                {[
                  { label: '미응답 1회', desc: '자동 알림 발송' },
                  { label: '미응답 2회', desc: 'AI 추천 우선순위 하락' },
                  { label: '반복 실패', desc: '일정 기간 매칭 서비스 제한' }
                ].map((p, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-sm font-black">{p.label}</span>
                    <span className="text-xs font-bold text-brand">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="p-10 bg-white border border-slate-100 rounded-[48px] shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Building className="text-brand" size={24} />
              <h3 className="text-2xl font-black text-slate-900">기업 응답 기한 Policy</h3>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                <p className="text-brand font-black text-sm mb-2">7일 이내 검토 필수</p>
                <p className="text-xs text-slate-400 font-bold leading-relaxed">인재 추천 후 7일 이내 면접 진행/부적합 여부를 결정해야 합니다.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl">
                  <AlertCircle className="text-rose-600 shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm font-black text-rose-600 mb-1">반복적 미응답 패널티</h4>
                    <p className="text-[11px] font-bold text-rose-500/80 leading-relaxed">
                      기업 프리미엄 노출 제한 및 AI 추천 우선순위에서 배제될 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Penalty & Trust Score */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-1.5 h-8 bg-brand rounded-full" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI 신뢰도 점수 시스템</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white border border-slate-100 rounded-[40px] text-center">
              <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand">
                 <Scale size={28} />
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-4">평가 요소</h4>
              <div className="space-y-3">
                {['응답 속도 (피드백 속도)', '면접 참여율 (노쇼 방지)', '교육 참여도 (성실성)', '근무 유지율 (지속성)'].map(t => (
                  <div key={t} className="text-xs font-bold text-slate-500">{t}</div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2 p-10 bg-slate-50 rounded-[40px]">
               <h4 className="text-lg font-black text-slate-900 mb-8">신뢰도 등급 (Platinum ~ Care)</h4>
               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Platinum', color: 'text-indigo-600 bg-indigo-100', score: '95+' },
                    { label: 'Gold', color: 'text-brand bg-brand/10', score: '85+' },
                    { label: 'Silver', color: 'text-slate-600 bg-slate-200', score: '70+' },
                    { label: 'Care', color: 'text-rose-600 bg-rose-100', score: '0-50' }
                  ].map(g => (
                    <div key={g.label} className="text-center">
                       <div className={cn("inline-block px-4 py-2 rounded-xl text-[10px] font-black uppercase mb-3", g.color)}>
                         {g.label}
                       </div>
                       <p className="text-2xl font-black text-slate-900">{g.score}</p>
                    </div>
                  ))}
               </div>
               <div className="mt-10 p-5 bg-white rounded-2xl border border-slate-200">
                  <p className="text-xs font-bold text-slate-500 leading-relaxed">
                    <span className="text-brand font-black">Platinum</span> 등급 인재는 기업 측에 최우선 노출되며, <br />
                    <span className="text-rose-600 font-black">Care</span> 등급은 전문 코칭 후 서비스 재개가 가능합니다.
                  </p>
               </div>
            </div>
          </div>
        </section>

        {/* Penalty Policy Table */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-10">
            <AlertTriangle className="text-brand" size={24} />
            <h3 className="text-2xl font-black text-slate-900">부정 행위 패널티 규정</h3>
          </div>
          <div className="overflow-hidden border border-slate-100 rounded-[40px] bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">위반 수준</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">조치 내용</th>
                  <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">대상 예시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="px-8 py-6"><span className="px-3 py-1 bg-amber-50 text-amber-600 font-black text-[11px] rounded-lg">경고</span></td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">1차 알림 및 시정 권고</td>
                  <td className="px-8 py-6 text-[13px] text-slate-500 font-medium">단순 정보 누락, 지연 응답</td>
                </tr>
                <tr>
                  <td className="px-8 py-6"><span className="px-3 py-1 bg-rose-50 text-rose-600 font-black text-[11px] rounded-lg">제한</span></td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">AI 추천 노출 중단 (15일)</td>
                  <td className="px-8 py-6 text-[13px] text-slate-500 font-medium">반복적 노쇼, 경미한 경력 과장</td>
                </tr>
                <tr>
                  <td className="px-8 py-6"><span className="px-3 py-1 bg-slate-900 text-white font-black text-[11px] rounded-lg">영구</span></td>
                  <td className="px-8 py-6 text-sm font-bold text-slate-700">회원 자격 영구 박탈</td>
                  <td className="px-8 py-6 text-[13px] text-slate-500 font-medium">악의적 허위 정보, 대리 인터뷰</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Statement */}
        <div className="text-center p-20 bg-brand rounded-[64px] text-white">
           <h3 className="text-3xl font-black mb-6">“연결은 가볍게 만들지 않습니다.”</h3>
           <p className="text-brand-foreground/80 font-bold mb-10 max-w-xl mx-auto">
             이음JOB은 단순 채용이 아니라 <br />
             사람과 사람의 신뢰 있는 연결을 만듭니다.
           </p>
           <div className="flex flex-wrap justify-center gap-8">
              {['신뢰', '책임', '존중', '지속 가능성'].map(v => (
                <div key={v} className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-white rounded-full" />
                   <span className="font-black text-lg">{v}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
