import { motion } from 'motion/react';
import { Star, Quote, ChevronRight, Brain, Play, Sparkles } from 'lucide-react';

export default function SuccessStories() {
  const stories = [
    {
      name: '이*훈',
      former: '대기업 인사팀장 28년',
      current: '스타트업 인사 고문 (AI 매칭 성공)',
      content: '은퇴 후 막막했던 시기, 이음AI Lab의 AI 분석을 통해 제 인사 관리 노하우가 성장이 급격한 스타트업에 꼭 필요하다는 것을 알게 되었습니다. 단순한 재취업을 넘어 제 가치를 다시 인정받은 기분이었습니다.',
      tag: '취업 성공'
    },
    {
      name: '박*자',
      former: '은행 지점장 25년',
      current: '디지털 자산관리 강사',
      content: 'AI 교육 과정을 수료한 것이 신의 한 수였습니다. 금융 경력에 디지털 역량을 더하니 AI 매칭 시스템에서 추천 점수가 비약적으로 상승했고, 수료 후 2주 만에 교육 기관과 연계되었습니다.',
      tag: '전환 성공'
    },
    {
      name: 'H-테크 솔루션',
      former: '기술 고문 부재',
      current: '시니어 기술 자문 3명 영입',
      content: '검증된 인재를 찾는 것이 가장 힘들었는데, AI 추천 인재 리스트의 정확도에 놀랐습니다. 추천된 분들 모두 실무 적응 속도가 매우 빠르고 사내 주니어들에게 훌륭한 멘토가 되어주고 계십니다.',
      tag: '채용 성공'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-bold mb-4"
        >
          <Star size={14} fill="currentColor" />
          누적 성공 4,500+ 돌파
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">AI가 연결한 <span className="text-blue-600">진짜 변화</span></h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          숫자보다 중요한 것은 삶의 변화입니다. 
          AI 매칭으로 새로운 커리어를 시작한 분들의 목소리를 직접 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {stories.map((story, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white p-10 rounded-[48px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all relative"
          >
            <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote size={60} />
            </div>
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-widest mb-8">
              {story.tag}
            </div>
            <p className="text-gray-700 font-medium leading-relaxed mb-10 min-h-[120px]">
              {'"'}{story.content}{'"'}
            </p>
            <div className="pt-8 border-t border-gray-50">
              <h4 className="text-xl font-bold mb-1">{story.name}</h4>
              <p className="text-sm font-bold text-gray-400 mb-1">{story.former}</p>
              <p className="text-sm font-bold text-blue-600 flex items-center gap-1">
                <Sparkles size={12} /> {story.current}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Stories */}
      <section className="bg-gray-950 rounded-[64px] p-12 md:p-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-blue-600/20 to-transparent -z-10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="max-w-md">
             <h2 className="text-3xl font-bold mb-6">AI 전환 스토리 영상</h2>
             <p className="text-gray-400 mb-10 leading-relaxed">
               글로 다 담을 수 없는 생생한 도전의 기록들을 영상으로 만나보세요. 
               어떻게 AI를 배우고, 어떻게 새로운 일자리를 찾았는지 상세히 공개합니다.
             </p>
             <button className="flex items-center gap-4 group">
               <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl shadow-blue-900/40">
                 <Play size={24} fill="white" />
               </div>
               <span className="text-lg font-bold">전체 영상 보기</span>
             </button>
          </div>
          <div className="w-full md:w-[500px] aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center group cursor-pointer relative overflow-hidden">
             <div className="absolute inset-0 bg-gray-900 opacity-40" />
             <div className="z-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center scale-90 group-hover:scale-100 transition-transform">
                <Brain size={32} className="mx-auto mb-4 text-blue-400" />
                <h4 className="font-bold mb-1 text-lg">AI 매칭 성공 인터뷰</h4>
                <p className="text-xs text-gray-400 font-medium">Click to watch (4:25)</p>
             </div>
          </div>
        </div>
      </section>

      <div className="mt-24 text-center">
        <h3 className="text-2xl font-bold mb-10">당신이 다음 성공 사례의 주인공입니다.</h3>
        <a href="/ai-matching" className="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:scale-105 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-100">
           AI 매칭 시작하기 <ChevronRight size={20} />
        </a>
      </div>
    </div>
  );
}
