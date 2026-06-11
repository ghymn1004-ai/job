/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  Compass, 
  Search, 
  Download, 
  Video, 
  Calendar, 
  FileText, 
  TrendingUp, 
  BookOpen, 
  Award, 
  User, 
  Check, 
  Flame, 
  Share2, 
  ArrowRight,
  RefreshCw,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LabSectionProps {
  initialSubmenu?: string | null;
}

// 1. AI 교육 트렌드 데이터
const TRENDS = [
  { id: 1, title: "챗GPT가 초래한 공교육 평가의 패러다임 변화 공조 분석", date: "2026.05.28", author: "이음미래교원 정책회", clicks: 580, tag: "정책" },
  { id: 2, title: "OECD 국제학업성취도평가(PISA)의 7대 기하 지악 역량 배정 고찰", date: "2026.05.15", author: "한국비교교육학회", clicks: 420, tag: "글로벌" },
  { id: 3, title: "AI 대필 및 윤리 위반 여부를 잡아내는 다각적 루브릭 수립원칙", date: "2026.04.10", author: "에이전트 장독 장론회", clicks: 910, tag: "수행평가" }
];

// 2. 미래교육 사례 데이터
const CASE_STUDIES = [
  { id: 1, school: "서울 미래창의고등학교", category: "인화수행", desc: "국어 수행평가에 AI 리터러시 진단안을 결합하여 학생들의 자체 비평문 창출력 증대 및 시너지 성과", tag: "수도권 일반고" },
  { id: 2, school: "부산 센텀융합중학교", category: "수리논술", desc: "수학 단원평가에 드론 자율주행 교사 수식 검증을 투입하여 수학 공식의 단순 대입 맹점을 완파", tag: "과학중점지정" },
  { id: 3, school: "경기 대안삼중학당", category: "글로벌의사소통", desc: "영어 투자 편지 기획문을 작성하되, AI 영작 결과를 정서 조율성 필터로 수정하는 교과 척도 적용", tag: "대안학교" }
];

// 3. 연구자료 다운로드 리스트
const ARCHIVES = [
  { id: 1, title: "AIEA 2026 학업문제평가 척도 표준 매뉴얼 (가이드북편)", size: "4.8 MB", format: "PDF" },
  { id: 2, title: "서·논술형 문항 전환 시 활용 가능한 고부가 가치 핵심 동사 100선", size: "1.2 MB", format: "DOCX" },
  { id: 3, title: "AI 오남용 예방 및 협동 작가 학업 윤리 선언문 원본 양식", size: "850 KB", format: "HWP" }
];

// 4. 전문가 칼럼
const COLUMNS = [
  { id: 1, title: "더 이상 정답이 하나뿐인 시험으로 자식들을 가두지 마라", writer: "김정식 (이음교육문화재단 이사장 / 前 국어교과 장학관)", desc: "챗봇이 다변을 수분 만에 도출해내는 시절, 학교 시험은 오직 스스로 주장하고 증명하는 에세이식 검증으로 나아가야만 교사와 부모의 소임을 실현한다.", avatar: "👨‍🏫" },
  { id: 2, title: "인공지능 비서(LLM)를 가장 영리하게 활용하는 뇌는 어떻게 훈련되는가", writer: "최지민 (KAIST 뇌인지과학 연구원 / 아동 발달공학관)", desc: "단답형의 정보는 AI가 최적화한다. 인간 미래형 실력은 '질문을 수정하고 수립하는 능력(Prompting)'과 '거짓 정보를 여과하는 사실검증력'에서만 촉진된다.", avatar: "👩‍⚕️" }
];

// 5. 웨비나 리스트
const WEBINARS = [
  { id: 1, title: "AIEA 제 4회 온라인 전국 평가혁신 웨비나 [체험편]", date: "2026.06.18 (목) 19:30", speaker: "AIEA 학술인증 연구위원단", status: "recruiting", seatsLeft: 12 },
  { id: 2, title: "학부모를 위한 생성형 AI 시대 슬기로운 가정 학습 평가 지도 규칙", date: "2026.07.02 (목) 20:00", speaker: "김정식 이사장 & 게스트 패널", status: "recruiting", seatsLeft: 45 }
];

