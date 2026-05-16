import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronRight, Brain, Play, Sparkles, MessageSquare, Heart, Eye, Filter, Edit3, Search } from 'lucide-react';
import { cn } from '../lib/utils';

export default function StoryCommunity() {
  const [view, setView] = useState<'stories' | 'community'>('stories');
  const [activeTab, setActiveTab] = useState('전체');

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
    <div className="min-h-screen bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* View Switcher & Description */}
        <div className="text-center mb-16">
          <div className="inline-flex p-2 bg-slate-200 rounded-[32px] mb-8 shadow-inner">
            <button
              onClick={() => setView('stories')}
              className={cn(
                "flex items-center gap-3 px-12 py-4 rounded-[24px] font-black text-lg transition-all",
                view === 'stories' ? "bg-white text-blue-600 shadow-2xl scale-105" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Star size={22} className={view === 'stories' ? "fill-blue-600" : ""} />
               성공 사례
            </button>
            <button
              onClick={() => setView('community')}
              className={cn(
                "flex items-center gap-3 px-12 py-4 rounded-[24px] font-black text-lg transition-all",
                view === 'community' ? "bg-white text-blue-600 shadow-2xl scale-105" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <MessageSquare size={22} />
              커뮤니티 소통
            </button>
          </div>
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-[32px] border border-blue-100 shadow-sm">
             <p className="text-sm font-bold text-slate-600 leading-relaxed">
               {view === 'stories' 
                 ? "성공 사례 섹션은 AI 매칭과 교육을 통해 실제 변화를 경험한 '취업 성공', '직무 전환', '기업 채용' 후기를 다룹니다." 
                 : "커뮤니티 소통 섹션은 '재취업 노하루', 'AI 교육 정보', '함께하는 스터디', '선배님들과의 Q&A'로 구성되어 있습니다."}
             </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'stories' ? (
            <motion.div
              key="stories"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-20">
                <motion.div
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-lg text-xs font-bold mb-4"
                >
                  <Star size={14} fill="currentColor" />
                  누적 성공 4,500+ 돌파
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 tracking-tight">AI가 연결한 <span className="text-blue-600">진짜 변화</span></h2>
                <p className="text-slate-500 max-w-2xl mx-auto font-medium">
                  이음AI JOB을 통해 새로운 시작을 경험한 선배님들의 <br/>
                  생생한 후기가 매일 업데이트됩니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {stories.map((story, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all relative"
                  >
                    <div className="absolute top-10 right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Quote size={60} />
                    </div>
                    <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-widest mb-8">
                      {story.tag}
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed mb-10 min-h-[120px]">
                      {'"'}{story.content}{'"'}
                    </p>
                    <div className="pt-8 border-t border-slate-50">
                      <h4 className="text-xl font-bold mb-1 text-slate-900">{story.name}</h4>
                      <p className="text-sm font-bold text-slate-400 mb-1">{story.former}</p>
                      <p className="text-sm font-bold text-blue-600 flex items-center gap-1">
                        <Sparkles size={12} /> {story.current}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Video Stories Mini */}
              <section className="bg-slate-900 rounded-[56px] p-12 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-full h-full bg-linear-to-bl from-blue-600/20 to-transparent -z-10" />
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                  <div className="max-w-md">
                     <h2 className="text-2xl font-bold mb-4">현장의 목소리를 영상으로</h2>
                     <p className="text-slate-400 mb-8 text-sm leading-relaxed font-medium">
                       어떻게 AI를 배우고, 새로운 일자리를 찾았는지 <br/>
                       생생한 도전의 기록들을 영상 인터뷰로 확인하세요.
                     </p>
                     <button className="flex items-center gap-3 group">
                       <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                         <Play size={20} fill="white" />
                       </div>
                       <span className="text-base font-bold">인터뷰 영상 보기</span>
                     </button>
                  </div>
                  <div className="w-full md:w-[400px] aspect-video bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center group cursor-pointer relative overflow-hidden">
                     <div className="z-10 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center scale-90 group-hover:scale-100 transition-transform">
                        <h4 className="font-bold mb-1 text-base">H-테크 솔루션 고문 인터뷰</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Click to watch</p>
                     </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
                <div>
                  <h2 className="text-4xl font-bold mb-4 text-slate-900 tracking-tight">선배님들의 <span className="text-blue-600">활발한 소통</span></h2>
                  <p className="text-slate-500 font-medium">시니어들만의 생생한 정보와 경력 관리 노하우를 나누세요.</p>
                </div>
                <button className="flex items-center gap-2 px-10 py-5 bg-slate-900 text-white rounded-[24px] font-bold hover:bg-black transition-all shadow-2xl shadow-slate-200">
                  <Edit3 size={20} /> 자유롭게 글쓰기
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                <div className="lg:col-span-3 space-y-12">
                  <div className="flex overflow-x-auto gap-8 border-b border-slate-200 pb-4 no-scrollbar">
                    {['전체', '재취업 후기', 'AI 교육 후기', '정보 공유', '질문/답변'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "text-lg font-bold pb-2 transition-all relative whitespace-nowrap",
                          activeTab === tab ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                        )}
                      >
                        {tab}
                        {activeTab === tab && (
                          <motion.div layoutId="communityTab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {[
                      { title: '은퇴 후 스타트업 기술 고문으로 첫 출근했습니다!', author: '김*철', comments: 12, likes: 45, type: '재취업 후기' },
                      { title: 'AI 기초 교육, 60대인 저도 쉽게 따라했습니다.', author: '이*영', comments: 8, likes: 32, type: 'AI 교육 후기' },
                      { title: '금융권 경력을 살려 비영리 재무 강사로 활동 중입니다.', author: '박*자', comments: 15, likes: 58, type: '정보 공유' },
                      { title: '비즈니스 영어 회화 스터디 같이 하실 분 계신가요?', author: '최*호', comments: 4, likes: 11, type: '정보 공유' },
                    ].map((post, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        className="group bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-widest">{post.type}</span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Today</span>
                          </div>
                          <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors text-slate-900">
                            {post.title}
                          </h3>
                          <div className="flex items-center justify-between pt-4">
                            <div className="flex items-center gap-2">
                               <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-[10px] font-black text-blue-600 uppercase tracking-widest">{post.author[0]}</div>
                               <span className="text-sm font-bold text-slate-600">{post.author} 님</span>
                            </div>
                            <div className="flex items-center gap-5 text-slate-300">
                               <span className="flex items-center gap-1.5 text-xs font-bold"><MessageSquare size={14} /> {post.comments}</span>
                               <span className="flex items-center gap-1.5 text-xs font-bold"><Heart size={14} /> {post.likes}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-1 border-l border-slate-200 pl-8 space-y-10 hidden lg:block">
                   <div>
                      <h3 className="font-bold mb-8 text-sm uppercase tracking-widest text-slate-400">주간 인기 게시글</h3>
                      <div className="space-y-8">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex gap-4 group cursor-pointer items-start">
                            <span className="text-xl font-black text-slate-200 group-hover:text-blue-600 transition-colors italic">0{item}</span>
                            <p className="text-sm font-bold text-slate-600 group-hover:text-slate-900 leading-snug transition-colors">
                              {item === 1 ? '시니어 IT 고문을 찾는 스타트업들의 공통점' : item === 2 ? '퇴직금 관리보다 중요한 디지털 역량' : 'AI 매칭 확률을 2배 높이는 키워드 설정'}
                            </p>
                          </div>
                        ))}
                      </div>
                   </div>
                   
                   <div className="p-8 bg-blue-50 rounded-[40px] border border-blue-100">
                      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-sm">
                         <Sparkles size={20} />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2">커뮤니티 매너</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
                        서로의 경험을 존분하고 따뜻한 격려를 나누는 건강한 소통 공간을 함께 만들어가요.
                      </p>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
