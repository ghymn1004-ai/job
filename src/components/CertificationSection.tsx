/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Building2, 
  UserCheck, 
  GraduationCap, 
  MapPin, 
  CheckCircle, 
  FileText, 
  Send, 
  Search, 
  ShieldCheck, 
  Award, 
  Cpu, 
  Mail, 
  Phone, 
  Users,
  CheckCircle2,
  Lock,
  Sparkles,
  RefreshCw,
  CreditCard,
  DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CertificationSectionProps {
  initialSubmenu?: string | null;
}

// Simulated active list of certified partners
const CERTIFIED_PARTNERS = [
  { id: 1, type: "school", name: "서울 미래창의고등학교", area: "서울 마포구", date: "2026.04.12", certificateNo: "AIEA-S-2026-0041" },
  { id: 2, type: "school", name: "부산 센텀융합중학교", area: "부산 해운대구", date: "2026.05.02", certificateNo: "AIEA-S-2026-0059" },
  { id: 3, type: "teacher", name: "김은지 교사 (물리)", area: "경기 대안삼중", date: "2026.03.18", certificateNo: "AIEA-T-2521" },
  { id: 4, type: "academy", name: "대치 미래에세이 학원", area: "서울 강남구", date: "2026.05.21", certificateNo: "AIEA-A-2026-0103" },
  { id: 5, type: "school", name: "인천 글로벌에듀 초등학교", area: "인천 연수구", date: "2026.05.28", certificateNo: "AIEA-S-2026-0112" },
  { id: 6, type: "teacher", name: "박선우 강사 (영어)", area: "광주 남구 대치캠", date: "2026.05.30", certificateNo: "AIEA-T-2598" }
];

