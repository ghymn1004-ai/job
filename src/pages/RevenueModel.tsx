import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Zap, UserCircle2, Building2, GraduationCap, ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { useInquiry } from '../components/ui/InquiryContext';

interface PricingCardProps {
  key?: React.Key;
  title: string;
  price: string;
  desc: string;
  features: string[];
  color: 'blue' | 'slate' | 'indigo';
  details: string[];
}

function InteractivePricingCard({ title, price, desc, features, color, details }: PricingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "p-10 rounded-[32px] border transition-all cursor-pointer group select-none relative overflow-hidden",
        color === 'blue' ? "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-brand/30" :
        color === 'slate' ? "bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-300" :
        "bg-slate-900 border-slate-800 text-white shadow-xl hover:shadow-2xl"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className={cn("text-xl font-black tracking-tight", color === 'indigo' ? "text-white" : "text-slate-900")}>{title}</h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className={cn("transition-colors", color === 'indigo' ? "text-slate-500" : "text-slate-300 group-hover:text-brand")}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
      
      <div className={cn("text-3xl font-black mb-6 tracking-tighter", color === 'indigo' ? "text-brand" : "text-brand")}>{price}</div>
      <p className={cn("text-sm leading-relaxed mb-8 font-bold", color === 'indigo' ? "text-slate-400" : "text-slate-500")}>
        {desc}
      </p>

      <div className={cn("space-y-4 pt-8 border-t", color === 'indigo' ? "border-slate-800" : "border-slate-100")}>
        {features.map((feature, j) => (
          <div key={j} className={cn("flex items-center gap-3 text-xs font-black", color === 'indigo' ? "text-slate-300" : "text-slate-700")}>
            {color === 'indigo' ? <Zap size={16} className="text-brand flex-shrink-0" /> : <ShieldCheck size={16} className="text-brand flex-shrink-0" />}
            {feature}
          </div>
        ))}
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className={cn("mt-8 pt-8 border-t space-y-4", color === 'indigo' ? "border-slate-800" : "border-slate-100")}>
              <p className={cn("text-[10px] font-black uppercase tracking-widest", color === 'indigo' ? "text-brand" : "text-brand")}>상세 정책 및 혜택</p>
              {details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className={cn("mt-0.5 flex-shrink-0", color === 'indigo' ? "text-brand" : "text-brand")} />
                  <span className={cn("text-xs font-bold leading-tight", color === 'indigo' ? "text-slate-400" : "text-slate-600")}>{detail}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RevenueModel() {
  const { openInquiry } = useInquiry();
  const [selectedProduct, setSelectedProduct] = useState({ name: '경력 재설계 컨설팅(개인)', price: 70000 });
  const [selectedMethod, setSelectedMethod] = useState('kakaopay');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const matchingModels: PricingCardProps[] = [
    {
      title: '인재찾기 (기업용 DB 매칭)',
      price: '월 290,000원 ~',
      desc: '검증된 시니어 전문가 DB를 실시간으로 열람하고 제안할 수 있는 기업 전용 구독형 인재 탐색 솔루션입니다.',
      features: ['AI 인재 DB 무제한 열람 및 직접 제안', '기업 맞춤형 AI 적합도 정밀 리포트', '채용 성공 시 수수료 30% 감면 혜택'],
      color: 'slate',
      details: [
        '기본 이용료: 월 29만원 (인재 제안 월 10회 포함)',
        '프리미엄 노출: 주당 15만원 (채용공고 상단 고정)',
        'AI 심층 역량 분석: 건당 5만원 (상세 리포트 제공)',
        '연 단위 결제 시 20% 할인 프로모션 적용'
      ]
    },
    {
      title: '일자리찾기 (개인용 매칭 케어)',
      price: '기본 무료 (성공 시 수수료)',
      desc: '단순 검색을 넘어 AI가 시니어님의 경력을 재해석하여 최적의 취업 파트너를 직접 연결해 드립니다.',
      features: ['AI 자소서 및 경력기술서 자동 튜닝', '일대일 헤드헌팅 전담 매니저 케어', '실시간 AI 매칭 합격 가능성 분석'],
      color: 'blue',
      details: [
        '기본 매칭 서비스: 0원 (프로필 등록 시 자동 실행)',
        'AI 자소서 정밀 첨삭(1회): 29,000원',
        '헤드헌팅 취업 성공 수수료: 연봉의 7~10% (기업 부담 원칙)',
        '경력 재설계 컨설팅(60분): 70,000원'
      ]
    }
  ];

  const educationModels: PricingCardProps[] = [
    {
      title: 'AI직무교육 - AI 실무 전문가',
      price: '199,000원',
      desc: '학원 운영, 강사, 에듀테크 등 교육 현장에서 즉시 활용 가능한 AI 실무 역량을 배양합니다.',
      features: ['생성형 AI를 활용한 학습 교재 제작실습', '학원 행정 자동화 AI 비서 구축 과정', '수료 시 이음AI Lab 공식 인증 배지'],
      color: 'indigo',
      details: [
        '8차시 오프라인 집중 실습 및 온라인 녹화본 제공',
        'AI 유료 툴(ChatGPT Plus 등) 체험권 포함',
        '교재 및 워크북(PDF) 무료 제공',
        '수료자 대상 채용 파트너사 우선 매칭 기회'
      ]
    },
    {
      title: 'AI직무교육 - 강사 양성 과정',
      price: '450,000원',
      desc: '시니어 대상 디지털 교육을 전문으로 수행할 수 있는 AI 리터러시 전담 강사로 전환을 지원합니다.',
      features: ['시니어 특화 AI 교수법 및 교안 설계', '실전 모의 강의 및 전문가 피드백', '디지털 배움터 및 평생교육기관 출강 연계'],
      color: 'indigo',
      details: [
        '내일배움카드 신청 가능 (정부 지원 시 최대 100% 무료)',
        '최종 수료 시 파트너 교육기관 채용 추천서 발급',
        '강의 콘텐츠 저작 지원 및 플랫폼 등록',
        '12차시 전문 심화 커리큘럼'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-3 py-1 bg-brand/10 border border-brand/20 text-brand rounded-full text-[10px] font-black mb-6 uppercase tracking-widest shadow-sm"
          >
            Pricing Policy
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tighter leading-tight">
            <span className="text-brand">이음AI JOB</span> 서비스 이용료
            <span className="block text-sm font-bold text-slate-400 mt-2 not-italic">Powered by 이음AI Lab</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold leading-relaxed">
            아이콘을 클릭하여 각 이용 요금제의 <span className="text-brand whitespace-nowrap">상세 정책 및 혜택</span>을 확인하세요.
          </p>
        </div>

        {/* Matching Section */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1 bg-brand rounded-full" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI매칭 서비스 요금</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {matchingModels.map((model, i) => (
              <InteractivePricingCard 
                key={i} 
                title={model.title}
                price={model.price}
                desc={model.desc}
                features={model.features}
                color={model.color}
                details={model.details}
              />
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1 bg-brand rounded-full" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI직무교육 (Career Bridge)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {educationModels.map((model, i) => (
              <InteractivePricingCard 
                key={i} 
                title={model.title}
                price={model.price}
                desc={model.desc}
                features={model.features}
                color={model.color}
                details={model.details}
              />
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-400 font-bold italic">
            * 모든 교육 과정 수료 시 AI 매칭 엔진의 우선 순위 알고리즘이 적용됩니다.
          </p>
        </div>

        {/* 간편 결제 편의 시스템 (Easy & Simple Payment Solutions) - Requirement 4 */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-1 bg-brand rounded-full" />
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">이음AI JOB 간편 결제 편의 플랫폼</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Side: Benefit Descriptions */}
            <div className="lg:col-span-6 bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-full text-[10px] font-black mb-4 uppercase tracking-widest">
                  Easy Payment Policy
                </span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-4">
                  "시니어와 기업 모두를 배려하는 가장 손쉬운 지불 솔루션"
                </h3>
                <p className="text-slate-500 font-bold text-xs leading-relaxed mb-6">
                  일자리 찾기 컨설팅을 받는 시니어님들부터 채용 전용 매칭 DB를 구독하는 기업 담당자까지, 번거로운 본인인증서나 설치 프로그램 없이 단 10초 만에 가장 직관적으로 결제를 완주할 수 있도록 이중 편익 시스템을 탑재했습니다.
                </p>

                <div className="space-y-4">
                  {[
                    {
                      label: '국내 대표 3대 간편결제 시스템',
                      desc: '카카오페이(KakaoPay), 토스페이(Toss), 네이버페이(NaverPay) 제휴로 번거로운 실물 카드 없이 모바일 앱 QR 스캔 한 번으로 안전 승인을 유치합니다.'
                    },
                    {
                      label: '무통장 가상계좌 발급 및 알림톡 가동',
                      desc: '지불 수단에 어려움을 느끼시는 어르신들을 위해 가상계좌 신청 즉시 실시간 문자/알림톡을 전달하며, 은행 입금 성공 시 영수증/수강증이 일괄 자동 발행됩니다.'
                    },
                    {
                      label: '기업 맞춤형 조달 전자세금계산서 청구',
                      desc: '인사담당자용 대규모 결제 시 사업자 정보만 제출하면 청구용/영수용 국세청 정규 세금계산서가 발행되어, 품의 및 증빙 처리가 대폭 수월해집니다.'
                    },
                    {
                      label: '안전성 기반 카드 등록 정기 결제 (SaaS형)',
                      desc: '매달 연장되는 기업 매칭 제안 멤버십의 경우, 최초 안전 승인 등록 후 클릭 없이 자동 정산되어 채용 흐름이 결코 도중에 끊어지거나 지연되지 않습니다.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="w-5 h-5 bg-brand/10 rounded-full flex items-center justify-center shrink-0 text-brand text-[10px] font-black mt-0.5">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900">{item.label}</h4>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5 leading-normal">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side: Simple Sandbox Checkout Simulator */}
            <div className="lg:col-span-6 bg-slate-900 text-white p-10 rounded-[32px] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div>
                <h3 className="text-xl font-black mb-1 text-brand flex items-center gap-2">
                  🛡️ 실전 간편결제 가상 샌드박스
                </h3>
                <p className="text-[10px] text-slate-400 font-bold mb-6">
                  결제 승인 절차를 직접 안전하게 실습하고 편의성을 가늠해 볼 수 있는 체험존입니다.
                </p>

                {/* Step 1: Select Product */}
                <div className="space-y-2 mb-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">1. 결제 상품 선택</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: '경력 재설계 컨설팅(개인)', price: 70000, label: '70,000원' },
                      { name: 'AI 자소서 정밀 첨삭(개인)', price: 29000, label: '29,000원' },
                      { name: '기업 인재찾기 구독(월간)', price: 290000, label: '290,000원' },
                      { name: 'AI직무교육 수강료(개인)', price: 199000, label: '199,000원' },
                    ].map((prod) => (
                      <button
                        key={prod.name}
                        onClick={() => {
                          setSelectedProduct(prod);
                          setPaymentStatus('idle');
                        }}
                        className={cn(
                          "p-3.5 rounded-xl border text-left text-xs font-bold transition-all flex flex-col justify-between cursor-pointer",
                          selectedProduct.name === prod.name 
                            ? "bg-brand/20 border-brand text-brand" 
                            : "bg-slate-800/55 border-slate-800 text-slate-300 hover:border-slate-700"
                        )}
                      >
                        <span className="text-[10px] text-slate-400 truncate w-full">{prod.name}</span>
                        <span className="font-extrabold text-[13px] mt-1 text-white">{prod.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Method */}
                <div className="space-y-2 mb-6">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">2. 간편 지불 수단 선택</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'kakaopay', name: '카카오페이', bg: 'hover:bg-amber-400/10 hover:border-amber-400/20', active: "bg-amber-400 text-slate-900 border-amber-400 shadow-lg shadow-amber-400/10" },
                      { id: 'tosspay', name: '토스페이', bg: 'hover:bg-blue-500/10 hover:border-blue-500/20', active: 'bg-blue-500 text-white border-blue-500' },
                      { id: 'naverpay', name: '네이버페이', bg: 'hover:bg-emerald-500/10 hover:border-emerald-500/20', active: 'bg-emerald-500 text-white border-emerald-500' },
                      { id: 'card', name: '신용/체크카드', bg: 'hover:bg-slate-700/30 hover:border-slate-700/50', active: 'bg-slate-700 text-white border-slate-600' },
                    ].map((meth) => (
                      <button
                        key={meth.id}
                        onClick={() => {
                          setSelectedMethod(meth.id);
                          setPaymentStatus('idle');
                        }}
                        className={cn(
                          "py-3 rounded-lg border text-center text-[11px] font-extrabold transition-all cursor-pointer",
                          selectedMethod === meth.id ? meth.active : `bg-slate-800/40 border-slate-800 text-slate-400 ${meth.bg}`
                        )}
                      >
                        {meth.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Checkout Status Box */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-slate-400 font-bold">최종 승인 청구액</span>
                  <span className="text-xl font-black text-brand">{selectedProduct.price.toLocaleString()}원</span>
                </div>

                {paymentStatus === 'idle' && (
                  <button
                    onClick={() => {
                      setPaymentStatus('processing');
                      setTimeout(() => {
                        setPaymentStatus('success');
                      }, 1200);
                    }}
                    className="w-full py-4 bg-brand text-white rounded-xl font-black text-xs hover:bg-brand-hover active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    🚀 {selectedMethod === 'card' ? '보안 신용카드 결제 요청' : `${selectedMethod === 'kakaopay' ? '카카오페이' : selectedMethod === 'tosspay' ? '토스페이' : '네이버페이'} 간편승인`}
                  </button>
                )}

                {paymentStatus === 'processing' && (
                  <div className="w-full py-4 bg-slate-850 rounded-xl font-black text-xs text-brand flex items-center justify-center gap-2">
                    <span className="animate-spin text-lg">⏳</span> PG 게이트웨이 보안 대기 중...
                  </div>
                )}

                {paymentStatus === 'success' && (
                  <div className="space-y-3">
                    <div className="w-full py-3.5 bg-brand text-white rounded-xl font-black text-xs text-center">
                      ✓ 가상 지불 완료 (테스트 합격)
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed text-center">
                      실시간 영수증 정보가 발송되었으며, DB 용량 소모 없이 <span className="text-brand">즉각 정산 완료</span> 처리되었습니다. (본 시뮬레이션은 금전 이동이 없는 모형 샌드박스입니다)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise & Custom Section */}
        <section className="bg-white rounded-[48px] p-10 md:p-16 border border-slate-100 shadow-sm relative overflow-hidden group mb-24">
           <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black mb-6 uppercase tracking-widest inline-block">Enterprise Solution</span>
                 <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter mb-8">
                   대규모 채용 및 <br />
                   <span className="text-brand">전용 에코시스템</span> 구축
                 </h2>
                 <p className="text-slate-500 font-bold leading-relaxed mb-8">
                   연간 50명 이상의 시니어 전문가 채용이 필요하신 대기업이나, 
                   사내 시니어 임직원 대상의 맞춤형 전직 지원 AI 교육 시스템 구축을 지원합니다.
                 </p>
                 <ul className="space-y-4">
                    {[
                      '기업별 전용 AI 매칭 알고리즘 튜닝 제공',
                      '전담 HR 성과 분석 리포트 매월 발행',
                      '사내 디지털 직무 교육 커리큘럼 독점 실무 패키지',
                      '채용 수수료 연간 정액제 및 최우선 인재 배포'
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-black text-slate-700">
                         <CheckCircle2 size={18} className="text-brand" />
                         {item}
                      </li>
                    ))}
                 </ul>
              </div>
              <div className="bg-slate-950 rounded-[40px] p-10 text-white relative">
                 <h3 className="text-2xl font-black mb-4">커스텀 플랜</h3>
                 <p className="text-slate-400 text-sm mb-8 font-bold">우리 기업에 꼭 맞춘 유연한 요금제를 설계해 드립니다.</p>
                 <div className="space-y-4 mb-10">
                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                       <span className="text-slate-500 font-bold">전용 대시보드</span>
                       <span className="text-white font-black">무제한 지원</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                       <span className="text-slate-500 font-bold">전담 매니징</span>
                       <span className="text-white font-black">24시간 지원</span>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-white/5">
                       <span className="text-slate-500 font-bold">교육 연동</span>
                       <span className="text-white font-black">맞춤화 가능</span>
                    </div>
                 </div>
                 <button 
                   onClick={openInquiry}
                   className="w-full py-5 bg-brand text-white rounded-[20px] font-black text-lg hover:bg-white hover:text-brand transition-all"
                 >
                   맞춤형 서비스 신청하기
                 </button>
              </div>
           </div>
        </section>

        {/* Value Proposition */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div className="lg:col-span-1 bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <UserCircle2 size={24} />
            </div>
            <h4 className="text-xl font-black mb-4 tracking-tight">개인 (시니어)</h4>
            <p className="text-sm text-slate-500 font-bold leading-relaxed">
              기본 프로필 등록 및 매칭 서비스는 완전히 무료입니다. 
              커리어 전환을 위한 교육 비용 외에는 일체 비용이 발생하지 않습니다.
            </p>
          </div>
          <div className="lg:col-span-1 bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center mb-6">
              <Building2 size={24} />
            </div>
            <h4 className="text-xl font-black mb-4 tracking-tight">기업 채용</h4>
            <p className="text-sm text-slate-500 font-bold leading-relaxed">
              검증되지 않은 인재 리스트에 비용을 낭비하지 마세요. 
              AI가 선별한 최적의 인재를 인터뷰할 때만 합리적인 비용이 책정됩니다.
            </p>
          </div>
          <div className="lg:col-span-1 bg-brand p-10 rounded-[32px] text-white shadow-xl shadow-brand/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="w-12 h-12 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6">
              <Zap size={24} fill="white" />
            </div>
            <h4 className="text-xl font-black mb-4 tracking-tight">정부 지원 연계</h4>
            <p className="text-sm text-white font-bold leading-relaxed opacity-90">
              고용노동부 '내일배움카드' 등의 국가 지원 프로그램을 적극 연계하여 
              최대 100% 무료로 전문 교육을 수강하실 수 있습니다.
            </p>
          </div>
        </div>

        {/* Bottom Banner */}
        <section className="bg-[#000a12] rounded-[56px] p-16 text-center text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter leading-tight relative z-10">
            <span className="text-brand">이음AI JOB</span> AI 에코시스템에 합류하세요
          </h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto font-bold leading-relaxed relative z-10">
            신뢰할 수 있는 매칭 알고리즘과 투명한 수익 체계로 <br/>
            대한민국 시니어 채용 시장의 새로운 표준을 만듭니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a href="/ai-matching" className="px-10 py-5 bg-brand text-white rounded-[20px] font-black text-lg hover:bg-brand-hover hover:scale-105 transition-all shadow-xl shadow-brand/20">
              지금 무료 매칭 시작
            </a>
            <a href="/#contact" className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-[20px] font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              맞춤 요금 상담하기
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

