import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Target, Rocket, Heart, Shield, Globe, Award, Sparkles, Users, Zap, Star, Download } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Sparkles,
      letter: 'I',
      title: 'Inspire',
      subtitle: '가능성을 깨우다',
      desc: '우리는 사람 안의 가능성을 발견합니다. 배움은 단순한 기술 습득이 아니라, "나는 아직 할 수 있다"는 마음을 다시 깨우는 과정입니다.',
      color: 'bg-emerald-50 text-emerald-600',
      brandColor: 'text-emerald-600'
    },
    {
      icon: Zap,
      letter: 'I',
      title: 'Integrate',
      subtitle: '경험과 미래를 연결하다',
      desc: '우리는 시니어의 풍부한 삶의 경험과 미래의 AI 기술을 연결합니다. 사람의 경험 위에 새로운 기술과 역할을 연결하여 성장을 돕습니다.',
      color: 'bg-blue-50 text-blue-600',
      brandColor: 'text-blue-600'
    },
    {
      icon: Users,
      letter: 'U',
      title: 'Unite',
      subtitle: '사람과 사회를 잇다',
      desc: '우리는 사람과 사람, 배움과 일, 기업과 인재를 연결합니다. 기술 중심이 아니라 사람 중심의 연결로 함께 살아가는 사회를 만듭니다.',
      color: 'bg-indigo-50 text-indigo-600',
      brandColor: 'text-indigo-600'
    },
    {
      icon: Heart,
      letter: 'M',
      title: 'Meaning',
      subtitle: '의미 있는 성장을 만들다',
      desc: '우리는 단순 취업이 아니라 인생 2막의 의미 있는 역할과 성장을 추구합니다. 존중받고, 기여하며, 살아있음을 느끼는 과정을 함께합니다.',
      color: 'bg-rose-50 text-rose-600',
      brandColor: 'text-rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-slate-900 py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 bg-brand/20 border border-brand/30 rounded-full text-brand text-xs font-black mb-8 uppercase tracking-widest">
              About 이음(iium)
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
              시니어의 가능성을 깨우고 <br /> 경험을 세상과 연결하며 <br /> 의미 있는 역할을 만듭니다. <br />
              <span className="text-brand text-2xl md:text-4xl block mt-4">전문직 시니어를 위한 인생 2막 매칭 플랫폼</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              이음(iium)은 단순한 실버 취업 플랫폼이 아닙니다. <br className="hidden md:block" />
              시니어만이 가진 고유한 지혜와 AI 기술을 결합하여, <br className="hidden md:block" />
              세상이 당신을 다시 '필수 인재'로 부르게 만드는 곳입니다.
            </p>
          </motion.div>
        </div>
      </section>


      {/* Vision & Mission */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-brand font-black text-sm uppercase tracking-[0.3em] mb-4 block">Our Vision</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 tracking-tight leading-snug">
              인생 2막은 생계를 위한 노동이 아니라, <br /> 
              <span className="text-brand">존중받는 역할이어야 합니다.</span>
            </h2>
            <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
              <p>
                많은 시니어들이 인생 1막에서는 가족과 생존을 위해 희생하며 일해왔습니다. 
                하지만 인생 2막은 달라야 합니다. 이제는 하고 싶은 일, 의미 있는 일, 경험이 인정받는 환경에서 일할 수 있어야 합니다.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <p className="text-brand font-black mb-3">인생 1막 (생존)</p>
                  <ul className="text-sm space-y-2 opacity-70">
                    <li className="flex items-center gap-2">하기 싫은 일을 버팀</li>
                    <li className="flex items-center gap-2">가족을 위한 희생</li>
                    <li className="flex items-center gap-2">생존을 위한 노동</li>
                  </ul>
                </div>
                <div className="bg-brand/5 p-6 rounded-3xl border border-brand/10">
                  <p className="text-brand font-black mb-3 text-lg">iium (이음)</p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2 font-bold text-slate-900 underline decoration-brand/30 decoration-2">가능성을 발견하고</li>
                    <li className="flex items-center gap-2 font-bold text-slate-900 underline decoration-brand/30 decoration-2">경험을 연결하며</li>
                    <li className="flex items-center gap-2 font-bold text-slate-900 underline decoration-brand/30 decoration-2">사람을 이어 의미 있는 성장을 만듭니다</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 flex flex-col items-center text-center">
              <span className="text-4xl font-black text-brand mb-2">95%</span>
              <span className="text-sm font-bold text-slate-500">AI 매칭 정확도</span>
            </div>
            <div className="bg-brand/5 p-8 rounded-[32px] border border-brand/10 flex flex-col items-center text-center mt-8">
              <span className="text-4xl font-black text-brand mb-2">1.2k+</span>
              <span className="text-sm font-bold text-slate-500">인증 전문가</span>
            </div>
            <div className="bg-brand/5 p-8 rounded-[32px] border border-brand/10 flex flex-col items-center text-center">
              <span className="text-4xl font-black text-brand mb-2">350+</span>
              <span className="text-sm font-bold text-slate-500">협력 기관</span>
            </div>
            <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 flex flex-col items-center text-center mt-8">
              <span className="text-4xl font-black text-brand mb-2">120+</span>
              <span className="text-sm font-bold text-slate-500">AI 특화 강좌</span>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">일반 플랫폼과의 차별점</h2>
          <p className="text-slate-500 font-bold">이음(iium)은 단순 연결을 넘어 진정한 역량을 매칭합니다.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-8 py-6 text-left font-black">구분</th>
                <th className="px-8 py-6 text-left font-black">일반 구인구직</th>
                <th className="px-8 py-6 text-left font-black text-brand">이음(iium)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { label: '교육 철학', general: '기술 습득 및 자격증 중심', eum: '역할 회복 및 사람 중심' },
                { label: '매칭 기준', general: '단순 스펙 및 이력서 중심', eum: '성향, 경험, 가능성 중심' },
                { label: '운영 목표', general: '단기 취업 및 수료율', eum: '지속 가능한 인생 2막 연결' },
                { label: '프로세스', general: '선(先)교육 → 불확실한 지원', eum: '선(先)매칭 → 기업 맞춤 다듬기 교육' },
                { label: '플랫폼 역할', general: '단순 정보 중개 및 강의 제공', eum: 'AI 기반 연결과 인생의 동행' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5 font-black text-slate-900">{row.label}</td>
                  <td className="px-8 py-5 text-slate-500 font-medium">{row.general}</td>
                  <td className="px-8 py-5 text-brand font-black">{row.eum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Operation Strategy */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">이음(iium) 운영 전략</h2>
            <p className="text-slate-400 font-bold">프리미엄 플랫폼으로 가는 단계별 여정</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1단계', title: '일자리찾기', desc: 'AI가 당신의 경험, 성향, 강점, 일의 의미를 입체적으로 분석하여 나를 발견합니다.' },
              { step: '2단계', title: 'AI매칭', desc: '생존을 위한 노동이 아닌, 내가 살아있음을 느끼는 진짜 역할을 정밀하게 분석하여 연결합니다.' },
              { step: '3단계', title: '인재찾기', desc: '기업 문화, 팀 성향, 커뮤니케이션 스타일까지 고려하여 최적의 베테랑을 추천합니다.' },
              { step: '4단계', title: 'AI직무교육', desc: '연결된 자리에서 존중받으며 일할 수 있도록 필요한 역량만 핀포인트로 보강하고 다듬습니다.' },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:bg-brand/10 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand/10 blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand/30" />
                <span className="text-brand font-black text-xs uppercase tracking-widest block mb-4">{item.step}</span>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values - iium Philosophy */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-indigo-500 to-rose-500 opacity-20" />
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <span className="text-brand font-black text-sm uppercase tracking-[0.4em] mb-4 block">iium Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">이음(iium) 핵심 가치</h2>
          <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto leading-relaxed">
            단순한 연결을 넘어, 사람의 가능성과 일의 의미를 잇는 <br className="hidden md:block" />
            이음(iium)만의 고유한 철학입니다.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <div key={i} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                <span className="text-[100px] font-black leading-none select-none">{v.letter}</span>
              </div>
              <div className={`w-16 h-16 ${v.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform relative z-10`}>
                <v.icon size={28} />
              </div>
              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className={`text-3xl font-black ${v.brandColor}`}>{v.letter}</span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{v.title}</h3>
                </div>
                <p className="text-base font-black text-slate-700 mb-4">{v.subtitle}</p>
                <div className="w-10 h-1 bg-slate-100 mb-6 group-hover:w-full group-hover:bg-brand/20 transition-all duration-500" />
                <p className="text-slate-500 font-bold text-sm leading-relaxed opacity-90">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
           <p className="text-xl font-black text-slate-900 tracking-tight italic">
             “가능성을 발견하고, 경험을 연결하며, 사람을 이어 의미 있는 성장을 만든다.”
           </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[64px] p-16 text-white overflow-hidden relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 blur-3xl -translate-y-1/2 translate-x-1/2" />
           <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter">함께 가치를 연결하시겠습니까?</h2>
           <div className="flex justify-center gap-4">
              <Link to="/jobs" className="px-10 py-5 bg-brand text-white rounded-2xl font-black text-lg hover:bg-brand-hover transition-all">
                일자리 찾기
              </Link>
              <Link to="/ai-matching" className="px-10 py-5 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-lg hover:bg-white/20 transition-all">
                AI 매칭 시작
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
