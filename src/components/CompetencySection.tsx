/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Lightbulb, 
  BrainCircuit, 
  Search, 
  Users, 
  MessageSquare, 
  Cpu, 
  ChevronDown,
  ChevronUp,
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CompetencySectionProps {
  initialSubmenu?: string | null;
}

const COMPETENCIES = [
  {
    id: "questioning",
    title: "💡 질문력 (Questioning)",
    desc: "인공지능 대답의 격조를 결정하는 인간 고유의 프롬프트 설계 지능 및 자기 주도적 탐구 사유 지평",
    AIEAFocus: "단순 응답 도출을 뛰어넘어, 상황 제약과 심오한 질문 의도를 다단계적으로 설계하여 인공지능을 주체적으로 통제하는 프롬프팅 인지 지수를 핵심 분석",
    traditionalProblem: "주어진 제시문의 논조에 부합하는 질문 중 가장 알맞은 단어를 고지된 기호 보기에서 고르시오. (수동형 사실 확인)",
    futureProblem: "미래 학비 인구 변화와 자율주행 도입 국면을 대비하기 위해, 생성형 AI의 답변 품질을 격조 있게 높일 수 있도록 3대 심층 딜레마(인간의 도덕적 관성, 법적 예외 요건, 기술 완성도의 연역적 오류)를 긴장감 있게 포함한 인간 고유의 프롬프트 다차원 질문안을 직접 설계해 보시오.",
    rubric: "평가 중점: 질문 속 숨겨진 딜레마의 다층성 및 AI 답변 통제 논리력 [우수: 3가지 복합 딜레마의 유기적 구조화 및 대안 제시 우수, 보통: 평이한 다단계 질문 위주, 미흡: 단편적인 기계적 질문 도출]"
  },
  {
    id: "problemdiscovery",
    title: "🧩 문제해결력 (Problem Solving)",
    desc: "기존 시험지 공식을 넘어 실생활 시나리오의 불확실한 모순과 제약조건을 찾아내 해결 방안을 기획하는 실전 역량",
    AIEAFocus: "맥락 속에서 정보 왜곡이나 노이즈가 주어졌을 때 학생 스스로 숨겨진 변수를 포착하는지 분석",
    traditionalProblem: "다음에 제시된 가상의 연수원 예산에서 지출 총합과 결산 잉여금을 계산하시오. (기계적 연산)",
    futureProblem: "한정된 탄소중립 보조금 예산에서 AI 컨설턴트가 제안한 불완전한 태양광 보조 배정안의 회계적 모순을 찾아내고, 상생 균형을 위해 수식을 재배열하여 논거를 구안하시오.",
    rubric: "평가 중점: 공학 경제적 제약 요인의 정확성 및 대안 적합성 [우수: 정밀 팩트 분석 및 상호 보완책, 보통: 모순 분석 위주, 미흡: 대안 제시 모호]"
  },
  {
    id: "creativity",
    title: "🎨 창의력 (Creativity)",
    desc: "데이터 평균값을 넘어서 획기적이고 유연한 다중 모범 정답 루트를 스스로 개조 전개하는 창조적 사유력",
    AIEAFocus: "유일한 5지선다 정답이 아닌, 모두 설득력 있는 다른 해결 대안의 인적 가치 조망",
    traditionalProblem: "이 연설문의 어조에 해당하는 가장 어울리는 사자성어를 보기에서 고르시오. (정답 1개)",
    futureProblem: "지역 소멸 현상을 극복하기 위한 도시 농촌 결합 브랜드 에세이를 쓰되, AI가 흔히 생성하는 뻔한 광고 슬로건을 피하고 본인의 창의적 세계관을 반영한 슬로건과 발표 기획안을 도출해 보시오.",
    rubric: "평가 중점: 진정성 높은 오리지널 서사 구조와 설득력 [우수: 오리지널 브랜드 슬로건 및 설계 유기성, 보통: 모방 슬로건 위주, 미흡: 독창성 부재]"
  },
  {
    id: "criticalthinking",
    title: "🔍 비판적 사고력 (Critical Thinking)",
    desc: "기만적인 페이크 뉴스나 사실 오류(Hallucination), 데이터에 내재된 편향성을 날카롭게 식별해내는 필터력",
    AIEAFocus: "정보 소스의 공정성을 의심하고 교차 검증 논리를 수립하는지 여부 검정",
    traditionalProblem: "역사 속 두 세력 간 조약문의 체결 역사 년도를 시간 선후관계대로 배열한 것을 보기에서 고르시오.",
    futureProblem: "한 AI 역사 보고서가 '조선 전기 실학의 실용적 기여로 세종기 앙부일구의 설계 오정 극복이 완료되었다'고 기술했습니다. 역사적 팩트 오류를 1차 사료 근거로 반박하는 역사 비평문을 쓰고 교차 검증 경로를 설명하시오.",
    rubric: "평가 중점: 사료 사적 배경 정보와의 일치도 및 반론의 논증력 [우수: 1차 사료 증거 제시 및 비평 탄탄, 보통: 일반 비평 위주, 미흡: 단순 오류 지목]"
  },
  {
    id: "collaboration",
    title: "🤝 협업능력 (Collaboration)",
    desc: "개인별 단편적인 고립형 문제풀이를 완전히 극복하고, 동료들과 함께 현대적인 갈등 현안을 심층 조율하며 집단 지성의 시너지와 인격적 협조 가치를 스스로 설계/완성해내는 능력",
    AIEAFocus: "다자간 가치 격돌 시나리오에서 각 주체의 이해관계를 포용적으로 분석하고, 팀 전체의 상생 완성도를 높이기 위해 합리적 역할 맵핑과 공동의 헌법적 합의점을 창조해내었는지 검정",
    traditionalProblem: "집단 공동 리더십을 발휘하는 과정에서 좋은 리더가 취해야 할 정형화된 이론 기둥 4단계를 교과서 암기 문장으로 받아 적으시오. (기성 암기형)",
    futureProblem: "청년 기후 포럼 기획 중에 벌어진 '탄소 배출세 패널티 의무 부과 반대'를 외치는 경제 동아리와 '즉각 세액 신설'을 고수하는 지구 지킴 동아리 간의 첨예한 충돌 대본이 있습니다. 이 대본을 정교히 해부하여, 두 그룹의 잠재적 불안감을 완벽히 해소하고 협업 완성도를 극대화할 수 있는 'AIEA 팀 갈등 대안 경영 규약 가이드라인'을 실천 중심의 학술 논리문 에세이로 직접 창출해 보시오.",
    rubric: "평가 중점: 다차원적 갈등 매개 조정 기획력 및 대안 상생 매뉴얼의 구체성\n- [우수]: 각 그룹의 갈등 인지 불안을 품격 있게 수용하여 공존할 수 있는 공동 협약 룰을 유기적으로 구안함\n- [보통]: 단순 조율 기재 위주의 타협 수치 나열에 국한함\n- [미흡]: 의견을 단순히 병렬 기재하여 협업 실마리를 제지함"
  },
  {
    id: "communication",
    title: "💬 의사소통능력 (Communication)",
    desc: "자신의 주장과 한계점을 품격 있고 격조 있는 표현으로 상대방에게 전달하고 성숙하게 수용하는 역량",
    AIEAFocus: "텍스트 맞춤법 정오 수준을 넘어, 목적 고객이나 수신자의 정서적 수용과 호소력을 분석하고 조율하는가",
    traditionalProblem: "다음 수신 편지에서 문법상 어법이나 틀린 수동태 표현을 보기에서 골라 교정하시오.",
    futureProblem: "투자 유치를 희망하는 IT 벤처기업이 AI를 통해 작성한 직역투 영어 이메일 초안이 있습니다. 이 초안을 영어권 파트너의 비즈니스 소통 예법에 부합하도록 품격 있고 정중하게 재집필하고 문장별 변용 장점을 변론하시오.",
    rubric: "평가 중점: 수신자 관점의 정서 예법 및 설득 논리 수준 [우수: 메일 뉘앙스 조율 및 대비 설명 유려, 보통: 일반 문법 교정 위주, 미흡: 교정 효과 미미]"
  },
  {
    id: "ailiteracy",
    title: "💻 AI 리터러시 (AI Literacy)",
    desc: "생성형 AI 기술을 단순 전재 도구로 남용하지 않고 주체적으로 협동하며 안전하게 기술을 부리는 윤리적 지혜",
    AIEAFocus: "AI Result에 대한 표절 검증, 환각 오류 식별 및 도구 통제 규칙 마련 여부 판단",
    traditionalProblem: "인공지능의 기계 학습 방식 중 지도 학습에 해당하는 알맞은 빈칸 용어 단어를 기재하시오.",
    futureProblem: "학교 교과 수행 과제에서 인공지능 활용 비중이 85%에 이르는 학생 보고서를 보고, 표절 판정과 아이디어 독창성의 한계 맹점을 파헤쳐 '나만의 인간 주도 AI 창작 원칙 5계율'을 세워 보시오.",
    rubric: "평가 중점: 사용 한계 검토의 객관성 및 AI 결과 통제 수준 [우수: 5계율의 현실 실천성 및 주체성 탁월, 보통: 단순 가이드 기술, 미흡: 윤리 검토 부족]"
  }
];

