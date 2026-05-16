import { motion } from 'motion/react';
import { TrendingUp, Users, Target, Activity, PieChart, BarChart3, Globe, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MatchingData() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
        {[
          { label: '누적 매칭 수', value: '128,492', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '매칭 성공률', value: '94.2%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: '활성 시니어', value: '45,201', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: '매칭 정확도', value: '99.1%', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", stat.bg)}>
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-gray-500 font-bold text-sm mb-2">{stat.label}</p>
            <h4 className="text-3xl font-black tracking-tight">{stat.value}</h4>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Charts Mockup */}
        <div className="lg:col-span-2 space-y-12">
          <section className="bg-white p-10 rounded-[48px] border border-gray-100">
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-2xl font-bold">인기 매칭 직후군</h3>
              <select className="bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold focus:outline-none">
                <option>최근 30일</option>
                <option>지난 달</option>
              </select>
            </div>
            
            <div className="space-y-8">
              {[
                { name: '금융 자문/자산 관리', val: 85, color: 'bg-blue-600' },
                { name: '기업 전략/컨설팅', val: 72, color: 'bg-indigo-600' },
                { name: '교육/강연/코칭', val: 64, color: 'bg-purple-600' },
                { name: 'IT 기술 고문', val: 48, color: 'bg-indigo-400' },
              ].map((job, i) => (
                <div key={i}>
                  <div className="flex justify-between font-bold text-sm mb-3">
                    <span>{job.name}</span>
                    <span className="text-gray-400">{job.val}%</span>
                  </div>
                  <div className="h-4 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${job.val}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 1.5 }}
                      className={cn("h-full rounded-full shadow-sm", job.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[40px] border border-gray-100">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <PieChart size={20} className="text-blue-600" />
                성공률 높은 연령대
              </h3>
              <div className="aspect-square flex items-center justify-center relative">
                <div className="w-40 h-40 rounded-full border-[16px] border-blue-600 flex items-center justify-center">
                   <div className="w-24 h-24 rounded-full border-[12px] border-indigo-200" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-2xl font-black">55-65</span>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">최적 연령군</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[40px] border border-gray-100">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <Globe size={20} className="text-indigo-600" />
                지역별 수요 분포
              </h3>
              <div className="space-y-4">
                {['서울', '경기/인천', '부산/경남', '대구/경북'].map((region, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <span className="text-sm font-bold text-gray-700">{region}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className={cn("w-1.5 h-4 rounded-full", j < 5 - i ? "bg-indigo-600" : "bg-gray-200")} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right: Insights */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-gray-950 p-10 rounded-[48px] text-white">
            <h3 className="text-2xl font-bold mb-8">AI 커리어 제안</h3>
            <div className="space-y-6">
              {[
                { title: '디지털 전환 전문가', desc: '현재 IT 고문 분야 수요가 24% 급증하고 있습니다.' },
                { title: 'ESG 경영 시니어', desc: '대기업들의 ESG 위원회 시니어 전문가 영입 제안이 많습니다.' },
                { title: '스타트업 멘토', desc: '시리즈 B 이상의 스타트업에서 C-Level 경력자를 선호합니다.' },
              ].map((tip, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-blue-400 mb-2">{tip.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-4 mt-8 bg-blue-600 rounded-2xl font-bold hover:bg-blue-700 transition-colors">
               나의 맞춤 제안 받기
            </button>
          </div>

          <div className="bg-blue-50 p-10 rounded-[48px] border border-blue-100">
             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Activity className="text-blue-600" />
             </div>
             <h3 className="text-xl font-bold mb-4 text-blue-900 tracking-tight">실시간 매칭 분석</h3>
             <p className="text-sm text-blue-700 leading-relaxed font-medium">
               이음AI Lab의 매칭 데이터는 22,000건 이상의 실제 성공 사례 학습을 통하여 매주 월요일 자동 업데이트됩니다.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
