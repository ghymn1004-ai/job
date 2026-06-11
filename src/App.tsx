/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  History, 
  Layers, 
  Compass, 
  CheckCircle,
  FileSpreadsheet,
  Cpu,
  Brain,
  ShieldCheck,
  Award,
  GraduationCap,
  ArrowRight,
  Search,
  Grid,
  FileText,
  Sliders,
  Share2,
  Lock,
  Flame,
  CheckCircle2,
  ChevronDown,
  Menu,
  X,
  User,
  LogIn,
  UserPlus
} from "lucide-react";
import GuidanceSection from "./components/GuidanceSection";
import MainEvaluator from "./components/MainEvaluator";
import HistorySection from "./components/HistorySection";
import QuestionCreator from "./components/QuestionCreator";
import CompetencySection from "./components/CompetencySection";
import CertificationSection from "./components/CertificationSection";
import LabSection from "./components/LabSection";
import { EvaluationResult } from "./types";
import { motion, AnimatePresence } from "motion/react";
const heroImage = "/src/assets/images/hero_evaluation_dashboard_1780338488781.png";

type Tab = "dashboard" | "evaluation" | "innovation" | "competency" | "certification" | "lab";

const SUBMENU_ITEMS: Record<string, string[]> = {
  evaluation: ["시험지 업로드", "AIEA 진단"],
  innovation: ["미래형 전환", "루브릭 생성"],
  competency: ["질문력", "협력능력"],
  certification: ["학교 우수 인증", "교사 선도 인증", "학원 교육 인증", "인증 현황 조회", "검인증 온라인 신청"],
  lab: ["AI 교육 트렌드", "미래교육 사례", "연구자료", "칼럼", "웨비나"]
};

const NAVIGATION_MENU = [
  {
    id: "evaluation",
    label: "평가진단",
    english: "Evaluation Audit"
  },
  {
    id: "innovation",
    label: "평가혁신",
    english: "Assessment Transformation"
  },
  {
    id: "competency",
    label: "평가기준",
    english: "Competency Standards"
  },
  {
    id: "certification",
    label: "AIEA 인증",
    english: "Certification"
  },
  {
    id: "lab",
    label: "미래교육연구소",
    english: "Future Education Lab"
  }
];

// Beautiful Realistic Full Evaluation Result Demo Object
const DEMO_RESULT: EvaluationResult = {
  id: "demo-aiea-result",
  timestamp: Date.now() - 3600000 * 24, // 1 day ago
  questionText: "[서울 한가람고등학교 1학년 국어 1학기 지필평가 14번] 다음 중 조선 후기 박지원에 의해 집필된 한문소설 '양반전'에서 작가가 양반 계급의 위선과 무능을 폭로하기 위해 핵심적으로 사용한 풍자의 요법과 문학사적 의의로 알맞은 것을 고르시오. (오직 국어교제 35페이지에 기술된 이론을 바탕으로 서술할 것)",
  subjectName: "국어",
  subject: "korean",
  gradeLevel: "고등학교 1학년",
  totalScore: 12,
  ratingLevel: "NEEDS_IMPROVEMENT",
  ratingName: "단순 지식 암기 검증형 (AIEA 2등급 부적합)",
  ratingColor: "text-amber-500",
  feedbackSummary: "본 정기고사 문제는 AI 시대 검색 및 대필에 무방비로 노출되어 있으며 학생의 고차원 질문 제안력이나 비판 추론을 거의 끌어내지 못하는 전형적인 기계식 정오 확인 문제입니다.",
  aieaMetrics: {
    authenticity: 1,
    inquiry: 2,
    evidence: 1,
    application: 2,
    creativity: 1,
    aiVerification: 1,
    communication: 2
  },
  bloomTaxonomy: {
    level: 1,
    name: "기억 (Remembering)",
    description: "단순한 기출 텍스트의 어휘 일치를 정밀 필터링하여 정오만 구별하게 유도하는 기초 인지 척도 단계입니다."
  },
  competenciesMatched: {
    problemDiscovery: false,
    questioning: true,
    criticalThinking: false,
    creativity: false,
    collaboration: false,
    communication: true,
    aiLiteracy: false
  },
  checklist: {
    aiEasyResult: true,
    studentThoughts: false,
    singleAnswer: true,
    realLifeConnection: false,
    processEvaluation: false
  },
  strengths: ["어휘력이 낮은 저성취 학생들의 기초 교과 어휘 암기 여부를 1차원적으로 확인하기는 수월합니다."],
  weaknesses: ["AI 챗봇에 통째로 기재할 시 정답이 곧바로 도출되어 대필 차단이 원천 불가합니다.", "학생 고유의 철학적 사유나 다각적 딜레마 평가 영역이 부재합니다."],
  suggestedRewrite: {
    comparisonTitle: "신분제 폐지의 모색과 AI 맹신 비판",
    rewrittenQuestion: "양반전 속 천민과 양반 간에 맺어진 '신분 매매 계약서' 초안의 법률 불평등 조소들을 정리하고, 생성형 AI 계약 분석기가 이 문서의 시대적 한계점을 맹신하였을 때 범할 수 있는 논증 환각(할루시네이션)을 역사 1차 문헌을 근거로 반박하는 칼럼 에세이를 서술하시오.",
    howItImproves: "단순 사실 관계 암기를 철저히 탈피하여 생성형 AI 산출물의 팩트를 사료 검증 방식으로 인적 통제하게 유도하는 탁월한 구성입니다.",
    assessmentGuide: "상(5점): 사료적 역사 근거 2가지와 AI 팩트 체크 오류 절차 구안 완벽\n중(3점): 양반전 단순 풍자 요인을 나열하여 정리 및 부합\n하(1점): 단순 줄거리 요약 성격의 평이한 나열 국한"
  }
};