const COMP_ICON_MAP: Record<string, React.ComponentType<any>> = {
  questioning: Sparkles,
  problemdiscovery: Lightbulb,
  creativity: BrainCircuit,
  criticalthinking: Search,
  collaboration: Users,
  communication: MessageSquare,
  ailiteracy: Cpu
};

export default function CompetencySection({ initialSubmenu }: CompetencySectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>("questioning");

  // Sync with initial submenu changes from parent/nav
  useEffect(() => {
    if (initialSubmenu) {
      const match = COMPETENCIES.find(
        (c) => 
          c.id === initialSubmenu.toLowerCase().replace(/[^a-z]/g, "") ||
          c.title.includes(initialSubmenu) ||
          initialSubmenu.includes(c.title.split(" ")[0])
      );
      if (match) {
        setExpandedId(match.id);
      }
    }
  }, [initialSubmenu]);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-16 md:space-y-24 py-10" id="competency-analytics-root">
      
      {/* 1. Header Banner */}
      <div className="bg-[#0D9488] rounded-3xl py-12 md:py-16 px-8 md:px-12 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-44 h-44 bg-white/10 rounded-full blur-2xl font-sans"></div>
        <div className="relative max-w-4xl space-y-6 md:space-y-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 border border-white/20 text-teal-100 text-xs sm:text-sm font-black tracking-wider uppercase font-sans">
            <TrendingUp className="w-4 h-4 text-emerald-300 animate-bounce" />
            AIEA 미래 인재 핵심 역량 체계
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            이음School AI AIEA 미래 핵심 평가 기준 📈
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-emerald-50 leading-relaxed font-medium max-w-3xl">
            인공지능이 3초 만에 완벽한 정오를 추출해내는 시대에 암기 위주의 지식은 설 자리를 잃어가고 있습니다. <br className="hidden sm:inline" />
            이음School AI는 지식을 꺼내 실생활 딜레마에 적용하고 새롭게 가치를 창조하는 <strong>7대 미래 핵심 평가 검증 기준</strong>을 강조합니다.
          </p>
        </div>
      </div>

      {/* 2. Interactive Title Accordion Stack - SUPER FRIENDLY & ACCESSIBLE */}
      <div className="space-y-8 max-w-5xl mx-auto py-8">
        <div className="text-center font-sans space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
            💡 역량 제목을 톡! 클릭해서 채점 기준을 확인해보세요
          </h3>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            각 역량이 우리 선생님 학교 시험이나 학원 중간고사에서 어떤 방식으로 검증하고 채점되는지 한눈에 쉽게 알아볼 수 있습니다.
          </p>
        </div>

        <div className="space-y-4 pt-6">
          {COMPETENCIES.map((comp) => {
            const Icon = COMP_ICON_MAP[comp.id] || Sparkles;
            const isExpanded = expandedId === comp.id;
            
            return (
              <div 
                key={comp.id}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? "border-teal-500 shadow-md ring-1 ring-teal-500/10" 
                    : "border-slate-200 hover:border-slate-300 hover:shadow-xs"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleAccordion(comp.id)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isExpanded 
                        ? "bg-teal-500 text-white" 
                        : "bg-teal-50 text-teal-600 group-hover:bg-teal-100"
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-base sm:text-lg md:text-xl block font-sans">
                        {comp.title}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-450 font-normal line-clamp-1 mt-1 font-sans">
                        {comp.desc}
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-slate-200 transition-all ml-4 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-teal-600" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Accordion Body content with Motion */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="border-t border-slate-100 bg-slate-50/50"
                    >
                      <div className="p-6 md:p-10 space-y-8 text-slate-800">
                        {/* 1. Deep Core Explanation */}
                        <div className="space-y-3">
                          <span className="text-xs sm:text-sm font-black text-teal-600 uppercase tracking-widest block">💡 미래 역량의 정의 및 의의:</span>
                          <p className="text-slate-900 text-base sm:text-lg font-medium leading-[1.85] font-sans break-keep whitespace-pre-line">
                            {comp.desc}
                          </p>
                        </div>

                        {/* 2. Diagnostic Focus Box */}
                        <div className="bg-teal-50/50 border border-teal-150 rounded-2xl p-6 flex gap-4 shadow-sm">
                          <CheckCircle2 className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                          <div className="space-y-1.5">
                            <span className="text-sm font-black text-teal-950 font-sans block">AIEA 평가 품질 진단 중점</span>
                            <p className="text-sm sm:text-base text-slate-705 leading-relaxed font-sans">
                              {comp.AIEAFocus}
                            </p>
                          </div>
                        </div>

                        {/* 3. Side-by-Side Comparison Grid (Before vs After) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          {/* Traditional - BEFORE */}
                          <div className="border border-red-200 bg-red-50/30 rounded-2xl p-6 space-y-4 text-left shadow-xs">
                            <span className="inline-block text-[10px] uppercase font-black px-2.5 py-1 bg-red-100 text-red-700 rounded-lg border border-red-250 select-none">
                              과거 암기중심 문항의 한계
                            </span>
                            <div className="space-y-2 font-sans">
                              <span className="text-xs text-slate-450 font-black tracking-wider block">기존 주입형 출제 방식:</span>
                              <p className="text-sm sm:text-base text-slate-550 leading-relaxed font-sans font-light line-through decoration-red-400/40">
                                "{comp.traditionalProblem}"
                              </p>
                            </div>
                            <p className="text-xs sm:text-sm text-red-800 leading-relaxed pt-3 border-t border-red-100 font-sans font-medium">
                              ● 단순 사실 구도나 기성 단어 선별에 머물러, 전방위 인공지능이 즉각 응답을 베껴 내는 한계를 지녀 학생들의 인지 성장을 가로막습니다.
                            </p>
                          </div>

                          {/* Future - AFTER */}
                          <div className="border border-emerald-250 bg-emerald-50/20 rounded-2xl p-6 space-y-4 text-left shadow-xs">
                            <span className="inline-block text-[10px] uppercase font-black px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg border border-emerald-250 select-none">
                              이음School AI 지향형 혁신 문항
                            </span>
                            <div className="space-y-2 font-sans">
                              <span className="text-xs text-emerald-800 font-black tracking-wider block">미래 핵심 축 문항 혁신 예제:</span>
                              <p className="text-sm sm:text-base text-slate-900 leading-relaxed font-extrabold break-keep">
                                "{comp.futureProblem}"
                              </p>
                            </div>
                            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed pt-3 border-t border-emerald-200 font-sans font-bold">
                              ● 교과 논거와 다차원 딜레마를 크로스 연결함으로써, 기계가 베끼지 못하는 인간 고유의 통찰력과 비평 사유를 완벽히 함양시킵니다.
                            </p>
                          </div>
                        </div>

                        {/* 4. Rubric Score Table */}
                        <div className="bg-slate-950 rounded-2xl p-6 md:p-8 text-white space-y-3.5 border border-slate-800 shadow-lg">
                          <div className="flex items-center gap-2 font-sans text-amber-400 font-extrabold mb-1 text-sm sm:text-base">
                            <Sparkles className="w-5 h-5 text-amber-400 animate-spin-slow" />
                            <span>상·중·하 정량 채점 기준표 (Rubric Suite Guide)</span>
                          </div>
                          <p className="text-slate-200 font-medium leading-loose font-sans text-sm sm:text-base whitespace-pre-line">
                            {comp.rubric}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
