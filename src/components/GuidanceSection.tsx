/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  BookOpen, 
  Binary, 
  Atom, 
  Globe, 
  Languages, 
  Lightbulb, 
  Compass, 
  HelpCircle, 
  Search, 
  Users, 
  MessageSquare, 
  Cpu, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  BrainCircuit,
  GraduationCap
} from "lucide-react";
import { CORE_COMPETENCIDIES, SUBJECT_GUIDES } from "../data";
import { SubjectId } from "../types";
import { motion, AnimatePresence } from "motion/react";

// Map string icon names to Lucide icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  BookOpen,
  Binary,
  Atom,
  Globe,
  Languages
};

// Map each of the 7 core competencies to their matching Lucide icon
const competencyIconMap: Record<string, React.ComponentType<any>> = {
  problemDiscovery: Lightbulb,
  questioning: HelpCircle,
  criticalThinking: Search,
  creativity: BrainCircuit,
  collaboration: Users,
  communication: MessageSquare,
  aiLiteracy: Cpu
};

export default function GuidanceSection() {
  const [activeTab, setActiveTab] = useState<SubjectId>("korean");
  const [hoveredComp, setHoveredComp] = useState<string | null>(null);

  const selectedGuide = SUBJECT_GUIDES.find((g) => g.id === activeTab) || SUBJECT_GUIDES[0];
  const ActiveIcon = iconMap[selectedGuide.icon] || BookOpen;

  return (
    <div className="space-y-16" id="guidance-root">
      
      {/* 1. Introduction Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-radial from-slate-900 to-indigo-950 p-8 md:p-12 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-indigo-300" />
            AI 시대 교육과 평가의 대전환
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            "AI가 3초 만에 푸는 시험문제,<br className="hidden sm:inline" /> 
            과연 인간 학생의 미래 실력을 보장할까요?"
          </h2>
          
          <p className="text-slate-250 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            미래 교육의 핵심은 <strong className="text-indigo-200 font-semibold">지식을 얼마나 가졌는가(기억의 양)</strong>가 아니라, <strong className="text-emerald-300 font-semibold">AI를 영리하게 도구로 삼아 어떻게 깊게 생각하고, 가치를 검증하며, 실생활의 고차원적 문제를 창조적으로 풀어낼 수 있는가</strong>로 대체되고 있습니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
            <div>
              <p className="text-xs sm:text-sm text-slate-400">과거의 공식</p>
              <p className="text-sm sm:text-base font-semibold text-slate-300">실력 = 정보 축적 + 암기</p>
            </div>
            <div className="flex items-center text-indigo-400 justify-start sm:justify-center">
              <ArrowRight className="w-5 h-5 hidden sm:block" />
              <div className="h-px w-8 bg-slate-800 my-2 sm:hidden"></div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-slate-400">미래의 공식</p>
              <p className="text-sm sm:text-base font-semibold text-emerald-400">실력 = 질문 + 비판력 + 창의</p>
            </div>
          </div>
        </div>
      </div>

      {/* 1.5 Paradigm Evolution Table / Cards */}
      <div className="space-y-6">
        <div className="text-center md:text-left space-y-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            교육 평가의 미래진화 패러다임 3단계
          </h3>
          <p className="text-slate-550 text-sm">
            지엽적인 암기식 전수 구조가 미래지향성과 대화식 탐구 모델로 발전해가는 패러다임 지도입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-extrabold text-xs uppercase">1단계: 과거 ( Rote Memory )</span>
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">기계적 암기 및 사실 인출형</h4>
            <div className="text-xs sm:text-sm text-slate-600 space-y-2 pl-2 border-l border-slate-200">
              <p>📌 <strong>교육 중점:</strong> 단순 역사적 사실, 공식, 어휘의 기억 상태 확인</p>
              <p>📝 <strong>전통형 문항:</strong> "박지원의 한문소설 양반전 속 풍자 한자성어를 고르시오."</p>
              <p>🚫 <strong>AI 통제력:</strong> <span className="text-rose-600 font-bold">1초 내 백점.</span> 기계적인 백과사전식 지식이라 인간 고유의 사고가 필요 없습니다.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-extrabold text-xs border border-amber-100 uppercase">2단계: 현재 ( Application )</span>
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">지식의 단순 응용 및 시나리오 대입형</h4>
            <div className="text-xs sm:text-sm text-slate-600 space-y-2 pl-2 border-l border-amber-200">
              <p>📌 <strong>교육 중점:</strong> 습득한 지식을 획일적인 전형적 조건에 맞추어 활용</p>
              <p>📝 <strong>요즘 문제:</strong> "수소 연료 전지 자동차가 친환경적인 이유를 요약해 쓰시오."</p>
              <p>🚫 <strong>AI 통제력:</strong> <span className="text-amber-700 font-bold">완벽한 대필 완료.</span> 생성형 AI가 가장 빠르고 세련되게 채울 수 있는 지엽적 요약입니다.</p>
            </div>
          </div>

          <div className="bg-[#EEF2FF] rounded-2xl border-2 border-indigo-500 p-5 space-y-3 shadow-xs">
            <span className="px-2.5 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-xs uppercase">3단계: 미래 ( AIEA 탐구형 )</span>
            <h4 className="font-extrabold text-indigo-950 text-sm sm:text-base">모순 교차 검증 및 실생활 창의 대안형</h4>
            <div className="text-xs sm:text-sm text-indigo-950 space-y-2 pl-2 border-l border-indigo-400">
              <p>📌 <strong>교육 중점:</strong> AI가 제시한 정보의 거짓·편향 교차 검증 + 실생활 고차원 탐구안 마련</p>
              <p>📝 <strong>미래형 문항:</strong> "에너지 정책에 대한 AI 챗봇 추천안의 경제적 모순을 교차검증해 비판적으로 교정하시오."</p>
              <p>✨ <strong>미래형 효과:</strong> <span className="text-indigo-600 font-black">인간 고유 사유 보호.</span> AI를 비서 삼아 통제하고 해결책을 주도하게 만듭니다.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 7 Core Competencies Section */}
      <div className="space-y-8">
        <div className="text-center md:text-left space-y-2">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
            AI 시대를 살아갈 학습자가 갖추어야 하는 <span className="text-indigo-600">7대 핵심 역량</span>
          </h3>
          <p className="text-slate-550 text-sm max-w-2xl">
            글로벌 선진 교육공동체가 공동 규정한 미래 지적 성취 목표입니다. 아래 카드를 가볍게 탐색해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_COMPETENCIDIES.map((comp) => {
            const CompIcon = competencyIconMap[comp.id] || Lightbulb;
            const isHovered = hoveredComp === comp.id;
            
            return (
              <motion.div
                key={comp.id}
                className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 bg-white ${
                  isHovered 
                    ? "border-indigo-600 shadow-md ring-1 ring-indigo-100" 
                    : "border-slate-100 shadow-xs hover:border-slate-200"
                }`}
                onMouseEnter={() => setHoveredComp(comp.id)}
                onMouseLeave={() => setHoveredComp(null)}
                layout
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-600 text-white shrink-0 shadow-xs">
                    <CompIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2.5">
                    <h4 className="font-bold text-slate-900 tracking-tight text-lg">
                      {comp.name}
                    </h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {comp.description}
                    </p>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100/50">
                      <p className="text-xs font-bold text-slate-500 mb-0.5">왜 결정적으로 중요한가?</p>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                        {comp.importance}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Subject-Specific Evaluation Reform Guides */}
      <div className="space-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              과목별 평가 패러다임 전환 가이드
            </h3>
            <p className="text-slate-550 text-sm sm:text-base font-semibold">
              인공지능의 도입으로 인해 교과서의 목표와 시험문제의 질문 양식이 혁명적으로 변화하고 있습니다.
            </p>
          </div>
          
          {/* Quick Selection Buttons */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/50 self-start">
            {SUBJECT_GUIDES.map((guide) => (
              <button
                key={guide.id}
                onClick={() => setActiveTab(guide.id)}
                className={`px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 ${
                  activeTab === guide.id
                    ? "bg-white text-indigo-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/45"
                }`}
              >
                {guide.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Guided Showcase Box */}
        <div className="bg-slate-50/60 rounded-3xl border border-slate-100 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-sm">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{selectedGuide.name}</h4>
                  <span className="text-xs text-indigo-600 font-semibold">AI 시대의 학습 지향점</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">기존의 학습 및 검정 초점</p>
                  <p className="text-sm text-slate-600 bg-slate-100 p-3 rounded-xl border border-slate-200/40 text-[13px] leading-relaxed">
                    {selectedGuide.traditionalFocus}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-bold uppercase text-indigo-500 tracking-wider">미래형 지향적 가치 지향</p>
                  <p className="text-sm text-indigo-900 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100/50 text-[13px] leading-relaxed font-semibold">
                    {selectedGuide.futureFocus}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">교과 영역 핵심 평가 대상</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedGuide.coreCompetencies.map((comp, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-xs font-medium bg-slate-200/50 text-slate-700 border border-slate-200 rounded-full">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Comparison Column */}
            <div className="lg:col-span-12 xl:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Traditional Question Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between overflow-hidden">
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-1.5 text-rose-500 bg-rose-50 px-2.5 py-1 rounded-md text-xs sm:text-sm font-bold w-fit">
                    <TrendingDown className="w-3.5 h-3.5" />
                    기존 교과 질문 (전통형)
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-400">실actual 문제 예시</span>
                    <blockquote className="text-sm sm:text-base font-medium text-slate-700 mt-1 pl-3 border-l-2 border-slate-300 italic whitespace-pre-wrap leading-relaxed">
                      "{selectedGuide.traditionalProblem.question}"
                    </blockquote>
                  </div>
                </div>
                <div className="bg-slate-50 border-t border-slate-100 p-5 mt-auto space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-extrabold text-slate-500">채점 방식:</span>
                    <p className="text-slate-650 mt-0.5">{selectedGuide.traditionalProblem.grading}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/50">
                    <span className="font-extrabold text-rose-600">AI 시대적 한계점:</span>
                    <p className="text-slate-650 mt-0.5 leading-relaxed">{selectedGuide.traditionalProblem.limitation}</p>
                  </div>
                </div>
              </div>

              {/* Future-proof Question Card */}
              <div className="bg-white rounded-2xl border border-indigo-200 shadow-xs ring-1 ring-indigo-50/50 flex flex-col justify-between overflow-hidden">
                <div className="p-5 space-y-4">
                  <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md text-xs sm:text-sm font-bold w-fit">
                    <TrendingUp className="w-3.5 h-3.5" />
                    미래형 질문 (AIEA 인증안)
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-indigo-400">실제 문제 예시</span>
                    <blockquote className="text-sm sm:text-base font-bold text-indigo-950 mt-1 pl-3 border-l-2 border-indigo-400 italic whitespace-pre-wrap leading-relaxed">
                      "{selectedGuide.futureProblem.question}"
                    </blockquote>
                  </div>
                </div>
                <div className="bg-indigo-50/30 border-t border-indigo-50 p-5 mt-auto space-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="font-extrabold text-indigo-700">채점 방식:</span>
                    <p className="text-slate-650 mt-0.5">{selectedGuide.futureProblem.grading}</p>
                  </div>
                  <div className="pt-2 border-t border-indigo-100/50">
                    <span className="font-extrabold text-emerald-700">성장 유도성:</span>
                    <p className="text-slate-650 mt-0.5 leading-relaxed">{selectedGuide.futureProblem.strength}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