const INITIAL_SAMPLE_DATA: EvaluationResult[] = [
  DEMO_RESULT,
  {
    id: "sample-history-result",
    timestamp: Date.now() - 3600000 * 2, // 2 hours ago
    questionText: "[경기 일산 백마중학교 3학년 사회(역사) 지필고사 19번] 다음 중 조선 후기 흥선대원군의 서원 철폐 및 호포제 실시에 따른 경제적 개혁 정책의 직접적인 성과를 단순 기술하고, 경복궁 중건을 위해 발행된 화폐 명칭을 순서대로 바르게 고르시오.",
    subjectName: "역사",
    subject: "social",
    gradeLevel: "중학교 3학년",
    totalScore: 42,
    ratingLevel: "NEEDS_IMPROVEMENT",
    ratingName: "단순 지식 암기형 (AIEA 2등급 부적합)",
    ratingColor: "text-red-500",
    feedbackSummary: "본 역사 문항은 교과서 단순 사실에 기속되어 인공지능이 3초 만에 완벽한 정오를 판별해 내는 수동형 기출 영역입니다.",
    aieaMetrics: {
      authenticity: 1,
      inquiry: 2,
      evidence: 1,
      application: 2,
      creativity: 1,
      aiVerification: 1,
      communication: 2
    },
    bloomTaxonomy: {
      level: 1,
      name: "기억 인출 (Remembering)",
      description: "단순 팩트 정보를 불러오는 단계입니다."
    },
    competenciesMatched: {
      problemDiscovery: false,
      questioning: false,
      criticalThinking: false,
      creativity: false,
      collaboration: false,
      communication: false,
      aiLiteracy: false
    },
    checklist: {
      aiEasyResult: true,
      studentThoughts: false,
      singleAnswer: true,
      realLifeConnection: false,
      processEvaluation: false
    },
    strengths: ["역사 단원 세부 팩트를 기억해내는지 빠르게 확인 가능합니다."],
    weaknesses: ["AI 챗봇을 통한 대필 표절에 완전히 무방비합니다."],
    suggestedRewrite: {
      comparisonTitle: "호포제 증세 정책과 현대 보편과정 비교",
      rewrittenQuestion: "조선 후기 삼정의 문란 타개를 목표로 시행된 '호포제(양반 세 가구 세금 부과)'의 조세 정당성 원론을 오늘날 현대 부유세 논쟁과 긴밀히 연계하여 사료 비평 에세이를 기술하시오.",
      howItImproves: "선생님이 역사 현장과 현대 시사 문제를 크로스 연계하여 학생 고유의 조세 정의 철학을 창출하도록 돕는 최고급 미래형 문제입니다.",
      assessmentGuide: "상(5점): 호포제 배경 2선 및 현대 복지조세와의 정밀 비평 구축\n중(3점): 호포제 단순 특징만 요약 정리한 수준\n하(1점): 단순 사실 나열에 그친 기재"
    }
  },
  {
    id: "sample-math-result",
    timestamp: Date.now() - 3600000 * 4, // 4 hours ago
    questionText: "[서울 대치 우신고등학교 1학년 수학(상) 중간고사 12번] 이차함수 y = -x² + 6x - 5 의 그래프가 x축과 만나는 두 점 A, B 사이의 최대 정량 거리를 구하고, 꼭짓점 C와 이어서 만드는 삼각형 ABC의 지표 넓이 수치를 정확히 상상하여 기재하시오.",
    subjectName: "수학",
    subject: "math",
    gradeLevel: "고등학교 1학년",
    totalScore: 14,
    ratingLevel: "NEEDS_IMPROVEMENT",
    ratingName: "기계식 공식 대입형 (AIEA 2등급 부적합)",
    ratingColor: "text-red-500",
    feedbackSummary: "본 정형 계산 문제는 수적 인수분해 및 이차함수 공식 대입으로 기계가 순식간에 계산할 수 있어 공간 척도를 창조하는 인간적 비판 능력을 가늠하기에 부적격합니다.",
    aieaMetrics: {
      authenticity: 1,
      inquiry: 1,
      evidence: 1,
      application: 2,
      creativity: 1,
      aiVerification: 1,
      communication: 1
    },
    bloomTaxonomy: {
      level: 2,
      name: "이해 대입 (Understanding)",
      description: "단순한 계산 절차 활용 단계입니다."
    },
    competenciesMatched: {
      problemDiscovery: false,
      questioning: false,
      criticalThinking: false,
      creativity: false,
      collaboration: false,
      communication: false,
      aiLiteracy: false
    },
    checklist: {
      aiEasyResult: true,
      studentThoughts: false,
      singleAnswer: true,
      realLifeConnection: false,
      processEvaluation: false
    },
    strengths: ["기초 고차 방정식과 함수의 수치 전환 흐름을 빠르게 교체하는 연습에 용이합니다."],
    weaknesses: ["실제 현실의 공간 역학이나 엔지니어링 미학 연계가 전무하여 교과 가치를 유도하지 못합니다."],
    suggestedRewrite: {
      comparisonTitle: "복합 현수교 케이블 구조력 분석과 기하 최적화",
      rewrittenQuestion: "해안가에 설계되는 연륙교 등 대형 현수교(Suspension Bridge) 주탑 케이블이 중력하에 그리는 포물선 하중 방정식을 수립하고, 풍동 저항 안전 계수를 확보하기 위한 이차장력 곡선 두께를 역학적으로 시현하는 설계 보고서를 제안하십시오.",
      howItImproves: "단순 수학 교과 계산문제가 구조 안전 공학 및 실생활 메커니즘과 만나 미래 융합 탐구 요지로 정체성 있게 진화하는 탁월한 도약 문형입니다.",
      assessmentGuide: "상(5점): 이차함수 곡선 안전 하중 장력을 벡터 방정식으로 완벽 전개\n중(3점): 이차함수와 풍력 계수 수치를 교내 수준으로 무난히 연동\n하(1점): 일반 토목 상식 기술에 국한"
    }
  },
  {
    id: "sample-science-result",
    timestamp: Date.now() - 3600000 * 8, // 8 hours ago
    questionText: "[부산 해운대 센텀중학교 2학년 과학(생명) 기말고사 8번] 식물의 광합성이 가장 최적화되고 완만하게 일어날 수 있도록 현상 유도를 해 주는 기온, 빛의 세기, 이산화 탄소 농도 섭리의 3대 필수 요소를 알맞게 기재하시오.",
    subjectName: "과학",
    subject: "science",
    gradeLevel: "중학교 2학년",
    totalScore: 50,
    ratingLevel: "NEEDS_IMPROVEMENT",
    ratingName: "단일 팩트 인출형 (AIEA 2등급 부적합)",
    ratingColor: "text-red-500",
    feedbackSummary: "개념서 내 조건들을 무작정 암기한 학생만 풀 수 있는 평이한 수치 조건 매칭 문제입니다.",
    aieaMetrics: {
      authenticity: 2,
      inquiry: 1,
      evidence: 1,
      application: 2,
      creativity: 1,
      aiVerification: 1,
      communication: 1
    },
    bloomTaxonomy: {
      level: 1,
      name: "기억 (Remembering)",
      description: "인출식 단순 지식 정보 단계입니다."
    },
    competenciesMatched: {
      problemDiscovery: false,
      questioning: false,
      criticalThinking: false,
      creativity: false,
      collaboration: false,
      communication: false,
      aiLiteracy: false
    },
    checklist: {
      aiEasyResult: true,
      studentThoughts: false,
      singleAnswer: true,
      realLifeConnection: false,
      processEvaluation: false
    },
    strengths: ["기초 생태 식물 정보를 숙지했는지 한눈에 검정합니다."],
    weaknesses: ["학생 창의적 대안 도출 및 탐구 질문 배정이 없습니다."],
    suggestedRewrite: {
      comparisonTitle: "환경 모순 기후 위기와 친환경 수직 농업 스마트 팜 설계",
      rewrittenQuestion: "기후 변화로 인한 식량 불안정을 돌파하기 위한 도심 수처리 스마트 팜 공학 기획안을 수립하고, 광합성을 극대화하기 위한 인공 LED 배광 비율 및 이산화 탄소 조절 설계 원리를 구안 서술하시오.",
      howItImproves: "학생이 생명 과학 공식과 기계 공학적 제약을 융합 기획하여 최적 지평을 사유하게 돕는 융합 탐구 문제입니다.",
      assessmentGuide: "상(5점): 광합성 요소 및 스마트 팜 내부 변수(LED 배광 등)를 공학적으로 완벽 배합\n중(3점): 단순 광합성 원리와 스마트 팜 기초 정보만 수록\n하(1점): 일반 상식 수준의 환경 칼럼 나열 국한"
    }
  }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>("dashboard");
  const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null);
  const [history, setHistory] = useState<EvaluationResult[]>(INITIAL_SAMPLE_DATA);
  const [selectedResultId, setSelectedResultId] = useState<string | null>("demo-aiea-result");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  
  // Dashboard Interactive States
  const [showHistoryDetail, setShowHistoryDetail] = useState(false);
  const [activeCompetency, setActiveCompetency] = useState("질문력");
  const [certTab, setCertTab] = useState<"school" | "teacher" | "academy">("school");
  const [selectedResearchTitle, setSelectedResearchTitle] = useState<string | null>(null);
  const [activeToolId, setActiveToolId] = useState<string | null>("evaluation");
  const [activeLandingSection, setActiveLandingSection] = useState<string | null>("sec_02");
  const [showResearchDetail, setShowResearchDetail] = useState(false);

  // Section-wise interactive accordion choices (where only one opens and previous auto-closes)
  const [activePastItemIdx, setActivePastItemIdx] = useState<number | null>(null);
  const [activeFutureItemIdx, setActiveFutureItemIdx] = useState<number | null>(null);
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState<number | null>(null);
  const [activeTargetIdx, setActiveTargetIdx] = useState<number | null>(null);
  const [activeCertIdx, setActiveCertIdx] = useState<number | null>(null);
  const [activeAieaStep, setActiveAieaStep] = useState<number | null>(1);
  
  // Navigation States
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveSubmenu, setMobileActiveSubmenu] = useState<string | null>(null);

  // Open list of submenus / toggle dropdown (Does not navigate immediately as requested by user)
  const handleNavMenuClick = (menuId: Tab) => {
    setActiveDropdownId(prev => prev === menuId ? null : menuId);
  };

  // Close drop down when clicking outside the menu dropdown
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownId(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Set home page state, reset all subpages and force scroll to top instantly
  const handleGoHome = () => {
    setCurrentTab("dashboard");
    setSelectedSubmenu(null);
    setSelectedResultId(null);
    setActiveDropdownId(null);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      document.getElementById("app-global-header")?.scrollIntoView({ behavior: "auto", block: "start" });
    }, 50);
  };

  // Scroll to top of the sub-page whenever tab or submenu changes
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const t = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      const targetElement = document.getElementById("app-global-header");
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }, 20);
    return () => clearTimeout(t);
  }, [currentTab, selectedSubmenu]);

  // Load history safely on client boot
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aiea_eval_history_v1");
      if (stored && JSON.parse(stored).length > 0) {
        setHistory(JSON.parse(stored));
      } else {
        // Fallback or seed initial samples
        setHistory(INITIAL_SAMPLE_DATA);
      }
    } catch (e) {
      console.error("Local storage access blocked:", e);
    }
  }, []);

  // Save history to state & LocalStorage
  const handleAddHistory = (result: EvaluationResult) => {
    setHistory((prev) => {
      const updated = [result, ...prev].slice(0, 50);
      try {
        localStorage.setItem("aiea_eval_history_v1", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    setSelectedResultId(result.id);
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      try {
        localStorage.setItem("aiea_eval_history_v1", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    if (selectedResultId === id) {
      setSelectedResultId(null);
    }
  };

  const handleClearAllHistory = () => {
    if (window.confirm("그동안 분석하셨던 마법 진단 이력이 모두 초기화됩니다. 계속 진행하시겠습니까?")) {
      setHistory([]);
      try {
        localStorage.removeItem("aiea_eval_history_v1");
      } catch (e) {
        console.error(e);
      }
      setSelectedResultId(null);
    }
  };

  const renderLandingSection = (
    id: string,
    label: string,
    title: string,
    explanation: string,
    content: React.ReactNode,
    linkButtonText?: string,
    onLinkClick?: () => void,
    bgColor: string = "bg-white"
  ) => {
    const isOpen = activeLandingSection === id;
    
    return (
      <div className={`${bgColor} rounded-3xl border border-slate-205/90 shadow-md overflow-hidden my-6 sm:my-8 transition-all duration-300`}>
        {/* Clickable Header Bar */}
        <div 
          onClick={() => setActiveLandingSection(isOpen ? null : id)}
          className="p-6 sm:p-10 cursor-pointer select-none hover:bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors border-b border-slate-100"
        >
          <div className="space-y-3 flex-1 text-left">
            <span className="text-xs sm:text-xs text-indigo-600 font-extrabold tracking-[0.2em] uppercase block">
              {label}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-normal">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-650 bg-indigo-50 border border-indigo-150 px-4 py-2 rounded-xl shrink-0">
            <span>{isOpen ? "설명 및 분석기 접기" : "설명 및 분석 도구 열기"}</span>
            <ChevronDown className={`w-4.5 h-4.5 transition-transform duration-350 ${isOpen ? "rotate-180 text-indigo-600" : "text-slate-400"}`} />
          </div>
        </div>

        {/* Collapsible content section */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-6 sm:p-12 space-y-8 border-t border-slate-50">
                <p className="text-base sm:text-lg md:text-xl text-slate-650 leading-relaxed md:leading-[1.85] max-w-4xl text-left font-normal font-sans pt-2 break-keep whitespace-pre-line">
                  {explanation}
                </p>

                <div className="pt-2">
                  {content}
                </div>

                {linkButtonText && onLinkClick && (
                  <div className="pt-6 border-t border-slate-100 flex justify-start">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLinkClick();
                      }}
                      className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md shadow-indigo-200 inline-flex items-center gap-2 group"
                    >
                      {linkButtonText}
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const handleSelectHistoryItem = (item: EvaluationResult | null) => {
    if (!item) {
      setSelectedResultId(null);
      return;
    }
    setSelectedResultId(item.id);
    setCurrentTab("evaluation");
    setSelectedSubmenu("AIEA 진단");
  };

  // Submenu click router
  const handleSubmenuClick = (menuId: Tab, submenuItem: string) => {
    setCurrentTab(menuId);
    setSelectedSubmenu(submenuItem);
    setActiveDropdownId(null);
    setMobileMenuOpen(false);
  };

  // Preload and launch the interactive demo
  const handleLoadDemo = () => {
    const exists = history.some(h => h.id === DEMO_RESULT.id);
    if (!exists) {
      setHistory(prev => [DEMO_RESULT, ...prev]);
      try {
        localStorage.setItem("aiea_eval_history_v1", JSON.stringify([DEMO_RESULT, ...history]));
      } catch (e) {
        console.error(e);
      }
    }
    setSelectedResultId(DEMO_RESULT.id);
    setCurrentTab("evaluation");
    setSelectedSubmenu("AIEA 진단");
  };

  const mockTools = [
    {
      id: "evaluation",
      submenu: "시험지 업로드",
      title: "시험문제 자가 진단기",
      desc: "선생님이 출제한 학교 시험문제나 학원 퀴즈를 입력하시면, AIEA 7대 미래 핵심 소양을 기반으로 문항의 질과 평가 적합성을 점수와 등급으로 정밀 분석해 드립니다.",
      icon: Sliders,
      tag: "인기 도구",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-150 animate-pulse",
      buttonText: "문제 진단해보기",
      category: "출제 평가 및 분석"
    },
    {
      id: "innovation",
      submenu: "미래형 전환",
      title: "미래형 문제 해결사",
      desc: "단순 암기식 객관식 문항을 학생의 깊은 사고와 토론을 유도하는 탐구형 서술식/에세이 문항으로 변환하고, 공정한 성취 평가를 위한 전문 루브릭 채점 가이드를 즉시 생성해 드립니다.",
      icon: Sparkles,
      tag: "추천 도구",
      badgeColor: "bg-violet-50 text-violet-700 border-violet-150",
      buttonText: "문항 변환 실행",
      category: "AI 시험 편집 및 개조"
    },
    {
      id: "competency",
      submenu: "질문력",
      title: "AIEA 7대 미래 핵심 소양",
      desc: "AIEA 7대 미래 핵심 소양(질문력, 문제해결력, 창의력, 비판적 사고력, 협업능력, 의사소통능력, AI 리터러시)을 바탕으로, 미래 인재 양성에 필요한 역량 지표를 알기 쉽게 정의하고 각 지표별 구체적인 평가 기준과 실제 활용 사례를 제시합니다.",
      icon: BookOpen,
      tag: "무료 교안",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-150",
      buttonText: "AIEA 7대 미래 핵심 소양",
      category: "인성 및 미래 역량수립"
    }
  ];

  const filteredTools = mockTools.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#faf9fe] text-slate-800 font-sans tracking-tight antialiased">
      
      {/* 1. GLOBAL NAVIGATION HIGH PROFILE TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 border-b border-indigo-50 shadow-xs backdrop-blur-md" id="app-global-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            handleGoHome();
          }}>
            <img 
              src="/src/assets/images/ium_school_logo_1780542475380.png" 
              className="w-10 h-10 object-contain rounded-xl drop-shadow-sm border border-slate-100 bg-white" 
              alt="이음School AI 로고" 
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-1.5 font-sans">
                <span className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tighter">
                  이음School <span className="text-indigo-600 font-extrabold font-sans">AI</span>
                </span>
                <span className="text-xs bg-indigo-105 bg-indigo-50 text-indigo-700 font-black px-2 py-0.5 rounded-full border border-indigo-100 uppercase">
                  AIEA
                </span>
              </div>
              <p className="text-xs text-slate-400 font-bold hidden sm:block">AI 시대 학교 평가 장학 혁신 플랫폼</p>
            </div>
          </div>

          {/* Desktop Navigation Menus with Interactive Dropdowns */}
          <nav className="hidden lg:flex items-center gap-1.5 font-sans relative">
            {NAVIGATION_MENU.map((menu) => {
              const subItems = SUBMENU_ITEMS[menu.id] || [];
              const isOpen = activeDropdownId === menu.id;
              return (
                <div 
                  key={menu.id}
                  className="relative py-3.5"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavMenuClick(menu.id as Tab);
                    }}
                    className={`px-3.5 py-2.5 rounded-xl text-sm font-[900] transition-all duration-150 cursor-pointer flex items-center gap-1 ${
                      currentTab === menu.id
                        ? "bg-indigo-55 text-indigo-700 shadow-xs border border-indigo-105"
                        : "text-slate-655 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{menu.label}</span>
                    {subItems.length > 0 && (
                      <ChevronDown className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-650" : ""}`} />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && subItems.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 mt-2.5 w-64 bg-white border border-indigo-105 rounded-2xl shadow-xl p-2.5 z-50 overflow-hidden text-left"
                      >
                        <div className="text-[10px] font-black text-slate-400 px-3 pb-1.5 pt-1 uppercase tracking-[0.15em] border-b border-slate-50 mb-1.5">
                          {menu.english}
                        </div>
                        <div className="space-y-1">
                          {subItems.map((sub, sIdx) => {
                            const isSubActive = selectedSubmenu === sub && currentTab === menu.id;
                            return (
                              <button
                                key={sIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSubmenuClick(menu.id as Tab, sub);
                                  setActiveDropdownId(null);
                                }}
                                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs sm:text-xs font-black transition-colors uppercase cursor-pointer block group ${
                                  isSubActive 
                                    ? "bg-indigo-50 text-indigo-700" 
                                    : "hover:bg-indigo-50/70 text-slate-800"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className={isSubActive ? "text-indigo-650" : "group-hover:text-indigo-650 transition-colors"}>{sub}</span>
                                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-indigo-600 transition-all" />
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Controls - 로그인, 회원가입, 데모보기, 무료 시험지 분석 버튼 */}
          <div className="flex items-center gap-2 font-sans">
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-sm font-bold text-slate-650 hover:text-slate-900 hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-indigo-500" />
              로그인
            </button>
            <button
              onClick={() => setShowRegisterModal(true)}
              className="text-sm font-bold text-slate-650 hover:text-slate-900 hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-emerald-500" />
              회원가입
            </button>

            <button
              onClick={handleLoadDemo}
              className="border border-indigo-200 hover:border-indigo-300 font-extrabold text-sm px-3.5 py-2.5 rounded-xl shadow-xs text-indigo-750 bg-indigo-50/60 hover:bg-indigo-50 shrink-0 cursor-pointer transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>데모보기</span>
            </button>

            <button
              onClick={() => { 
                setCurrentTab("evaluation"); 
                setSelectedSubmenu("시험지 업로드"); 
                setActiveDropdownId(null);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm px-4 py-2.5 rounded-xl shadow-md shadow-indigo-100 flex items-center gap-2 shrink-0 cursor-pointer transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>무료 시험지 분석</span>
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE FULL NAVIGATION OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-indigo-100 p-4 space-y-4 font-sans"
          >
            <div className="flex flex-col gap-3">
              {NAVIGATION_MENU.map((menu) => {
                const subItems = SUBMENU_ITEMS[menu.id] || [];
                return (
                  <div key={menu.id} className="space-y-1 text-left">
                    <button
                      onClick={() => { 
                        const subs = SUBMENU_ITEMS[menu.id];
                        const defaultSub = (subs && subs.length > 0) ? subs[0] : null;
                        setCurrentTab(menu.id as Tab); 
                        setSelectedSubmenu(defaultSub); 
                        setMobileMenuOpen(false); 
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-extrabold transition-all duration-150 cursor-pointer flex items-center justify-between ${
                        currentTab === menu.id
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{menu.label}</span>
                      <span className="text-[10px] opacity-50 font-mono font-[900] uppercase tracking-wide">{menu.english}</span>
                    </button>
                    {subItems.length > 0 && (
                      <div className="pl-4 pr-1 py-1 flex flex-wrap gap-1.5 border-l-2 border-indigo-100 ml-4 text-left">
                        {subItems.map((sub, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => {
                              handleSubmenuClick(menu.id as Tab, sub);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors cursor-pointer ${
                              selectedSubmenu === sub
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-50 hover:bg-indigo-50 text-slate-600 border border-slate-200/60"
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => { setMobileMenuOpen(false); handleLoadDemo(); }}
                className="w-full py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-250 rounded-xl text-xs font-black text-center cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>체험 데모보기 💎</span>
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowLoginModal(true); }}
                  className="flex-1 py-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-700 border border-slate-200/80 text-center cursor-pointer"
                >
                  로그인
                </button>
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowRegisterModal(true); }}
                  className="flex-1 py-3 bg-slate-50 rounded-xl text-xs font-bold text-slate-700 border border-slate-200/80 text-center cursor-pointer"
                >
                  회원가입
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN APPLICATION LANDING GRID & ROUTER WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="w-full">
          <AnimatePresence mode="wait">
              
              {/* ① Landing Dashboard Home View */}
              {currentTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-16 md:space-y-24"
                >
                  
                   {/* Hero (Section 1) - 우리 학교 시험은 미래를 평가하고 있습니까? */}
                  <div className="relative overflow-hidden rounded-3xl bg-[#1E1145] py-12 sm:py-20 lg:py-16 px-8 sm:px-14 text-white shadow-xl">
                    <div className="absolute right-0 bottom-0 -mb-28 -mr-28 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                      
                      {/* Left: Text & Action Controls */}
                      <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                        <div>
                          <div className="relative -top-[6px] inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-xs sm:text-sm font-bold tracking-wide uppercase">
                            AIEA 공식 엔진 탑재 지능화 솔루션
                          </div>
                        </div>
                        
                        <div className="space-y-6 md:space-y-8 my-6 md:my-10">
                          <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-[0.2em] text-teal-300 block">
                            AI 시대 평가혁신 플랫폼
                          </span>
                          <h1 className="font-notosans font-[900] text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-[54px] tracking-[0.03em] leading-snug xl:leading-[1.15] text-white">
                            우리 학교 시험은<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-250 to-yellow-300 font-extrabold drop-shadow-sm">
                              미래를 평가하고 있습니까?
                            </span>
                          </h1>
                        </div>

                        <p className="text-base sm:text-lg lg:text-xl text-indigo-100/90 font-semibold leading-relaxed max-w-xl">
                          우리 학교나 학원의 시험문제를 복사해 바로 진단 받아보세요!<br />
                          <span className="text-white font-black">AI가 암기형·사고력형·창의형 문항 등의 비율을 분석하고,</span><br />
                          <span className="text-slate-300 font-extrabold">미래역량을 평가하는 문항으로 즉시 개선해 드립니다.</span>
                          <span className="text-yellow-300 text-sm sm:text-base font-black block mt-4 bg-white/10 px-4 py-2 border-l-4 border-yellow-400 rounded-r-xl">
                            "3초 후, 당신의 시험이 과거형인지 미래형인지 알 수 있습니다."
                          </span>
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                          <button
                            onClick={() => { setCurrentTab("evaluation"); setSelectedSubmenu("시험지 업로드"); }}
                            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm sm:text-base font-extrabold transition-all duration-150 cursor-pointer shadow-md inline-flex items-center gap-1.5"
                          >
                            무료 시험지 분석하기
                            <ArrowRight className="w-4.5 h-4.5" />
                          </button>
                          <button
                            onClick={handleLoadDemo}
                            className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-xl text-sm sm:text-base font-extrabold transition-all duration-150 cursor-pointer inline-flex items-center gap-1.5"
                          >
                            데모 보기 💎
                          </button>
                        </div>
                      </div>

                      {/* Right: Modern 3D Illustration / Dashboard image */}
                      <div className="lg:col-span-5 h-full flex items-center justify-center relative">
                        <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#251752]/30 p-1 backdrop-blur-xs hover:scale-[1.02] transition-transform duration-300">
                          <img
                            src={heroImage}
                            alt="AIEA Smart Evaluation Innovation Dashboard Platform Illustration"
                            className="w-full h-full object-cover rounded-xl"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* 이음School AI의 교육 혁신 공인 규격: AIEA 기틀 소개 */}
                  <div className="bg-slate-50 rounded-3xl border border-indigo-100 p-8 sm:p-12 my-10 max-w-7xl mx-auto shadow-xs">
                    <div className="space-y-6 text-center sm:text-left">
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-55 text-indigo-700 text-xs font-extrabold tracking-wider uppercase select-none">
                        AIEA Educational Innovation Standard
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-snug md:leading-normal">
                        이음School AI의 <span className="text-indigo-600 font-extrabold">'AIEA'</span>란 무엇인가요?
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-slate-655 leading-relaxed md:leading-loose font-medium max-w-5xl mt-6 sm:mt-8 mb-8 sm:mb-12 break-keep">
                        <strong>AIEA(AI Educational Assessment)</strong>는 암기식 시험문제로 학생들이 정답찾는 평가방식을 탈피하여, AI시대에 필수적인 7대 미래 역량을 기르고, 다차원적인 사고력을 길러주기 위한 평가가 이루어지도록 평가를 진단하고, 점검, 검정·보강하여, 혁신적인 평가로 전환해주는 <strong>이음School AI의 독창적인 국내 최초 평가혁신 플랫폼</strong>입니다.
                      </p>
                      <p className="text-sm text-slate-450 font-bold block pt-2">
                        💡 아래 각 문항 진단 항목을 클릭하시면 핵심 작동 원리가 자세히 해설 설명됩니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-4">
                      {/* Step 1 */}
                      <button
                        type="button"
                        onClick={() => setActiveAieaStep(activeAieaStep === 1 ? null : 1)}
                        className={`text-left w-full p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                          activeAieaStep === 1
                            ? "bg-white border-indigo-500 shadow-md ring-1 ring-indigo-100"
                            : "bg-white border-slate-200 hover:border-slate-350 hover:shadow-2xs"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-3.5">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                              <Brain className="w-5 h-5 shrink-0" />
                            </div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">1. 무엇을 진단하나요?</h4>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-slate-405 transition-transform duration-300 ${activeAieaStep === 1 ? 'rotate-180 text-indigo-600' : ''}`} />
                        </div>
                        
                        <AnimatePresence initial={false}>
                          {activeAieaStep === 1 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-slate-100/80 mt-4">
                                <p className="text-base sm:text-lg text-slate-650 font-medium leading-relaxed">
                                  학교 기출문제나 학원 퀴즈 문항을 정밀 진단하여, 정해진 기계적 정답만 고르는 단순 <strong>암기형 문항</strong>인지 혹은 실재하는 핵심 탐구력을 발산해야 하는 고차원 <strong>사고력형 문항</strong>인지를 명확한 정량적 비율로 분석해냅니다.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>

                      {/* Step 2 */}
                      <button
                        type="button"
                        onClick={() => setActiveAieaStep(activeAieaStep === 2 ? null : 2)}
                        className={`text-left w-full p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                          activeAieaStep === 2
                            ? "bg-white border-indigo-500 shadow-md ring-1 ring-indigo-100"
                            : "bg-white border-slate-200 hover:border-slate-350 hover:shadow-2xs"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-3.5">
                            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-black">
                              <CheckCircle2 className="w-5 h-5 shrink-0" />
                            </div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">2. 검인 기준은 무엇인가요?</h4>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-slate-405 transition-transform duration-300 ${activeAieaStep === 2 ? 'rotate-180 text-teal-600' : ''}`} />
                        </div>
                        
                        <AnimatePresence initial={false}>
                          {activeAieaStep === 2 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-slate-100/80 mt-4">
                                <p className="text-base sm:text-lg text-slate-650 font-medium leading-relaxed">
                                  AIEA 정식 학술 검인증 위원회는 <strong>실제성</strong>(실생활 가치), <strong>탐구성</strong>(지적 사유 깊이), <strong>근거성</strong>(논리적 근거 확보), <strong>적용성</strong>(변형 대입력)의 <strong>'신뢰도 4대 공인 지표'</strong>를 통해 객관성 있게 평가 문항을 세밀 필터링합니다.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>

                      {/* Step 3 */}
                      <button
                        type="button"
                        onClick={() => setActiveAieaStep(activeAieaStep === 3 ? null : 3)}
                        className={`text-left w-full p-6 sm:p-7 rounded-2xl border transition-all duration-300 relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                          activeAieaStep === 3
                            ? "bg-white border-indigo-500 shadow-md ring-1 ring-indigo-100"
                            : "bg-white border-slate-200 hover:border-slate-350 hover:shadow-2xs"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-3.5">
                            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-black">
                              <Sparkles className="w-5 h-5 shrink-0" />
                            </div>
                            <h4 className="text-base sm:text-lg font-black text-slate-900 leading-tight">3. 어떤 피드백을 주나요?</h4>
                          </div>
                          <ChevronDown className={`w-5 h-5 text-slate-405 transition-transform duration-300 ${activeAieaStep === 3 ? 'rotate-180 text-violet-600' : ''}`} />
                        </div>
                        
                        <AnimatePresence initial={false}>
                          {activeAieaStep === 3 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 border-t border-slate-100/80 mt-4">
                                <p className="text-base sm:text-lg text-slate-650 font-medium leading-relaxed">
                                  진단 후 7대 소양에 적합하도록, 직관적인 고난도 <strong>4지/5지선다 객관식 개조안(추론 발문 및 오답지 보정 원칙)</strong>뿐만 아니라, 스스로 완벽 서사를 구성하는 <strong>미래형 서·논술 탐구 에세이 문제</strong>와 최적화 채점 루브릭을 동시에 설계 제시합니다.
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </button>
                    </div>
                  </div>

                  {/* CORE PLATFORM MANIFESTO BANNER (기반 철학 강조 - 위치 조정) */}
                  <div className="my-10 py-2">
                    <div className="bg-radial from-slate-900 via-indigo-950 to-[#100930] rounded-3xl py-12 sm:py-20 px-8 sm:px-14 text-white border border-indigo-500/30 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
                      <div className="relative space-y-8 text-center max-w-4xl mx-auto font-sans">
                        <div>
                          <span className="inline-flex items-center px-5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase select-none">
                            AIEA CORE PLATFORM STATEMENT
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-black tracking-tight leading-relaxed sm:leading-[1.7] max-w-4xl mx-auto text-indigo-50 text-center">
                          &ldquo;
                          <span className="text-teal-300 block mb-2">시험문제를 만드는 AI는 많습니다.</span>
                          <span className="text-indigo-400 block mb-2">시험문제를 평가하고 미래형으로 바꾸는 AI는</span>
                          <span className="underline decoration-teal-400 decoration-4 text-white underline-offset-8 block mt-1">이음School AI뿐입니다.</span>
                          &rdquo;
                        </h3>
                        <p className="text-base sm:text-lg text-slate-300 font-medium leading-[1.85] max-w-3xl mx-auto break-keep">
                          우리는 단순 수동형 기계 생산을 넘어, 공교육 장학 척도 고도화와 인간 본연의 고차원 역량을 벼려내는 유일한 대안 <span className="font-black text-teal-300 underline decoration-teal-400 decoration-2 underline-offset-4">평가 혁신 플랫폼</span>입니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tools list */}
                  <div className="space-y-8 mt-24 md:mt-36 pt-10">
                    <div className="text-center md:text-left space-y-4">
                      <span className="text-xs text-indigo-600 font-extrabold tracking-[0.2em] uppercase block select-none">
                        SECTION 01 . PORTFOLIO CORE
                      </span>
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-indigo-50 pb-4">
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          지금 바로 내 시험지를 진단하고 미래형 문항으로 혁신해 보세요!
                        </h3>
                        <span className="text-xs text-slate-550 font-bold bg-indigo-50 text-indigo-700 px-3.5 py-1.5 rounded-full w-max border border-indigo-150 select-none">누구나 무료로 평생 체험 기회!</span>
                      </div>
                      <p className="text-base text-slate-650 leading-relaxed max-w-4xl mt-6 sm:mt-8">
                        본 플랫폼은 학교 시험지나 학원 퀴즈 문항을 정밀 분석하여, 단순 암기 중심에서 벗어나 학생의 고차원 사고력을 측정할 수 있도록 돕는 전문 평가 혁신 도구입니다. 아래 핵심 기능을 선택하여 지금 바로 무료로 체험해 보세요.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 sm:mt-16">
                      {filteredTools.map((tool) => {
                        const ToolIcon = tool.icon;
                        const isExpanded = activeToolId === tool.id;
                        return (
                          <div 
                            key={tool.id}
                            className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 flex flex-col justify-between space-y-8 hover:border-indigo-500 hover:shadow-xl transition-all duration-300 relative border-b-4 border-b-slate-100"
                          >
                            <div className="space-y-6">
                              <div className="flex items-center justify-between">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-xs">
                                  <ToolIcon className="w-6.5 h-6.5" />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border uppercase ${tool.badgeColor}`}>
                                    {tool.tag}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <span className="text-xs text-indigo-550 font-black uppercase tracking-widest block select-none">{tool.category}</span>
                                
                                {/* Clickable Title Block with Caret Down Chevron */}
                                <div 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveToolId(activeToolId === tool.id ? null : tool.id);
                                  }}
                                  className="flex items-start justify-between gap-3 cursor-pointer select-none group/title"
                                >
                                  <h4 className="font-black text-slate-900 text-lg sm:text-xl md:text-2xl tracking-tight leading-snug group-hover/title:text-indigo-700 transition-colors flex-1 text-left">
                                    {tool.title}
                                  </h4>
                                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center transition-all shrink-0 mt-0.5">
                                    <ChevronDown className={`w-4.5 h-4.5 transition-transform duration-250 ${isExpanded ? "rotate-180" : ""}`} />
                                  </div>
                                </div>

                                {/* Collapsible Explanation Area (Launches smoothly with motion) */}
                                <AnimatePresence initial={false}>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25, ease: "easeInOut" }}
                                      className="overflow-hidden"
                                    >
                                      <p className="text-base text-slate-650 leading-relaxed font-normal font-sans pt-3 border-t border-slate-100 mt-2 text-left">
                                        {tool.desc}
                                      </p>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>

                            {/* Direct button to run/route to the tool */}
                            <div 
                              onClick={() => { setCurrentTab(tool.id as any); setSelectedSubmenu(tool.submenu); }}
                              className="pt-4 border-t border-slate-150 flex items-center justify-between text-sm sm:text-base font-black text-indigo-600 select-none cursor-pointer group hover:text-indigo-700 transition-colors"
                            >
                              <span>{tool.buttonText}</span>
                              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                            </div>
                          </div>
                        );
                      })}
                      
                      {filteredTools.length === 0 && (
                        <div className="col-span-full py-16 text-center text-sm sm:text-base text-indigo-400 font-medium">
                          검색 조건에 부합하는 도구가 존재하지 않습니다. 검색어를 초기화하여 주세요.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trust badge with custom click-to-expand details */}
                  <div className="bg-white rounded-3xl border border-indigo-100 p-6 sm:p-8 my-10 max-w-7xl mx-auto shadow-xs">
                    <div 
                      onClick={() => setShowResearchDetail(!showResearchDetail)}
                      className="flex flex-col sm:flex-row items-center gap-4 justify-between cursor-pointer select-none group"
                    >
                      <div className="flex items-center gap-4 text-left">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <span className="font-extrabold text-slate-900 text-base sm:text-lg block group-hover:text-indigo-600 transition-colors">AIEA 공인 한국 지표 및 검인 표준 연구소 배정</span>
                          <p className="text-xs sm:text-sm text-slate-500 font-normal font-sans">본 서비스의 7대 역량 진단 알고리즘은 교차 신뢰 검증을 수행하도록 설계되었습니다.</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-extrabold bg-indigo-50 hover:bg-indigo-100 border border-indigo-150 px-4 py-2 rounded-xl transition-all shrink-0">
                        <span>연구소 검출 기능 및 역할 확인하기</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-250 ${showResearchDetail ? 'rotate-180' : ''}`} />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {showResearchDetail && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 border-t border-slate-100/80 mt-6 space-y-4 text-left">
                            <h4 className="font-black text-slate-900 text-sm sm:text-base">🏫 이음AIEA 표준 검인 연구소의 지능적 역할</h4>
                            <p className="text-xs sm:text-sm md:text-base text-slate-650 font-normal leading-relaxed font-sans max-w-5xl">
                              본 연구소는 기출 문안의 사유 깊이를 정밀 평정하는 AI 검정망의 알고리즘을 감수하고 고도화하는 기관으로, 출제된 내용의 사실 검증 크로싱 기술(Cross-Validation Mechanism)을 운용하여 공립 및 사립 기관 평가 문항을 세분 진단하고 관리 감독합니다.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Section 2: 문제 제기 (AI가 답하는 시대 - 지금의 시험은 무엇을 평가하고 있습니까?) */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 py-16 sm:py-20 px-8 sm:px-14 my-16 sm:my-28 space-y-12 shadow-md" id="sec_02">
                    <div className="space-y-4 text-center md:text-left">
                      <span className="text-xs text-indigo-600 font-extrabold tracking-[0.2em] uppercase block select-none">
                        SECTION 02 . ISSUE ADVOCACY
                      </span>
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-indigo-50 pb-4">
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          AI가 답하는 시대, 지금 우리의 시험은 무엇을 평가하고 있나요?
                        </h3>
                      </div>
                      <p className="text-base text-slate-650 leading-relaxed max-w-5xl pt-4">
                        인공지능 비서가 단 3초 만에 답을 쏙쏙 찾아낼 수 있는 시험문제는, 교과서 글자만 그대로 외우면 누구나 맞출 수 있는 수동형 평가 영역입니다. 우리 미래 학생들이 고유의 생각하는 지능 성장과 성취 경험을 만끽할 수 있도록 7대 핵심 소양 점검체계를 구안하여 대전환의 길을 제시합니다.
                        <br />
                        <span className="text-indigo-600 font-bold block mt-3">💡 아래의 사료 오답 카드와 미래형 생각 카드의 세부 지표를 직접 열어 무엇이 차별적이고 혁신적인지 탐정의 입장에서 서로 세밀하게 비교해 보세요.</span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-6">
                      {/* Left: 과거형 암기 */}
                      <div className="bg-red-50/40 rounded-2xl border border-red-150 p-8 space-y-6 relative">
                        <div className="flex items-center gap-2 justify-center text-center">
                          <span className="w-3.5 h-3.5 rounded-full bg-red-400"></span>
                          <h4 className="font-black text-red-950 text-base sm:text-lg text-center">지엽적 암기 중심 평가 (과거형)</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-red-750 font-bold text-center">📌 각 항목을 선택해 평가의 구체적인 한계를 확인하세요.</p>
                        
                        <div className="space-y-4">
                          {[
                            {
                              title: "📌 단순 사실 관계 암기력 측정",
                              tooltip: "암기형 지식 일치 테스트",
                              desc: "인공지능도 3초 만에 검색해서 바로 답안을 베낄 수 있는 단순 사실 확인식 테스트입니다. 학생의 창조적 인지 경로를 단순화하는 한계가 있습니다."
                            },
                            {
                              title: "📌 획일적인 오지선다 정답 찾기",
                              tooltip: "사유를 하나의 고정 정답에 기속",
                              desc: "오직 고정된 하나의 숫자 기호만 고르도록 유도하여, 인공지능 시대 핵심인 다각적 이해와 논쟁적 판단력을 축소시킵니다."
                            },
                            {
                              title: "📌 무맥락적인 단답/유형 암기 기술",
                              tooltip: "문제풀이 스킬과 학습 무력화 유도",
                              desc: "문제를 관통하는 참뜻을 사유하기도 전에 공식과 정오 패턴만 암기하여, 일상과 학문의 진정한 접촉 재미를 반감시킵니다."
                            }
                          ].map((item, idx) => {
                            const isOpen = activePastItemIdx === idx;
                            return (
                              <div 
                                key={idx} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePastItemIdx(isOpen ? null : idx);
                                  if (!isOpen) setActiveFutureItemIdx(null);
                                }}
                                onMouseEnter={() => {
                                  setActivePastItemIdx(idx);
                                  setActiveFutureItemIdx(null);
                                }}
                                className={`relative bg-white/75 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                  isOpen ? "border-red-400 bg-red-50/20 shadow-xs" : "border-dotted border-red-200 hover:border-red-300 hover:bg-white"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-extrabold text-slate-800 text-sm sm:text-base">
                                    {item.title}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-red-500 font-bold bg-red-100 px-2 py-0.5 rounded-full">
                                      {isOpen ? "닫기" : "보기"}
                                    </span>
                                    <ChevronDown className={`w-4.5 h-4.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-red-500" : ""}`} />
                                  </div>
                                </div>
                                
                                <AnimatePresence initial={false}>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                      animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                      transition={{ duration: 0.25, ease: "easeInOut" }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pt-2.5 border-t border-red-100/50 text-xs sm:text-sm text-red-950 font-normal leading-relaxed">
                                        <p className="font-bold text-red-650 mb-1">⚠️ 한계 규명: {item.tooltip}</p>
                                        {item.desc}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: 미래형 혁신 */}
                      <div className="bg-emerald-50/40 rounded-2xl border border-emerald-150 p-8 space-y-6 relative">
                        <div className="flex items-center gap-2 justify-center text-center">
                          <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping"></span>
                          <h4 className="font-black text-emerald-950 text-base sm:text-lg text-center">미래 핵심 지적 역량 (대안형)</h4>
                        </div>
                        <p className="text-xs sm:text-sm text-emerald-705 font-bold text-center">✅ 각 항목을 선택해 미래의 핵심적 가치를 확인하세요.</p>

                        <div className="space-y-4">
                          {[
                            {
                              title: "✅ 질문력 (Inquiry Capability)",
                              tooltip: "고차원 탐구와 프롬프트 설계",
                              desc: "답을 검색하는 정형적 기계 행동을 완전히 지양하고, 다각적 사료 이면에 숨은 핵심 질문을 독자 제기하여 적극 기획하는 핵심력입니다."
                            },
                            {
                              title: "✅ 가짜 정보 가려내기 (Critique Force)",
                              tooltip: "환각 오류 탐색 및 다각적 교차 확인",
                              desc: "AI 챗보조기가 배정하는 거짓 및 편향(환각 증세)을 즉시 정밀 분류하고 대조 보완하는 인지 주권력입니다."
                            },
                            {
                              title: "✅ 나만의 창의적 대안 제안 (De Novo Logic)",
                              tooltip: "일방향 출제 정식을 넘어서는 입체적 서사화",
                              desc: "기성 관점의 무작위 인용에 안주하지 않고, 현대 현안의 다양한 갈등 관계를 분석하여 자신만의 논제적 제안을 에세이로 피력합니다."
                            }
                          ].map((item, idx) => {
                            const isOpen = activeFutureItemIdx === idx;
                            return (
                              <div 
                                key={idx} 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveFutureItemIdx(isOpen ? null : idx);
                                  if (!isOpen) setActivePastItemIdx(null);
                                }}
                                onMouseEnter={() => {
                                  setActiveFutureItemIdx(idx);
                                  setActivePastItemIdx(null);
                                }}
                                className={`relative bg-white/75 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                  isOpen ? "border-emerald-400 bg-emerald-50/20 shadow-xs" : "border-dotted border-emerald-200 hover:border-emerald-300 hover:bg-white"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-extrabold text-slate-800 text-sm sm:text-base">
                                    {item.title}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                                      {isOpen ? "닫기" : "보기"}
                                    </span>
                                    <ChevronDown className={`w-4.5 h-4.5 text-slate-405 transition-transform duration-205 ${isOpen ? "rotate-180 text-emerald-500" : ""}`} />
                                  </div>
                                </div>
                                
                                <AnimatePresence initial={false}>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                      animate={{ height: "auto", opacity: 1, marginTop: 12 }}
                                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                      transition={{ duration: 0.25, ease: "easeInOut" }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pt-2.5 border-t border-emerald-150/50 text-xs sm:text-sm text-emerald-950 font-normal leading-relaxed font-sans">
                                        <p className="font-bold text-emerald-605 mb-1">🌟 미래 기회: {item.tooltip}</p>
                                        {item.desc}
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

                    <div className="pt-6 border-t border-slate-100 flex justify-start">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentTab("evaluation");
                          setSelectedSubmenu(null);
                        }}
                        className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-black transition-all cursor-pointer shadow-md shadow-indigo-100 inline-flex items-center gap-2 group"
                      >
                        무료 시험지 진단기에서 직접 체험하기
                        <ArrowRight className="w-4.5 h-4.5 transform group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Section 3: 시험지 업로드 → 분석 → 혁신 - 프로세스 다이어그램 */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 py-16 sm:py-20 px-8 sm:px-14 my-16 sm:my-28 space-y-12 shadow-md" id="sec_03">
                    <div className="space-y-4 text-center md:text-left">
                      <span className="text-xs text-indigo-600 font-extrabold tracking-[0.2em] uppercase block select-none">
                        SECTION 03 . WORKFLOW
                      </span>
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-indigo-50 pb-4">
                        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                          시험지 업로드에서 미래형 혁신까지, 단 3분이면 충분합니다
                        </h3>
                      </div>
                      <p className="text-base text-slate-650 leading-relaxed max-w-5xl pt-4">
                        아주 정밀하고 복잡한 분석 프로세스가 단 몇 번의 버튼 클릭으로 매끄럽게 흐릅니다. 아래의 4단계 다이어그램 수순을 마우스 오버나 클릭하여, 당신의 옛날 시험지가 입체적인 역량을 스스로 기르게 돕는 미래형 시험 문항으로 거듭나는 여정을 직접 목격하세요.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start mt-6 text-left col-span-full">
                      {[
                        {
                          step: "1. 기존 문제 붙여넣기",
                          icon: FileText,
                          badge: "간편한 클립 복사",
                          desc: "준비해 둔 기존 단답형 기출 문항을 입력 칸에 텍스트로 고스란히 복사해 줍니다.",
                          tooltip: "출제하셨던 기존의 단답 및 사지선다 기출 문제를 주입하시면 AI 파서 가동이 완만히 활성화됩니다."
                        },
                        {
                          step: "2. 7대 역량 입체 채점",
                          icon: Brain,
                          badge: "다차원 평정 검정",
                          desc: "제출한 질문이 어떤 고차원적 인지 능력을 자극하는지 35점 정량 지수로 자동 요약합니다.",
                          tooltip: "무작위 지식 일치도, 인간적 프롬프팅 조절 필요률, 탐구 정합 수준을 다각 기준표로 정밀 계도합니다."
                        },
                        {
                          step: "3. 성찰적 질문 대전환",
                          icon: Sparkles,
                          badge: "미래형 문항 리폼",
                          desc: "단일 텍스트 매몰 수치를 뛰어넘도록 현대적 갈등 상황 및 토론형 변환안을 제시합니다.",
                          tooltip: "수동 풀이를 배제하고, 여러 사료 조건 속에서 주도적으로 판단 및 개조할 수 있도록 재정립합니다."
                        },
                        {
                          step: "4. 가이드 루브릭 납품",
                          icon: CheckCircle2,
                          badge: "상·중·하 채점 가이드",
                          desc: "정량 서사와 논쟁적 답변을 공명정대하게 평정할 수 있도록 성취 지표 루브릭을 완성합니다.",
                          tooltip: "채점 주관 편차를 대폭 소거하는 3단계(상-중-하) 채점 기준표와 우수 답안 예증 가이드를 조준 정비합니다."
                        }
                      ].map((p, idx) => {
                        const IconComp = p.icon;
                        const isOpen = activeWorkflowIdx === idx;
                        return (
                          <div 
                            key={idx} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveWorkflowIdx(isOpen ? null : idx);
                            }}
                            onMouseEnter={() => setActiveWorkflowIdx(idx)}
                            className={`relative border rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-60 shadow-xs ${
                              isOpen ? "bg-[#1E1145] text-white border-indigo-500 scale-[1.02] shadow-md" : "bg-slate-50 hover:bg-slate-100 hover:border-slate-350 border-slate-200/60 text-slate-800"
                            }`}
                          >
                            <div className="space-y-4 w-full">
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border select-none ${
                                  isOpen ? "text-teal-300 bg-white/10 border-teal-500/30" : "text-indigo-600 bg-white border-indigo-100/50"
                                }`}>
                                  {p.badge}
                                </span>
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs ${
                                  isOpen ? "bg-white/20 text-white" : "bg-white border text-indigo-600"
                                }`}>
                                  <IconComp className="w-5 h-5" />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <h4 className={`font-black text-base flex items-center justify-between ${isOpen ? "text-white" : "text-slate-900"}`}>
                                  <span>{p.step}</span>
                                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180 text-teal-300" : "text-slate-450"}`} />
                                </h4>
                                <p className={`text-xs sm:text-sm font-medium leading-relaxed text-left ${isOpen ? "text-slate-201" : "text-slate-500"}`}>
                                  {p.desc}
                                </p>
                              </div>
                            </div>
                            
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: "easeInOut" }}
                                  className="overflow-hidden w-full mt-4 text-left"
                                >
                                  <div className={`pt-3 border-t text-xs leading-relaxed ${
                                    isOpen ? "border-white/10 text-slate-300" : "border-slate-205 text-slate-600"
                                  }`}>
                                    <span className={`font-extrabold block mb-1 ${isOpen ? "text-teal-300" : "text-indigo-650"}`}>💡 세부 가이드라인:</span>
                                    {p.tooltip}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-start">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentTab("evaluation");
                          setSelectedSubmenu(null);
                        }}
                        className="px-6 py-3.5 bg-[#4A3AFF] hover:bg-[#3B2EFF] text-white rounded-xl text-sm font-black transition-all cursor-pointer shadow-md inline-flex items-center gap-2 group"
                      >
                        3분 간편 AI 문제 진단 실험해보기
                        <ArrowRight className="w-4.5 h-4.5 transform group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* Section 4: AIEA 분석 결과 예시 (중학교 역사 시험 예 제시) */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 py-16 sm:py-24 px-8 sm:px-14 my-14 sm:my-20 md:my-24 space-y-12 shadow-md">
                    <div className="space-y-8 text-center max-w-4xl mx-auto mb-6">
                      <span className="text-xs sm:text-sm text-indigo-600 font-extrabold tracking-[0.2em] uppercase block mb-2">SECTION 04 . 기출 분석 예제</span>
                      <h3 className="text-3xl sm:text-4xl md:text-[40px] font-black text-slate-900 tracking-tight leading-normal sm:leading-relaxed md:leading-[1.45] text-center">
                        AIEA 분석 결과 예시 (역사 시험)
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-slate-650 max-w-3xl mx-auto leading-relaxed sm:leading-loose mt-6 sm:mt-8 text-center">
                        교사 평가 위원단에게 납품된 실제 중학교 3학년 역사 정기고사 분석 리포트 요약본입니다. <span className="text-indigo-600 font-bold underline decoration-indigo-300 decoration-2 underline-offset-4">단순 사실을 가르는 지엽성의 실체를 직접 풀어 해부하세요.</span>
                      </p>
                    </div>

                    <div className="bg-[#1E1145] text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-md border border-white/10 mt-12 sm:mt-16">
                      <div className="border-b border-white/15 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                        <div>
                          <span className="text-[10px] bg-red-500 text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block w-max mb-1">AIEA AUDITOR WARNING</span>
                          <h4 className="font-extrabold text-sm sm:text-base leading-snug">🏫 중학교 3학년 역사 정기고사 분석 보고서</h4>
                        </div>
                        <span className="text-xs text-slate-350 font-bold font-mono">지표 판독번호: 24-AIEA-MSH3</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Progress bars split */}
                        <div className="md:col-span-2 space-y-4">
                          <span className="text-xs font-black text-indigo-250 block">📊 인지 평가 척도 점유율</span>
                          
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs font-bold font-mono">
                                <span className="text-red-300">🔴 암기형 문항</span>
                                <span>72%</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full bg-red-400" style={{ width: "72%" }}></div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs font-bold font-mono">
                                <span className="text-amber-300">🟡 사고력 문항</span>
                                <span>18%</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full bg-amber-400" style={{ width: "18%" }}></div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs font-bold font-mono">
                                <span className="text-emerald-300">🟢 창의형 문항</span>
                                <span>10%</span>
                              </div>
                              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                                <div className="h-full bg-emerald-400" style={{ width: "10%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Scores */}
                        <div className="bg-white/5 rounded-xl p-4.5 border border-white/10 text-center flex flex-col justify-center space-y-1">
                          <span className="text-slate-300 text-xs font-medium">AIEA Score (종합지수)</span>
                          <span className="text-4xl font-black text-red-400 font-mono">54점</span>
                          <span className="text-[10px] text-red-300 font-bold bg-red-500/10 py-1 rounded-sm text-center">개선 권고 대상</span>
                        </div>

                        <div className="bg-white/5 rounded-xl p-4.5 border border-white/10 text-center flex flex-col justify-center space-y-1">
                          <span className="text-slate-300 text-xs font-medium">AI 시대 평가 적합성</span>
                          <span className="text-xl md:text-2xl font-bold text-amber-300 tracking-widest text-center">★★☆☆☆</span>
                          <span className="text-[10px] text-slate-350 font-bold block mt-1 text-center">지향점 보완 요망</span>
                        </div>
                      </div>

                      {/* Detail report toggle content */}
                      <AnimatePresence>
                        {showHistoryDetail && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-black/20 border border-white/10 rounded-xl p-5 space-y-4 text-xs font-sans text-slate-200 block"
                          >
                            <span className="text-xs text-teal-350 font-black block">📁 진단 요원 정밀 검증 척도 요약</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-[#150B34] p-4 rounded-lg space-y-2 border border-white/5">
                                <span className="text-red-400 font-extrabold block">🚨 대표적 오답/암기 가스 문항 (Q1)</span>
                                <p className="font-mono text-slate-300">
                                  &ldquo;흥선대원군이 양반들에게도 세금을 부과하여 국가 재정을 확충한 세법 명칭을 객관식 사료 중 고르시오.&rdquo;
                                </p>
                                <p className="text-slate-400 leading-relaxed font-normal">
                                  * 결함 요인: 백과사전 팩트 암기식 일치 테스트로, AI 탑재 웨어러블에 텍스트를 기재하는 즉시 대필 및 일치 추출을 100% 모방하므로 학습 통제력이 전무합니다.
                                </p>
                              </div>
                              <div className="bg-[#150B34] p-4 rounded-lg space-y-2 border border-white/5">
                                <span className="text-emerald-400 font-extrabold block">💡 추천 연성 개혁 전환안</span>
                                <p className="font-mono text-slate-300">
                                  &ldquo;오늘날 부유세 혹은 복지 증세에 반론하는 입장의 논거들을 정리하고, 흥선대원군의 호포제 강행 의도를 비교 에세이로 창작해보시오.&rdquo;
                                </p>
                                <p className="text-slate-400 leading-relaxed font-normal">
                                  * 성과: 학생 개인의 대안 기획, 사유 비판, 실생활 시사 연결도를 동행 가늠할 수 있어 생성형 AI가 대필할 루트가 원천 봉쇄됩니다.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="flex justify-center pt-2">
                        <button
                          onClick={() => setShowHistoryDetail(!showHistoryDetail)}
                          className="px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-extrabold rounded-xl border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          🔍 {showHistoryDetail ? "상세 리포트 접기 ▲" : "중학교 역사 시험 예측 정밀 리포트 열기 ▼"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Section 5: 미래형 전환 사례 (Before vs After) */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 py-16 sm:py-24 px-8 sm:px-14 my-14 sm:my-20 md:my-24 space-y-12 shadow-md">
                    <div className="space-y-8 text-center max-w-4xl mx-auto mb-6">
                      <span className="text-xs sm:text-sm text-indigo-600 font-extrabold tracking-[0.2em] uppercase block mb-2">SECTION 05 . BEFORE VS AFTER PRACTICE</span>
                      <h3 className="text-3xl sm:text-4xl md:text-[40px] font-black text-slate-900 tracking-tight leading-normal sm:leading-relaxed md:leading-[1.45] text-center">
                        미래형 전환 사례 (전환 전후 비교 카드)
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-slate-650 max-w-3xl mx-auto leading-relaxed sm:leading-loose mt-6 sm:mt-8 text-center font-normal">
                        한 단어만 암기하면 찍어내던 단편적 질문을, 깊이 사유하고 질문하는 고품격 질문으로 변모시킵니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mt-10 sm:mt-14">
                      {/* Before Card */}
                      <div className="border border-red-200 bg-red-50/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-red-100 rounded-xl px-4 py-2 block border border-red-150">
                            <span className="text-red-700 font-black text-xs sm:text-sm flex items-center gap-1">
                              ⚠️ 전환 이전 (Before)
                            </span>
                            <span className="text-slate-400 text-xs font-mono font-bold">암기 수동형 문항</span>
                          </div>

                          <div className="space-y-2 pt-2">
                            <span className="text-xs text-red-650 bg-red-100/50 px-2 py-0.5 rounded font-bold">예전 내신 기출</span>
                            <p className="font-extrabold text-[#1a1135] text-base leading-relaxed">
                              &ldquo;흥선대원군의 개혁정책 3가지를 쓰시오.&rdquo;
                            </p>
                            <p className="text-xs sm:text-sm text-slate-450 font-normal leading-relaxed">
                              학생들은 교과서의 짧은 단원 글귀를 지엽적으로 암기하여 기재합니다. AI 챗봇을 가동하면 지체 없이 단 3초 만에 획일화된 정답이 그대로 도출되는 모사 영역입니다.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-red-100 flex items-center justify-between">
                          <span className="text-xs text-slate-450 font-medium font-sans">AIEA 정량 점수</span>
                          <span className="text-xl font-bold font-mono text-red-500 bg-red-50 border border-red-100 px-3 py-1 rounded-lg">42점 (경고) 🔴</span>
                        </div>
                      </div>

                      {/* After Card */}
                      <div className="border-2 border-emerald-400 bg-emerald-50/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">
                          Recommended
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-emerald-100 rounded-xl px-4 py-2 block border border-emerald-150">
                            <span className="text-emerald-700 font-black text-xs sm:text-sm flex items-center gap-1">
                              ✨ AIEA 개조 최종안 (After)
                            </span>
                            <span className="text-emerald-600 text-xs font-mono font-bold">생성형 에세이식</span>
                          </div>

                          <div className="space-y-2 pt-2">
                            <span className="text-xs text-emerald-650 bg-emerald-100 px-2 py-0.5 rounded font-bold">미래형 추천 문항</span>
                            <p className="font-extrabold text-teal-950 text-base leading-relaxed">
                              &ldquo;흥선대원군이 오늘날 교육부 장관으로 부임했다고 가상합시다. 현재 고교학점제 가중치 및 국제 공급 고립 국면을 타개하고자 할 때, 그가 펼칠 ‘쇄국(고품격 자생)’ 혹은 ‘내정 개혁’ 정책의 타당한 논거를 역사서 대조를 바탕으로 서술형 에세이로 비평해보자.&rdquo;
                            </p>
                            <p className="text-xs sm:text-sm text-slate-450 font-normal leading-relaxed">
                              학생 한 명 한 명의 입체적 사료 인용과 정서 관점이 공존 투영되는 에세이식 문형입니다. 인공지능 보조 챗봇의 표절 및 대필 시도가 차단되고 높은 인지 성장을 선물합니다.
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-emerald-100 flex items-center justify-between">
                          <span className="text-xs text-teal-850 font-medium font-sans">AIEA 정량 점수</span>
                          <span className="text-xl font-bold font-mono text-emerald-600 bg-emerald-50 border border-emerald-150 px-3 py-1 rounded-lg">89점 (합격) 🟢</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 6: AI 시대 7대 핵심역량 (AIEA Framework & Radar Chart/Interactive map) */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 py-16 sm:py-24 px-6 sm:px-14 my-14 sm:my-20 md:my-24 space-y-12 shadow-md">
                    <div className="space-y-6 text-center max-w-4xl mx-auto">
                      <span className="text-xs sm:text-sm text-indigo-600 font-extrabold tracking-[0.2em] uppercase block">SECTION 06 . AIEA METRIC SYSTEM</span>
                      <h3 className="text-3xl sm:text-4xl md:text-[40px] font-black text-slate-900 tracking-tight leading-tight">
                        AI 시대 7대 미래 핵심 소양 (AIEA Framework)
                      </h3>
                      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        이음School AI가 학교 시험 및 문항 진단을 통해 정밀 측정하는 7대 미래 핵심 역량의 상세 정의와 채점 예시를 직관적으로 체험할 수 있습니다.
                      </p>
                    </div>

                    {/* How to use & Guide Alert Card */}
                    <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto shadow-xs text-left">
                      <div className="space-y-2">
                        <span className="flex items-center gap-1.5 text-sm font-black text-indigo-950 font-sans">
                          <span className="text-indigo-600 bg-white shadow-xs rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                          무엇을 하는 기능인가요?
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                          인공지능 대필이나 암기 마킹 시험을 뛰어넘어, 인간 본연의 고차원 생각 척도를 진단하는 <strong>AIEA 7대 미래 소양 평가 체계</strong>를 사전 탐색하고, 각 역량의 실무 중점과 미래형 추천 문항을 실시간 확인할 수 있는 체험 매트릭스 도구입니다.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="flex items-center gap-1.5 text-sm font-black text-indigo-950 font-sans">
                          <span className="text-indigo-600 bg-white shadow-xs rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                          어떻게 조작하고 작동하나요?
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal font-medium">
                          아래 레이아웃의 <strong className="text-indigo-600">좌측 역량 가로 막대나 우측 원형 타깃 그래프의 특정 소양 단추</strong>를 마우스나 터치로 클릭하며 선택해 보세요. 역량별 가치, 해설 리포트가 연동되어 즉시 뚜렷하게 변경 활성화됩니다.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <span className="flex items-center gap-1.5 text-sm font-black text-indigo-950 font-sans">
                          <span className="text-indigo-600 bg-white shadow-xs rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                          무엇을 확인할 수 있나요?
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-normal">
                          선택한 미래 역량이 단순 지치 확인 형태인 <strong>'과거 암기중심 출제방식'</strong>에 머물 때의 환각 맹점 대비, 이음School AI가 추천하는 <strong>'지향형 혁신 문항 실례'</strong> 및 채점 평가 가이드라인을 완전하게 미리 점검할 수 있습니다.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6 max-w-6xl mx-auto">
                      
                      {/* Left: 7 lists clickable (Col width 4/12) */}
                      <div className="lg:col-span-4 flex flex-col gap-2.5">
                        <span className="text-xs text-slate-400 font-extrabold tracking-wider uppercase block mb-1 text-left">💡 역량 목록 선택 (7 CORE LIST)</span>
                        {[
                          { name: "질문력", icon: "💡", sub: "Inquiry & Prompting" },
                          { name: "문제해결력", icon: "🧩", sub: "Real-world Dynamics" },
                          { name: "창의력", icon: "🎨", sub: "Original Synthesis" },
                          { name: "비판적 사고력", icon: "🔍", sub: "Fact Evaluation" },
                          { name: "협업능력", icon: "🤝", sub: "Cooperative Agency" },
                          { name: "의사소통능력", icon: "💬", sub: "Empathetic Dialogue" },
                          { name: "AI 리터러시", icon: "💻", sub: "Ethical Literacy" }
                        ].map((item) => {
                          const isSelected = activeCompetency === item.name;
                          return (
                            <button
                              key={item.name}
                              onClick={() => setActiveCompetency(item.name)}
                              className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                                isSelected
                                  ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-600 shadow-md transform translate-x-1"
                                  : "bg-slate-50/70 hover:bg-slate-100 text-slate-800 border-slate-200"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{item.icon}</span>
                                <div>
                                  <span className="font-extrabold text-sm sm:text-base block">{item.name}</span>
                                  <span className={`text-[10px] block uppercase tracking-wider font-sans font-medium ${isSelected ? "text-indigo-200" : "text-slate-450"}`}>
                                    {item.sub}
                                  </span>
                                </div>
                              </div>
                              <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? "text-white translate-x-1" : "text-slate-400 group-hover:translate-x-1"}`} />
                            </button>
                          );
                        })}
                      </div>

                      {/* Middle: Custom Dynamic SVG Concentric representation (Col width 4/12) */}
                      <div className="lg:col-span-4 flex flex-col items-center justify-center bg-slate-50/50 p-6 rounded-3xl border border-slate-200/80 relative overflow-hidden min-h-[360px]">
                        <span className="text-[10px] text-slate-400 font-black tracking-wider uppercase font-mono block mb-3">Concentric Radar Map</span>
                        
                        <div className="relative w-64 h-64 flex items-center justify-center bg-white rounded-3xl border border-slate-150 shadow-sm">
                          {/* Inner pulsing design */}
                          <div className="absolute inset-0 border border-slate-100 rounded-full scale-100"></div>
                          <div className="absolute inset-8 border border-indigo-50 rounded-full"></div>
                          <div className="absolute inset-16 border border-emerald-50 rounded-full border-dashed"></div>
                          <div className="absolute inset-24 border border-teal-100 rounded-full"></div>
                          <div className="absolute inset-28 w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center text-[10px] text-white font-black shadow-lg">AIEA</div>
                          
                          {/* Radial lines and interactive dots representing the 7 options */}
                          {[
                            { name: "질문력", icon: "💡", angle: 270 },
                            { name: "문제해결력", icon: "🧩", angle: 321 },
                            { name: "창의력", icon: "🎨", angle: 12 },
                            { name: "비판적 사고력", icon: "🔍", angle: 63 },
                            { name: "협업능력", icon: "🤝", angle: 114 },
                            { name: "의사소통능력", icon: "💬", angle: 165 },
                            { name: "AI 리터러시", icon: "💻", angle: 216 }
                          ].map((item) => {
                            const radians = (item.angle * Math.PI) / 180;
                            // Sizing coordinates: parent is 256x256, center is 128, radius is 88px, centering offset for a 40x40 button is (128 - 20) = 108
                            const x = 108 + 88 * Math.cos(radians);
                            const y = 108 + 88 * Math.sin(radians);
                            const isSelected = activeCompetency === item.name;
                            return (
                              <button
                                key={item.name}
                                onClick={() => setActiveCompetency(item.name)}
                                className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-base shadow-md transition-all duration-300 transform hover:scale-115 cursor-pointer z-10 ${
                                  isSelected 
                                    ? "bg-slate-900 text-white scale-115 border-2 border-amber-300 ring-4 ring-indigo-105" 
                                    : "bg-white text-slate-700 border border-slate-200 hover:bg-indigo-50"
                                }`}
                                style={{
                                  left: `${x}px`,
                                  top: `${y}px`
                                }}
                                title={item.name}
                              >
                                {item.icon}
                              </button>
                            );
                          })}
                        </div>
                        <div className="text-center pt-5 space-y-1">
                          <span className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold inline-block border border-indigo-100">
                            활성화: {activeCompetency}
                          </span>
                          <span className="text-[10px] text-slate-400 block font-normal">원을 누르시거나 좌측 목록을 클릭해 즉시 가동해 보세요!</span>
                        </div>
                      </div>

                      {/* Right: Selected detail box (Col width 4/12) */}
                      <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-sm flex flex-col justify-between space-y-6">
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 text-[10px] font-black uppercase">🎯 AIEA Core Metric</span>
                            <span className="text-[10px] text-indigo-650 font-extrabold font-mono bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">Level 5 Maxima</span>
                          </div>

                          <h4 className="text-2xl font-extrabold text-indigo-950 tracking-tight flex items-center gap-1.5">
                            {activeCompetency === "질문력" && "💡 질문력 (Questioning)"}
                            {activeCompetency === "문제해결력" && "🧩 문제해결력 (Problem Solving)"}
                            {activeCompetency === "창의력" && "🎨 창의력 (Creativity)"}
                            {activeCompetency === "비판적 사고력" && "🔍 비판적 사고력 (Critical Thinking)"}
                            {activeCompetency === "협업능력" && "🤝 협업능력 (Collaboration)"}
                            {activeCompetency === "의사소통능력" && "💬 의사소통능력 (Communication)"}
                            {activeCompetency === "AI 리터러시" && "💻 AI 리터러시 (AI Literacy)"}
                          </h4>

                          <p className="text-sm sm:text-base text-slate-650 leading-[1.8] font-sans font-normal text-left break-keep">
                            {activeCompetency === "질문력" && "단순 지식 확인과 마킹의 단순 기계적 연산에서 완전하게 탈피해, 현상 이면의 본질적 오류와 탐구 대안 프레임을 정밀히 기획하고 생성형 AI를 주체적으로 통제하는 프롬프팅 지식 함량 강도입니다."}
                            {activeCompetency === "문제해결력" && "교과서 공식의 불완전함을 마주하는 실제 현장에서 발생되는 복합 제약조건과 회계 노이즈를 스스로 포착하고, 분석 근거를 재수립하여 가치를 제안해내는 실천적 분석 역량입니다."}
                            {activeCompetency === "창의력" && "일률적인 5지선다 암기 중심에서 탈피하여, 본인만의 독특한 세계관과 독창적 서사 기준을 에세이에 정교히 반영하여 고유한 공감을 창출해 내는 창조적 상생 능력입니다."}
                            {activeCompetency === "비판적 사고력" && "인공지능의 주입 배치 지평 속 연산 환각(Hallucination) 지점을 역사적 1차 사료 근거로 직접 대조하고 반박 오류를 교차 검증해 지식을 독립적으로 세우는 필터력입니다."}
                            {activeCompetency === "협업능력" && "개별 주입에서 고립되는 시험 한계를 즉시 극복하고, 실제 가치관 격돌 갈등 상황에서 각 이해 주체의 불안을 적극 수용하고 공존의 규칙 헌장을 설계하여 시너지를 이끄는 집단 사회 지능입니다."}
                            {activeCompetency === "의사소통능력" && "자주적인 설득을 품격 있고 품위 있는 표현과 상호 대조 예법에 대입해 수신자의 관점 정서적 뉘앙스까지 섬세하게 가꾸고 호소력을 전량 조율할 수 있는 인격 중심 역량입니다."}
                            {activeCompetency === "AI 리터러시" && "단순 대필의 맹목적 과용을 경계하며, 표절의 한계 기준을 날카롭게 인지하고 보조 조력자로서 인공지능 결과물을 완벽하게 다스리는 실천 윤리 통제사 역량입니다."}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 space-y-3 text-left">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-450">출제 권장 반영 비율</span>
                            <span className="font-extrabold text-indigo-600">15% ~ 22% 권장</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-450">AIEA 인증 연수 연계</span>
                            <span className="font-extrabold text-emerald-600">전학교 연수 수록</span>
                          </div>
                          <button 
                            onClick={() => setCurrentTab("competency")}
                            className="w-full mt-2 py-3 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-850 flex items-center justify-center gap-1 transition-all"
                          >
                            <span>전체 루브릭 및 채점기준 자세히 보기</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Section 7: 누구를 위한 플랫폼인가? */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 py-16 sm:py-24 px-8 sm:px-14 my-14 sm:my-20 md:my-24 space-y-12 shadow-md">
                    <div className="space-y-8 text-center max-w-4xl mx-auto mb-6">
                      <span className="text-xs sm:text-sm text-indigo-600 font-extrabold tracking-[0.2em] uppercase block mb-2">SECTION 07 . SERVICE TARGET</span>
                      <h3 className="text-3xl sm:text-4xl md:text-[40px] font-black text-slate-900 tracking-tight leading-normal sm:leading-relaxed md:leading-[1.45] text-center">
                        누구를 위한 플랫폼인가?
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-slate-650 max-w-3xl mx-auto leading-relaxed sm:leading-loose mt-6 sm:mt-8 text-center font-normal">
                        공교육 장학 지평에서부터 교육계의 각계각층의 지도자들에게 정량적 품질 보장과 자부심을 제공합니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 sm:mt-14">
                      {[
                        { title: "교사 (Teacher)", target: "시험 품질 진단", desc: "내신 정기고사 시험문제를 실시간 파싱하고 고부가 가치 에세이와 루브릭 채점기준을 원클릭으로 출고하여 출제 격무를 해소합니다.", color: "border-indigo-150 hover:border-indigo-500 bg-slate-50/55" },
                        { title: "학교 (School)", target: "평가혁신 리드", desc: "고교학점제 시행 국면에서 평가 신뢰도를 높이고 교사 평가 연구회를 활성화하여 선도적인 미래 선도학교로 도약 구축합니다.", color: "border-emerald-150 hover:border-emerald-500 bg-slate-50/55" },
                        { title: "교육청 (Office)", target: "정책 데이터 관리", desc: "지역 관내 각급 학교의 기출 시험 품질을 모니터링하여 공립 평가 동향을 세부 통계로 정량 정책 장악력을 수립합니다.", color: "border-rose-150 hover:border-rose-500 bg-slate-50/55" },
                        { title: "학원 (Academy)", target: "차별화된 학부모 리포트", desc: "입시 학원은 물론 성찰적 사유 척도를 담은 학부모 만족 심사 도구로, 단순 오답 풀이를 능가하는 고부가 리포트를 생성합니다.", color: "border-purple-150 hover:border-purple-500 bg-slate-50/55" }
                      ].map((t, idx) => (
                        <div key={idx} className={`border rounded-2xl p-6 space-y-4 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between ${t.color}`}>
                          <div className="space-y-2.5 text-left">
                            <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">{t.title}</h4>
                            <span className="text-[11px] bg-white text-indigo-700 px-3 py-1 rounded-md text-slate-705 font-extrabold tracking-tight border inline-block select-none">{t.target}</span>
                            <p className="text-sm text-slate-650 leading-relaxed pt-1.5 font-sans font-normal break-keep">{t.desc}</p>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium block pt-2.5 border-t border-slate-200/50 text-left">AIEA Target System</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 8: AIEA 인증 (Bronze, Silver, Gold Tiers, 학교/교사/학원 탭) */}
                  <div className="bg-[#FAF9F6] rounded-3xl border-2 border-slate-200 py-16 sm:py-24 px-6 sm:px-14 my-14 sm:my-20 md:my-24 space-y-16 shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
                    
                    <div className="relative space-y-6 text-center max-w-4xl mx-auto z-10">
                      <span className="text-xs sm:text-sm text-amber-700 font-extrabold tracking-[0.2em] uppercase block">SECTION 08 . AIEA QUALITY CERTIFICATION</span>
                      <h3 className="text-3xl sm:text-4xl md:text-[42px] font-black text-slate-905 tracking-tight leading-normal text-center">
                        미래형 평가 혁신의 지표, AIEA 공인 인증 마크
                      </h3>
                      <p className="text-base sm:text-lg text-slate-605 max-w-2xl mx-auto leading-relaxed text-center font-normal">
                        엄밀한 인공지능 대비 평가 기준 검수 과정을 수료한 학교, 교사, 교육 기관의 최고 역량 권위를 증명해보세요.
                      </p>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="relative z-10 flex justify-center gap-1.5 bg-slate-200/60 border border-slate-300/50 rounded-2xl p-1.5 max-w-lg mx-auto">
                      {[
                        { id: "school", label: "선도학교 인증 ID카드" },
                        { id: "teacher", label: "연구교사 인증 ID카드" },
                        { id: "academy", label: "우수학원 인증 ID카드" }
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setCertTab(tab.id as any)}
                          className={`flex-1 text-xs font-black py-3 px-4 rounded-xl cursor-pointer transition-all ${
                            certTab === tab.id 
                              ? "bg-slate-900 text-amber-100 shadow-md scale-102" 
                              : "text-slate-700 hover:bg-white/50"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Certification card display */}
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                      {[
                        {
                          tier: "BRONZE LEVEL",
                          colorClasses: "border-amber-600 bg-amber-50/5 ring-amber-500/10",
                          target: "평가 개혁 입문",
                          benefit: "정기 도구 50% 무료 배부 및 디지털 인증 마크 교부",
                          desc: "기출 평가 정량 검수 결과 미래형 성과 척도 부합도 40% 이상 만족 및 연간 미래식 전환 10회 이상 돌파 시 발부되는 인증 단계입니다.",
                          colorText: "text-amber-800"
                        },
                        {
                          tier: "SILVER LEVEL",
                          colorClasses: "border-slate-400 bg-slate-50/10 ring-slate-400/10",
                          target: "평가혁신 우수 기관",
                          benefit: "AIEA 실물 공인 아크릴 현판 수여 및 연수 심사 무상 지원",
                          desc: "전체 지필 문항 중 단순 암기 마킹을 탈피한 역량형 모형이 70% 이상을 영구 고수하여 위원회의 다각적 서류 및 현장 실사를 완수한 수준입니다.",
                          colorText: "text-slate-700"
                        },
                        {
                          tier: "GOLD LEVEL",
                          colorClasses: "border-yellow-600 bg-amber-50/10 ring-yellow-500/20",
                          target: "선도 최고 권위 명예",
                          benefit: "AIEA 골드 인장 부착 명판 헌정 및 최고 권위 장학 특례 배정",
                          desc: "기억 인출 단순 문항을 100% 영구 필터링 처리하고, 7대 미래 소양 분석 지표가 90% 이상 유도 배치 완료된 최고 지위에 걸맞은 공인 등급입니다.",
                          colorText: "text-yellow-750"
                        }
                      ].map((item, idx) => (
                        <div 
                          key={idx} 
                          className={`relative border-2 ${item.colorClasses} p-8 rounded-3xl flex flex-col justify-between space-y-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left bg-white shadow-sm`}
                        >
                          {/* Top Border Accents for Luxury Certificate Sensation */}
                          <div className="absolute inset-2 border border-dotted border-slate-300 rounded-2xl pointer-events-none opacity-60"></div>
                          
                          <div className="space-y-4 relative z-10">
                            <span className={`text-[11px] font-black tracking-widest block uppercase font-mono ${item.colorText}`}>
                              {item.tier} CERTIFICATE
                            </span>
                            <h4 className="font-extrabold text-slate-900 text-xl tracking-tight leading-tight">
                              {certTab === "school" && `AIEA 공인 ${item.tier.split(" ")[0]} 선도학교`}
                              {certTab === "teacher" && `AIEA 마스터 ${item.tier.split(" ")[0]} 우수교사`}
                              {certTab === "academy" && `AIEA ${item.tier.split(" ")[0]} 미래역량 학원`}
                            </h4>
                            
                            {/* Well-padded capsule/oval badge to prevent word breaking */}
                            <div className="py-2">
                              <span className="text-[11px] text-amber-950 bg-amber-100/80 px-3.5 py-1.5 rounded-full font-extrabold tracking-wider border border-amber-200 inline-block uppercase select-none">
                                {item.target}
                              </span>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed font-sans font-light break-keep">
                              {item.desc}
                            </p>
                          </div>
                          
                          <div className="pt-5 border-t border-dashed border-slate-200 space-y-2 relative z-10">
                            <span className="text-[11px] text-slate-400 font-extrabold block tracking-wider uppercase font-mono">핵심 우대 수혜 사양</span>
                            <span className="text-sm text-slate-800 font-bold leading-relaxed">{item.benefit}</span>
                            
                            {/* Signature stamp mock for true dignity */}
                            <div className="flex items-center justify-between pt-4 mt-2">
                              <span className="text-[10px] text-slate-400 font-serif">AIEA Committee Seal</span>
                              <div className="w-8 h-8 rounded-full border border-red-500 bg-red-50 text-red-650 flex items-center justify-center text-[8px] font-black tracking-tighter opacity-80 rotate-12">
                                공인인장
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Wide Authentic Certificate Sample (실물 인증 샘플 배치) */}
                    <div className="relative z-10 max-w-4xl mx-auto border-4 border-slate-800 p-3 bg-[#FCFBF7] rounded-3xl shadow-xl">
                      <div className="border border-double border-slate-700 p-8 sm:p-12 space-y-8 rounded-2xl relative overflow-hidden text-center">
                        <div className="absolute inset-0 bg-radial from-amber-500/5 to-transparent pointer-events-none"></div>
                        
                        {/* Certificate Header Banner */}
                        <div className="space-y-3">
                          <span className="text-xs uppercase tracking-[0.3em] font-serif text-slate-450 block">Official Certificate of Achievement</span>
                          <h4 className="text-3xl sm:text-4xl font-serif text-slate-900 font-semibold tracking-wide">
                            AIEA 국제 미래교육 검인증
                          </h4>
                          <span className="h-0.5 w-16 bg-amber-600/60 mx-auto block my-4"></span>
                        </div>

                        {/* Certificate Body */}
                        <div className="space-y-4 max-w-2xl mx-auto font-sans">
                          <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">This is to certify that</p>
                          <h5 className="text-2xl font-black text-indigo-950 my-2">이음School AI 우수 검인증 획득교</h5>
                          <p className="text-sm sm:text-base text-slate-700 leading-loose break-keep font-serif font-light max-w-xl mx-auto">
                            귀 교는 단순 기억 인출형 마킹 시험 절차를 영구 탈피하고 본 학회가 공인 인증 심사하는 <strong>'7대 미래 핵심 인지 소양 루브릭'</strong>을 출제 및 정기평가 평가 체계 전반에 모범적으로 도입하였음을 증명합니다.
                          </p>
                        </div>

                        {/* Certificate Footer */}
                        <div className="grid grid-cols-3 gap-4 items-center pt-8 border-t border-slate-200 max-w-xl mx-auto text-center">
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 block uppercase font-mono">Date</span>
                            <span className="text-xs text-slate-800 font-semibold font-mono">2026. 06. 04</span>
                          </div>
                          
                          {/* Luxury Shield Centerpiece */}
                          <div className="flex justify-center">
                            <div className="w-14 h-14 rounded-full bg-slate-900 text-amber-400 flex flex-col items-center justify-center border-2 border-amber-400 shadow-md">
                              <span className="text-[9px] font-black tracking-widest leading-none">AIEA</span>
                              <span className="text-[7px] font-mono mt-0.5">APPROVED</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 block uppercase font-mono">Authorized Registrar</span>
                            <span className="text-xs text-slate-900 font-serif font-bold italic block">AIEA 심사위원회</span>
                          </div>
                        </div>

                      </div>
                    </div>

                  </div>

                  {/* Section 9: 미래교육연구소 - 최신 가치 콘텐츠 (인라인 아코디언 및 요약 모달 연계) */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 py-16 sm:py-24 px-6 sm:px-14 my-14 sm:my-20 md:my-24 space-y-12 shadow-md">
                    <div className="space-y-6 text-center max-w-4xl mx-auto">
                      <span className="text-xs sm:text-sm text-indigo-600 font-extrabold tracking-[0.2em] uppercase block">SECTION 09 . FUTURE EDUCATION INSIGHTS</span>
                      <h3 className="text-3xl sm:text-4xl md:text-[40px] font-black text-slate-900 tracking-tight leading-tight">
                        미래교육연구소 최신 콘텐츠 연구 자료실
                      </h3>
                      <p className="text-base sm:text-lg text-slate-605 max-w-2xl mx-auto leading-relaxed">
                        아래의 4가지 가치 칼럼과 글로벌 동향 카드를 클릭해 보세요. 설명서 내용이 넓고 품위 있게 그 자리에서 즉시 열립니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 sm:mt-14 items-start">
                      {[
                        { title: "AI 시대 시험은 어떻게 바뀌어야 하는가", label: "수행칼럼", author: "김정식 이사장", date: "2026.05.28", text: "오늘날 주입형 5지선다는 인관적인 수명 한계에 직면했습니다. 생성형 인공지능이 무모하게 성찰을 대필하지 못하게 만드는 최선예의 평가 프레임워크는 대안 서사, 상황 비평, 1차 사료 교차 조율의 결합을 통해서만 완벽히 복구 가능합니다." },
                        { title: "OECD 미래역량 보고서", label: "학술동향", author: "OECD 교육국 위원회", date: "2026.05.15", text: "교실과 평가 현장의 다차원 협력(Collaboration Agency)과 탐구적인 프롬프팅(Inquiry Prompting)은 다가오는 OECD 학습 나침반 2030의 핵심 화두입니다. 단순 기계식 암기를 탈피하고 다자간의 이익을 수렴하는 비평 훈련이 시급히 전 학교에 요구됩니다." },
                        { title: "핀란드 평가혁신 사례", label: "글로벌 모형", author: "비교 교육 학회", date: "2026.04.10", text: "핀란드 주요 국공립 교육망은 표준형 객관식 정기 자격 평가 축을 전량 폐쇄하는 혁신을 개시했습니다. 학생 개별 포트폴리오를 구성하고 실생활 현안에 대한 해결 루프를 매일 점검하며 교사가 성찰적 멘티 관계자 역할을 전념 구축하고 있습니다." },
                        { title: "싱가포르 AI 교육정책", label: "국가전략", author: "싱가포르 MOE 보고서", date: "2026.03.02", text: "싱가포르 국가 차원의 대형 인재 설계망은 교사의 서술형 답안 채점 강도 노고를 이음 기술형 이중 전수 분석 AI 시스템으로 자동 1차 위탁 조율 처리했습니다. 이를 통해 확보된 교육 역량을 학생의 인격 도야와 정서 정위 영역 교육에 적극 투입하는 정책을 영위 성과 중입니다." }
                      ].map((item, idx) => {
                        const isExpanded = selectedResearchTitle === item.title;
                        return (
                          <div 
                            key={idx}
                            onClick={() => {
                              setSelectedResearchTitle(isExpanded ? null : item.title);
                            }}
                            className={`border rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-lg cursor-pointer transition-all duration-300 flex flex-col justify-between text-left group min-h-[220px] ${
                              isExpanded 
                                ? "bg-indigo-50/50 border-indigo-500 ring-2 ring-indigo-500/15" 
                                : "bg-slate-50/60 hover:bg-white border-slate-200"
                            }`}
                          >
                            <div className="space-y-4 font-sans text-left">
                              <span className="text-[10px] bg-indigo-100 border border-indigo-200 text-indigo-700 px-3 py-1 rounded-full font-black select-none inline-block uppercase tracking-wider">
                                {item.label}
                              </span>
                              
                              {/* Significantly larger title & NO emojis behind it */}
                              <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-snug group-hover:text-indigo-650 transition-colors">
                                {item.title}
                              </h4>

                              {/* Collapsible details dynamically styled with clean and spacious Korean writing */}
                              <AnimatePresence>
                                {isExpanded ? (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="pt-2"
                                  >
                                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-normal bg-white p-4 rounded-xl border border-indigo-100 shadow-xs whitespace-pre-line font-sans break-keep select-text mt-2">
                                      {item.text}
                                    </p>
                                  </motion.div>
                                ) : (
                                  <p className="text-xs text-indigo-600 font-bold hover:underline flex items-center gap-1 pt-2">
                                    <span>📄 글 내용 자세히 보기</span>
                                    <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                                  </p>
                                )}
                              </AnimatePresence>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400 font-bold">
                              <span>{item.author}</span>
                              <span>{item.date}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Direct elegant connection to the sub-pages of the Future Education Lab */}
                    <div className="pt-8 sm:pt-12 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="space-y-1.5 text-left">
                        <h4 className="font-black text-[#1E1145] text-base sm:text-lg">🔬 더 상세한 전문 연구와 가이드를 공유하고 싶으신가요?</h4>
                        <p className="text-xs sm:text-sm text-slate-500 leading-normal">
                          이음School AI 미래교육연구소 공식 대메뉴 하위 페이지로 즉시 연결되어 풍부한 정책 레포트 수령, 가이드북 원본 소장 및 전문가 웨비나 티켓 예매를 무료로 진행하실 수 있습니다.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setCurrentTab("lab");
                          setSelectedSubmenu("연구자료");
                        }}
                        className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer shadow-md shadow-indigo-100 inline-flex items-center gap-2 whitespace-nowrap self-stretch md:self-auto justify-center"
                      >
                        미래연구소 공식 다운로드 자료실 바로가기 ➔
                      </button>
                    </div>
                  </div>

                  {/* Section 10: 지속 가능한 미래 협력 동반 연대 (수익화 설계 & 자율 부담 연구 활성화) */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 py-16 sm:py-24 px-8 sm:px-14 my-14 sm:my-20 md:my-24 space-y-12 shadow-md">
                    <div className="space-y-8 text-center max-w-4xl mx-auto mb-6">
                      <span className="text-xs sm:text-sm text-indigo-600 font-extrabold tracking-[0.2em] uppercase block mb-2">SECTION 10 . SUSTAINABLE COOPERATION</span>
                      <h3 className="text-3xl sm:text-4xl md:text-[40px] font-black text-slate-900 tracking-tight leading-normal sm:leading-relaxed md:leading-[1.45] text-center">
                        이음School AI 자율 협동 생태계 후원 및 지원 방식
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-slate-650 max-w-3xl mx-auto leading-relaxed sm:leading-loose mt-6 sm:mt-8 text-center font-normal break-keep">
                        개인 학생 평생 무료 가치 관념을 영구 고수하여 학업 진단 참여 문턱을 완벽히 낮추고, 공교육 현장 및 전문 연수 위탁 교육기관의 자율적인 기부 연구 및 미래 혁신 문형 연구회 연계 자율 후원 모델을 합리적으로 조율하여 지속가능하고 따뜻한 공동 연구 생태계를 영구 도모합니다.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-sans mt-10 sm:mt-14">
                      
                      {/* Trial */}
                      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs flex flex-col justify-between hover:border-slate-350 transition-all">
                        <div className="space-y-4 font-sans">
                          <div className="space-y-1 font-sans">
                            <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Trial Option</span>
                            <h4 className="text-lg font-black text-slate-800">학생 자가평가 자가진단</h4>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                            학생들이 재미로 직접 스마트폰을 가지고 우리 학원이나 학교 지엽 시험문제를 넣고 7대 역량 리포트 예시를 즉시 수령 가능한 라이드 체험 영역입니다.
                          </p>
                          <div className="text-2xl font-black text-slate-900 font-mono">
                            ₩0 <span className="text-xs text-slate-450 font-normal">평생 무료</span>
                          </div>
                          <ul className="text-[11px] space-y-2 text-slate-600 font-medium">
                            <li>• 7대 지재 자가 역량 프리뷰 체험</li>
                            <li>• 과거 문제 ➔ 미래 문제 임시 출력</li>
                            <li>• 인적 루브릭 핵심 가이드 공유</li>
                          </ul>
                        </div>
                        <button className="w-full py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 font-extrabold rounded-xl text-xs transition-all cursor-pointer">
                          체험 모드 상시 가동 중
                        </button>
                      </div>

                      {/* Teacher */}
                      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs flex flex-col justify-between hover:border-slate-350 transition-all">
                        <div className="space-y-4 font-sans">
                          <div className="space-y-1 font-sans">
                            <span className="text-[10px] text-indigo-600 font-extrabold uppercase block">Active Educator</span>
                            <h4 className="text-lg font-black text-indigo-900">개인 교사 자율 후원</h4>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                            출제 및 채점 업무에 실시간 교정을 도입하여 고난이도 고교 모의고사, 에세이 수행 평가 문안 변환 기능을 무제한 성찰 출력하는 교사용 최적 사양입니다.
                          </p>
                          <div className="text-lg font-black text-slate-900 font-sans">
                            연 ₩120,000 <span className="text-xs text-slate-450 font-normal">/ 교사 1인</span>
                            <span className="text-[10px] text-indigo-600 font-bold block mt-1">(한달 ₩10,000 수준의 부담 없는 동참금)</span>
                          </div>
                          <ul className="text-[11px] space-y-2 text-slate-600 font-medium">
                            <li>• 대안 문평 시안 무제한 마법 개조</li>
                            <li>• 학년군 맞춤 평가 기준 리포트 다운</li>
                            <li>• 7대 역량 교사용 상세 평가안 교부</li>
                          </ul>
                        </div>
                        <button className="w-full py-2.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-extrabold rounded-xl text-xs transition-all cursor-pointer">
                          개인 신청 즉시 개시 가능
                        </button>
                      </div>

                      {/* School */}
                      <div className="bg-[#EEF2FF] border-2 border-indigo-500 rounded-3xl p-6 space-y-6 shadow-sm flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-indigo-600 text-white font-black text-[9px] px-2.5 py-1 rounded-bl">
                          가장 인기
                        </div>
                        <div className="space-y-4 font-sans">
                          <div className="space-y-1 font-sans">
                            <span className="text-[10px] text-indigo-600 font-bold uppercase block">Official School</span>
                            <h4 className="text-lg font-black text-indigo-950">선도학교 기관 참여</h4>
                          </div>
                          <p className="text-[11px] sm:text-xs text-indigo-900 font-normal leading-relaxed">
                            에듀테크 실증 선도학교 및 평가 혁신 연구 교과 협의회 등을 전방위 지원하는 패키지입니다. 전교사 계정이 연계되며 AIEA 현판 및 검인증 장학 실사와 강사 지원이 전제됩니다.
                          </p>
                          <div className="text-2xl font-black text-indigo-950 font-mono">
                            연 ₩1,200,000 <span className="text-xs text-indigo-700 font-normal">/ 학교 단위</span>
                          </div>
                          <ul className="text-[11px] space-y-2 text-indigo-900 font-semibold font-sans">
                            <li>• 전교사 무제한 라이선싱 즉시 승계</li>
                            <li>• AIEA 공식 교서 정기 검증 & 현판 우편</li>
                            <li>• 교육청 장학 실적용 1년 누계 통계 제출</li>
                          </ul>
                        </div>
                        <button className="w-full py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 font-extrabold rounded-xl text-xs transition-all cursor-pointer">
                          학교 협력 자율 지원 신청 ➔
                        </button>
                      </div>

                      {/* Academy */}
                      <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-xs flex flex-col justify-between hover:border-slate-350 transition-all">
                        <div className="space-y-4 font-sans">
                          <div className="space-y-1 font-sans">
                            <span className="text-[10px] text-emerald-600 font-extrabold uppercase block font-sans">Academy Business</span>
                            <h4 className="text-lg font-black text-slate-800">프랜차이즈 학원 특화</h4>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-500 font-normal leading-relaxed">
                            주입식 단순 선행 단속의 지적 우려에 방어 논거를 확보하고, 앞서가는 7대 미래 역량 프레임을 학부모 전단 설명회 자료에 공식 활용 가능한 기업형 라이선스입니다.
                          </p>
                          <div className="text-2xl font-black text-slate-900 font-mono">
                            연 ₩600,000 <span className="text-xs text-slate-450 font-normal">/ 학원 지점</span>
                          </div>
                          <ul className="text-[11px] space-y-2 text-slate-600 font-medium font-sans">
                            <li>• 학원 원생 동반 성향 가늠 API 연동</li>
                            <li>• 학부모 보고서 로고 및 지표 커스텀</li>
                            <li>• AIEA 골드/실버 인증학원 로고 교부</li>
                          </ul>
                        </div>
                        <button className="w-full py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 font-extrabold rounded-xl text-xs transition-all cursor-pointer">
                          학동인 증설 연안 취득
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Section 10: CTA (최종 행동 유도) */}
                  <div className="relative overflow-hidden rounded-3xl bg-[#1E1145] p-8 sm:p-14 text-white shadow-xl border border-white/5 my-14 sm:my-20 md:my-24">
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"></div>

                    <div className="relative max-w-3xl mx-auto text-center space-y-8">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-teal-300 text-xs sm:text-sm font-black tracking-widest uppercase">
                        ⚡ AI ERA ASSESSMENT TRANSFORMATION
                      </span>

                      <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-snug">
                        우리 학교 시험은 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-yellow-350">미래를 평가하고 있습니까?</span>
                      </h3>

                      <p className="text-sm sm:text-base text-indigo-150 max-w-2xl mx-auto leading-relaxed mt-4 sm:mt-6">
                        지금 시험지 한글 파일이나 PDF를 전송해보세요. <br />
                        AIEA 지능 엔진이 암기 한 한계점을 실시간 도출하고 완벽한 실생활 프로젝트형 문제로 완전 개조해드립니다.
                      </p>

                      <div className="flex justify-center gap-4 pt-8 mt-10 sm:mt-12">
                        <button
                          onClick={() => { setCurrentTab("evaluation"); setSelectedSubmenu("시험지 업로드"); }}
                          className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm sm:text-base font-black transition-all cursor-pointer shadow-lg shadow-indigo-900/30 inline-flex items-center gap-2"
                        >
                          무료 시험지 분석하기 ⚡
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Section 11: Real-time Evaluation History and Philosophy Side-by-Side */}
                  <div className="bg-white rounded-3xl border border-slate-200/85 py-16 sm:py-24 px-8 sm:px-14 my-14 sm:my-20 md:my-24 space-y-12 shadow-md">
                    <div className="space-y-8 text-center max-w-4xl mx-auto mb-6">
                      <span className="text-xs sm:text-sm text-indigo-600 font-extrabold tracking-[0.2em] uppercase block mb-2">SECTION 11 . REAL-TIME HISTORY & PHILOSOPHY</span>
                      <h3 className="text-3xl sm:text-4xl md:text-[40px] font-black text-slate-900 tracking-tight leading-normal sm:leading-relaxed md:leading-[1.45] text-center">
                        학교별 실제 진단 이력 및 평가 철학
                      </h3>
                      <p className="text-base sm:text-lg md:text-xl text-slate-650 max-w-3xl mx-auto leading-relaxed sm:leading-loose mt-6 sm:mt-8 text-center font-normal">
                        전국 초·중·고등학교 및 교육 단체의 검인증 위탁 실시간 진단 기록과 미래 지적 성장을 견인할 평가 철학을 탐구하십시오.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-10 sm:mt-14">
                      {/* Live History (Col width 8/12) */}
                      <div className="lg:col-span-8 space-y-4">
                        <HistorySection 
                          history={history}
                          selectedId={selectedResultId}
                          onSelectResult={handleSelectHistoryItem}
                          onDeleteHistory={handleDeleteHistory}
                          onClearAll={handleClearAllHistory}
                        />
                      </div>

                      {/* Philosophy Card (Col width 4/12) */}
                      <div className="lg:col-span-4 rounded-3xl border-2 border-indigo-200 bg-[#1E1145] p-8 sm:p-10 space-y-8 shadow-xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"></div>
                        
                        <div className="flex items-center gap-3 relative z-10">
                          <div className="p-3 rounded-2xl bg-indigo-500/30 text-amber-300 border border-indigo-400/20">
                            <Brain className="w-7 h-7 shrink-0" />
                          </div>
                          <span className="text-lg sm:text-xl font-black text-amber-200 tracking-wider font-sans uppercase">
                            AIEA 평가 신념
                          </span>
                        </div>

                        <div className="space-y-6 relative z-10 font-serif">
                          <p className="text-lg sm:text-xl md:text-2xl font-bold leading-relaxed text-amber-100/90 tracking-tight">
                            &ldquo;단 하나의 문항 평가 개혁이 공교육의 지적 권위를 일깨우는 주춧돌입니다.&rdquo;
                          </p>
                          
                          <div className="space-y-4 text-xs sm:text-sm text-indigo-100 font-sans font-light leading-loose break-keep">
                            <p>
                              참된 평가란 기성 시험지의 마킹 정답률을 기록하는 수동적 경쟁 기능이 아닙니다. 이음School AI가 견인하는 평가는 <strong>학생 저마다의 고유한 주도적 지성</strong>을 서사화하고, 스스로 판단의 주체로서 논거를 교정해내는 고차원 정성 추론 과정 자체의 완벽한 증명이어야 합니다.
                            </p>
                            <p className="border-l-2 border-amber-500/40 pl-3 italic text-amber-200/95">
                              우리는 단순 교과서 정답 매칭을 통째로 부정하며, 교육의 위엄과 장학의 품격을 영구히 승계할 명예로운 루브릭 기준을 타협 없이 엄수하고 헌정할 것을 엄숙히 약속합니다.
                            </p>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-indigo-500/40 flex items-center justify-between text-xs text-amber-400 font-extrabold relative z-10">
                          <span className="flex items-center gap-1.5 font-mono uppercase tracking-[0.1em]">
                            <ShieldCheck className="w-5 h-5 text-teal-400" />
                            AIEA 공정성 신조
                          </span>
                          <span className="bg-amber-400/10 text-amber-300 px-2.5 py-1 rounded-md border border-amber-400/20">철학 엄수 교부</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}

              {/* ② 평가진단 Tab */}
              {currentTab === "evaluation" && (
                <motion.div
                  key="evaluation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <MainEvaluator 
                    onAddHistory={handleAddHistory}
                    selectedResultId={selectedResultId}
                    history={history}
                    onSelectResult={handleSelectHistoryItem}
                    onNavigateToCreator={() => {
                      setCurrentTab("innovation");
                      setSelectedSubmenu("미래형 전환");
                    }}
                    initialSubmenu={selectedSubmenu}
                  />
                </motion.div>
              )}

              {/* ③ 평가혁신 Tab */}
              {currentTab === "innovation" && (
                <motion.div
                  key="innovation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <QuestionCreator 
                    onAddHistory={handleAddHistory}
                    selectedResult={history.find(r => r.id === selectedResultId) || null}
                    history={history}
                    onSelectResult={handleSelectHistoryItem}
                    initialSubmenu={selectedSubmenu}
                  />
                </motion.div>
              )}

              {/* ④ 역량분석 Tab */}
              {currentTab === "competency" && (
                <motion.div
                  key="competency"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CompetencySection initialSubmenu={selectedSubmenu} />
                </motion.div>
              )}

              {/* ⑤ AIEA 인증 Tab */}
              {currentTab === "certification" && (
                <motion.div
                  key="certification"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CertificationSection initialSubmenu={selectedSubmenu} />
                </motion.div>
              )}

              {/* ⑦ 미래교육연구소 Tab */}
              {currentTab === "lab" && (
                <motion.div
                  key="lab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <LabSection initialSubmenu={selectedSubmenu} />
                </motion.div>
              )}

            </AnimatePresence>
          </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-indigo-50 mt-20 py-8 text-center text-sm text-slate-550 font-normal leading-relaxed">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-extrabold text-[#1E1145] text-sm sm:text-base">© 2026 이음School AI - AIEA (Assessment Excellence Certification). All rights reserved.</p>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-450 font-normal leading-relaxed font-sans">
            본 혁신 플랫폼은 Google GenAI 모델을 활용하여 선생님과 학부모가 객관적인 학술 척도하에 학생들의 주도성 역량을 가늠하고 대안 문안을 공동 기획할 수 있도록 돕는 지능화 보조 도구입니다.
          </p>
        </div>
      </footer>

      {/* MOCK LOGIN MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={() => setShowLoginModal(false)}></div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-indigo-50 shadow-2xl p-6 sm:p-8 w-full max-w-sm relative z-10 space-y-5"
            >
              <button onClick={() => setShowLoginModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center space-y-2">
                <img 
                  src="/src/assets/images/ium_school_logo_1780542475380.png" 
                  className="w-16 h-16 object-contain rounded-2xl drop-shadow-md mx-auto" 
                  alt="이음School AI 로고" 
                  referrerPolicy="no-referrer"
                />
                <h3 className="text-lg sm:text-xl font-black text-slate-800">이음School AI 로그인</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">교사 및 학무모 공동인증망 계정으로 편리하게 접속하세요.</p>
              </div>

              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">이메일 주소</label>
                  <input type="email" placeholder="example@school.go.kr" className="w-full text-sm rounded-xl border border-slate-200 p-2.5 bg-white text-slate-700 focus:outline-none focus:border-indigo-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">비밀번호</label>
                  <input type="password" placeholder="••••••••" className="w-full text-sm rounded-xl border border-slate-200 p-2.5 bg-white text-slate-700 focus:outline-none focus:border-indigo-600" />
                </div>
                
                <button
                  onClick={() => { setShowLoginModal(false); alert("이음스쿨 나이스(NEIS) 에듀파인 로그인이 성공적으로 연계되었습니다!"); }}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-indigo-100 hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  통합 에듀 ID 로그인 🔒
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOCK REGISTER MODAL */}
      <AnimatePresence>
        {showRegisterModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs" onClick={() => setShowRegisterModal(false)}></div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-indigo-50 shadow-2xl p-6 sm:p-8 w-full max-w-sm relative z-10 space-y-4"
            >
              <button onClick={() => setShowRegisterModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
              
              <div className="text-center space-y-2">
                <img 
                  src="/src/assets/images/ium_school_logo_1780542475380.png" 
                  className="w-16 h-16 object-contain rounded-2xl drop-shadow-md mx-auto" 
                  alt="이음School AI 로고" 
                  referrerPolicy="no-referrer"
                />
                <h3 className="text-lg sm:text-xl font-black text-slate-800">이음교사/학원 통합 가입</h3>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">교사 증빙 처리를 완료하면 AIEA 평가 권한이 자동 수여됩니다.</p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">이름 (성명)</label>
                  <input type="text" placeholder="홍길동" className="w-full text-sm rounded-xl border border-slate-200 p-2 bg-white focus:outline-none focus:border-indigo-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">적용기관/학교명</label>
                  <input type="text" placeholder="경기 늘푸른고등학교" className="w-full text-sm rounded-xl border border-slate-200 p-2 bg-white focus:outline-none focus:border-indigo-600" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-550 block">이메일 주소</label>
                  <input type="email" placeholder="example@school.go.kr" className="w-full text-sm rounded-xl border border-slate-200 p-2 bg-white focus:outline-none focus:border-indigo-600" />
                </div>
                
                <button
                  onClick={() => { setShowRegisterModal(false); alert("이음스쿨 AI 신규 에듀 가입 신청이 수락되었습니다. 인증 메일을 재확인하여 주십시오."); }}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs sm:text-sm font-bold hover:bg-indigo-700 transition-all cursor-pointer"
                >
                  공인 연수회원 신규 등록 신청 🔑
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
