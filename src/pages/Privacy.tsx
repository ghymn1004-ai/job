import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Lock, 
  Copyright, 
  EyeOff, 
  Database, 
  AlertTriangle, 
  UserCheck, 
  FileCheck2, 
  Building2, 
  ServerCrash,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Privacy() {
  const [activeTab, setActiveTab] = useState<'all' | 'copyright' | 'privacy'>('all');

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20 px-4 md:py-32">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 text-brand rounded-full text-[11px] font-black mb-6 uppercase tracking-[0.2em]"
          >
            <ShieldCheck size={14} />
            Legal Notice & Privacy Policy
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tighter">
            지식재산권 및 <span className="text-brand">개인정보 보호고지</span>
          </h1>
          <p className="text-slate-500 font-bold text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            이음(iium)은 구직 50+의 소중한 경험과 자산을 보호하고, <br />
            개인정보를 업계 최고 수준의 보안 원칙 아래에 안전하게 지켜나갑니다.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-2 mb-12 p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto">
          {[
            { id: 'all', label: '종합 고지' },
            { id: 'copyright', label: '지식재산권 보호' },
            { id: 'privacy', label: '개인정보처리방침' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                activeTab === tab.id 
                  ? 'bg-white text-slate-950 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section 1: Copyright & AI Protection */}
        {(activeTab === 'all' || activeTab === 'copyright') && (
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-3xl rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                  <Copyright size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-950 tracking-tight">1. 지식재산권 및 저작물 보호 정책</h2>
              </div>

              <div className="space-y-6 text-sm text-slate-600 font-medium leading-relaxed">
                <div>
                  <h3 className="text-base font-black text-slate-900 mb-2">원저작물에 대한 포괄적 귀속</h3>
                  <p>
                    이음(iium, iiumai.com) 플랫폼에 게재된 모든 텍스트, 교육 자료(칼럼, 직무 가이드, 교육 레벨 정보), 소프트웨어 소스코드, UI/UX 디자인 요소, 매칭 알고리즘, 데이터베이스 모델 및 그래픽은 대한민국 저작권법 및 관련 지식재산권 법령에 의해 보호받는 독창적인 자산이며, 이음(iium)에 일체의 저작권 및 처분 권한이 존재합니다.
                  </p>
                </div>

                <div className="p-6 bg-rose-50 border border-rose-100/60 rounded-3xl space-y-3">
                  <h4 className="font-black text-rose-700 flex items-center gap-2">
                    <AlertTriangle size={16} /> AI 크롤링 및 인공지능 학습 무단 수집 거부 (Anti-AI Scraping)
                  </h4>
                  <p className="text-xs text-rose-600/90 leading-relaxed font-bold">
                    본 플랫폼 내 구인기업 프로젝트 정보, 50+ 인력의 고유 이력 프로필, 교육 콘텐츠, 매칭 상세 데이터 등 모든 디지털 저작물은 인공지능(AI) 기계 학습(LLM 대형 언어 모델 배포, 검색 확장 생성용 벡터 데이터베이스 구축 포함), 데이터 마이닝 및 어떠한 형태의 자동화 크롤러(GPTBot, ChatGPT-User, ClaudeBot, Claude-Web, Google-Extended, CCBot 등)에 의한 무단 스크래핑 및 다운로드를 전면 불허합니다.
                  </p>
                  <p className="text-[11px] text-rose-500/80 leading-relaxed">
                    robots.txt의 제어로 엄격한 수집 배제를 명시하고 있으며, 이를 위반하여 상업적 목적이나 학술 목적으로 자료를 비승인 수집하는 일체의 행위에 대해서는 기망 및 저작권법 위반 등으로 민형사상 강경 조치가 취해질 수 있습니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-2 text-brand">허용 범위</h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      대한민국 정부 공식 인덱싱 검색 엔진(Googlebot 등)의 유기적 노출 극대화용 sitemap 구조 검색 데이터 수집, 사용자 인터페이스 내 전송 목적의 기술적 세션에 한해 제한적으로 허용됩니다.
                    </p>
                  </div>
                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                    <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest mb-2 text-rose-600">불법 유포 및 도용 금지</h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      사전 명시적 서면 서명 없이 어플리케이션의 자산, 로고 이미지 및 브랜딩 자산을 변경하거나 모방하여 무단 발행, 재배포하는 경우 특허법 및 저작권법 제136조 등에 의거 처벌을 받을 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Section 2: Personal Information & Privacy */}
        {(activeTab === 'all' || activeTab === 'privacy') && (
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="bg-white border border-slate-100 rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-3xl rounded-full translate-x-1/4 -translate-y-1/4 pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Lock size={20} />
                </div>
                <h2 className="text-2xl font-black text-slate-950 tracking-tight">2. 개인정보 보호공지 및 처리 기본원칙</h2>
              </div>

              <div className="space-y-6 text-sm text-slate-600 font-medium leading-relaxed">
                <p>
                  이음(iium)은 관계 법령인 『개인정보 보호법』, 『정보통신망 이용촉진 및 정보보호 등에 관한 법률』을 철저하게 준수하고 있으며, 이용자의 동의에 기반한 안전한 데이터 조회를 진행합니다.
                </p>

                <div className="space-y-4">
                  <div className="border border-slate-100 rounded-2xl p-6 hover:bg-slate-50/50 transition-colors">
                    <h3 className="font-black text-slate-900 text-sm mb-2 flex items-center gap-2">
                      <UserCheck size={16} className="text-brand" /> 개인정보의 수집 항목 및 고유 목적
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">
                      서비스 신청, 문의, 회원 가입 프로세스를 위해 아래의 필요 최소한의 정보를 수집합니다.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-500 list-disc list-inside">
                      <li><span className="font-black text-slate-700">개인 회원:</span> 성명, 이메일 주소, 휴대전화 번호, 경력 사항, 학력, 보유 역량 자격 조건</li>
                      <li><span className="font-black text-slate-700">기업 파트너:</span> 기업명, 사업자 정보, 담당자 연락처(성명, 이메일, 전화번호), 채용 필요 직무 내용</li>
                      <li><span className="font-black text-slate-700">수집 목적:</span> AI 기반 정밀 이력 매칭 분석, 커리어 추천, 50+ 인턴/기초 역량 교육 레벨 관리, 고객 문의 처리</li>
                    </ul>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-6 hover:bg-slate-50/50 transition-colors">
                    <h3 className="font-black text-slate-900 text-sm mb-2 flex items-center gap-2">
                      <EyeOff size={16} className="text-brand" /> 제3자 제공 제한 및 완벽 비밀 보장
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      이음(iium)은 사용자의 동의 없이 개인정보를 외부 상업 목적으로 판매, 공유, 유출하지 않습니다. AI 매칭 지원 시 기업 프로필 분석 단계에서는 구직자의 개인을 식별할 수 있는 핵심 정보(실제 성명, 정밀 이메일 및 휴대전화번호)를 자동 비식별화 처리하여 사전 보호하며, 최종적인 구직 매칭 동의가 조율된 안전한 상태에서만 상호 연락처가 제한 공개됩니다.
                    </p>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-6 hover:bg-slate-50/50 transition-colors">
                    <h3 className="font-black text-slate-900 text-sm mb-2 flex items-center gap-2">
                      <Database size={16} className="text-brand" /> 안전성 확보 조치 (시스템 관리 보안)
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      모든 개인정보는 데이터베이스 내 암호화 알고리즘 처리를 거쳐 서버에 안전 보존됩니다. 비인가자의 침입을 방지하는 방화벽, 세션 무효화 장치를 구축하고 원격에서 데이터에 접근할 수 없도록 격리하여 불필요한 시스템 접근을 원천 봉쇄하고 있습니다.
                    </p>
                  </div>

                  <div className="border border-slate-100 rounded-2xl p-6 hover:bg-slate-50/50 transition-colors">
                    <h3 className="font-black text-slate-900 text-sm mb-2 flex items-center gap-2">
                      <FileCheck2 size={16} className="text-brand" /> 정보 주체의 권리 보장 (수정 및 즉시 삭제)
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      사용자는 본인의 개인정보 열람 및 오류의 정정을 요구할 수 있으며, 이음(iium) 플랫폼 이메일(iiumai4u@gmail.com) 또는 전용 민원 핫라인(070-7624-2675)을 통해 정보 삭제 또는 매칭 서비스 중단을 요청하는 경우 지체 없이 등록된 개인정보 데이터를 완전히 영구 파기 처리합니다.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 text-slate-400 font-bold text-xs space-y-1">
                  <p>• 최초 고지일: 2026년 6월 11일</p>
                  <p>• 개인정보 보호책임자: 지수기 (이음AI 대표이사)</p>
                  <p>• 민원 접수처: iiumai4u@gmail.com | 070-7624-2675</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Section 3: Shared Ethos Signoff */}
        <div className="p-10 md:p-16 bg-slate-950 rounded-[48px] text-white overflow-hidden relative border border-slate-800">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="max-w-xl">
              <span className="text-brand font-black text-xs uppercase tracking-widest block mb-3">iium Trust Statement</span>
              <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight">
                나의 정밀한 이력 데이터는 <br />오직 나를 위해서만 쓰입니다.
              </h3>
              <p className="text-slate-400 text-xs md:text-sm font-medium leading-relaxed">
                이음(iium)은 인공지능 교육 및 정밀 분석을 제공하되, 사용자의 데이터 권리를 플랫폼의 이익보더 먼저 생각합니다. 지식재산의 정중한 존중과 개인정보에 대한 완벽한 통제야말로 신뢰로 이어지는 연결의 첫 단계입니다.
              </p>
            </div>
            <div className="shrink-0">
              <a 
                href="/ai-policy"
                className="inline-flex items-center gap-2.5 px-6 py-4 bg-brand text-slate-950 rounded-2xl font-black text-xs md:text-sm hover:scale-105 transition-transform"
              >
                매칭 운영정책 살펴보기
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
