import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Heart, Eye, Filter, Edit3, Search, Sparkles, Brain } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Community() {
  const [activeTab, setActiveTab] = useState('전체');

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
        <div>
          <h1 className="text-4xl font-bold mb-2">커뮤니티</h1>
          <p className="text-gray-500">시니어들만의 생생한 정보와 노하우가 가득합니다.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-gray-950 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl">
          <Edit3 size={18} /> 글쓰기
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
          {/* Tabs */}
          <div className="flex overflow-x-auto gap-8 border-b border-gray-100 pb-4 no-scrollbar">
            {['전체', '재취업 후기', 'AI 교육 후기', '정보 공유', '질문/답변'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-lg font-bold pb-2 transition-all relative",
                  activeTab === tab ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                )}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* AI Recommended Content */}
          <div className="p-8 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[32px] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-blue-200 font-bold text-sm tracking-tight">
                <Brain size={18} /> 당신에게 맞는 추천 글
              </div>
              <h3 className="text-2xl font-bold mb-4">{"'"}자산관리 시니어 직무{"'"}로 성공적으로 복귀한 3인의 인터뷰 요약본</h3>
              <p className="text-blue-100 text-sm mb-6 max-w-xl opacity-80">
                사용자의 프로필을 분석했을 때, 이 글에 담긴 면접 팁과 노하우가 다음 주 예정된 면접에 큰 도움이 될 것입니다.
              </p>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold text-sm hover:scale-105 transition-transform">
                지금 확인하기
              </button>
            </div>
          </div>

          {/* Post List */}
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((post) => (
              <motion.div
                key={post}
                whileHover={{ x: 5 }}
                className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-black rounded-lg">재취업 후기</span>
                    <span className="text-xs text-gray-400 font-bold">1시간 전</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                    은퇴 후 스타트업 기술 고문으로 첫 출근했습니다! (AI 매칭 후기)
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-1">
                    처음에는 반신반의했지만, AI가 추천해준 스타트업 대표님이 제 경력을 너무 높게 평가해주셔서 기분이 좋았습니다. 특히...
                  </p>
                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">김</div>
                       <span className="text-sm font-bold text-gray-600">김*철 님</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400">
                       <span className="flex items-center gap-1.5 text-xs font-bold"><MessageSquare size={14} /> 12</span>
                       <span className="flex items-center gap-1.5 text-xs font-bold"><Heart size={14} /> 45</span>
                       <span className="flex items-center gap-1.5 text-xs font-bold"><Eye size={14} /> 1.2k</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
           <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
              <h3 className="font-bold mb-6 flex items-center gap-2 text-lg">
                <Sparkles size={18} className="text-yellow-500" /> 주간 인기 게시글
              </h3>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4 group cursor-pointer">
                    <span className="text-2xl font-black text-gray-100 group-hover:text-blue-100 transition-colors">0{item}</span>
                    <p className="text-sm font-bold text-gray-600 group-hover:text-gray-900 leading-snug">
                      시니어 IT 고문을 찾는 스타트업 공통점은?
                    </p>
                  </div>
                ))}
              </div>
           </div>

           <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100">
              <h3 className="font-bold mb-4">커뮤니티 매너</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                서로의 경험을 존중하고 따뜻한 격려를 나누는 건강한 커뮤니티를 함깨 만들어가요.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
