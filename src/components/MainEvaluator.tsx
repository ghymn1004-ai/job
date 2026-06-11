/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Layers, 
  Award, 
  Compass, 
  FileText, 
  BookOpen, 
  Check, 
  Zap,
  TrendingUp,
  Brain,
  ShieldAlert,
  Sliders,
  Copy,
  Download
} from "lucide-react";
import { SubjectId, EvaluationResult } from "../types";
import { EXAM_EXAMPLES } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface MainEvaluatorProps {
  onAddHistory: (result: EvaluationResult) => void;
  selectedResultId: string | null;
  history: EvaluationResult[];
  onSelectResult: (result: EvaluationResult | null) => void;
  onNavigateToCreator?: () => void;
  initialSubmenu?: string | null;
}

const STAGES = [
  "🔍 선생님의 시험문제 글자들을 하나씩 재미있게 읽고 있어요...",
  "⭐ 이 문제가 우리 머리를 얼마나 다양하게 쓰해 주는지 확인하는 중이에요...",
  "🧠 단순 암기인지, 깊은 생각(Bloom 미래 인재 인트 발달)이 필요한지 비교하고 있어요...",
  "💡 내가 살고 있거나 재밌는 실제 상황과 얼마나 연겨됐는지 분석 중이에요...",
  "🏆 미래를 이끌어갈 학생들에게 꼭 필요한 7가지 지각 역량들을 채점 중 이에요...",
  "✨ 드디어 완료! 시험문제를 35점 만점으로 멋지게 점수화해 드릴게요! 잠시만 기다려주세요!"
];