export default function LabSection({ initialSubmenu }: LabSectionProps) {
  const [activeTab, setActiveTab] = useState<"trend" | "case" | "archive" | "column" | "webinar">("trend");
  
  // Custom Sync if navigated via header submenus
  React.useEffect(() => {
    if (initialSubmenu) {
      const lower = initialSubmenu.toLowerCase();
      if (lower.includes("트렌드") || lower.includes("trend")) setActiveTab("trend");
      else if (lower.includes("사례") || lower.includes("case")) setActiveTab("case");
      else if (lower.includes("자료") || lower.includes("archive")) setActiveTab("archive");
      else if (lower.includes("칼럼") || lower.includes("column")) setActiveTab("column");
      else if (lower.includes("웨비나") || lower.includes("webinar")) setActiveTab("webinar");
    }
  }, [initialSubmenu]);

  // Case studies search
  const [caseSearch, setCaseSearch] = useState("");
  
  // Simulated download actions
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadCompleteId, setDownloadCompleteId] = useState<number[]>([]);

  // Webinar RSVP
  const [webinarRSVP, setWebinarRSVP] = useState<number[]>([]);

  const handleDownload = (id: number) => {
    if (downloadingId !== null) return;
    setDownloadingId(id);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadCompleteId(comm => [...comm, id]);
          setDownloadingId(null);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleRSVP = (id: number) => {
    if (webinarRSVP.includes(id)) {
      setWebinarRSVP(prev => prev.filter(item => item !== id));
    } else {
      setWebinarRSVP(prev => [...prev, id]);
    }
  };

  const filteredCases = CASE_STUDIES.filter(c => 
    c.school.includes(caseSearch) || 
    c.desc.includes(caseSearch) || 
    c.tag.includes(caseSearch)
  );

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in" id="future-education-lab-root">
      
      {/* Header Banner - Lab Brand */}
      <div className="bg-[#5D5FEF] rounded-3xl py-12 md:py-16 px-8 md:px-12 text-white shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 -mt-8 -mr-8 w-40 h-40 bg-white/10 rounded-full blur-xl font-sans"></div>
        <div className="relative max-w-4xl space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-100 text-xs sm:text-sm font-bold tracking-wide uppercase">
            <Compass className="w-3.5 h-3.5 text-pink-300" />
            이음School AI : 미래교육연구소 (Future Education Lab)
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            🔬 미래교육연구소 (Future Education Lab)
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-indigo-100/90 font-medium leading-relaxed max-w-3xl">
            공교육의 장학 트렌드 분석 보고서, 각급 학교의 실제 성취 사례 데이터, 정량 루브릭 원문 자료실까지, 미래 평가 문해력 증강을 위한 풍부한 콘텐츠 마케팅 허브를 만나보세요.
          </p>
        </div>
      </div>

      {/* Internal Navigation Sub-tabs */}
      <div className="bg-white border border-slate-200 rounded-3xl p-2 flex flex-wrap gap-2 shadow-xs">
        {[
          { id: "trend", label: "AI 교육 트렌드", icon: TrendingUp },
          { id: "case", label: "미래교육 사례", icon: Compass },
          { id: "archive", label: "연구자료", icon: FileText },
          { id: "column", label: "칼럼", icon: BookOpen },
          { id: "webinar", label: "웨비나", icon: Video }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[120px] text-center py-4 px-4 rounded-2xl text-xs sm:text-sm md:text-base font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isSelected 
                  ? "bg-[#D946EF] text-white shadow-md shadow-fuchsia-100" 
                  : "text-slate-650 hover:bg-slate-50 hover:text-slate-900 border border-slate-100/60"
              }`}
            >
              <Icon className="w-4.5 h-4.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs min-h-[350px]">
        <AnimatePresence mode="wait">
          
          {/* ① AI 교육 트렌드 */}
          {activeTab === "trend" && (
            <motion.div
              key="trend"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-[#1E1145] text-lg sm:text-2xl flex items-center gap-2">📈 최신 AI 교육 정책 트렌드 피드</h3>
                  <p className="text-xs sm:text-sm text-slate-500">대한민국 공교육 장학 및 미래형 지적 혁신의 핵심 동향 보고서 모음</p>
                </div>
                <span className="text-xs sm:text-sm text-fuchsia-600 font-extrabold flex items-center gap-1.5 self-start sm:self-auto bg-fuchsia-50 px-3 py-1.5 rounded-xl border border-fuchsia-100">
                  <Flame className="w-4 w-4 text-amber-500 animate-pulse" />
                  실시간 업데이트 중
                </span>
              </div>

              <div className="space-y-4">
                {TRENDS.map((trend) => (
                  <div key={trend.id} className="group p-6 sm:p-8 bg-slate-50 border border-slate-150 rounded-3xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:bg-white hover:border-fuchsia-355 hover:shadow-lg">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] sm:text-xs bg-fuchsia-100 text-fuchsia-750 font-black px-2.5 py-1 rounded border border-fuchsia-200 uppercase tracking-wider">{trend.tag}</span>
                        <span className="text-xs text-slate-450 font-sans font-medium">{trend.date}</span>
                      </div>
                      <h4 className="font-black text-slate-900 text-base sm:text-lg md:text-xl group-hover:text-fuchsia-600 transition-colors">
                        {trend.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-450 font-light">출처: {trend.author} • 누적 조회수 {trend.clicks}회</p>
                    </div>
                    <button className="text-xs sm:text-sm font-black text-fuchsia-600 hover:text-fuchsia-700 cursor-pointer inline-flex items-center gap-1.5 bg-fuchsia-50 hover:bg-fuchsia-100 px-4 py-2.5 rounded-xl border border-fuchsia-150">
                      원문 읽기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ② 미래교육 사례 */}
          {activeTab === "case" && (
            <motion.div
              key="case"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="font-extrabold text-[#1E1145] text-lg sm:text-2xl flex items-center gap-2">💼 AIEA 도입 학교 성공 사례집</h3>
                  <p className="text-xs sm:text-sm text-slate-500">교사별 고사 문항 진설 성과 인터뷰 및 수행 평가 분석 모음</p>
                </div>
                
                {/* Search */}
                <div className="relative w-full sm:w-72 font-sans text-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={caseSearch}
                    onChange={(e) => setCaseSearch(e.target.value)}
                    placeholder="학교명 / 수용 지역 검색..."
                    className="block w-full pl-10 pr-3 py-3 border border-slate-250 rounded-xl bg-white text-xs placeholder-slate-400 focus:outline-none focus:border-fuchsia-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                {filteredCases.map((story) => (
                  <div key={story.id} className="bg-slate-50/70 hover:bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 transition-all hover:border-fuchsia-400 hover:shadow-md">
                    <div className="space-y-3.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-black text-[#5D5FEF] bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">{story.tag}</span>
                        <span className="text-slate-450 font-mono font-bold uppercase tracking-wider">{story.category}</span>
                      </div>
                      <h4 className="font-black text-slate-850 text-base sm:text-lg">{story.school}</h4>
                      <p className="text-xs sm:text-sm text-slate-655 leading-relaxed font-light">{story.desc}</p>
                    </div>
                    <div className="pt-3.5 border-t border-slate-150 flex items-center justify-between text-xs sm:text-sm font-black text-fuchsia-600 group cursor-pointer select-none">
                      <span>현장 인터뷰 가이드 전체 보기</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                ))}

                {filteredCases.length === 0 && (
                  <div className="col-span-full py-12 text-center text-slate-450 font-bold text-sm sm:text-base">
                    매칭되는 성공 사례가 부존합니다. 검색 키워드를 초기화해주세요.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* ③ 연구자료 */}
          {activeTab === "archive" && (
            <motion.div
              key="archive"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-[#1E1145] text-lg sm:text-2xl flex items-center gap-2">📂 평가 가이드 원문 자료 라이브러리</h3>
                <p className="text-xs sm:text-sm text-slate-500">학위 논문, 실무 기준안, 가이드북 원본 파일을 즉시 안전하게 무상 다운로드하세요.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {ARCHIVES.map((arch) => {
                  const isCompleted = downloadCompleteId.includes(arch.id);
                  const isCurDownloading = downloadingId === arch.id;

                  return (
                    <div key={arch.id} className="bg-white border border-slate-200/80 hover:border-fuchsia-400 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5 transition-all relative overflow-hidden">
                      {isCurDownloading && (
                        <div className="absolute top-0 left-0 h-1 bg-fuchsia-500 transition-all font-mono" style={{ width: `${downloadProgress}%` }}></div>
                      )}
                      
                      <div className="space-y-3">
                        <span className="text-[10px] sm:text-xs bg-slate-100 text-slate-655 font-black px-2.5 py-1 rounded border border-slate-150 font-mono inline-block mb-1 tracking-widest uppercase">
                          {arch.format} FILE
                        </span>
                        <h4 className="font-black text-slate-850 text-base sm:text-lg leading-snug">{arch.title}</h4>
                        <p className="text-xs text-slate-400 font-mono">다운로드 포맷 크기: {arch.size}</p>
                      </div>

                      <button
                        onClick={() => handleDownload(arch.id)}
                        disabled={isCurDownloading}
                        className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isCompleted 
                            ? "bg-slate-100 text-slate-500 border border-slate-200" 
                            : isCurDownloading 
                            ? "bg-fuchsia-50 text-fuchsia-600 border border-fuchsia-200 disabled:cursor-not-allowed" 
                            : "bg-fuchsia-600 text-white hover:bg-fuchsia-700 shadow-md shadow-fuchsia-100"
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            다운로드 완료됨
                          </>
                        ) : isCurDownloading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            서버 전송 중 ({downloadProgress}%)
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            무료 자료 받기
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ④ 칼럼 */}
          {activeTab === "column" && (
            <motion.div
              key="column"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-[#1E1145] text-lg sm:text-2xl flex items-center gap-2">👩‍💻 이음 교육 연구원 뇌과학/장학 기획 칼럼</h3>
                <p className="text-xs sm:text-sm text-slate-505">학부모와 미래 지식 교육 설계자들에게 전하는 진심 어린 평가 철학 조망</p>
              </div>

              <div className="space-y-6">
                {COLUMNS.map((col) => (
                  <div key={col.id} className="p-6 sm:p-8 bg-slate-50 border border-slate-205 rounded-3xl flex flex-col md:flex-row gap-6 items-start hover:bg-white hover:border-fuchsia-300 hover:shadow-md transition-all">
                    <div className="w-16 h-16 rounded-full bg-indigo-50 border border-slate-200 flex items-center justify-center text-3xl shrink-0">
                      {col.avatar}
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="space-y-1">
                        <span className="text-xs sm:text-sm text-fuchsia-600 font-extrabold block">{col.writer}</span>
                        <h4 className="font-black text-slate-900 text-base sm:text-lg md:text-xl">"{col.title}"</h4>
                      </div>
                      <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-light">{col.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ⑤ 웨비나 */}
          {activeTab === "webinar" && (
            <motion.div
              key="webinar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-[#1E1145] text-lg sm:text-2xl flex items-center gap-2">📅 학부모 & 교사 대상 기출혁신 웨비나 (Webinar)</h3>
                <p className="text-xs sm:text-sm text-slate-500">실시간 화상 솔루션 연수가 상시 진행됩니다. 정해진 인원수 소진 전 무료 좌석권을 선점하세요.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {WEBINARS.map((web) => {
                  const isRSVPed = webinarRSVP.includes(web.id);
                  return (
                    <div key={web.id} className="border border-slate-200 rounded-3xl p-6 sm:p-8 bg-white hover:border-fuchsia-300 hover:shadow-lg transition-all space-y-5 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-indigo-50 text-indigo-700 font-black px-3 py-1.5 rounded-xl border border-indigo-125 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-indigo-600" />
                            {web.date}
                          </span>
                          {!isRSVPed && (
                            <span className="text-xs text-rose-600 font-black tracking-tighter bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg">
                              마감 임박 (남은 {web.seatsLeft}석)
                            </span>
                          )}
                        </div>

                        <h4 className="font-black text-slate-900 text-sm sm:text-base md:text-lg leading-snug">{web.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium">발표 전문가: {web.speaker}</p>
                      </div>

                      <button
                        onClick={() => handleRSVP(web.id)}
                        className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          isRSVPed 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-150 shadow-inner" 
                            : "bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-md shadow-fuchsia-100"
                        }`}
                      >
                        {isRSVPed ? (
                          <>
                            <Check className="w-4.5 h-4.5" />
                            웨비나 예약 영구 확정 (참가코드 이메일 전송)
                          </>
                        ) : (
                          <>
                            <Video className="w-4.5 h-4.5" />
                            무료 참가 신청 제출하기
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* AI 시대 평가 철학 (AIEA Evaluation Philosophy) - BIG PROMINENT TYPOGRAPHY */}
      <div className="bg-gradient-to-br from-[#1E1145] to-[#2E1D62] rounded-3xl p-8 sm:p-12 text-white border border-white/10 shadow-lg text-center relative overflow-hidden select-none my-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-4xl mx-auto space-y-6 sm:space-y-8 text-center">
          <span className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-200 text-xs sm:text-sm font-black tracking-widest uppercase font-sans">
            📣 AIEA AI ERA EVALUATION PHILOSOPHY
          </span>
          
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-indigo-50 leading-snug sm:leading-[1.4] tracking-tight font-sans">
            &ldquo;올바른 학교 시험은 <br className="sm:hidden" />
            <span className="text-yellow-300">답을 빨리 찍어내는 시험</span>이 아니라, <br />
            학생들 저마다의 <span className="text-teal-300">고유한 생각과 비판 증거를 기술하는 시험</span>이어야 합니다.&rdquo;
          </h3>

          <div className="w-16 h-1 bg-teal-400 mx-auto rounded-full"></div>

          <p className="text-sm sm:text-base md:text-lg text-indigo-150 leading-relaxed max-w-2xl mx-auto font-sans font-light">
            단순 질문의 정오를 판별하는 과거 인쇄물식 검정 방식을 넘어, 문항의 맥락을 드높이고 문제해결 지평을 성찰하도록 도움으로써 인간 고유의 창조적 역량을 벼려내는 것이 이음School AI가 추구하는 미래 지향점입니다.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4 text-center font-sans">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <span className="text-[10px] text-indigo-200 uppercase font-bold block font-sans">1단계</span>
              <p className="text-xs sm:text-sm font-extrabold text-white font-sans">Knowledge (지식)</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <span className="text-[10px] text-indigo-200 uppercase font-bold block font-sans">2단계</span>
              <p className="text-xs sm:text-sm font-extrabold text-white font-sans">Thinking (생각)</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <span className="text-[10px] text-indigo-200 uppercase font-bold block font-sans">3단계</span>
              <p className="text-xs sm:text-sm font-extrabold text-white font-sans">Application (적용)</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3">
              <span className="text-[10px] text-indigo-200 uppercase font-bold block font-sans">4단계</span>
              <p className="text-xs sm:text-sm font-extrabold text-white font-sans">Creation (창안)</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
