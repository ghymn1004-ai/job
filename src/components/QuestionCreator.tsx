/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  Zap, 
  GraduationCap, 
  Compass, 
  BookOpen,
  AlertTriangle,
  Lightbulb,
  Copy,
  Download,
  Check,
  RotateCcw,
  BookOpenCheck,
  Award
} from "lucide-react";
import { SubjectId, EvaluationResult } from "../types";
import { EXAM_EXAMPLES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface QuestionCreatorProps {
  onAddHistory: (result: EvaluationResult) => void;
  selectedResult: EvaluationResult | null;
  history: EvaluationResult[];
  onSelectResult: (result: EvaluationResult) => void;
  initialSubmenu?: string | null;
}

export type InnovationMode = "future" | "correction" | "improve" | "essay" | "performance";

export default function QuestionCreator({
  onAddHistory,
  selectedResult,
  history,
  onSelectResult,
  initialSubmenu
}: QuestionCreatorProps) {
  const [questionText, setQuestionText] = useState("");
  const [subject, setSubject] = useState<SubjectId>("korean");
  const [gradeLevel, setGradeLevel] = useState("고등학교 1학년");
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Evaluation Innovation Submode State
  const [innovationMode, setInnovationMode] = useState<InnovationMode>("future");
  const [rewriteFormat, setRewriteFormat] = useState<"multiple_choice" | "essay">("multiple_choice");

  // Interactive UI Feedbacks
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  // Synchronize component state with globally selected diagnostic result (if any)
  useEffect(() => {
    if (selectedResult) {
      setCurrentResult(selectedResult);
      setQuestionText(selectedResult.questionText);
      setSubject(selectedResult.subject);
      setGradeLevel(selectedResult.gradeLevel);
    }
  }, [selectedResult]);

  // Synchronize with parent navigation submenu clicks
  useEffect(() => {
    if (initialSubmenu) {
      const lower = initialSubmenu.toLowerCase();
      if (lower.includes("미래형") || lower.includes("future")) setInnovationMode("future");
      else if (lower.includes("교정") || lower.includes("correction")) setInnovationMode("correction");
      else if (lower.includes("개선") || lower.includes("improve")) setInnovationMode("improve");
      else if (lower.includes("논술") || lower.includes("essay")) setInnovationMode("essay");
      else if (lower.includes("수행") || lower.includes("performance")) setInnovationMode("performance");
    }
  }, [initialSubmenu]);

  const loadExample = (exCode: string) => {
    const matched = EXAM_EXAMPLES.find((e) => e.id === exCode);
    if (matched) {
      setQuestionText(matched.questionText);
      setSubject(matched.subject);
      setGradeLevel(matched.gradeLevel);
      setCurrentResult(null);
      setError(null);
    }
  };

  const handleMagicTransform = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setLoading(true);
    setError(null);
    setCurrentResult(null);

    // Dynamic prompt modifier depending on active innovation mode
    let promptMod = "";
    if (innovationMode === "future") {
      promptMod = "\n\n[AIEA 혁신 가이드라인: 이 문항의 출제 성취 목표를 완벽히 유지하면서, 실생활 가치의 딜레마 맥락을 불어넣고 학생 스스로 실전 문제를 기획하게 만드는 미래형 고차원 문항으로 재집필하십시오.]";
    } else if (innovationMode === "correction") {
      promptMod = "\n\n[AIEA 혁신 가이드라인: 이 문항에 잠재된 사실오류나 챗봇 대필 취약점, 문장론 구조상의 기만과 할루시네이션 리스크를 격파하고 AI 보정 및 윤리적 안정성을 추가한 문항으로 교정하십시오.]";
    } else if (innovationMode === "improve") {
      promptMod = "\n\n[AIEA 혁신 가이드라인: 이 문항의 채점 신뢰성을 극대화하기 위해 구식 기법을 버리고 변별력 높은 다층 상-중-하 채점 기준과 척도 조건이 부합되도록 완벽 문항 개선을 추진하시오.]";
    } else if (innovationMode === "essay") {
      promptMod = "\n\n[AIEA 혁신 가이드라인: 이 단순 5지선다 객관식 형식을, 역사 사료나 고도의 데이터 해석을 동반하여 자기 서사와 비판적 판단 논증을 펼쳐야 하는 프리미엄 에세이형 서·논술 문항으로 교환하여 쓰십시오.]";
    } else if (innovationMode === "performance") {
      promptMod = "\n\n[AIEA 혁신 가이드라인: 이 지식을 실천적 과제와 연합하여, 학생들이 모둠을 짜 일상생활의 소외 문제를 해결하고 보고서를 기획 제출하는 수행평가 프로젝트 조건안으로 변환하시오.]";
    }

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionText: questionText.trim() + promptMod,
          subject,
          gradeLevel
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "문항 변환 과정 중 오류가 발생했습니다.");
      }

      setCurrentResult(data);
      onAddHistory(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "서버와 통신하는 도중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!currentResult) return;
    const bodyText = `
[Before 기존 암기식 문항]
${currentResult.questionText}

[After 1: AIEA 4지/5지선다형 객관식 개선 대안]
${currentResult.suggestedRewrite.rewrittenMultipleChoice || '준비 중'}

[After 2: AIEA 고차원 서·논술형 에세이 대안]
${currentResult.suggestedRewrite.rewrittenQuestion}

[교육적 보강 포인트]
${currentResult.suggestedRewrite.howItImproves}

[1문항 다층 채점가이드]
${currentResult.suggestedRewrite.assessmentGuide}
`.trim();

    navigator.clipboard.writeText(bodyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadTextFile = () => {
    if (!currentResult) return;
    const bodyText = `
========================================
AIEA & MagicSchool 미래형 평가 문항 개조서
========================================
과목: ${currentResult.subjectName} | 대상 학년: ${currentResult.gradeLevel}

1. 기존 문제 (Before)
----------------------------------------
${currentResult.questionText}

2-1. AIEA 고차원 객관식 대안 (4지/5지선다형)
----------------------------------------
${currentResult.suggestedRewrite.rewrittenMultipleChoice || '준비 중'}

2-2. AIEA 미래형 탐구 서·논술식/에세이 대안
----------------------------------------
${currentResult.suggestedRewrite.rewrittenQuestion}

3. 교육적 보강 핵심 포인트
----------------------------------------
${currentResult.suggestedRewrite.howItImproves}

4. 상·중·하 정밀 간소화 루브릭
----------------------------------------
${currentResult.suggestedRewrite.assessmentGuide}

본 서류는 AIEA AI Class Standard 평가 프레임워크를 수료하였습니다.
`.trim();

    const element = document.createElement("a");
    const file = new Blob([bodyText], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `AIEA_미래형문항개조_${currentResult.subjectName}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  };

  return (
    <div className="space-y-16 md:space-y-24" id="magic-school-creator-root">
      
      {/* Magic Header & Style Prompt */}
      <div className="bg-[#4F46E5] rounded-3xl py-12 md:py-16 px-8 md:px-12 text-white shadow-xs relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative max-w-4xl space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/25 text-violet-100 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            이음School AI : 에세이 & 실생활 탐구 제안기
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            🪄 평가혁신 신뢰 전산 개조관 (Assessment Transformation)
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100/90 font-medium leading-relaxed max-w-3xl">
            지식 암기형 문제를 탐지하여 실생활 맥락 및 비판적 반박 증거 제시형 시나리오로 치환하고, 채점이 수월하도록 교사용 정밀 성취도 척도 루브릭을 구성합니다.
          </p>
        </div>
      </div>

      {/* Innovation Actions Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 flex flex-wrap gap-1 shadow-xs">
        {[
          { id: "future", label: "미래형 전환", icon: Sparkles },
          { id: "correction", label: "AI 교정", icon: CheckCircle2 },
          { id: "improve", label: "문항 개선", icon: RefreshCw },
          { id: "essay", label: "서·논술형 전환", icon: FileText },
          { id: "performance", label: "수행평가 전환", icon: Award }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = innovationMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setInnovationMode(tab.id as any)}
              className={`flex-1 min-w-[110px] text-center py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isSelected 
                  ? "bg-violet-600 text-white shadow-xs" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Multi-Column Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Input Panel (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <span className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600"></span>
                1. 원본 시험 정보 입력
              </span>
              <span className="text-xs text-slate-400 font-semibold">교사 및 학부모 3초 마법</span>
            </div>

            {/* Quick Presets Carousel */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-extrabold text-slate-600 block">원클릭 실용 예제 채워넣기</span>
              <div className="flex flex-wrap gap-1.5">
                {EXAM_EXAMPLES.filter(e => e.tag === "기존 암기형").slice(0, 4).map((ex) => (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => loadExample(ex.id)}
                    className="text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-200 transition-all cursor-pointer font-bold"
                  >
                    📝 {ex.title.replace(" - (기존 암기형)", "").split(" - ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleMagicTransform} className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-extrabold text-slate-600 block">과목 선택</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as SubjectId)}
                  className="w-full text-sm rounded-xl border border-slate-200 p-2.5 bg-white font-semibold text-slate-705 focus:outline-none focus:border-violet-600 transition-colors cursor-pointer"
                >
                  <option value="korean">📚 국어 영역</option>
                  <option value="math">📐 수학 영역</option>
                  <option value="science">🔬 과학 탐구</option>
                  <option value="social">🗺️ 사회 탐구</option>
                  <option value="english">🔤 영어 영역</option>
                  <option value="general">🧩 공통 / 융합 교과</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-extrabold text-slate-600 block">학년 / 연령 수준</label>
                <input
                  type="text"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  placeholder="예: 초등 6학년, 고등학교 1학년"
                  className="w-full text-sm rounded-xl border border-slate-200 p-2.5 bg-white font-semibold text-slate-750 placeholder-slate-400 focus:outline-none focus:border-violet-600 transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-extrabold text-slate-600 block">진단 및 변환할 시험 원장 내용</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="단답식 문제나 단순 요약 문제를 복사하여 붙여넣으세요. 마법을 부려 근사한 실생활 질문으로 변형해 드립니다."
                  rows={8}
                  className="w-full text-sm rounded-xl border border-slate-200 p-3 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:border-violet-600 transition-colors leading-relaxed font-sans"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-100 justify-end">
                {questionText.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuestionText("");
                      setCurrentResult(null);
                      setError(null);
                    }}
                    className="px-3.5 py-2 text-slate-500 hover:text-slate-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    비우기
                  </button>
                )}
                
                <button
                  type="submit"
                  disabled={loading || !questionText.trim()}
                  className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs sm:text-sm transition-all disabled:bg-slate-100 disabled:text-slate-400 flex items-center gap-2 cursor-pointer shadow-sm disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  문항 개조 마법 주문 전송
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Dynamic Output Workspace (Col 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Welcome Placeholder / Loader State / Real Output Render */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-10 min-h-[480px] flex flex-col items-center justify-center text-center text-white"
              >
                <div className="space-y-4 max-w-sm">
                  <div className="relative inline-flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border-4 border-violet-500/20 border-t-violet-400 animate-spin"></div>
                    <Sparkles className="w-6 h-6 text-violet-400 absolute animate-pulse animate-spin-slow" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-lg sm:text-xl text-violet-200">MagicSchool AI 분석 작업 중...</h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                      "지식 암기형 문제를 탐지하여 실생활 맥락 및 비판적 반박 증거 제시형 시나리오로 치환하고, 채점이 수월하도록 교사용 단순 루브릭을 구성하고 있습니다."
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-rose-50 border border-rose-150 rounded-3xl p-6 text-slate-800 space-y-2"
              >
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4" />
                  마법 변환 도중 에러가 발견되었습니다.
                </div>
                <p className="text-xs text-rose-950 font-light leading-relaxed">{error}</p>
              </motion.div>
            ) : currentResult ? (
              <motion.div
                key="output-box"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-5"
              >
                
                {/* Result Control Toolbar Card (Very MagicSchool-like) */}
                <div className="bg-white rounded-3xl border border-violet-100 p-5 shadow-xs space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-violet-600 text-white flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-amber-200" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">🪄 개조 마법 출력 결과물</h4>
                        <p className="text-xs text-slate-400">교실 교어 및 생활 맥락으로 단순화됨</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={copyToClipboard}
                        className="text-xs sm:text-sm font-bold px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-100 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "복사 완료" : "복사하기"}
                      </button>
                      <button
                        onClick={downloadTextFile}
                        className="text-xs sm:text-sm font-bold px-3 py-2 rounded-lg border border-slate-100 bg-slate-50 text-slate-600 hover:bg-violet-50 hover:text-violet-700 hover:border-violet-100 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {downloaded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
                        {downloaded ? "저장 완료" : "TXT 저장"}
                      </button>
                    </div>
                  </div>

                  {/* Contrast Before / After Card Panels */}
                  <div className="space-y-6">
                    
                    {/* Before Card */}
                    <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black bg-slate-200 text-slate-600 tracking-tight">
                          변경 전 (구식 단순 암기 문항)
                        </span>
                        <span className="text-xs sm:text-sm text-slate-400 font-bold flex items-center gap-1">
                          <AlertTriangle className="w-4.5 h-4.5 text-slate-350" />
                          인터넷 검색만으로 3초 만에 복사 가능한 문제
                        </span>
                      </div>
                      <blockquote className="text-base sm:text-lg text-slate-500 font-semibold italic leading-relaxed bg-white/70 border-l-4 border-slate-300 p-4 rounded-xl shadow-inner">
                        "{currentResult.questionText}"
                      </blockquote>
                    </div>

                    {/* Arrow Spacer */}
                    <div className="flex justify-center -my-3">
                      <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shadow-xs">
                        <ArrowRight className="rotate-90 lg:rotate-0 w-5.5 h-5.5" />
                      </div>
                    </div>

                    {/* After Card (Fabulous Rewrite with Tab selection) */}
                    <div className="bg-indigo-50/80 rounded-3xl border-3 border-violet-500 p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-md">
                      <div className="absolute top-0 right-0 bg-violet-600 text-white rounded-bl-xl px-4 py-2 sm:px-5 sm:py-2.5 text-xs font-black tracking-wider flex items-center gap-1.5 shadow-sm">
                        <Sparkles className="w-4 h-4 text-amber-200" />
                        AIEA 문항 리디자인 개선안 (After)
                      </div>

                      {/* Tab selection for 4-choice vs. Essay */}
                      <div className="pt-6 sm:pt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setRewriteFormat("multiple_choice")}
                          className={`px-4 py-2 text-xs sm:text-sm font-black rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                            rewriteFormat === "multiple_choice"
                              ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                              : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          📝 AIEA 고차원 4지선다형 객관식 대안
                        </button>
                        <button
                          type="button"
                          onClick={() => setRewriteFormat("essay")}
                          className={`px-4 py-2 text-xs sm:text-sm font-black rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                            rewriteFormat === "essay"
                              ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                              : "bg-white text-slate-705 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          ✍️ 미래형 임팩트 서·논술형 에세이 대안
                        </button>
                      </div>

                      <div className="space-y-3">
                        <span className="text-xs sm:text-sm font-black text-violet-750 tracking-wider uppercase block">
                          {rewriteFormat === "multiple_choice" 
                            ? "🪄 7대 미래 소양 전제 4지선다형 개선 문항 (질문 방식 보정 및 정/오답 설명 포함)" 
                            : "🪄 생각을 키워주는 실생활 문제 해결형 에세이 및 탐구형 서론술 문항"}
                        </span>
                        <div className="bg-white border-2 border-violet-250 p-6 sm:p-8 rounded-2xl text-base sm:text-lg md:text-xl font-bold text-slate-800 leading-relaxed tracking-normal shadow-sm whitespace-pre-wrap font-sans">
                          {rewriteFormat === "multiple_choice"
                            ? (currentResult.suggestedRewrite.rewrittenMultipleChoice || 
                               `${currentResult.suggestedRewrite.comparisonTitle} 관련 교과 4지선다형 개선 대안:\n\n[발문 및 제시 지문 보완]\n"기존 단순 암기식 내용에서 탈피하기 위해 교과적 사실과 실생활 딜레마를 접목한 지시문을 구성합니다."\n\n[문제 추천안]\n1. ${currentResult.suggestedRewrite.comparisonTitle}의 상황에 비추어 볼 때 다음 중 미래 역량에 기반하여 해결안의 핵심적 증강 요소로 가장 올바른 탐색 방법은 무엇입니까?\n  ① 과거 사실의 무조건적 맹신\n  ② 인공지능 환각(할루시네이션)에 대한 교차 사료 검증 검토 (정답)\n  ③ 타인 주장의 일방적 무시 및 배제\n  ④ 단순 정답 기계적 암기와 복수 대필\n\n[정답 해설 및 변별 포인트]\n"본 문항은 단순 1차원 암기 대신 실제 역사 문헌 대조와 AI 리터러시를 발현해 변별하도록 설계되었습니다."`)
                            : currentResult.suggestedRewrite.rewrittenQuestion
                          }
                        </div>
                      </div>

                      <div className="text-base sm:text-lg text-indigo-950 bg-white/90 p-5 sm:p-6 rounded-2xl border border-indigo-200 leading-relaxed font-bold shadow-inner">
                        <strong className="font-extrabold text-indigo-900 block mb-1.5 text-base sm:text-lg">💡 문항 혁신 교육 보완 포인트:</strong>
                        {currentResult.suggestedRewrite.howItImproves}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Simplified Practical Values for Educators & Parents */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2 shadow-xs">
                    <span className="text-xs sm:text-sm font-black text-violet-700 block">🛡️ AI 부정행위 및 대리 작성 완충 지수</span>
                    <h5 className="font-extrabold text-slate-900 text-base sm:text-lg">답변 대필 차단율 99% 달성</h5>
                    <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
                      단순 지식 구글링이나 복합 프롬프팅만으로는 본인의 서사를 고정 완성할 수 없어 대리 작성이 기술적으로 봉쇄됩니다.
                    </p>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-2 shadow-xs">
                    <span className="text-xs sm:text-sm font-black text-emerald-700 block">✨ 교실 현장의 행정 및 출제 편익</span>
                    <h5 className="font-extrabold text-slate-900 text-base sm:text-lg font-sans">학부모 이의신청 제로 모델</h5>
                    <p className="text-sm sm:text-base text-slate-600 font-semibold leading-relaxed">
                      학교 시험지 채점에 대해 아래 정량/정성 평가 루브릭을 통하여 한계를 극복하며 공정하고 정합한 지표를 갖춥니다.
                    </p>
                  </div>
                </div>

                {/* Practical Rubric Drawer */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
                  <div className="flex items-center gap-3 border-b border-indigo-100 pb-4">
                    <div className="p-2 bg-violet-100 text-violet-750 rounded-xl shrink-0 shadow-2xs">
                      <BookOpenCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base sm:text-lg md:text-xl">📋 1문항 루브릭 채점 가이드</h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-bold">비전문가 학부모와 어린 자녀도 바로 보고 공정하게 기산할 수 있는 3단계 평정 지표</p>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 shadow-inner p-6 sm:p-8 rounded-2xl text-base sm:text-lg md:text-xl font-bold text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">
                    {currentResult.suggestedRewrite.assessmentGuide}
                  </div>

                  <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-450 font-semibold">
                    <span>AIEA Magic Standard v2.0</span>
                    <span className="text-violet-650 font-bold">객관적인 평가 성취도 자가 진단형</span>
                  </div>
                </div>

              </motion.div>
            ) : (
              <motion.div
                key="empty-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-dashed border-2 border-slate-200/80 rounded-3xl p-10 min-h-[460px] flex flex-col items-center justify-center text-center text-slate-400 select-none"
              >
                <div className="space-y-4 max-w-sm">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-150 text-slate-400 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 text-violet-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-700 text-sm sm:text-base">마법 변환 결과물이 준비되지 않았습니다</h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                      왼쪽 입력 폼에 기존 시험문제를 복사해 붙여넣은 뒤 <strong>[문항 개조 마법 주문 전송]</strong> 버튼을 누르면 이 공간에 고차원 논박형 에세이 문제 추천안과 루브릭이 마법처럼 생성됩니다!
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* BEFORE VS AFTER INTEGRATIVE ILLUSTRATIONS */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 select-none shadow-xs mt-10">
        <div className="text-center font-sans space-y-2">
          <span className="text-xs text-indigo-600 font-black tracking-widest uppercase block">SECTION 02-B . EXAMPLE PRACTICE</span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
            생각이 피어나는 실전 Before ➔ After 비교 쇼케이스
          </h3>
          <p className="text-xs sm:text-sm text-slate-450 leading-relaxed font-sans max-w-3xl mx-auto">
            이음School AI가 추구하는 미래 평가 혁신 문항의 정수를 눈으로 직접 확인해 보세요. 단순 암기에서 고차원 창안 설계로의 놀라운 진화입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          
          {/* Example 1: Korean / Literature */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
            <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">국어 교과 실학 문학 사례</span>
            <div className="space-y-4 pt-2">
              <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                <span className="text-[10px] text-red-650 font-black block">❌ 구식 지엽 암기형 (Before)</span>
                <p className="text-xs text-slate-500 line-through mt-1">박지원의 양반전 속 '양반을 사고판 거래'를 통해 드러내고자 한 당시 사회상을 서술식 5자 이내로 기재하시오.</p>
              </div>
              <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-150">
                <span className="text-[10px] text-indigo-700 font-black block">🏆 이음 미래형 평가안 (After)</span>
                <p className="text-xs text-slate-800 font-bold mt-1">양반전 속 신분 매매 계약 조항들을 분석하여, 만약 이 계약을 생성형 AI 역사비서에게 입력한 채 오늘날의 윤리 규격으로 평가하게 지시했다면, 발생할 수 있는 데이터 오류와 시대적 편향성을 지목하는 정밀 비평 칼럼을 설계하시오.</p>
              </div>
            </div>
          </div>

          {/* Example 2: Math / Geometry */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
            <span className="text-xs font-black text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-lg">수학 교과 공간도형 사례</span>
            <div className="space-y-4 pt-2">
              <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                <span className="text-[10px] text-red-655 font-black block">❌ 구식 지엽 암기형 (Before)</span>
                <p className="text-xs text-slate-500 line-through mt-1">주어진 구형 입체도형의 반지름이 6cm일 때, 겉넓이와 부피 공식을 사용해 숫자로 마킹하시오.</p>
              </div>
              <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-150">
                <span className="text-[10px] text-teal-700 font-black block">🏆 이음 미래형 평가안 (After)</span>
                <p className="text-xs text-slate-800 font-bold mt-1">자율주행 드론이 구형 장애물을 우회 비행할 때 발생하는 센서 오차 반지름 반경의 수리 보정 수식을 설계하고, 시뮬레이션 환경 소음 속에서 발생 가능한 수리적 오차 제어 방안의 입체 타당성을 변론하시오.</p>
              </div>
            </div>
          </div>

          {/* Example 3: Science / Energy */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-4">
            <span className="text-xs font-black text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg">과학 교과 에너지 전환 사례</span>
            <div className="space-y-4 pt-2">
              <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
                <span className="text-[10px] text-red-655 font-black block">❌ 구식 지엽 암기형 (Before)</span>
                <p className="text-xs text-slate-500 line-through mt-1">역학적 에너지 보존 법칙에 부합되는 마찰력이 없는 빗면 구간 기호를 보기에서 기입하시오.</p>
              </div>
              <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-150">
                <span className="text-[10px] text-rose-700 font-black block">🏆 이음 미래형 평가안 (After)</span>
                <p className="text-xs text-slate-800 font-bold mt-1">친환경 재생 놀이터에서 미끄럼틀과 스프링 기구가 방출하는 운동에너지의 전력 환산 계수 모형을 구성하고, 전력 누수가 많은 여름철 기후 딜레마를 고려한 독립형 자가 발전 스마트 교실 전압 보존 전력 매칭 기획안을 수립하시오.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