export default function MainEvaluator({ 
  onAddHistory, 
  selectedResultId, 
  history, 
  onSelectResult,
  onNavigateToCreator,
  initialSubmenu
}: MainEvaluatorProps) {
  const [questionText, setQuestionText] = useState("");
  const [subject, setSubject] = useState<SubjectId>("korean");
  const [gradeLevel, setGradeLevel] = useState("고등학교 1학년");
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [error, setError] = useState<{ type: string; message: string } | null>(null);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(2);

  // Synchronize submenu click scrolls
  useEffect(() => {
    if (initialSubmenu) {
      const lower = initialSubmenu.toLowerCase();
      let targetId = "";
      if (lower.includes("업로드")) targetId = "evaluator-form-panel";
      else if (lower.includes("진단")) targetId = "evaluator-score-panel";
      else if (lower.includes("품질") || lower.includes("분석")) targetId = "evaluator-bloom-panel";
      else if (lower.includes("역량")) targetId = "evaluator-competencies-panel";
      else if (lower.includes("리포트")) targetId = "evaluator-score-panel";
      
      if (targetId) {
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
    }
  }, [initialSubmenu, result]);

  // If a result in history was selected from App.tsx, synchronize it
  useEffect(() => {
    if (selectedResultId) {
      const matched = history.find(r => r.id === selectedResultId);
      if (matched) {
        setResult(matched);
        setQuestionText(matched.questionText);
        setSubject(matched.subject);
        setGradeLevel(matched.gradeLevel);
      }
    }
  }, [selectedResultId, history]);

  // Loading staging loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStage((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
      }, 2000);
    } else {
      setLoadingStage(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const loadExample = (exCode: string) => {
    const matched = EXAM_EXAMPLES.find((e) => e.id === exCode);
    if (matched) {
      setQuestionText(matched.questionText);
      setSubject(matched.subject);
      setGradeLevel(matched.gradeLevel);
      setResult(null);
      if (error) setError(null);
    }
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    onSelectResult(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questionText: questionText.trim(),
          subject,
          gradeLevel
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "GEMINI_API_KEY_MISSING") {
          throw new Error("API_KEY_MISSING::" + data.message);
        } else {
          throw new Error(data.message || "문항 분석 서버 응답 오류가 발생했습니다.");
        }
      }

      setResult(data);
      onAddHistory(data);
    } catch (err: any) {
      console.error(err);
      if (err.message.startsWith("API_KEY_MISSING::")) {
        setError({
          type: "KEY",
          message: err.message.replace("API_KEY_MISSING::", "")
        });
      } else {
        setError({
          type: "GENERAL",
          message: err.message || "예기치 못한 연결 실패가 발생했습니다. 잠시 후 교차 진단해주십시오."
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const clearInputs = () => {
    setQuestionText("");
    setError(null);
    setResult(null);
    onSelectResult(null);
  };

  const copyResultToClipboard = () => {
    if (!result) return;
    const shareText = `
[AIEA 시험문제 자가판정 진단결과]
점수: ${result.totalScore}점 / 35점 만점
등급: ${result.ratingName} (AI 시대 ${result.ratingLevel})
진단 한줄요약: ${result.feedbackSummary}
`.trim();

    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Precedence color mappings
  const getRatingBadgeClass = (level: string) => {
    switch (level) {
      case "EXCELLENT": return "bg-emerald-50 border-emerald-250 text-emerald-700";
      case "ADEQUATE": return "bg-violet-50 border-violet-200 text-violet-750";
      case "NEEDS_IMPROVEMENT": return "bg-amber-50 border-amber-250 text-amber-700";
      default: return "bg-rose-50 border-rose-250 text-rose-700";
    }
  };

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in" id="magic-school-evaluator-root">
      
      {/* Header Banner - MagicSchool style */}
      <div className="bg-[#4F46E5] rounded-3xl py-12 md:py-16 px-8 md:px-12 text-white shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="relative max-w-4xl space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-100 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <Sliders className="w-4 h-4 text-amber-300" />
            시험문제 미래역량 진단소
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            📊 우리 학교 시험문제 자가 진단기
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100/90 font-medium leading-relaxed max-w-3xl">
            학교 시험문제나 학원 퀴즈를 넣으면, 단순 암기용 문제인지 우리가 진짜 똑똑해지는 문제인지 <strong className="text-teal-300 font-extrabold">AIEA 미래 7대 역량</strong>을 바탕으로 분석하여 점수와 진단표를 바로 선물해 드릴게요!
          </p>
        </div>
      </div>

      {/* NEW INTERACTIVE 5-STEP EVALUATION FLOW WITH BUTTONS */}
      <div className="bg-white rounded-3xl border border-indigo-150 p-6 sm:p-8 space-y-6 shadow-xs select-none">
        <div className="text-center md:text-left space-y-2">
          <span className="text-xs text-indigo-650 font-black tracking-widest uppercase block">AIEA DIAGNOSTIC WORKING PROCESS</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight font-sans">
            평가진단 순서 및 전체 과정 한눈에 알아보기
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed font-sans">
            아래 1번부터 5번 버튼을 톡톡 클릭해보면 우리가 어떤 순서로 멋지게 진단을 받게 되는지 쉽게 알려줄게요!
          </p>
        </div>

        {/* 5-Step Button Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 font-sans">
          {[
            { step: 1, title: "1단계: 시험문제 준비", desc: "학교나 학원의 시험문제를 복사하거나 글씨 파일로 준비하세요." },
            { step: 2, title: "2단계: 내 정보 입력", desc: "분석할 과목과 학년을 정하고 시험문제를 칸에 쏙 넣어봅니다." },
            { step: 3, title: "3단계: 실시간 분석", desc: "인공지능이 문제를 꼼꼼하게 읽어 우리 머리 역량을 체크합니다." },
            { step: 4, title: "4단계: 역량 채점표", desc: "7대 핵심 능력이 얼마나 쏙쏙 들어있는지 인포그래픽으로 감상해요." },
            { step: 5, title: "5단계: 미래형 변환", desc: "재미를 자극하고 생각을 쑥쑥 키우는 최강 미래형 문제로 대변신!" }
          ].map((item, idx) => {
            const isSelected = activeStep === idx;
            return (
              <button
                key={item.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border cursor-pointer flex flex-col justify-between h-28 ${
                  isSelected 
                    ? "bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-100 scale-[1.02]" 
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/70"
                }`}
              >
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600 font-sans"
                }`}>
                  STEP 0{item.step}
                </span>
                <span className="text-xs sm:text-sm font-black font-sans leading-snug mt-2">
                  {item.title.split(": ")[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Panel */}
        <div className="bg-indigo-50/40 rounded-2xl border border-indigo-100/50 p-5 flex gap-3 text-left font-sans items-start">
          <div className="w-10 h-10 rounded-full bg-indigo-600 font-mono text-white flex items-center justify-center font-black shrink-0 text-sm">
            0{activeStep + 1}
          </div>
          <div className="space-y-1">
            <span className="text-sm font-black text-indigo-950 font-sans block">
              {[
                "1단계: 시험문제 준비해두기",
                "2단계: 과목과 내 학년 입력하기",
                "3단계: 인공지능 실시간 분석 시작하기",
                "4단계: 7가지 역량 인포그래픽 확인하기",
                "5단계: 더 멋진 미래형 문제로 개조하기"
              ][activeStep]}
            </span>
            <p className="text-sm text-slate-650 leading-relaxed font-sans font-normal">
              {[
                "학교 시험문제, 상식 퀴즈 질문을 가볍게 복사해 두세요. 글씨가 정확할수록 우리 인공지능 비서가 훨씬 구체적으로 분석해 드릴 수 있어요!",
                "자가 진단 상자 안에서 해당 문장과 알맞은 과목(국어, 영어, 수학, 과학, 사회 등)을 골라주고 내 알맞은 학년 정보까지 정확히 선택해 주세요.",
                "대조 알고리즘이 문장들 하나하나 분석해서 단순히 정답 번호만 외워 찍는 문제인지, 비판적인 생각을 깊게 유도하는 훌륭한 문제인지 알아내기 시작합니다.",
                "미래 인재에게 꼭 필요한 7대 핵심 역량(발견력, 비판 사고, 소통 역량 등)이 얼마나 고루 녹아 있는지 알기 쉬운 신선한 그래프와 글로 그려드립니다.",
                "여기서 멈추지 않고, 최하단의 '미래형 문제로 개조하기' 버튼을 눌러 생각을 자극하는 참신한 서술형·수행평가형 문제로 순식간에 전환하여 확인해 보세요!"
              ][activeStep]}
            </p>
          </div>
        </div>
      </div>

      {/* 2-Column Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Input Form (Col - 5) */}
        <div className="lg:col-span-5 space-y-4" id="evaluator-form-panel">
          <div className="bg-white rounded-3xl border border-slate-200/85 p-5 shadow-xs space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <span className="text-sm font-black text-slate-800 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600"></span>
                진단 대상 정보 입력
              </span>
              <span className="text-xs text-slate-400 font-semibold">비전문가 전용 간소화</span>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-extrabold text-slate-600 block">초스피드 실제 사례 체험하기</span>
              <div className="flex flex-wrap gap-1.5">
                {EXAM_EXAMPLES.map((ex) => (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => loadExample(ex.id)}
                    className={`text-xs sm:text-sm px-3 py-2 rounded-lg border text-left transition-all cursor-pointer font-bold hover:bg-slate-50 ${
                      ex.tag === "미래 지향형" 
                        ? "border-emerald-200 bg-emerald-50/40 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300" 
                        : "border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    🚀 {ex.title.replace(" - (기존 암기형)", "").split(" - ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Standard Form */}
            <form onSubmit={handleEvaluate} className="space-y-5 pt-1">
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-slate-700 block">진단할 시험의 과목</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as SubjectId)}
                  className="w-full text-sm sm:text-base rounded-2xl border border-slate-200 p-3.5 bg-white font-extrabold text-slate-750 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
                >
                  <option value="korean">📚 국어 교과</option>
                  <option value="math">📐 수학 교과</option>
                  <option value="science">🔬 과학 교과</option>
                  <option value="social">🗺️ 사회 교과</option>
                  <option value="english">🔤 영어 교과</option>
                  <option value="general">🧩 공통 / 융합 분석</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-extrabold text-slate-700 block">대상 학년 (초/중/고)</label>
                <input
                  type="text"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  placeholder="예: 초등 5학년, 중등 2학년, 고등 1학년"
                  className="w-full text-sm sm:text-base rounded-2xl border border-slate-200 p-3.5 bg-white font-semibold focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-extrabold text-slate-700 block">시험문제 질문 입력창</label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  placeholder="진단하고 싶은 시험 한 문항이나 퀴즈 문제를 고대로 복사해서 여기에 붙여넣어 주세요!"
                  rows={8}
                  className="w-full text-sm sm:text-base rounded-2xl border border-slate-200 p-4 bg-white text-slate-800 leading-relaxed font-sans font-medium focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                  required
                />
              </div>

              <div className="flex gap-2.5 pt-3 border-t border-slate-100 justify-end">
                {questionText.trim() && (
                  <button
                    type="button"
                    onClick={clearInputs}
                    className="px-4 py-2.5 text-slate-500 hover:text-slate-700 font-extrabold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    지우기
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading || !questionText.trim()}
                  className="px-5 py-3 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black text-xs sm:text-sm transition-all disabled:bg-slate-150 disabled:text-slate-400 flex items-center gap-2 cursor-pointer shadow-md disabled:cursor-not-allowed"
                >
                  <Sliders className="w-4 h-4" />
                  미래형 자가진단 시작하기
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Output Area (Col - 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-10 min-h-[460px] flex flex-col items-center justify-center text-center text-white"
              >
                <div className="space-y-5 max-w-sm mx-auto">
                  <div className="relative inline-flex items-center justify-center mx-auto">
                    <div className="w-14 h-14 rounded-full border-4 border-violet-500/20 border-t-violet-400 animate-spin"></div>
                    <Sparkles className="w-5 h-5 text-violet-400 absolute animate-pulse animate-spin-slow" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-extrabold text-lg sm:text-xl text-violet-200">시험문제 속 미래역량 보물찾기 중...</h4>
                    <p className="text-xs sm:text-sm text-slate-440 font-normal leading-relaxed">
                      선생님이 낸 시험문제가 단순 암기식 문제인지, 우리가 더 깊이 배우고 생각할 수 있게 이끌어주는 멋진 문제인지 AI로 신나고 꼼꼼하게 분석 중이에요!
                    </p>
                  </div>

                  {/* Progress Tracker Banner */}
                  <div className="bg-slate-850 p-4 rounded-xl border border-slate-850 text-left">
                    <span className="text-xs text-violet-400 font-bold tracking-wider uppercase block mb-1">실시간 분석 과정</span>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={loadingStage}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-xs font-mono text-emerald-400 truncate"
                      >
                        ● {STAGES[loadingStage]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-rose-50 border border-rose-150 p-6 rounded-3xl text-sm text-slate-850 space-y-3"
              >
                <div className="flex items-center gap-2 text-rose-700 font-bold">
                  <ShieldAlert className="w-5 h-5" />
                  진단 오류 발생
                </div>
                <p className="text-xs text-rose-950 font-light leading-relaxed">{error.message}</p>
              </motion.div>
            ) : result ? (
              <motion.div
                key="real-result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                
                {/* Score Summary Panel with BEFORE / AFTER Slider */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs" id="evaluator-score-panel">
                  
                  {/* Top Row Title & Copier */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-indigo-100 pb-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-violet-150 text-violet-700 rounded-xl shrink-0 shadow-xs">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-base sm:text-lg md:text-xl">✨ 교실 맞춤형 인공지능 미래형 진단표</h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-semibold font-sans">선생님의 문제를 풀었을 때 우리의 생각 주머니가 얼마나 더 깊어지는지 분석해 봅니다!</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={copyResultToClipboard}
                      className="text-xs sm:text-sm font-extrabold px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-violet-600 hover:text-white hover:border-violet-600 cursor-pointer flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      {copied ? "복사 완료!" : "결과 복사하기 📋"}
                    </button>
                  </div>

                  {/* Visual Impact Score Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">
                    
                    {/* Simplified Score Gauge */}
                    <div className="bg-slate-950 text-white rounded-3xl p-6 text-center space-y-2 shadow-md flex flex-col justify-center items-center min-h-[140px]">
                      <span className="text-xs sm:text-sm text-violet-300 font-extrabold uppercase tracking-widest block">생각하는 미래역량 점수</span>
                      <span className="text-4xl sm:text-5xl font-black block text-amber-300 drop-shadow-md">{result.totalScore}점</span>
                      <span className="text-xs text-slate-400 font-bold block">35점 만점 기준</span>
                    </div>

                    {/* Humanized Verbal Rating Badge */}
                    <div className="sm:col-span-2 flex flex-col justify-center space-y-3">
                      <div>
                        <span className="text-xs sm:text-sm text-violet-700 font-black tracking-wide uppercase bg-violet-100 border border-violet-200 px-3 py-1.5 rounded-full">
                          종합 판결 결과
                        </span>
                      </div>
                      <h4 className="font-extrabold text-[#1E1145] text-2xl sm:text-3xl tracking-tight leading-none">
                        "{result.ratingName}"
                      </h4>
                      <p className="text-base sm:text-lg md:text-xl text-indigo-950 font-bold bg-indigo-50/70 border border-indigo-150 p-5 rounded-2xl leading-relaxed shadow-sm">
                        {result.feedbackSummary}
                      </p>
                    </div>

                  </div>

                  {/* Beautiful Before/After "No Complex Chart" Slider Line */}
                  <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-violet-100 space-y-4">
                    <span className="text-base sm:text-lg font-black text-slate-900 block">📈 우리 시험지가 미래형 문제에 얼마나 가까울까요?</span>
                    
                    {/* Slider representation */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm sm:text-base font-extrabold text-slate-705 gap-2 pb-1 border-b border-dashed border-slate-200">
                        <span className="text-slate-500 flex items-center gap-1.5">❌ 단순 지식 암기 문제 <strong>(0~15점)</strong></span>
                        <span className="text-violet-700 flex items-center gap-1.5">✨ 깊게 생각하게 만드는 미래형 문제 <strong>(25~35점)</strong></span>
                      </div>
                      
                      {/* Interactive Dual Slider Track */}
                      <div className="relative h-6 bg-slate-200 rounded-full overflow-hidden border border-slate-350 shadow-inner flex items-center">
                        <div className="absolute left-0 top-0 h-full bg-[#5D5FEF]" style={{ width: "100%" }}></div>
                        
                        {/* Current Question Position Pin */}
                        <div 
                          className="absolute w-8 h-8 rounded-full bg-violet-600 border-3 border-white shadow-lg flex items-center justify-center -translate-x-1/2 transition-all duration-1000 z-10 cursor-pointer"
                          style={{ left: `${(result.totalScore / 35) * 105 - 5}%` }}
                        >
                          <Sparkles className="w-4.5 h-4.5 text-amber-200" />
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs sm:text-sm text-slate-500 pt-1.5 font-bold">
                        <span>단순 암기 코스 🎒</span>
                        <span className="text-violet-700 font-extrabold bg-violet-100 border border-violet-250 px-3 py-1.5 rounded-xl text-sm sm:text-base">우리 문제 위치 : {result.totalScore}점 🎯</span>
                        <span>탐구형 에세이 코스 🚀</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 1-Question Detailed Scoring Checklist Card */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs" id="evaluator-competencies-panel">
                  <div className="space-y-2 border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl md:text-2xl">🔍 1문항 정밀 7대 핵심역량 채점표</h4>
                    <p className="text-sm sm:text-base text-slate-500 font-bold">AIEA의 엄격한 7대 고차원 역량 평가 기준 (각 5점 만점)</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { key: "authenticity", label: "실제 현장 및 실생활 맥락", desc: "단순 지식이 진짜 우리가 매일 살아가는 삶의 시나리오와 연관되는지 평가합니다." },
                      { key: "inquiry", label: "자기 주도적 탐구 유치도", desc: "검색해서 바로 알 수 없고, 스스로 깊은 비판 추론을 펼쳐야 하는지 채점합니다." },
                      { key: "evidence", label: "교차 사실 논리 증거력", desc: "주장을 펼칠 때 분명하고 확실한 증거와 논리적 변론을 요구하는지 측정합니다." },
                      { key: "application", label: "새 시나리오 지절 응용력", desc: "학교에서 배운 소중한 공식을 새로운 뜻밖의 상황에 유연하게 응용하는지 확인합니다." },
                      { key: "creativity", label: "복수 해결 도출 구체성", desc: "단 하나의 뻔한 정답을 넘어, 나만의 특별하고 기발한 해결책이 나올 수 있는지 채점합니다." },
                      { key: "aiVerification", label: "AI 왜곡 판독 통제 지수", desc: "컴퓨터나 인공지능이 알려준 오류와 가짜 뉴스를 우리가 스스로 잡아낼 수 있는지 평가합니다." },
                      { key: "communication", label: "격식 있는 변론력 및 양식", desc: "나의 아름다운 생각과 변론을 글이나 말로 우아하게 발표하고 공조하는지 측정합니다." }
                    ].map((metric) => {
                      const val = (result.aieaMetrics as any)[metric.key] || 1;
                      return (
                        <div key={metric.key} className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4.5 space-y-2.5 transition-all hover:bg-slate-50 hover:border-violet-150">
                          <div className="flex justify-between items-center text-sm sm:text-base md:text-lg font-black">
                            <span className="text-slate-900">{metric.label}</span>
                            <span className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black ${
                              val >= 4 ? "bg-emerald-100 text-emerald-800 border border-emerald-250" : val >= 3 ? "bg-violet-100 text-violet-850 border border-violet-250" : "bg-amber-100 text-amber-805 border border-amber-250"
                            }`}>
                              {val}점 / 5점
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 font-semibold leading-relaxed">{metric.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Cognitive Bloom Level Indicator & Transition Button */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs" id="evaluator-bloom-panel">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl md:text-2xl">🧠 교육 인지 발달 단계 (Bloom Taxonomy)</h4>
                    <p className="text-sm sm:text-base text-slate-500 font-bold">우리의 소중한 뇌를 얼마나 다양하게 사용하고 자극하는지 체크합니다</p>
                  </div>

                  <div className="p-6 sm:p-8 rounded-3xl bg-violet-650 text-white flex items-center justify-between gap-6 shadow-md">
                    <div className="space-y-2">
                      <span className="text-xs sm:text-sm font-black text-violet-200 tracking-wider uppercase block">글로벌 기준 인지발달 단계</span>
                      <h5 className="font-extrabold text-lg sm:text-xl md:text-2xl leading-tight">
                        {result.bloomTaxonomy.level}단계 . {result.bloomTaxonomy.name} Level
                      </h5>
                      <p className="text-sm sm:text-base text-violet-50 font-semibold leading-relaxed max-w-xl">
                        {result.bloomTaxonomy.description}
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center text-white text-xl sm:text-2xl font-black shrink-0 shadow-inner">
                      L{result.bloomTaxonomy.level}
                    </div>
                  </div>

                  {/* Transition Panel to Menu 3 (Magic Transformation) */}
                  {onNavigateToCreator && result.totalScore < 25 && (
                    <div className="mt-4 bg-indigo-50/70 p-6 sm:p-8 rounded-3xl border border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-5 text-slate-850 shadow-sm">
                      <div className="space-y-2 text-center sm:text-left">
                        <h6 className="font-extrabold text-base sm:text-lg flex items-center gap-2 justify-center sm:justify-start text-indigo-950">
                          <Sparkles className="w-5.5 h-5.5 text-indigo-650 shrink-0" />
                          진단 점수가 아쉬운가요? 3초 만에 35점으로 개조해보세요!
                        </h6>
                        <p className="text-sm sm:text-base text-slate-650 font-normal leading-relaxed">
                          MagicSchool AI 변환 엔진으로 이 검토 문항을 바로 넘겨 고품질 에세이 문제로 변화시킵니다.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={onNavigateToCreator}
                        className="px-5 py-3.5 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-700 font-extrabold text-xs sm:text-sm tracking-tight transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        3단계 개조 변환 마법 실행
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                </div>

              </motion.div>
            ) : (
              <motion.div
                key="empty-dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-dashed border-2 border-slate-200/80 rounded-3xl p-10 min-h-[460px] flex flex-col items-center justify-center text-center text-slate-400 select-none"
              >
                <div className="space-y-4 max-w-sm">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-150 text-slate-400 flex items-center justify-center mx-auto">
                    <Sliders className="w-6 h-6 text-violet-400" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-700 text-sm sm:text-base">자가진단 분석을 대기 중입니다</h4>
                    <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed">
                      왼쪽 입력 패널에 평판을 조회하고 싶은 시험 기출 문항을 직접 입력하거나 준비된 실제 고사 예제 프리셋을 누르면 실시간 척도화 분석이 전개됩니다.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
}