export default function CertificationSection({ initialSubmenu }: CertificationSectionProps) {
  const [activeTab, setActiveTab] = useState<"school" | "teacher" | "academy" | "status" | "apply">("school");
  
  // Certificate live customize states
  const [certCustomName, setCertCustomName] = useState("이음 미래창의 고등학교");
  const [certCustomTier, setCertCustomTier] = useState<"Bronze" | "Silver" | "Gold" | "Platinum">("Gold");
  const [certDate, setCertDate] = useState("2026.06.02");
  const [certNo, setCertNo] = useState("AIEA-S-2026-0418");
  const [isDownloading, setIsDownloading] = useState(false);
  const [certDoneActive, setCertDoneActive] = useState(false);

  // Custom Sync if navigated via header submenus or if activeTab changes
  React.useEffect(() => {
    if (initialSubmenu) {
      const lower = initialSubmenu.toLowerCase();
      if (lower.includes("학교")) {
        setActiveTab("school");
        setCertCustomName("이음 미래창의 고등학교");
        setCertNo("AIEA-S-2026-0418");
      }
      else if (lower.includes("교사")) {
        setActiveTab("teacher");
        setCertCustomName("김서원 교사 (국어)");
        setCertNo("AIEA-T-2026-2584");
      }
      else if (lower.includes("학원")) {
        setActiveTab("academy");
        setCertCustomName("대치 미래에세이 학원");
        setCertNo("AIEA-A-2026-0103");
      }
      else if (lower.includes("현황")) {
        setActiveTab("status");
      }
      else if (lower.includes("신청")) {
        setActiveTab("apply");
      }
    }
  }, [initialSubmenu]);

  // Adjust default names when tabs are manually clicked
  const handleTabChange = (tab: "school" | "teacher" | "academy" | "status" | "apply") => {
    setActiveTab(tab);
    if (tab === "school") {
      setCertCustomName("이음 미래창의 고등학교");
      setCertNo("AIEA-S-2026-0418");
    } else if (tab === "teacher") {
      setCertCustomName("김서원 교사 (국어)");
      setCertNo("AIEA-T-2026-2584");
    } else if (tab === "academy") {
      setCertCustomName("대치 미래에세이 학원");
      setCertNo("AIEA-A-2026-0103");
    }
  };

  // Search filter for status tab
  const [statusSearch, setStatusSearch] = useState("");
  
  // Application Form States
  const [applicantType, setApplicantType] = useState("school");
  const [institutionName, setInstitutionName] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [sendingForm, setSendingForm] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    setSendingForm(true);
    setTimeout(() => {
      setSendingForm(false);
      setFormSubmitted(true);
    }, 1500);
  };

  const handleResetForm = () => {
    setInstitutionName("");
    setApplicantName("");
    setApplicantEmail("");
    setApplicantPhone("");
    setAgreeTerms(false);
    setFormSubmitted(false);
  };

  const filteredPartners = CERTIFIED_PARTNERS.filter(p => 
    p.name.includes(statusSearch) || 
    p.area.includes(statusSearch) || 
    p.certificateNo.includes(statusSearch)
  );

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in" id="certification-root">
      
      {/* Header Banner - AIEA Certification System */}
      <div className="bg-[#1E1145] rounded-3xl py-12 md:py-16 px-8 md:px-12 text-white shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse font-sans"></div>
        <div className="relative max-w-2xl space-y-6 md:space-y-8 flex-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-150 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <Award className="w-4 h-4 text-yellow-300" />
            이음School AI : AIEA 공식 교육 평가 공인 인증
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            AIEA 신뢰성 평가 인증관 (Certification)
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100/95 leading-relaxed font-medium">
            귀하의 학교, 학원 혹은 교사 본인의 주간 고사 평가 문항이 인공지능 시대에 걸맞은 적법 역량과 보완책을 유지하고 있는지 검정하여 공신력 있는 공식 <strong>AIEA 인증 로고와 인증서</strong>를 발부합니다.
          </p>
        </div>
        <div className="relative z-10 shrink-0 mx-auto md:mx-0 bg-white/5 border border-white/10 rounded-2xl p-4 shadow-xl">
          <img
            src="/src/assets/images/aiea_certified_badge_1780534544154.png"
            className="w-28 h-28 sm:w-36 sm:h-36 object-contain pointer-events-none drop-shadow-2xl"
            alt="AIEA Certified Shield Logo"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex flex-wrap gap-1">
        {[
          { id: "school", label: "학교 인증", icon: Building2 },
          { id: "teacher", label: "교사 인증", icon: UserCheck },
          { id: "academy", label: "학원 인증", icon: GraduationCap },
          { id: "status", label: "인증 현황", icon: CheckCircle },
          { id: "apply", label: "인증 신청", icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as any)}
              className={`flex-1 min-w-[100px] text-center py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSelected 
                  ? "bg-indigo-600 text-white shadow-xs animate-subtle-glow" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4 text-current" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Switchboard */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 md:p-6 shadow-xs min-h-[350px]">
        <AnimatePresence mode="wait">
          
          {/* ①/②/③ 학교, 교사, 학원 통합/인터랙티브 인증관 (학교, 교사, 학원에 맞춤화된 동적 정보 제공) */}
          {(activeTab === "school" || activeTab === "teacher" || activeTab === "academy") && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Tab Title Banner */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-indigo-50 pb-5 text-left">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-[#1E1145] text-lg sm:text-xl flex items-center gap-2 font-sans">
                    {activeTab === "school" && (
                      <>
                        <Building2 className="w-6 h-6 text-indigo-600 shrink-0" />
                        <span>AIEA 미래 선도 학교 인증 (AIEA-S Seal)</span>
                      </>
                    )}
                    {activeTab === "teacher" && (
                      <>
                        <UserCheck className="w-6 h-6 text-pink-600 shrink-0" />
                        <span>AIEA 미래 프로페셔널 교사 인증 (AIEA-T Tier)</span>
                      </>
                    )}
                    {activeTab === "academy" && (
                      <>
                        <GraduationCap className="w-6 h-6 text-teal-600 shrink-0" />
                        <span>AIEA 미래 우수 혁신 학원 인증 (AIEA-A Badge)</span>
                      </>
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold font-sans">
                    {activeTab === "school" && "전국 공·사립 초중고등학교 기출 정기고사 및 교재 지식 평가 심층 검증"}
                    {activeTab === "teacher" && "교사 개인의 출제 소양 강화, AI 완충 설계 역량 및 성찰적 평가 기획 증빙"}
                    {activeTab === "academy" && "과도한 단순 주입·암기 선행을 탈피하고 학생 본연의 메타 비판력을 키우는 학원 브랜딩"}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[11px] sm:text-xs font-black px-3.5 py-1.5 rounded-full border ${
                    activeTab === "school" ? "bg-indigo-50 border-indigo-200 text-indigo-700 font-sans" :
                    activeTab === "teacher" ? "bg-pink-50 border-pink-200 text-pink-700 font-sans" :
                    "bg-teal-50 border-teal-200 text-teal-700 font-sans"
                  }`}>
                    {activeTab === "school" && "정부 선도 지자체 가산 소임 연계"}
                    {activeTab === "teacher" && "누적 발급 2,540건 통과"}
                    {activeTab === "academy" && "학부모 추천 1순위 위시 지표"}
                  </span>
                </div>
              </div>

              {/* Magnificent Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
                
                {/* LEFT COLUMN: AIEA Detailed Certification Standards (AIEA 인증 기준) */}
                <div className="lg:col-span-6 space-y-8">
                  
                  {/* Part 1: Evaluation Philosophy */}
                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                      <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                      <h4 className="font-black text-slate-900 text-xs sm:text-sm font-sans">AIEA 평가 철학의 세대 대전환</h4>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                      {/* Past */}
                      <div className="bg-white rounded-xl p-4 border border-red-100 shadow-2xs relative overflow-hidden text-left">
                        <span className="absolute top-2 right-2 text-[10px] uppercase font-black px-1.5 py-0.5 bg-red-50 text-red-600 rounded-md select-none">과거 (Old Era)</span>
                        <h5 className="text-xs font-black text-red-600 mb-2 font-sans">지식 암기 검증형</h5>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-bold border-b pb-1">
                          <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[9px]">과거순서</span>
                          <span>지식</span>
                          <span className="text-slate-350">➔</span>
                          <span className="text-red-700 font-extrabold">암기</span>
                          <span className="text-slate-350">➔</span>
                          <span className="text-red-800 font-extrabold">정답</span>
                        </div>
                        <p className="text-[11px] text-slate-450 mt-2 leading-relaxed">
                          단순 시험 범위의 텍스트 매칭이나 주입식 암기로 도출하는 정오 가려내기형 문항으로, AI 기출 대필 표절에 무방비합니다.
                        </p>
                      </div>

                      {/* Future */}
                      <div className="bg-gradient-to-br from-indigo-50/20 to-teal-50/20 rounded-xl p-4 border border-indigo-150 shadow-2xs relative overflow-hidden text-left">
                        <span className="absolute top-2 right-2 text-[10px] uppercase font-black px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-md select-none">미래 (AIEA Era)</span>
                        <h5 className="text-xs font-black text-indigo-750 mb-2 font-sans font-sans">사고적 적용 생성 모형</h5>
                        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-indigo-750 font-bold border-b pb-1">
                          <span>지식</span>
                          <span className="text-indigo-400">➔</span>
                          <span className="text-indigo-700 font-extrabold font-sans">생각(Thinking)</span>
                          <span className="text-indigo-400">➔</span>
                          <span className="text-indigo-700 font-extrabold">적용</span>
                          <span className="text-teal-400">➔</span>
                          <span className="text-teal-700 font-extrabold">창조</span>
                        </div>
                        <p className="text-[11px] text-slate-550 mt-2 leading-relaxed font-sans">
                          AIEA 가이드라인. 기본 지식 인프라에서 시작하여 학생 내면의 비판적 사유, 조건 대입 해결력까지 다층 성찰 평가합니다.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Part 2: 7 Future Competencies */}
                  <div className="bg-white rounded-2xl p-5 border border-slate-150 space-y-4 shadow-3xs text-left">
                    <div className="flex items-center gap-2 border-b border-indigo-50 pb-2">
                       <Sparkles className="w-4 h-4 text-indigo-600 animate-spin-slow animate-pulse" />
                       <h4 className="font-extrabold text-slate-900 text-sm sm:text-base font-sans">이음School AI 확장 7대 미래 지적 역량</h4>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium font-sans">AIEA 인증 프로그램은 교육 문항 설계 내에 아래 7가지 미래 핵심 역량이 녹아들도록 심의하고 가이드합니다.</p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans">
                      {[
                        { name: "질문력", sub: "Questioning", color: "bg-indigo-50 text-indigo-700 border-indigo-100" },
                        { name: "비판적 사고력", sub: "Critical Thinking", color: "bg-pink-50 text-pink-700 border-pink-100" },
                        { name: "문제해결력", sub: "Problem Solving", color: "bg-teal-50 text-teal-700 border-teal-100" },
                        { name: "창의력", sub: "Creativity", color: "bg-amber-50 text-amber-700 border-amber-100" },
                        { name: "협업능력", sub: "Collaboration", color: "bg-violet-50 text-violet-700 border-violet-100" },
                        { name: "의사소통능력", sub: "Communication", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                        { name: "AI 리터러시", sub: "AI Literacy", color: "bg-sky-50 text-sky-700 border-sky-100" }
                      ].map((comp, idx) => (
                        <div key={idx} className={`p-2 rounded-xl border text-center font-extrabold tracking-tight ${comp.color}`}>
                          <div className="text-xs font-black">{comp.name}</div>
                          <div className="text-[9px] uppercase font-mono opacity-80 mt-0.5">{comp.sub}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Part 3: Score Distribution & Thresholds */}
                  <div className="bg-white rounded-2xl p-6 border-2 border-indigo-150 space-y-6 shadow-xs text-left font-sans">
                    <div className="flex items-center gap-2 border-b border-indigo-100 pb-3">
                      <Cpu className="w-5 h-5 text-indigo-600 shrink-0" />
                      <h4 className="font-extrabold text-[#1E1145] text-lg sm:text-xl font-sans">🛡️ AIEA 등급별 공인 승인 기준 및 획득 가이드</h4>
                    </div>

                    {/* Verbatim Clear Answers to School & Teacher Inquiries */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Teacher Bronze */}
                      <div className="bg-amber-50/40 p-5 rounded-2xl border border-amber-200 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🥉</span>
                          <h5 className="font-extrabold text-amber-950 text-base">교사 브론즈(Bronze) 획득 요건</h5>
                        </div>
                        <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 font-sans leading-relaxed">
                          <li>• <strong>평가 점수:</strong> 종합 평가 총점 <strong>60점 ~ 69점</strong> 충족</li>
                          <li>• <strong>대상 요건:</strong> 교사 1인 단독 출제 시험지 1회 최적 분석 필</li>
                          <li>• <strong>혜택:</strong> AIEA 브론즈 전자 배지 및 교내 우수 교사 추천 공문</li>
                        </ul>
                      </div>

                      {/* School Gold */}
                      <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-200 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">🥇</span>
                          <h5 className="font-extrabold text-indigo-950 text-base">선도학교 골드(Gold) 획득 요건</h5>
                        </div>
                        <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 font-sans leading-relaxed">
                          <li>• <strong>평가 점수:</strong> 소속 학년군 과목 기출 평균 <strong>80점 ~ 89점</strong></li>
                          <li>• <strong>필수 검증 횟수:</strong> 학기별 또는 연간 <strong>최소 3회 이상</strong>의 정기고사 문항 공식 진단 및 AI 미래형 교정 추진 실적 필수 증빙</li>
                          <li>• <strong>혜택:</strong> 교문 현관 현판 세트, 연도별 분석 데이터북, 지자체 장학 실적 가점 보장</li>
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4 font-sans">
                      {/* Metric Breakdown */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm font-black text-slate-900 mb-3 border-b border-slate-200 pb-2 font-sans gap-2">
                          <span>📊 원안 문항별 정밀 4대 척도 입체 배점 (총 100점)</span>
                          <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">영역당 각 25점 만점</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs sm:text-sm font-sans">
                          <div className="bg-white p-3 rounded-xl border border-slate-150">
                            <span className="font-black text-slate-800 block">실제성 (25점)</span>
                            <span className="text-[10px] sm:text-xs text-slate-450 block mt-0.5 leading-snug">실생활 맥락 대입론</span>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-150">
                            <span className="font-black text-slate-800 block">탐구성 (25점)</span>
                            <span className="text-[10px] sm:text-xs text-slate-450 block mt-0.5 leading-snug">자료 비판 추론력</span>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-150">
                            <span className="font-black text-slate-800 block">근거성 (25점)</span>
                            <span className="text-[10px] sm:text-xs text-slate-450 block mt-0.5 leading-snug">논지 원천 사료 분석</span>
                          </div>
                          <div className="bg-white p-3 rounded-xl border border-slate-150">
                            <span className="font-black text-slate-800 block">적용성 (25점)</span>
                            <span className="text-[10px] sm:text-xs text-slate-450 block mt-0.5 leading-snug">대필 완충 루브릭</span>
                          </div>
                        </div>
                      </div>

                      {/* Thresholds Level Info */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center font-sans">
                        {[
                          { min: 90, max: 100, label: "Platinum", badge: "플래티넘", desc: "AIEA Platinum", color: "bg-[#1E1145] text-white shadow-xs" },
                          { min: 80, max: 89, label: "Gold", badge: "골드", desc: "AIEA Gold", color: "bg-amber-600 text-white shadow-3xs" },
                          { min: 70, max: 79, label: "Silver", badge: "실버", desc: "AIEA Silver", color: "bg-slate-500 text-white shadow-3xs" },
                          { min: 60, max: 69, label: "Bronze", badge: "브론즈", desc: "AIEA Bronze", color: "bg-amber-655 text-white shadow-3xs" },
                          { min: 0, max: 59, label: "개선필요", badge: "미달", desc: "개선 필요", color: "bg-red-50 text-red-650 border border-red-150" }
                        ].map((tier, idx) => (
                          <div key={idx} className={`p-2.5 rounded-xl flex flex-col justify-center space-y-1 ${tier.color}`}>
                            <span className="text-xs font-black">{tier.badge}</span>
                            <span className="text-[11px] font-mono leading-none">{tier.min}~{tier.max}점</span>
                            <span className="text-[10px] font-medium leading-none opacity-90">{tier.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Part 4: Case Report Example */}
                  <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 space-y-4 shadow-lg border border-slate-800 font-mono text-xs text-left">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-teal-400 font-bold block flex items-center gap-1.5 font-sans">
                        <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                        학교 리포트 예시: ○○중학교 2학년 역사
                      </span>
                      <span className="text-[10px] text-slate-500 font-sans font-bold">CASE STUDY.02</span>
                    </div>

                    <div className="space-y-2.5 leading-relaxed font-sans font-medium text-slate-350">
                      <div>
                        <span className="text-slate-500">진단 대상:</span> ○○중학교 2학년 역사
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-slate-500">AIEA 종합 Score:</span>{" "}
                          <span className="text-teal-400 font-extrabold font-mono text-[13px] bg-slate-950 px-2.5 py-0.5 rounded-full">72점 (등급: Silver)</span>
                        </div>
                      </div>

                      {/* Diagnostic Score Grid */}
                      <div className="grid grid-cols-4 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850 text-center font-bold text-[11px] font-mono">
                        <div>
                          <p className="text-slate-500 text-[10px] font-sans">실제성</p>
                          <p className="text-teal-300 font-black">85</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-[10px] font-sans">탐구성</p>
                          <p className="text-amber-300 font-black">65</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-[10px] font-sans">근거성</p>
                          <p className="text-indigo-300 font-black">70</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-[10px] font-sans">적용성</p>
                          <p className="text-pink-300 font-black">68</p>
                        </div>
                      </div>

                      <div className="bg-slate-950 p-3 rounded-xl border-l-4 border-amber-500 text-[11px] text-slate-300 leading-relaxed font-sans">
                        <strong className="text-yellow-400 font-black block mb-1">역사 교안 정밀 추천 개선책</strong>
                        &ldquo;지필 평가 20기출문항 정략 교차 검사 결과, 단순 역사적 연대기·정답 외교문서 단독 연상형(암기 중심) 문항 5개가 탐지되었습니다. 해당 지협적 문항을 본교 이음 인공지능 개조기를 통해 자료 추론, 인물들의 합리적 딜레마 및 한계 분석 시점 에세이형(수행·탐구 결합)으로 긴급 리디자인 개선을 조화롭게 권장합니다.&rdquo;
                      </div>
                    </div>
                  </div>

                  {/* Part 5: Ultimate Goal Statement */}
                  <div className="bg-[#1E1145] text-white rounded-2xl p-6 space-y-2 text-center relative overflow-hidden border border-white/5">
                    <span className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></span>
                    <span className="text-[10px] text-teal-300 uppercase tracking-widest font-black block font-sans">AIEA의 대표 가치 및 지향</span>
                    <h5 className="text-[13px] sm:text-sm font-extrabold text-slate-100 font-sans">
                      &ldquo;이음스쿨은 시험을 없애는 것이 아닙니다.&rdquo;
                    </h5>
                    <p className="text-xs sm:text-sm text-indigo-150 leading-relaxed font-sans font-light">
                      오직 정답 한 자만 암기식으로 평가하는 과거의 시험을 탈피하여, <br />
                      <strong className="text-teal-300 font-extrabold underline underline-offset-4 font-sans">정답을 평가하는 시험에서 생각을 평가하는 시험으로 바꾸는 것입니다.</strong>
                    </p>
                  </div>

                  {/* Part 6: Certification Pricing & Monetization Plans (수익화 영역 추가) */}
                  <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100 space-y-4 text-left">
                    <div className="flex items-center gap-2 border-b border-indigo-100 pb-2">
                      <CreditCard className="w-4 h-4 text-indigo-650" />
                      <h4 className="font-black text-[#1E1145] text-xs sm:text-sm font-sans">AIEA 공인 인증 비용 및 비즈니스 모델 수익화</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      AIEA 인증 획득은 단순 수료가 아닌 정기 기출 교정 컨설팅 및 보안 감리가 결합된 <strong>B2B/B2C 교육 신뢰성 등급 라이선스 비즈니스 모델</strong>로 운영됩니다.
                    </p>
                    <div className="space-y-2.5 font-sans">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-black text-slate-800 block">미래 선도 학교 인증 연수 (AIEA-S License)</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">현판 휘장 증정, 종합 연안 리포트 분석, 1년 갱신형</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-indigo-800 block">연 ₩1,200,000</span>
                          <span className="text-[9px] text-[#1E1145] font-black bg-indigo-50 px-1.5 py-0.5 rounded">지자체 대행</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-black text-slate-800 block">프로페셔널 교사 심사 (AIEA-T Tier Card)</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">개인 출제 포트폴리오 가이드 및 특화 변형기 1급 양도</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-pink-700 block">₩150,000 / 회</span>
                          <span className="text-[9px] text-pink-600 font-bold bg-pink-50 px-1.5 py-0.5 rounded">교육비 소급</span>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-black text-slate-800 block">프리미엄 미래 학원 공인 (AIEA-A Badge)</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">원내 성적 리포트 연동 전산 API, 브랜드 배포 브로슈어 패키지</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-emerald-700 block">연 ₩600,000</span>
                          <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">갱신 주기 완화</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: Interactive Certificate Sample (인증서 샘플) */}
                <div className="lg:col-span-6 space-y-6 select-none">
                  
                  {/* Dynamic Certificate Preview Container */}
                  <div className="bg-slate-100 rounded-3xl p-4 md:p-6 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between font-sans">
                      <span className="text-xs font-black text-[#1E1145] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                        AIEA 공인 인증서 샘플 (인증 실물 시뮬레이션)
                      </span>
                      <span className="text-[9px] bg-indigo-50 border border-indigo-150 text-indigo-700 font-black px-2.5 py-0.5 rounded uppercase font-mono">DRAFT</span>
                    </div>

                    {/* Highly Polished Parchment Certificate Card */}
                    <div className="relative bg-[#fcfbfa] rounded-2xl p-5 sm:p-10 border-8 border-double border-amber-600/50 shadow-md text-center font-serif text-slate-900 overflow-hidden max-w-lg mx-auto aspect-[3/4] flex flex-col justify-between selection:bg-transparent select-none">
                      
                      {/* Filigree corner accents */}
                      <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-600/40"></div>
                      <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-600/40"></div>
                      <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-600/40"></div>
                      <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-600/40"></div>

                      {/* Header and Emblem */}
                      <div className="space-y-1 pt-2 pointer-events-none flex flex-col items-center">
                        <img 
                          src="/src/assets/images/aiea_certified_badge_1780534544154.png" 
                          className="w-14 h-14 object-contain mb-1 drop-shadow-md" 
                          alt="AIEA 인증 마크" 
                          referrerPolicy="no-referrer"
                        />
                        <h4 className="text-[10px] sm:text-[11px] tracking-widest font-sans font-black text-amber-700 uppercase block">
                          AIEA International Academic Commission
                        </h4>
                        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent mx-auto"></div>
                      </div>

                      {/* Title */}
                      <div className="space-y-1 pointer-events-none">
                        <h2 className="text-base sm:text-2xl font-black text-slate-900 tracking-wide font-sans">
                          공 인 인 증 서
                        </h2>
                        <span className="text-[9px] tracking-wider text-slate-500 font-sans uppercase block">
                          Official Certificate of Evaluation Quality
                        </span>
                      </div>

                      {/* Recipient Dynamic Output */}
                      <div className="space-y-2 my-1">
                        <span className="text-[9px] text-slate-400 font-sans block">인 증 대 상 명</span>
                        <div className="text-base sm:text-lg font-extrabold text-[#1E1145] tracking-tight font-sans border-b border-dashed border-indigo-200 pb-1 max-w-xs mx-auto">
                          {certCustomName || "임시 지정 명칭"}
                        </div>
                        <span className="text-[10px] sm:text-[11px] text-slate-600 font-sans block leading-relaxed px-2 font-sans mt-1">
                          {activeTab === "school" && "귀하가 주최 배포한 원안 시험지는 이음공인 평가 표준을 성실히 만족함"}
                          {activeTab === "teacher" && "위 교사는 디지털 인지 고차원 문항 출제 설계 트랙을 완벽히 수료함"}
                          {activeTab === "academy" && "원내 모든 교육자료가 암기 족보식 선행을 탈피하고 탐구 능력을 함양함"}
                        </span>
                      </div>

                      {/* Standard Statement */}
                      <p className="text-[9px] sm:text-[10px] leading-relaxed text-slate-600 max-w-sm mx-auto font-sans font-normal">
                        위 평가는 이음AIEA 학술위원회가 영위하는 신뢰도 4대 표준 규격(실제성, 탐구성, 근거성, 적용성) 심사를 공정하게 검정하고, 미래 인공지능 시대에 요구되는 지적 역량 증강에 이바지하였으므로 그 탁월성을 공인합니다.
                      </p>

                      {/* Award Level Certification Stamp Dynamic block */}
                      <div className="my-1.5 pointer-events-none">
                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[10px] sm:text-xs font-black uppercase font-mono ${
                          certCustomTier === "Platinum" ? "bg-indigo-950 text-indigo-100 border-indigo-805 shadow-md animate-pulse" :
                          certCustomTier === "Gold" ? "bg-amber-100 text-amber-900 border-amber-300 shadow-xs" :
                          certCustomTier === "Silver" ? "bg-slate-105 text-slate-700 border-slate-300 shadow-3xs" :
                          "bg-amber-50 text-amber-800 border-amber-200"
                        }`}>
                          AIEA {certCustomTier.toUpperCase()} CERTIFICATE
                        </span>
                      </div>

                      {/* Date & Cert Code and Red Seal Signatures */}
                      <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pb-1 pt-3 text-left font-sans text-[9px] text-slate-500 select-none">
                        <div className="space-y-0.5">
                          <p>인증지정일: <span className="font-mono text-slate-800 font-bold">{certDate}</span></p>
                          <p>고유 번호: <span className="font-mono text-indigo-700 font-bold">{certNo}</span></p>
                        </div>
                        <div className="text-right flex items-center justify-end gap-1 font-sans">
                          <div>
                            <p className="font-bold text-slate-800 pointer-events-none leading-none">AIEA 학술위원회 이사장 김정식</p>
                            <p className="text-[8px] text-slate-400 mt-0.5">이음대표 장학관 공동 관인</p>
                          </div>
                          
                          {/* Animated circular official red ink seal stamp */}
                          <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center text-[8px] font-black shrink-0 text-red-550 font-mono rotate-12 select-none border-dashed bg-red-50/50">
                            AIEA印
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Interactive Sandbox Settings Panel to Customize Certificate */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-150 space-y-4 text-left">
                      <span className="text-xs font-black text-[#1E1145] block font-sans">실시간 인증서 출력용 매칭 값 조정</span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pb-1 font-sans">
                        
                        {/* Name Input */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-black text-slate-655 block">원하는 수료 처 / 이름 명칭</label>
                          <input 
                            type="text" 
                            value={certCustomName}
                            onChange={(e) => setCertCustomName(e.target.value)}
                            placeholder="예: 경기 푸른 고등학교"
                            className="w-full text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:outline-none focus:border-indigo-600"
                          />
                        </div>

                        {/* Tier Badge Picker */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-black text-slate-655 block">원하는 등급 (AIEA Tier)</label>
                          <div className="grid grid-cols-4 gap-1">
                            {(["Bronze", "Silver", "Gold", "Platinum"] as const).map((tier) => (
                              <button
                                key={tier}
                                onClick={() => setCertCustomTier(tier)}
                                className={`py-1.5 px-0.5 rounded-xl text-[10px] font-black text-center cursor-pointer transition-all border ${
                                  certCustomTier === tier 
                                    ? "bg-indigo-650 text-white border-indigo-700 shadow-xs" 
                                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                              >
                                {tier}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Issue Code */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-black text-slate-600 block font-sans">인증 고유 일괄 번호</label>
                          <input 
                            type="text" 
                            value={certNo}
                            onChange={(e) => setCertNo(e.target.value)}
                            className="w-full text-xs font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:outline-none focus:border-indigo-600"
                          />
                        </div>

                        {/* Issue Date */}
                        <div className="space-y-1 font-sans">
                          <label className="text-[11px] font-black text-slate-600 block">지정 발급 날짜</label>
                          <input 
                            type="text" 
                            value={certDate}
                            onChange={(e) => setCertDate(e.target.value)}
                            className="w-full text-xs font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 p-2.5 rounded-xl focus:outline-none focus:border-indigo-600"
                          />
                        </div>

                      </div>

                      {/* Mock Render Button */}
                      <div className="pt-1 space-y-3">
                        <button
                           onClick={() => {
                             setIsDownloading(true);
                             setCertDoneActive(false);
                             setTimeout(() => {
                               setIsDownloading(false);
                               setCertDoneActive(true);
                             }, 1300);
                           }}
                          disabled={isDownloading}
                          className="w-full py-3 bg-[#1E1145] hover:bg-[#2e1d62] disabled:bg-slate-200 disabled:text-slate-400 font-extrabold text-xs sm:text-sm text-white rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                        >
                          {isDownloading ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin text-white" />
                              <span>인증 고유 관인 및 도판 실시간 빌딩 중...</span>
                            </>
                          ) : (
                            <>
                              <Award className="w-4.5 h-4.5 text-yellow-300 animate-bounce" />
                              <span>내 원천 맞춤형 인증서 실물 포장 인쇄하기</span>
                            </>
                          )}
                        </button>

                        {/* Beautiful in-app success toast banner */}
                        <AnimatePresence>
                          {certDoneActive && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="p-4 rounded-xl border border-emerald-250 bg-emerald-50 text-emerald-950 text-left space-y-1"
                            >
                              <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs sm:text-sm">
                                <span>출력 처리를 안전하게 마쳤습니다!</span>
                              </div>
                              <p className="text-xs sm:text-sm font-medium leading-relaxed text-emerald-900">
                                <strong>[{certCustomName}]</strong> 소속의 <strong>AIEA {certCustomTier}</strong> 등급 공인 수료 인증서가 고화질 PDF 포맷으로 렌더링을 마쳤습니다!
                              </p>
                              <p className="text-[11px] text-emerald-700/80 leading-relaxed pt-1 border-t border-emerald-200/50">
                                * 제출하신 기출 시험지의 종합 검정 기준 심사를 최종 합격하면, 교육위원회 위원장님의 친필 서명 및 동판 휘장 관인 실물 액자 세트가 신속한 우편으로 학교 교실이나 직장에 등기 교부됩니다.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* ④ 인증 현황 Tab */}
          {activeTab === "status" && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 text-left">
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center gap-1.5">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    전국 AIEA 공인 인증 획득 현황 (Certified List)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold">교사, 학교, 학원 간의 실시간 승인 및 심사 필 목록판</p>
                </div>
                
                {/* Search in Status */}
                <div className="relative w-full sm:w-72">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={statusSearch}
                    onChange={(e) => setStatusSearch(e.target.value)}
                    placeholder="기관명 / 지역 / 인증번호 검색..."
                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-xs sm:text-sm text-slate-850 placeholder-slate-400 font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Table List representation */}
              <div className="border border-slate-150 rounded-2xl overflow-hidden bg-white text-left">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-150 font-bold text-slate-700">
                        <th className="p-4 pl-5">구분</th>
                        <th className="p-4">인증 기관/교사명</th>
                        <th className="p-4">소재지</th>
                        <th className="p-4">인증 승인 연월일</th>
                        <th className="p-4 pr-5 text-right">인증 승인 번호</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                      {filteredPartners.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 pl-5">
                            <span className={`text-[11px] sm:text-xs font-black px-2.5 py-1 rounded-md border uppercase ${
                              item.type === "school" 
                                ? "bg-indigo-50 border-indigo-150 text-indigo-700" 
                                : item.type === "teacher" 
                                ? "bg-pink-50 border-pink-150 text-pink-700" 
                                : "bg-teal-50 border-teal-150 text-teal-700"
                            }`}>
                              {item.type === "school" ? "학교" : item.type === "teacher" ? "교사" : "학원"}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-900 text-xs sm:text-sm">{item.name}</td>
                          <td className="p-4 flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            {item.area}
                          </td>
                          <td className="p-4 font-mono text-xs text-slate-550">{item.date}</td>
                          <td className="p-4 pr-5 text-right font-mono text-xs sm:text-sm font-semibold text-indigo-600">{item.certificateNo}</td>
                        </tr>
                      ))}

                      {filteredPartners.length === 0 && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-slate-400 font-medium text-xs sm:text-sm">
                            검색 조건에 해당된 공인 인증처가 존재하지 않습니다. 검색명을 재확인해주세요.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ⑤ 인증 신청 Tab */}
          {activeTab === "apply" && (
            <motion.div
              key="apply"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4 text-left"
            >
              <div className="border-b border-slate-100 pb-3">
                <span className="text-sm sm:text-base font-black text-slate-800 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  AIEA 공인 인증 즉시 신청서 접수
                </span>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans font-medium">입력하신 정보는 심사위원단에 격리 보존 후 심사 전형 서류로만 활용됩니다.</p>
              </div>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-4 max-w-md mx-auto">
                  <div className="inline-flex p-4 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 animate-bounce">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">인증 심사 원서가 무사히 접수되었습니다!</h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                      등록해주신 담당 연락처 및 이메일로 <strong>'AIEA 원서 접수번호 및 제출 가이드'</strong>가 3분 내로 전송됩니다. 본인 확인 이후 배정된 심사 학술위원이 분석 결과를 교차 교정합니다.
                    </p>
                  </div>
                  <button
                    onClick={handleResetForm}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer inline-flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    추가 인증 신청하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4 text-left font-sans font-semibold">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-650 block">인증 적용 신청 구분</label>
                      <select
                        value={applicantType}
                        onChange={(e) => setApplicantType(e.target.value)}
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 p-2.5 bg-white font-medium text-slate-755 focus:outline-none focus:border-indigo-500 cursor-pointer"
                      >
                        <option value="school">미래 공인학교 인증 (AIEA-S)</option>
                        <option value="teacher">프로페셔널 교사 인증 (AIEA-T)</option>
                        <option value="academy">입체 혁신 학원 인증 (AIEA-A)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-655 block">기관명 또는 소속 소임처</label>
                      <input
                        type="text"
                        value={institutionName}
                        onChange={(e) => setInstitutionName(e.target.value)}
                        placeholder="예: 경기 푸른중학교"
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 p-2.5 bg-white font-medium focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-650 block">신청자 성명 (담당 코디네이터)</label>
                      <input
                        type="text"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="예: 홍길동 부장교사"
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 p-2.5 bg-white font-medium focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-650 block">원서 접수 통지용 이메일 주소</label>
                      <input
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="example@school.go.kr"
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 p-2.5 bg-white font-medium focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs sm:text-sm font-bold text-slate-650 block">담당자 실전 휴대폰 번호</label>
                      <input
                        type="tel"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="010-XXXX-XXXX"
                        className="w-full text-xs sm:text-sm rounded-xl border border-slate-200 p-2.5 bg-white font-medium focus:outline-none focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <label className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        required
                      />
                      <span className="font-sans font-medium">
                        개인정보 취급 방침 및 전산 평가 검증을 위한 <strong>‘고사 기출자료 제출 기밀 유지 서약’</strong>에 동의하고, AIEA 학술 전산화 처리 위탁에 자율 서명합니다.
                      </span>
                    </label>

                    <div className="flex justify-end gap-2">
                      <button
                        type="submit"
                        disabled={sendingForm || !agreeTerms}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm transition-all disabled:bg-slate-100 disabled:text-slate-400 flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        {sendingForm ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            접수 중...
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            공인 인증 심사 전격 접수
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
